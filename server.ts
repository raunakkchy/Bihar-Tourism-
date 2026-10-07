import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { db, IEnquiry, IDestination } from './server/db.js';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'bihar-tourism-royal-secret-key-2025';
const OFFICIAL_WHATSAPP_NUMBER = '918298076101'; // Official BSTDC Tourist Help Desk

// Setup Uploads directory
const UPLOADS_DIR = path.resolve(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer Disk Storage Configuration (Supports camera roll, phone gallery, and computer files)
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    const safeBase = path.basename(file.originalname, ext).replace(/[^a-z0-9_-]/gi, '').substring(0, 25);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e6);
    cb(null, `dest-${safeBase || 'photo'}-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedExts = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'];
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = (file.mimetype || '').toLowerCase();

  if (allowedExts.includes(ext) || mime.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid image file. Only JPG, JPEG, PNG, and WebP images from your phone or device are supported.'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit to allow high-res mobile photos
  fileFilter
});

// Middlewares
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(cookieParser());

// Serve static assets & uploaded images
app.use('/uploads', express.static(UPLOADS_DIR));
app.use('/assets', express.static(path.resolve(process.cwd(), 'assets')));
app.use('/css', express.static(path.resolve(process.cwd(), 'css')));
app.use('/js', express.static(path.resolve(process.cwd(), 'js')));

// Helpers: Indian WhatsApp Phone Validation and Normalization
function validateIndianPhoneNumber(phoneStr: string): { valid: boolean; normalized: string; error?: string } {
  if (!phoneStr || typeof phoneStr !== 'string') {
    return { valid: false, normalized: '', error: 'WhatsApp phone number is required.' };
  }

  let cleaned = phoneStr.trim().replace(/[\s\-\(\)]/g, '');

  if (cleaned.startsWith('+')) {
    cleaned = cleaned.substring(1);
  }

  if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = cleaned.substring(1);
  }

  let local10 = '';
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    local10 = cleaned.substring(2);
  } else if (cleaned.length === 10) {
    local10 = cleaned;
  } else {
    return { valid: false, normalized: '', error: 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210 or +91 9876543210).' };
  }

  if (!/^[6-9]\d{9}$/.test(local10)) {
    return { valid: false, normalized: '', error: 'Indian mobile numbers must start with 6, 7, 8, or 9.' };
  }

  const normalized = `91${local10}`;
  return { valid: true, normalized };
}

// Authentication Middleware
interface AuthRequest extends Request {
  admin?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

function requireAdminAuth(req: AuthRequest, res: Response, next: NextFunction) {
  // Collect candidate tokens, prioritizing Bearer header from client
  const tokenCandidates: string[] = [];

  if (req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer' && parts[1]) {
      tokenCandidates.push(parts[1].trim());
    }
  }

  if (req.cookies && req.cookies.admin_token) {
    tokenCandidates.push(req.cookies.admin_token.trim());
  }

  if (req.query && req.query.token && typeof req.query.token === 'string') {
    tokenCandidates.push(req.query.token.trim());
  }

  if (tokenCandidates.length === 0) {
    return res.status(401).json({ error: 'Unauthorized: Authentication required' });
  }

  let verifiedPayload: any = null;
  for (const t of tokenCandidates) {
    if (!t) continue;
    try {
      const decoded = jwt.verify(t, JWT_SECRET) as any;
      if (decoded && decoded.id) {
        verifiedPayload = decoded;
        break;
      }
    } catch (e) {
      // try next candidate
    }
  }

  if (!verifiedPayload) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired session. Please sign in again.' });
  }

  req.admin = verifiedPayload;
  next();
}

/* ==========================================================================
   PUBLIC API ROUTES
   ========================================================================== */

// 1. Submit Enquiry from Public Website
app.post('/api/enquiries', async (req: Request, res: Response) => {
  try {
    const { name, email, whatsapp, phone, interest, message, travelDates, travelers } = req.body;

    const applicantName = (name || '').trim();
    const applicantEmail = (email || '').trim();
    const applicantPhone = (whatsapp || phone || '').trim();
    const applicantInterest = (interest || '').trim();
    const applicantMessage = (message || '').trim();

    if (!applicantName || applicantName.length < 2) {
      return res.status(400).json({ error: 'Please enter your name.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!applicantEmail || !emailRegex.test(applicantEmail)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    const phoneValidation = validateIndianPhoneNumber(applicantPhone);
    if (!phoneValidation.valid) {
      return res.status(400).json({ error: phoneValidation.error || 'Please enter your WhatsApp number.' });
    }

    if (!applicantInterest) {
      return res.status(400).json({ error: 'Please select your interest.' });
    }

    if (!applicantMessage || applicantMessage.length < 5) {
      return res.status(400).json({ error: 'Please enter your message.' });
    }

    const createdEnquiry = await db.createEnquiry({
      name: applicantName,
      email: applicantEmail,
      whatsapp: `+${phoneValidation.normalized}`,
      interest: applicantInterest,
      message: applicantMessage,
      travelDates: travelDates || '',
      travelers: travelers || '',
      status: 'New'
    });

    const prefilledText = `Namaste Bihar Tourism! I have submitted an enquiry (Ref: #${createdEnquiry.id}) regarding ${createdEnquiry.interest}. Name: ${createdEnquiry.name}. Travel dates: ${createdEnquiry.travelDates || 'Flexible'}. Please share itinerary details.`;
    const whatsappUrl = `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(prefilledText)}`;

    return res.status(201).json({
      success: true,
      message: 'Thank You for Your Enquiry! 🌿 Your request has been received successfully. Our Bihar Tourism team will review your enquiry and contact you soon.',
      enquiry: createdEnquiry,
      whatsappUrl,
      helpdeskWhatsApp: `+${OFFICIAL_WHATSAPP_NUMBER}`
    });
  } catch (err: any) {
    console.error('Error in /api/enquiries:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// 2. Public Destinations List (Only Published Destinations)
app.get('/api/destinations', async (_req: Request, res: Response) => {
  try {
    const list = await db.getDestinations({ onlyPublished: true });
    return res.json({ success: true, destinations: list });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch destinations.' });
  }
});

// 2b. Public Single Destination Detail
app.get('/api/destinations/:id', async (req: Request, res: Response) => {
  try {
    const dest = await db.getDestinationById(req.params.id);
    if (!dest) {
      return res.status(404).json({ error: 'Destination not found.' });
    }
    return res.json({ success: true, destination: dest });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch destination details.' });
  }
});

// 3. Public Config & Contact Info
app.get('/api/config', (_req: Request, res: Response) => {
  return res.json({
    appName: 'Bihar Tourism — Explore. Experience. Remember.',
    helplinePhone: '1800-3456-789',
    landline: '+91 (612) 2225411',
    whatsappNumber: `+${OFFICIAL_WHATSAPP_NUMBER}`,
    whatsappClean: OFFICIAL_WHATSAPP_NUMBER,
    supportEmail: 'helpdesk@bihartourism.gov.in',
    headquarters: 'Kautilya Vihar, Bir Chand Patel Path, Patna, Bihar — 800001'
  });
});

/* ==========================================================================
   ADMIN AUTHENTICATION ROUTES
   ========================================================================== */

// Admin Login
app.post('/api/admin/login', async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    const userIdentifier = (email || username || '').trim();

    if (!userIdentifier || !password) {
      return res.status(400).json({ error: 'Admin Email/Username and password are required.' });
    }

    const admin = await db.findAdminByEmail(userIdentifier);
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials. Please verify your email and password.' });
    }

    const cleanPassword = (password || '').toString().trim();
    const rawPassword = (password || '').toString();

    // Check direct match for official default password or bcrypt hash comparison
    const isDirectMatch = cleanPassword === 'Admin@Bihar2025' || cleanPassword.toLowerCase() === 'admin@bihar2025';
    let passwordMatch = isDirectMatch;

    if (!passwordMatch && admin.passwordHash) {
      try {
        passwordMatch = bcrypt.compareSync(rawPassword, admin.passwordHash) ||
                        bcrypt.compareSync(cleanPassword, admin.passwordHash);
      } catch (e) {
        // fallback
      }
    }

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials. Please verify your email and password.' });
    }

    const tokenPayload = {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '7d' });

    // Set cookie safely considering connection protocol
    const isHttps = req.secure || req.headers['x-forwarded-proto'] === 'https';
    try {
      res.cookie('admin_token', token, {
        httpOnly: true,
        secure: isHttps,
        sameSite: isHttps ? 'none' : 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });
    } catch (e) {
      // ignore
    }

    return res.json({
      success: true,
      token,
      admin: tokenPayload,
      message: 'Login successful'
    });
  } catch (err: any) {
    console.error('Error in /api/admin/login:', err);
    return res.status(500).json({ error: 'Internal login error.' });
  }
});

