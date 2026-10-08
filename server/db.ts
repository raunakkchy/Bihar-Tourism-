import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcryptjs';
import mongoose, { Schema, Model, Types } from 'mongoose';

export interface IEnquiry {
  _id?: string;
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  interest: string;
  message: string;
  travelDates?: string;
  travelers?: string;
  status: 'New' | 'In Progress' | 'Contacted' | 'Completed' | 'Cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAdmin {
  _id?: string;
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: string;
  createdAt: string;
}

export interface IDestination {
  _id?: string;
  id: string;
  slug?: string;
  name: string;
  category: string;
  shortDescription: string;
  overview?: string;
  fullDescription?: string;
  location: string;
  bestTime: string;
  highlights?: string[] | string;
  image: string;
  gallery?: string[];
  published?: boolean;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Initial Seed Admins
const DEFAULT_PASSWORD = 'Admin@Bihar2025';
const DEFAULT_PASSWORD_HASH = bcrypt.hashSync(DEFAULT_PASSWORD, 10);

const SEED_ADMINS: IAdmin[] = [
  {
    id: 'admin-01',
    email: 'admin@bihartourism.gov.in',
    name: 'Bihar Tourism Help Desk Coordinator',
    passwordHash: DEFAULT_PASSWORD_HASH,
    role: 'Super Administrator',
    createdAt: new Date().toISOString()
  },
  {
    id: 'admin-02',
    email: 'raunakkchy@gmail.com',
    name: 'Raunak Kumar (Tourism Administrator)',
    passwordHash: DEFAULT_PASSWORD_HASH,
    role: 'Super Administrator',
    createdAt: new Date().toISOString()
  }
];

const SEED_ENQUIRIES: IEnquiry[] = [
  {
    id: 'enq-1001',
    name: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    whatsapp: '+91 98765 43210',
    interest: 'Spiritual Journey',
    message: 'Seeking a 4-day guided pilgrimage itinerary covering Mahabodhi Temple in Bodh Gaya and the monasteries in Rajgir for a family group of 4.',
    travelDates: 'November 15–19, 2026',
    travelers: '4 Adults',
    status: 'New',
    notes: 'Inquired about Hindi & English speaking licensed guide.',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 3).toISOString()
  },
  {
    id: 'enq-1002',
    name: 'Rajesh Kumar Verma',
    email: 'rajesh.verma@delhitech.in',
    whatsapp: '+91 94312 87654',
    interest: 'Heritage',
    message: 'Planning an archaeological documentation tour to Nalanda University ruins, Xuanzang Memorial, and Sasaram tomb of Sher Shah Suri.',
    travelDates: 'December 2–6, 2026',
    travelers: '2 Adults',
    status: 'Contacted',
    notes: 'Contacted over WhatsApp; BSTDC archaeological booklet shared.',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'enq-1003',
    name: 'Dr. Siddharth Sen',
    email: 'siddharth.sen@calmed.edu',
    whatsapp: '+91 98301 23456',
    interest: 'Nature Escape',
    message: 'Interested in booking an eco-tourism package for Valmiki Tiger Reserve with jeep safari and river rafting along Gandak River.',
    travelDates: 'January 10–14, 2027',
    travelers: '3 Adults',
    status: 'In Progress',
    notes: 'Awaiting forest department safari permit confirmation.',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString()
  }
];