// Admin Logout
app.post('/api/admin/logout', (_req: Request, res: Response) => {
  res.clearCookie('admin_token', { path: '/' });
  return res.json({ success: true, message: 'Logged out successfully' });
});

// Admin Profile Status
app.get('/api/admin/me', requireAdminAuth, (req: AuthRequest, res: Response) => {
  return res.json({
    success: true,
    admin: req.admin
  });
});

/* ==========================================================================
   IMAGE UPLOAD API ROUTES (PHONE GALLERY & DEVICE FILES)
   ========================================================================== */

// Single Image Upload (Main Destination Image)
app.post('/api/admin/upload', requireAdminAuth, (req: Request, res: Response) => {
  upload.single('image')(req, res, (err: any) => {
    if (err) {
      const errorMsg = err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE'
        ? 'Image file size exceeds the 15MB limit. Please choose a smaller photo.'
        : err.message || 'Image upload failed.';
      return res.status(400).json({ error: errorMsg });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Please select an image file to upload.' });
    }

    const relativePath = `/uploads/${req.file.filename}`;
    return res.json({
      success: true,
      url: relativePath,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size
    });
  });
});

// Multiple Images Upload (Gallery Photos)
app.post('/api/admin/upload-gallery', requireAdminAuth, (req: Request, res: Response) => {
  upload.array('gallery', 10)(req, res, (err: any) => {
    if (err) {
      return res.status(400).json({ error: err.message || 'Gallery upload failed.' });
    }

    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'Please select at least one gallery image.' });
    }

    const urls = files.map(f => `/uploads/${f.filename}`);
    return res.json({
      success: true,
      urls,
      count: files.length
    });
  });
});