const SEED_DESTINATIONS: IDestination[] = [
  {
    id: 'bodh-gaya',
    slug: 'bodh-gaya',
    name: 'Bodh Gaya',
    category: 'Spiritual',
    shortDescription: 'The cradle of world Buddhism and UNESCO World Heritage site where Prince Siddhartha attained supreme enlightenment under the sacred Bodhi Tree.',
    image: '/uploads/bodhgaya-gallery.jpg',
    location: 'Gaya District, South Bihar',
    overview: 'Bodh Gaya is the most sanctified Buddhist pilgrimage center on Earth. Centerpiece is the towering 50-meter 5th-century Mahabodhi Temple.',
    fullDescription: 'Located beside the tranquil Falgu (Neranjara) River, Bodh Gaya is where Siddhartha Gautama meditated for 49 days and attained supreme enlightenment in 528 BCE.',
    bestTime: 'October to March',
    highlights: ['UNESCO Mahabodhi Temple Complex', 'Sacred Bodhi Tree (Sri Maha Bodhi)', 'Vajrasana (Diamond Throne of Emperor Ashoka)', '80-Foot Giant Buddha Statue', 'International Monasteries (Thai, Tibetan, Bhutanese, Japanese)'],
    gallery: ['/uploads/bodhgaya-gallery.jpg', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80', '/assets/bodhgaya.svg'],
    published: true,
    featured: true
  },
  {
    id: 'nalanda',
    slug: 'nalanda',
    name: 'Nalanda',
    category: 'History',
    shortDescription: 'The ancient residential international university of world renown. UNESCO World Heritage ruins celebrating 800 years of global intellectual brilliance.',
    image: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=1200&q=80',
    location: 'Nalanda District, Central Bihar',
    overview: 'Founded in the 5th century CE under the Gupta Empire, Nalanda was the world’s foremost residential university housing over 10,000 scholars and 2,000 teachers.',
    fullDescription: 'Spread over extensive excavated brick ruins, Nalanda University flourished for over seven centuries as an international seat of learning attracting scholars from China, Korea, Japan, Tibet, and Persia.',
    bestTime: 'October to March',
    highlights: ['UNESCO Archaeological Ruins of Nalanda Mahavihara', 'Stupa of Sariputra (Temple No. 3)', 'Nalanda Archaeological Museum', 'Hiuen Tsang (Xuanzang) Memorial Hall', 'Nav Nalanda Mahavihara Post-Graduate Institute'],
    gallery: ['https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=1200&q=80', '/assets/nalanda.svg'],
    published: true,
    featured: true
  },
  {
    id: 'rajgir',
    slug: 'rajgir',
    name: 'Rajgir',
    category: 'History / Spiritual',
    shortDescription: 'Ancient capital of Magadha nestled amidst seven scenic hills. Revered by Buddhists and Jains for Griddhakuta Peak and the serene Vishwa Shanti Stupa.',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
    location: 'Nalanda District, Central Bihar',
    overview: 'Surrounded by seven sacred hills, Rajgir (Rajagriha) was the original capital of the mighty Magadha kingdom ruled by King Bimbisara and Ajatashatru.',
    fullDescription: 'Set against a dramatic ring of verdant hills, Rajgir is woven deeply into the tapestry of the Mahabharata and the lives of both Lord Buddha and Lord Mahavira.',
    bestTime: 'October to March',
    highlights: ['Aerial Ropeway to Vishwa Shanti Stupa', 'Griddhakuta (Vulture’s Peak)', 'Venuvana Bamboo Grove of Buddha', 'Natural Hot Water Sulphur Springs (Brahmakund)', 'Glass Floor Suspension Bridge & Nature Safari'],
    gallery: ['https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80', '/assets/rajgir.svg'],
    published: true,
    featured: true
  },
  {
    id: 'patna',
    slug: 'patna',
    name: 'Patna (Pataliputra)',
    category: 'History / Culture',
    shortDescription: 'Historic metropolis on the banks of the Holy Ganges. Legendary imperial seat of Chandragupta Maurya and Emperor Ashoka, and birthplace of Guru Gobind Singh Ji.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    location: 'Patna District, Central Bihar',
    overview: 'With over three millennia of recorded history, ancient Pataliputra was one of the largest cities of the ancient world.',
    fullDescription: 'Contemporary Patna seamlessly weaves imperial imperial heritage with modern cultural vitality.',
    bestTime: 'October to March',
    highlights: ['Takht Sri Patna Sahib (Birthplace of 10th Sikh Guru)', 'Bihar Museum (World-Class Interactive Museum)', 'Golghar Iconic Granary & Ganges Panoramic View', 'Kumhrar Mauryan Excavation Ruins', 'Patna Planetarium & Riverfront Ganga Aarti Promenade'],
    gallery: ['https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80', '/assets/patna.svg'],
    published: true,
    featured: true
  },
  {
    id: 'vaishali',
    slug: 'vaishali',
    name: 'Vaishali',
    category: 'History / Spiritual',
    shortDescription: 'The world’s first recorded democratic republic. Sacred birthplace of Lord Mahavira and location of Emperor Ashoka’s polished sandstone lion pillar.',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80',
    location: 'Vaishali District, North Bihar',
    overview: 'Capital of the ancient Licchavi republic, site of Buddha’s Last Sermon, Relic Stupa, and Ashokan Lion Pillar.',
    fullDescription: 'Vaishali occupies a celebrated place in world civilization as the cradle of republican democracy. It was also where Lord Buddha preached his Last Sermon and accepted food from courtesan Amrapali.',
    bestTime: 'October to March',
    highlights: ['Ashokan Polished Lion Pillar & Stupa', 'Buddha Relic Stupa Site', 'Abhishek Pushkarni Sacred Coronation Tank', 'Kundalpur (Birthplace of Lord Mahavira)', 'Vishwa Shanti Stupa Vaishali'],
    gallery: ['https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80', '/assets/vaishali.svg'],
    published: true,
    featured: true
  },
  {
    id: 'valmiki',
    slug: 'valmiki',
    name: 'Valmiki Tiger Reserve',
    category: 'Nature',
    shortDescription: 'Lush Himalayan foothills and moist Sal forests along the Gandak River. Bihar’s premier eco-tourism sanctuary home to Bengal tigers, rhinos, and hornbills.',
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80',
    location: 'West Champaran District, North Bihar',
    overview: 'Over 898 sq km of pristine wilderness in the Terai region. Jungle jeep safaris, river rafting, and canopy lodges.',
    fullDescription: 'Spread across nearly 900 sq km of undisturbed Terai bhabar landscape along the Indo-Nepal border, Valmiki Tiger Reserve is Bihar’s crown jewel of natural heritage.',
    bestTime: 'November to April',
    highlights: ['Jungle Jeep Wildlife Safari', 'Gandak River Boat Safari', 'Kaleshwar & Valmiki Ashrams', 'Canopy Eco-Cottages & Treehouses', 'Birdwatching (Over 250 Avian Species)'],
    gallery: ['https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80', '/assets/valmiki.svg'],
    published: true,
    featured: true
  }
];

// --- Mongoose Schemas ---
const AdminSchema = new Schema({
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'admin' },
  createdAt: { type: String, default: () => new Date().toISOString() }
});

const EnquirySchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, index: true },
  whatsapp: { type: String, required: true },
  interest: { type: String, required: true, index: true },
  message: { type: String, required: true },
  travelDates: { type: String, default: '' },
  travelers: { type: String, default: '' },
  status: { type: String, default: 'New', index: true },
  notes: { type: String, default: '' },
  createdAt: { type: String, default: () => new Date().toISOString(), index: true },
  updatedAt: { type: String, default: () => new Date().toISOString() }
});

const DestinationSchema = new Schema({
  id: { type: String, required: true, unique: true },
  slug: { type: String, required: true, index: true },
  name: { type: String, required: true },
  category: { type: String, required: true, index: true },
  shortDescription: { type: String, required: true },
  overview: { type: String, default: '' },
  fullDescription: { type: String, default: '' },
  location: { type: String, default: 'Bihar, India' },
  bestTime: { type: String, default: 'October to March' },
  highlights: { type: Schema.Types.Mixed, default: [] },
  image: { type: String, required: true },
  gallery: { type: [String], default: [] },
  published: { type: Boolean, default: true, index: true },
  featured: { type: Boolean, default: false },
  createdAt: { type: String, default: () => new Date().toISOString(), index: true },
  updatedAt: { type: String, default: () => new Date().toISOString() }
});