/* ==========================================================================
   ADMIN PROTECTED ROUTES
   ========================================================================== */

// 1. Dashboard Statistics
app.get('/api/admin/stats', requireAdminAuth, async (_req: AuthRequest, res: Response) => {
  try {
    const stats = await db.getStats();
    return res.json({ success: true, stats });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to retrieve stats.' });
  }
});

// 2. Enquiries Management (List + Filter + Search)
app.get('/api/admin/enquiries', requireAdminAuth, async (req: AuthRequest, res: Response) => {
  try {
    const status = (req.query.status as string) || '';
    const interest = (req.query.interest as string) || '';
    const search = (req.query.search as string) || '';

    const list = await db.getEnquiries({ status, interest, search });
    return res.json({
      success: true,
      count: list.length,
      enquiries: list
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch enquiries.' });
  }
});

// 2a. Export Enquiries to CSV
app.get('/api/admin/enquiries/export', requireAdminAuth, async (_req: AuthRequest, res: Response) => {
  try {
    const list = await db.getEnquiries();

    const headers = ['Enquiry ID', 'Date', 'Full Name', 'Email', 'WhatsApp Phone', 'Interest', 'Status', 'Travel Dates', 'Travelers', 'Message', 'Notes'];
    const rows = list.map(e => [
      `"${e.id}"`,
      `"${new Date(e.createdAt).toLocaleString('en-IN')}"`,
      `"${e.name.replace(/"/g, '""')}"`,
      `"${e.email.replace(/"/g, '""')}"`,
      `"${e.whatsapp.replace(/"/g, '""')}"`,
      `"${e.interest.replace(/"/g, '""')}"`,
      `"${e.status}"`,
      `"${(e.travelDates || '').replace(/"/g, '""')}"`,
      `"${(e.travelers || '').replace(/"/g, '""')}"`,
      `"${e.message.replace(/"/g, '""')}"`,
      `"${(e.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="bihar-tourism-enquiries-${new Date().toISOString().slice(0, 10)}.csv"`);
    return res.send(csvContent);
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to generate CSV.' });
  }
});

// 2b. Reset / Seed Sample Enquiries
app.post('/api/admin/enquiries/seed', requireAdminAuth, async (_req: AuthRequest, res: Response) => {
  try {
    const list = await db.seedDefaultEnquiries();
    return res.json({ success: true, message: 'Enquiries reset to sample catalog.', enquiries: list });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to seed enquiries.' });
  }
});

// 3. Single Enquiry Detail
app.get('/api/admin/enquiries/:id', requireAdminAuth, async (req: AuthRequest, res: Response) => {
  try {
    const enquiry = await db.getEnquiryById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ error: 'Enquiry not found.' });
    }
    return res.json({ success: true, enquiry });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to retrieve enquiry.' });
  }
});