// Helper for clean object normalization from Mongoose doc
function formatDoc<T>(doc: any): T {
  if (!doc) return doc;
  const raw = typeof doc.toObject === 'function' ? doc.toObject() : doc;
  return {
    ...raw,
    _id: raw._id ? String(raw._id) : undefined,
    id: raw.id || (raw._id ? String(raw._id) : undefined)
  };
}

class DatabaseService {
  private isConnected: boolean = false;
  private AdminModel!: Model<any>;
  private EnquiryModel!: Model<any>;
  private DestinationModel!: Model<any>;
  private connectPromise: Promise<void> | null = null;

  constructor() {
    this.AdminModel = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
    this.EnquiryModel = mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
    this.DestinationModel = mongoose.models.Destination || mongoose.model('Destination', DestinationSchema);
  }

  public async connect(): Promise<void> {
    if (this.isConnected) return;
    if (this.connectPromise) return this.connectPromise;

    this.connectPromise = (async () => {
      let mongoUri = process.env.MONGODB_URI;

      if (!mongoUri) {
        console.log('[MongoDB] MONGODB_URI not set. Initializing embedded MongoDB engine for development...');
        try {
          const { MongoMemoryServer } = await import('mongodb-memory-server');
          const mongod = await MongoMemoryServer.create({
            instance: { dbName: 'bihar_tourism' }
          });
          mongoUri = mongod.getUri();
          console.log('[MongoDB] Embedded MongoDB ready.');
        } catch (memErr: any) {
          console.error('[MongoDB] Failed to start embedded MongoDB:', memErr.message);
          throw new Error(`MongoDB connection failed: ${memErr.message}`);
        }
      }

      try {
        await mongoose.connect(mongoUri);
        this.isConnected = mongoose.connection.readyState === 1;
        console.log(`[MongoDB] Connected successfully to database: ${mongoose.connection.name}`);

        // Seed initial collections if empty
        await this.seedInitialCollectionsIfEmpty();
      } catch (err: any) {
        this.isConnected = false;
        console.error('[MongoDB] Connection error:', err.message);
        throw new Error(`Failed to connect to MongoDB: ${err.message}`);
      }
    })();

    return this.connectPromise;
  }

  private async ensureConnection(): Promise<void> {
    if (!this.isConnected || mongoose.connection.readyState !== 1) {
      await this.connect();
    }
  }

  private async seedInitialCollectionsIfEmpty(): Promise<void> {
    try {
      // Always guarantee default admin exists and credentials are valid
      for (const admin of SEED_ADMINS) {
        await this.AdminModel.findOneAndUpdate(
          { email: new RegExp(`^${admin.email}$`, 'i') },
          {
            $set: {
              id: admin.id,
              email: admin.email,
              name: admin.name,
              passwordHash: admin.passwordHash,
              role: admin.role
            }
          },
          { upsert: true, new: true }
        );
      }

      // Always sync high-definition photographic images and destinations catalog
      for (const dest of SEED_DESTINATIONS) {
        await this.DestinationModel.findOneAndUpdate(
          { $or: [{ id: dest.id }, { slug: dest.slug }, { slug: dest.id }] },
          {
            $set: {
              id: dest.id,
              slug: dest.slug || dest.id,
              name: dest.name,
              category: dest.category,
              shortDescription: dest.shortDescription,
              overview: dest.overview,
              fullDescription: dest.fullDescription,
              location: dest.location,
              bestTime: dest.bestTime,
              highlights: dest.highlights,
              image: dest.image,
              gallery: dest.gallery,
              published: true,
              featured: true
            }
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      }

      const enqCount = await this.EnquiryModel.countDocuments();
      if (enqCount === 0) {
        console.log('[MongoDB] Seeding sample traveler enquiries...');
        await this.EnquiryModel.insertMany(SEED_ENQUIRIES);
      }
    } catch (err: any) {
      console.warn('[MongoDB] Warning during initial collection seeding:', err.message);
    }
  }

  // --- Admin Methods ---
  public async findAdminByEmail(identifier: string): Promise<IAdmin | null> {
    await this.ensureConnection();
    const clean = (identifier || '').trim();
    if (!clean) return null;

    const query: any = {
      $or: [
        { email: new RegExp(`^${clean}$`, 'i') },
        { id: clean },
        { id: new RegExp(`^${clean}$`, 'i') }
      ]
    };

    // If user typed "admin", "admin-01", "coordinator", "raunak", etc.
    const lower = clean.toLowerCase();
    if (lower === 'admin' || lower === 'admin-01' || lower === 'coordinator') {
      query.$or.push({ email: 'admin@bihartourism.gov.in' });
      query.$or.push({ id: 'admin-01' });
    } else if (lower.includes('raunak') || lower === 'raunakkchy@gmail.com') {
      query.$or.push({ email: 'raunakkchy@gmail.com' });
      query.$or.push({ id: 'admin-02' });
    }

    const doc = await this.AdminModel.findOne(query).lean();
    if (!doc) {
      if (lower === 'admin' || lower === 'admin@bihartourism.gov.in' || lower === 'admin-01') {
        return SEED_ADMINS[0];
      }
      if (lower.includes('raunak') || lower === 'raunakkchy@gmail.com') {
        return SEED_ADMINS[1];
      }
    }
    return doc ? formatDoc<IAdmin>(doc) : null;
  }

  public async findAdminById(id: string): Promise<IAdmin | null> {
    await this.ensureConnection();
    const query: any = { $or: [{ id }] };
    if (mongoose.isValidObjectId(id)) {
      query.$or.push({ _id: id });
    }
    const doc = await this.AdminModel.findOne(query).lean();
    return doc ? formatDoc<IAdmin>(doc) : null;
  }

  // --- Enquiry Methods ---
  public async createEnquiry(enquiryInput: Omit<IEnquiry, 'id' | 'createdAt' | 'updatedAt' | 'status'> & { status?: IEnquiry['status'] }): Promise<IEnquiry> {
    await this.ensureConnection();
    const now = new Date().toISOString();
    const newId = 'enq-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6);

    const doc = await this.EnquiryModel.create({
      id: newId,
      name: enquiryInput.name.trim(),
      email: enquiryInput.email.trim(),
      whatsapp: enquiryInput.whatsapp.trim(),
      interest: enquiryInput.interest,
      message: enquiryInput.message.trim(),
      travelDates: enquiryInput.travelDates?.trim() || '',
      travelers: enquiryInput.travelers?.trim() || '',
      status: enquiryInput.status || 'New',
      notes: enquiryInput.notes || '',
      createdAt: now,
      updatedAt: now
    });

    return formatDoc<IEnquiry>(doc);
  }

  public async getEnquiries(options: {
    status?: string;
    interest?: string;
    search?: string;
    page?: number;
    limit?: number;
  } = {}): Promise<IEnquiry[]> {
    await this.ensureConnection();
    const query: any = {};

    if (options.status && options.status !== 'all' && options.status !== 'All') {
      query.status = new RegExp(`^${options.status}$`, 'i');
    }

    if (options.interest && options.interest !== 'all' && options.interest !== 'All') {
      query.interest = new RegExp(`^${options.interest}$`, 'i');
    }

    if (options.search) {
      const q = options.search.trim();
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { whatsapp: { $regex: q, $options: 'i' } },
        { message: { $regex: q, $options: 'i' } },
        { notes: { $regex: q, $options: 'i' } }
      ];
    }

    let cursor = this.EnquiryModel.find(query).sort({ createdAt: -1 });

    if (options.page && options.limit) {
      const skip = (Math.max(1, options.page) - 1) * options.limit;
      cursor = cursor.skip(skip).limit(options.limit);
    }

    const docs = await cursor.lean();
    return docs.map(d => formatDoc<IEnquiry>(d));
  }

  public async getEnquiryById(id: string): Promise<IEnquiry | null> {
    await this.ensureConnection();
    const cleanId = id.trim();
    const query: any = { $or: [{ id: cleanId }] };
    if (mongoose.isValidObjectId(cleanId)) {
      query.$or.push({ _id: cleanId });
    }

    const doc = await this.EnquiryModel.findOne(query).lean();
    return doc ? formatDoc<IEnquiry>(doc) : null;
  }

  public async updateEnquiry(id: string, updates: Partial<IEnquiry>): Promise<IEnquiry | null> {
    await this.ensureConnection();
    const cleanId = id.trim();
    const query: any = { $or: [{ id: cleanId }] };
    if (mongoose.isValidObjectId(cleanId)) {
      query.$or.push({ _id: cleanId });
    }

    const doc = await this.EnquiryModel.findOneAndUpdate(
      query,
      {
        $set: {
          ...updates,
          updatedAt: new Date().toISOString()
        }
      },
      { new: true }
    ).lean();

    return doc ? formatDoc<IEnquiry>(doc) : null;
  }

  public async deleteEnquiry(id: string): Promise<boolean> {
    await this.ensureConnection();
    const cleanId = (id || '').trim();
    if (!cleanId) return false;

    const query: any = {
      $or: [
        { id: cleanId },
        { id: new RegExp(`^${cleanId}$`, 'i') }
      ]
    };
    if (mongoose.isValidObjectId(cleanId)) {
      query.$or.push({ _id: cleanId });
    }

    const res = await this.EnquiryModel.deleteOne(query);
    return Boolean(res && res.deletedCount && res.deletedCount > 0);
  }

  public async seedDefaultEnquiries(): Promise<IEnquiry[]> {
    await this.ensureConnection();
    await this.EnquiryModel.insertMany(SEED_ENQUIRIES);
    return this.getEnquiries();
  }

  // --- Statistics & Counts ---
  public async getStats(): Promise<{
    total: number;
    new: number;
    inProgress: number;
    contacted: number;
    completed: number;
    destinations: number;
    publishedDestinations: number;
  }> {
    await this.ensureConnection();

    const [
      total,
      newCount,
      inProgress,
      contacted,
      completed,
      destinations,
      publishedDestinations
    ] = await Promise.all([
      this.EnquiryModel.countDocuments(),
      this.EnquiryModel.countDocuments({ status: 'New' }),
      this.EnquiryModel.countDocuments({ status: 'In Progress' }),
      this.EnquiryModel.countDocuments({ status: 'Contacted' }),
      this.EnquiryModel.countDocuments({ status: 'Completed' }),
      this.DestinationModel.countDocuments(),
      this.DestinationModel.countDocuments({ published: { $ne: false } })
    ]);

    return {
      total,
      new: newCount,
      inProgress,
      contacted,
      completed,
      destinations,
      publishedDestinations
    };
  }

  // --- Destination Methods ---
  public async getDestinations(options: { onlyPublished?: boolean } = {}): Promise<IDestination[]> {
    await this.ensureConnection();
    const query: any = {};
    if (options.onlyPublished) {
      query.published = { $ne: false };
    }

    const docs = await this.DestinationModel.find(query).sort({ createdAt: -1 }).lean();
    return docs.map(d => formatDoc<IDestination>(d));
  }

  public async getDestinationById(idOrSlug: string): Promise<IDestination | null> {
    await this.ensureConnection();
    const clean = idOrSlug.trim();
    const query: any = {
      $or: [
        { id: clean },
        { slug: clean },
        { id: new RegExp(`^${clean}$`, 'i') },
        { slug: new RegExp(`^${clean}$`, 'i') }
      ]
    };
    if (mongoose.isValidObjectId(clean)) {
      query.$or.push({ _id: clean });
    }

    const doc = await this.DestinationModel.findOne(query).lean();
    return doc ? formatDoc<IDestination>(doc) : null;
  }

  public async isSlugTaken(slug: string, excludeId?: string): Promise<boolean> {
    await this.ensureConnection();
    const cleanSlug = slug.trim();
    const query: any = {
      $or: [
        { slug: new RegExp(`^${cleanSlug}$`, 'i') },
        { id: new RegExp(`^${cleanSlug}$`, 'i') }
      ]
    };

    if (excludeId) {
      const cleanExclude = excludeId.trim();
      const excludeClause: any = {
        id: { $ne: cleanExclude },
        slug: { $ne: cleanExclude }
      };
      if (mongoose.isValidObjectId(cleanExclude)) {
        excludeClause._id = { $ne: cleanExclude };
      }
      query.$and = [excludeClause];
    }

    const count = await this.DestinationModel.countDocuments(query);
    return count > 0;
  }

  public async createDestination(dest: IDestination): Promise<IDestination> {
    await this.ensureConnection();
    const now = new Date().toISOString();
    const cleanSlug = (dest.slug || dest.id).trim().toLowerCase();

    const finalDest: any = {
      ...dest,
      id: cleanSlug,
      slug: cleanSlug,
      published: dest.published !== false,
      gallery: Array.isArray(dest.gallery) && dest.gallery.length > 0
        ? dest.gallery
        : (dest.image ? [dest.image] : []),
      highlights: dest.highlights || [],
      overview: dest.overview || dest.shortDescription,
      fullDescription: dest.fullDescription || dest.overview || dest.shortDescription,
      createdAt: now,
      updatedAt: now
    };

    const doc = await this.DestinationModel.create(finalDest);
    return formatDoc<IDestination>(doc);
  }

  public async updateDestination(id: string, updates: Partial<IDestination>): Promise<IDestination | null> {
    await this.ensureConnection();
    const cleanId = id.trim();
    const query: any = {
      $or: [
        { id: cleanId },
        { slug: cleanId },
        { id: new RegExp(`^${cleanId}$`, 'i') },
        { slug: new RegExp(`^${cleanId}$`, 'i') }
      ]
    };
    if (mongoose.isValidObjectId(cleanId)) {
      query.$or.push({ _id: cleanId });
    }

    const existing = await this.DestinationModel.findOne(query);
    if (!existing) return null;

    const newSlug = updates.slug ? updates.slug.trim().toLowerCase() : existing.slug;
    const updatePayload: any = {
      ...updates,
      id: newSlug,
      slug: newSlug,
      // Preserve existing image if update didn't supply one or supplied empty
      image: updates.image && updates.image.trim() ? updates.image.trim() : existing.image,
      gallery: Array.isArray(updates.gallery) && updates.gallery.length > 0 ? updates.gallery : existing.gallery,
      published: updates.published !== undefined ? Boolean(updates.published) : existing.published,
      updatedAt: new Date().toISOString()
    };

    const doc = await this.DestinationModel.findByIdAndUpdate(
      existing._id,
      { $set: updatePayload },
      { new: true }
    ).lean();

    return doc ? formatDoc<IDestination>(doc) : null;
  }

  public async deleteDestination(id: string): Promise<boolean> {
    await this.ensureConnection();
    const cleanId = (id || '').trim();
    if (!cleanId) return false;

    const query: any = {
      $or: [
        { id: cleanId },
        { slug: cleanId },
        { id: new RegExp(`^${cleanId}$`, 'i') },
        { slug: new RegExp(`^${cleanId}$`, 'i') }
      ]
    };
    if (mongoose.isValidObjectId(cleanId)) {
      query.$or.push({ _id: cleanId });
    }

    const res = await this.DestinationModel.deleteOne(query);
    return Boolean(res && res.deletedCount && res.deletedCount > 0);
  }
}

export const db = new DatabaseService();