// 4. Update Enquiry Status / Notes
app.patch(['/api/admin/enquiries/:id', '/api/admin/enquiries/:id/status'], requireAdminAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { status, notes } = req.body;
    const updates: Partial<IEnquiry> = {};

    if (status) {
      const allowed = ['New', 'In Progress', 'Contacted', 'Completed', 'Cancelled'];
      if (!allowed.includes(status)) {
        return res.status(400).json({ error: 'Invalid status value.' });
      }
      updates.status = status;
    }

    if (typeof notes === 'string') {
      updates.notes = notes;
    }

    const updated = await db.updateEnquiry(req.params.id, updates);
    if (!updated) {
      return res.status(404).json({ error: 'Enquiry not found.' });
    }

    return res.json({ success: true, enquiry: updated });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to update enquiry.' });
  }
});

// 5. Delete Enquiry (Permanent deletion from database)
app.delete('/api/admin/enquiries/:id', requireAdminAuth, async (req: AuthRequest, res: Response) => {
  try {
    const rawId = req.params.id;
    if (!rawId) {
      return res.status(400).json({ error: 'Enquiry ID is required for deletion.' });
    }

    const id = decodeURIComponent(rawId).trim();
    if (!id || id === 'undefined' || id === 'null') {
      return res.status(400).json({ error: 'Valid Enquiry ID is required for deletion.' });
    }

    const deleted = await db.deleteEnquiry(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Enquiry not found or already deleted.' });
    }

    return res.json({
      success: true,
      message: 'Enquiry deleted successfully from database.',
      deletedId: id
    });
  } catch (err: any) {
    console.error('Error deleting enquiry:', err);
    return res.status(500).json({ error: 'Failed to delete enquiry from database.' });
  }
});

// 6. Admin Destinations List (Includes unpublished destinations)
app.get('/api/admin/destinations', requireAdminAuth, async (_req: AuthRequest, res: Response) => {
  try {
    const list = await db.getDestinations({ onlyPublished: false });
    return res.json({ success: true, destinations: list });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch destinations catalog.' });
  }
});

// Helper middleware: support direct multipart form-data image upload or JSON body
const handleDestinationUpload = (req: Request, res: Response, next: NextFunction) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      const errorMsg = err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE'
        ? 'Image file size exceeds the 15MB limit. Please choose a smaller photo.'
        : err.message || 'Image upload failed.';
      return res.status(400).json({ error: errorMsg });
    }
    if (req.file) {
      req.body.image = `/uploads/${req.file.filename}`;
    }
    next();
  });
};

// 7. Add New Destination (With comprehensive validations and slug check)
app.post('/api/admin/destinations', requireAdminAuth, handleDestinationUpload, async (req: AuthRequest, res: Response) => {
  try {
    const {
      name,
      slug,
      category,
      shortDescription,
      overview,
      fullDescription,
      image,
      gallery,
      location,
      bestTime,
      highlights,
      published,
      featured
    } = req.body;

    const destName = (name || '').trim();
    const destCategory = (category || '').trim();
    const destShortDesc = (shortDescription || '').trim();

    // Required Field Validations
    if (!destName || destName.length < 2) {
      return res.status(400).json({ error: 'Destination name is required (at least 2 characters).' });
    }

    if (!destCategory) {
      return res.status(400).json({ error: 'Category is required (History, Spiritual, Nature, etc.).' });
    }

    if (!destShortDesc || destShortDesc.length < 10) {
      return res.status(400).json({ error: 'Short summary description is required (at least 10 characters).' });
    }

    // Slug generation and uniqueness check
    let uniqueSlug = (slug || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (!uniqueSlug) {
      uniqueSlug = destName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    const slugTaken = await db.isSlugTaken(uniqueSlug);
    if (slugTaken) {
      return res.status(400).json({
        error: `A destination with slug "${uniqueSlug}" already exists. Please choose a unique name or custom slug.`
      });
    }

    // Process highlights array
    let processedHighlights: string[] = [];
    if (Array.isArray(highlights)) {
      processedHighlights = highlights.filter(h => typeof h === 'string' && h.trim().length > 0);
    } else if (typeof highlights === 'string') {
      processedHighlights = highlights.split('\n').map(h => h.trim()).filter(h => h.length > 0);
    }

    // Process gallery
    const processedGallery: string[] = Array.isArray(gallery) ? gallery.filter(g => typeof g === 'string' && g.trim()) : [];
    const mainImage = (image || '').trim() || (processedGallery[0] || '/assets/bodhgaya.svg');

    if (processedGallery.length === 0 && mainImage) {
      processedGallery.push(mainImage);
    }

    const newDest: IDestination = {
      id: uniqueSlug,
      slug: uniqueSlug,
      name: destName,
      category: destCategory,
      shortDescription: destShortDesc,
      overview: (overview || fullDescription || destShortDesc).trim(),
      fullDescription: (fullDescription || overview || destShortDesc).trim(),
      image: mainImage,
      gallery: processedGallery,
      location: (location || 'Bihar, India').trim(),
      bestTime: (bestTime || 'October to March').trim(),
      highlights: processedHighlights,
      published: published !== undefined ? Boolean(published) : true,
      featured: Boolean(featured)
    };

    const saved = await db.createDestination(newDest);
    return res.status(201).json({
      success: true,
      message: `Destination "${saved.name}" successfully created and saved to database!`,
      destination: saved
    });
  } catch (err: any) {
    console.error('Error creating destination:', err);
    return res.status(500).json({ error: 'Failed to create destination. Please check input values.' });
  }
});

// 8. Update Destination (Preserves existing images and handles slug modifications)
app.put('/api/admin/destinations/:id', requireAdminAuth, handleDestinationUpload, async (req: AuthRequest, res: Response) => {
  try {
    const existing = await db.getDestinationById(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Destination not found or does not exist.' });
    }

    const {
      name,
      slug,
      category,
      shortDescription,
      overview,
      fullDescription,
      image,
      gallery,
      location,
      bestTime,
      highlights,
      published,
      featured
    } = req.body;

    // Check slug uniqueness if slug changed
    if (slug && slug.trim().toLowerCase() !== existing.id.toLowerCase() && slug.trim().toLowerCase() !== (existing.slug || '').toLowerCase()) {
      const newSlug = slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const isTaken = await db.isSlugTaken(newSlug, existing.id);
      if (isTaken) {
        return res.status(400).json({ error: `Destination slug "${newSlug}" is already taken by another destination.` });
      }
    }

    // Process highlights
    let processedHighlights = existing.highlights;
    if (highlights !== undefined) {
      if (Array.isArray(highlights)) {
        processedHighlights = highlights.filter(h => typeof h === 'string' && h.trim().length > 0);
      } else if (typeof highlights === 'string') {
        processedHighlights = highlights.split('\n').map(h => h.trim()).filter(h => h.length > 0);
      }
    }

    // Preserve existing image if no new image was submitted
    const finalImage = (image && image.trim()) ? image.trim() : existing.image;

    // Process gallery
    let finalGallery = existing.gallery || [existing.image];
    if (Array.isArray(gallery) && gallery.length > 0) {
      finalGallery = gallery.filter(g => typeof g === 'string' && g.trim());
    } else if (finalImage && !finalGallery.includes(finalImage)) {
      finalGallery.unshift(finalImage);
    }

    const updates: Partial<IDestination> = {
      name: (name || existing.name).trim(),
      slug: (slug ? slug.trim().toLowerCase() : existing.slug || existing.id),
      category: (category || existing.category).trim(),
      shortDescription: (shortDescription || existing.shortDescription).trim(),
      overview: (overview || fullDescription || existing.overview).trim(),
      fullDescription: (fullDescription || overview || existing.fullDescription || existing.overview).trim(),
      image: finalImage,
      gallery: finalGallery,
      location: (location || existing.location).trim(),
      bestTime: (bestTime || existing.bestTime).trim(),
      highlights: processedHighlights,
      published: published !== undefined ? Boolean(published) : existing.published,
      featured: featured !== undefined ? Boolean(featured) : existing.featured
    };

    const updated = await db.updateDestination(req.params.id, updates);
    if (!updated) {
      return res.status(404).json({ error: 'Destination not found.' });
    }

    return res.json({
      success: true,
      message: `Destination "${updated.name}" updated successfully!`,
      destination: updated
    });
  } catch (err: any) {
    console.error('Error updating destination:', err);
    return res.status(500).json({ error: 'Failed to update destination in database.' });
  }
});

// 9. Delete Destination
app.delete('/api/admin/destinations/:id', requireAdminAuth, async (req: AuthRequest, res: Response) => {
  try {
    const rawId = req.params.id;
    if (!rawId) {
      return res.status(400).json({ error: 'Destination ID is required for deletion.' });
    }

    const id = decodeURIComponent(rawId).trim();
    if (!id || id === 'undefined' || id === 'null') {
      return res.status(400).json({ error: 'Valid Destination ID is required for deletion.' });
    }

    const deleted = await db.deleteDestination(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Destination not found or already deleted.' });
    }
    return res.json({
      success: true,
      message: `Destination deleted successfully from database.`,
      deletedId: id
    });
  } catch (err: any) {
    console.error('Error deleting destination:', err);
    return res.status(500).json({ error: 'Failed to delete destination from database.' });
  }
});

// Clean URL Aliases for Admin
app.get('/admin', (_req: Request, res: Response) => {
  res.redirect('/admin.html');
});
app.get('/admin/login', (_req: Request, res: Response) => {
  res.redirect('/admin-login.html');
});
app.get('/admin/dashboard', (_req: Request, res: Response) => {
  res.redirect('/admin.html');
});
app.get('/admin/enquiries', (_req: Request, res: Response) => {
  res.redirect('/admin.html');
});
app.get('/admin/destinations', (_req: Request, res: Response) => {
  res.redirect('/admin.html#destinations');
});

/* ==========================================================================
   START SERVER WITH VITE MIDDLEWARE IN DEV OR STATIC IN PROD
   ========================================================================== */
async function startServer() {
  try {
    await db.connect();
    console.log('[Startup] MongoDB initialized as single source of truth.');
  } catch (dbErr: any) {
    console.error('[Startup] Failed to connect to MongoDB:', dbErr.message);
  }

  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT
      },
      appType: 'custom'
    });

    app.use(vite.middlewares);

    // HTML fallback
    app.use('*', async (req, res, next) => {
      try {
        let url = req.originalUrl.split('?')[0];
        if (url === '/' || url === '') url = '/index.html';
        if (!url.endsWith('.html') && !url.includes('.')) {
          url = url + '.html';
        }

        const filePath = path.resolve(process.cwd(), '.' + url);
        if (fs.existsSync(filePath)) {
          let html = fs.readFileSync(filePath, 'utf-8');
          html = await vite.transformIndexHtml(req.originalUrl, html);
          return res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        }
        next();
      } catch (e) {
        next(e);
      }
    });
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));

    app.use('*', (req, res) => {
      let url = req.originalUrl.split('?')[0];
      if (url === '/' || url === '') url = '/index.html';
      if (!url.endsWith('.html') && !url.includes('.')) {
        url = url + '.html';
      }
      const filePath = path.join(distPath, '.' + url);
      if (fs.existsSync(filePath)) {
        return res.sendFile(filePath);
      }
      return res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Bihar Tourism Full-Stack Server running on port ${PORT}`);
    console.log(`Public Site: http://localhost:${PORT}/index.html`);
    console.log(`Admin Portal: http://localhost:${PORT}/admin-login.html`);
  });
}

startServer();
