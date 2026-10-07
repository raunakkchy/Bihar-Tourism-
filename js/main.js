/**
 * Bihar Tourism — Explore. Experience. Remember.
 * Core Vanilla JavaScript Application
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollHeader();
  initScrollReveal();
  initDestinationFilters();
  initDestinationModal();
  initItineraryTabs();
  initFaqAccordion();
  initTripPlannerForm();
});

/* ==========================================================================
   1. Shared Navigation & Mobile Drawer
   ========================================================================== */
function initNavigation() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.mobile-nav-backdrop');
  const closeBtn = document.querySelector('.mobile-drawer-close');

  if (!hamburgerBtn || !drawer || !backdrop) return;

  function openMenu() {
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    drawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', () => {
    const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  backdrop.addEventListener('click', closeMenu);

  // Close menu after selecting any page link
  const drawerLinks = drawer.querySelectorAll('a');
  drawerLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeMenu();
    }
  });

  // Highlight active link based on current page pathname
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/index.html';
  const pageName = currentPath.split('/').pop() || 'index.html';

  const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  allNavLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPage = href.split('/').pop();
    if (
      linkPage === pageName ||
      (pageName === '' && linkPage === 'index.html') ||
      (pageName === 'index.html' && (href === '/' || href === './' || href === 'index.html'))
    ) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ==========================================================================
   2. Sticky Header Elevation
   ========================================================================== */
function initScrollHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   3. Scroll Reveal Animations (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  if (!('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   4. Destination Filter Tabs (on destinations.html)
   ========================================================================== */
function initDestinationFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.dest-card[data-category]');

  if (!filterTabs.length || !cards.length) return;

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const targetCategory = tab.getAttribute('data-filter');

      cards.forEach((card) => {
        const categories = card.getAttribute('data-category').split(' ');
        if (targetCategory === 'all' || categories.includes(targetCategory)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. Rich Destination Modal (View Details)
   ========================================================================== */
const destinationData = {
  bodhgaya: {
    title: 'Bodh Gaya — Mahabodhi Temple',
    kicker: 'UNESCO World Heritage Site · Spiritual Heartland',
    desc: 'The holiest site in Buddhism, Bodh Gaya is where Prince Siddhartha Gautama sat in deep meditation under the sacred Bodhi Tree and attained Supreme Enlightenment (Buddhahood) in 528 BCE. The majestic 55-meter high Mahabodhi Temple stands with intricate stone carvings, surrounded by international monasteries from Japan, Thailand, Bhutan, Tibet, and Sri Lanka.',
    location: 'Gaya District, South Bihar',
    bestTime: 'October to March (Buddha Jayanti in May)',
    connectivity: 'Gaya International Airport (12 km), Gaya Jn Railway Station (16 km)',
    highlights: 'Sacred Bodhi Tree, Vajrasana (Diamond Throne), 80-Foot Great Buddha, Meditation Gardens',
    timings: '5:00 AM – 9:00 PM (Daily)',
  },
  nalanda: {
    title: 'Nalanda Mahavihara — Ancient University',
    kicker: 'UNESCO World Heritage Site · Seat of Global Wisdom',
    desc: 'Flourishing from the 5th to the 12th century CE, Nalanda was the ancient world’s greatest residential university, hosting over 10,000 scholars and 2,000 teachers from China, Korea, Japan, Tibet, and Persia. Its vast red-brick ruins encompass soaring votive stupas, sprawling lecture halls, dormitories, and the legendary Dharma Gunj multi-story library.',
    location: 'Nalanda District (90 km from Patna)',
    bestTime: 'October to March',
    connectivity: 'Rajgir Station (15 km), Patna Airport (85 km)',
    highlights: 'Temple No. 3, Excavated Monastic Cells, Archaeological Museum, Xuanzang Memorial Hall',
    timings: '9:00 AM – 5:00 PM (Open all days)',
  },
  rajgir: {
    title: 'Rajgir — Valley of Kings & Peace',
    kicker: 'Ancient Magadha Capital · Hilltop Sanctuary',
    desc: 'Cradled in a green valley bounded by seven sacred hills, Rajgir was the first imperial capital of the Magadha Empire. Here, Lord Buddha preached on Griddhakuta (Vulture’s Peak), and King Bimbisara embraced his teachings. Today, the gleaming white Vishwa Shanti Stupa crowns Ratnagiri hill, reached via an exhilarating aerial ropeway.',
    location: 'Nalanda District (100 km from Patna)',
    bestTime: 'October to March',
    connectivity: 'Rajgir Railway Station (Direct trains from Patna/Kolkata)',
    highlights: 'Vishwa Shanti Stupa, Aerial Chairlift Ropeway, Venu Vana Bamboo Grove, Brahmakund Hot Springs',
    timings: 'Vishwa Shanti Stupa: 9:00 AM – 5:30 PM',
  },
  patna: {
    title: 'Patna — The Historic Pataliputra',
    kicker: 'Imperial Capital of Maurya & Gupta Empires',
    desc: 'Situated along the sacred banks of the Ganges, Patna is one of the world’s oldest continuously inhabited cities. From the iconic beehive-shaped Golghar granary and the world-class Bihar Museum to Takht Sri Patna Sahib (birthplace of Guru Gobind Singh Ji) and the Mauryan pillared halls of Kumhrar, Patna bridges millennia of history.',
    location: 'Capital City, Central Bihar',
    bestTime: 'October to March',
    connectivity: 'Patna Jayprakash Narayan Airport (PAT), Patna Junction Railway Station',
    highlights: 'Bihar Museum, Golghar, Takht Sri Patna Sahib, Ganga Aarti at NIT Ghat, Kumhrar Ruins',
    timings: 'Museum: 10:30 AM – 5:00 PM (Closed Mondays)',
  },
  vaishali: {
    title: 'Vaishali — The World’s First Republic',
    kicker: 'Cradle of Democracy & Spiritual Crossroads',
    desc: 'Vaishali was the capital of the ancient Licchavi Republic, universally celebrated as the world’s first democratic republic with an elected assembly. It is the sacred birthplace of Lord Mahavira, the 24th Jain Tirthankara, and the site where Lord Buddha delivered his Last Sermon before Mahaparinirvana and admitted women into the Sangha.',
    location: 'Vaishali District (55 km north of Patna)',
    bestTime: 'October to March',
    connectivity: 'Hajipur Jn (35 km), Patna Airport (60 km via Digha Bridge)',
    highlights: 'Ashoka Lion Pillar, Buddha Relic Stupa, Kundalpur Jain Shrine, Abhishek Pushkarini Lake',
    timings: 'Sunrise to Sunset',
  },
  valmiki: {
    title: 'Valmiki Tiger Reserve — Wilderness of the Terai',
    kicker: 'Eco-Tourism & Himalayan Foothills Sanctuary',
    desc: 'Nestled in the lush West Champaran district along the Indo-Nepal border, Valmiki Tiger Reserve is Bihar’s crown eco-tourism jewel. Spanning over 898 sq km of moist Sal forests and the Gandak River basin, it provides sanctuary to royal Bengal tigers, Indian leopards, rhinos, Asian elephants, and over 250 bird species.',
    location: 'West Champaran District, North-West Bihar',
    bestTime: 'November to April',
    connectivity: 'Valmikinagar / Bagaha Railway Station (45 km)',
    highlights: 'Jungle Jeep Safaris, Gandak River Rafting & Boating, Triveni Sangam, Forest Canopy Eco-Lodges',
    timings: 'Morning Safari: 6:00 AM – 10:00 AM, Evening Safari: 2:30 PM – 5:30 PM',
  },
  sasaram: {
    title: 'Sasaram — Tomb of Sher Shah Suri',
    kicker: 'Indo-Islamic Architectural Marvel',
    desc: 'An architectural triumph rising dramatically from the center of an artificial lake, the mausoleum of Emperor Sher Shah Suri stands 122 feet high and is often called the "Second Taj Mahal of India". Built of red sandstone, its grand octagonal chamber is a testament to the visionary ruler who built the Grand Trunk Road and introduced the Rupiya.',
    location: 'Rohtas District, Southwest Bihar',
    bestTime: 'October to March',
    connectivity: 'Sasaram Junction (Direct trains on Grand Chord line)',
    highlights: 'Sher Shah Suri Water Mausoleum, Hasan Khan Suri Tomb, Rohtasgarh Hill Fort',
    timings: '6:00 AM – 6:00 PM',
  },
  vikramshila: {
    title: 'Vikramshila — Buddhist Seat of Tantric Wisdom',
    kicker: 'Ancient Monastic University of the Palas',
    desc: 'Founded by the Pala King Dharmapala in the late 8th century CE, Vikramshila stood alongside Nalanda as one of India’s foremost international universities. Spread over 100 acres in Antichak near the Ganges, it featured a colossal cruciform stupa, 52 monastic rooms, and produced world-renowned masters including Atisa Dipankara.',
    location: 'Bhagalpur District, East Bihar',
    bestTime: 'October to March',
    connectivity: 'Bhagalpur Railway Station (44 km), Kahalgaon Station (13 km)',
    highlights: 'Cruciform Stupa with Terracotta Plaques, Excavated Monastic Cells, On-site Museum',
    timings: '9:00 AM – 5:00 PM',
  },
  madhubani: {
    title: 'Madhubani & Mithila Cultural Realm',
    kicker: 'Living Heritage of Mithila Painting & Folk Craft',
    desc: 'Madhubani is the spiritual cradle of Mithila folk art, an ancient visual tradition practiced by women for millennia using natural pigments, bamboo twigs, and geometric motifs depicting nature, deities, and wedding ceremonies. Visitors can witness traditional artisans in Jitwarpur and Ranti villages, visit ancient temples, and savor fresh makhana.',
    location: 'Mithila Region, North Bihar',
    bestTime: 'October to March',
    connectivity: 'Madhubani Railway Station, Darbhanga Airport (35 km)',
    highlights: 'Artisan Villages (Jitwarpur, Ranti), Saurath Sabha, Uchaitha Temple, Mithila Art Galleries',
    timings: 'Village workshops: 9:00 AM – 6:00 PM',
  },
};

function initDestinationModal() {
  const modalBackdrop = document.querySelector('.modal-backdrop');
  if (!modalBackdrop) return;

  const closeBtn = modalBackdrop.querySelector('.modal-close-btn');
  const detailButtons = document.querySelectorAll('[data-destination-id]');

  function openDestinationModal(destKey) {
    const data = destinationData[destKey];
    if (!data) return;

    const kickerEl = modalBackdrop.querySelector('.modal-kicker');
    const titleEl = modalBackdrop.querySelector('.modal-title');
    const descEl = modalBackdrop.querySelector('.modal-desc');
    const locEl = modalBackdrop.querySelector('#modal-location');
    const bestEl = modalBackdrop.querySelector('#modal-best-time');
    const connectEl = modalBackdrop.querySelector('#modal-connectivity');
    const highEl = modalBackdrop.querySelector('#modal-highlights');

    if (kickerEl) kickerEl.textContent = data.kicker;
    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;
    if (locEl) locEl.textContent = data.location;
    if (bestEl) bestEl.textContent = data.bestTime;
    if (connectEl) connectEl.textContent = data.connectivity;
    if (highEl) highEl.textContent = data.highlights;

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  detailButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const destId = btn.getAttribute('data-destination-id');
      openDestinationModal(destId);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });

  // Check URL hash for direct opening (e.g. destinations.html#bodhgaya)
  const hash = window.location.hash.replace('#', '').toLowerCase();
  if (hash && destinationData[hash]) {
    setTimeout(() => openDestinationModal(hash), 150);
  }
}

/* ==========================================================================
   6. Itinerary Tabs on experiences.html
   ========================================================================== */
const itineraryPlans = {
  day3: [
    {
      day: '01',
      title: 'Arrival in Patna — Mauryan Heritage & River Ganga',
      desc: 'Arrive at Patna Airport/Station. Visit the grand Bihar Museum showcasing ancient Yakshi statues and Buddhist art. Tour Golghar and conclude your evening watching the sacred Ganga Aarti at NIT Ghat.',
    },
    {
      day: '02',
      title: 'Nalanda & Rajgir Excursion',
      desc: 'Drive to Nalanda (2 hrs) to explore the ancient university ruins and Xuanzang Memorial. Continue to Rajgir, ride the aerial chairlift ropeway to Vishwa Shanti Stupa, and visit Venu Vana.',
    },
    {
      day: '03',
      title: 'Bodh Gaya — The Cradle of Enlightenment',
      desc: 'Proceed to Bodh Gaya. Meditate under the sacred Bodhi Tree at Mahabodhi Temple, gaze at the 80-Foot Great Buddha, and explore Thai and Japanese monasteries before departure from Gaya Station/Airport.',
    },
  ],
  day5: [
    {
      day: '01',
      title: 'Patna — Imperial Capital Heritage',
      desc: 'Explore Takht Sri Patna Sahib, Kumhrar ruins of Mauryan Pataliputra, and the Bihar Museum. Taste authentic Champaran Ahuna Handi or Litti Chokha.',
    },
    {
      day: '02',
      title: 'Vaishali — World’s First Republic',
      desc: 'Cross the Ganges to Vaishali. Discover the Ashoka Lion Pillar, Buddha Relic Stupa, and Kundalpur (birthplace of Lord Mahavira). Return to Patna.',
    },
    {
      day: '03',
      title: 'Nalanda Mahavihara & Pawapuri',
      desc: 'Travel to Nalanda University ruins. Later visit Pawapuri’s serene Jal Mandir (Water Temple) standing in a lotus pond, the nirvana site of Lord Mahavira.',
    },
    {
      day: '04',
      title: 'Rajgir Hilltop Sanctuaries & Hot Springs',
      desc: 'Ascend Ratnagiri hill to the World Peace Pagoda. Visit Griddhakuta (Vulture’s Peak), Bimbisara Jail ruins, and relax at the Brahmakund natural springs.',
    },
    {
      day: '05',
      title: 'Bodh Gaya — Mahabodhi & Monastic Trails',
      desc: 'Full day in Bodh Gaya. Experience dawn meditation at Mahabodhi Temple, discover the international monastery circuit, and shop for local stone craft souvenirs.',
    },
  ],
  day7: [
    {
      day: '01',
      title: 'Patna to Vaishali — Historical Odyssey',
      desc: 'Arrive in Patna, explore Bihar Museum and Golghar. Afternoon trip to Vaishali Ashoka Pillar and Abhishek Pushkarini lake. Overnight in Patna.',
    },
    {
      day: '02',
      title: 'Patna to Nalanda & Rajgir',
      desc: 'Morning departure to Nalanda University ruins and Archaeological Museum. Check into hotel in Rajgir; evening visit to Venu Vana.',
    },
    {
      day: '03',
      title: 'Rajgir Peace Pagoda & Ghora Katora Lake',
      desc: 'Ropeway ride to Vishwa Shanti Stupa. Take an eco-friendly horse cart ride to pristine Ghora Katora lake surrounded by hills.',
    },
    {
      day: '04',
      title: 'Rajgir to Bodh Gaya via Dungeshwari Caves',
      desc: 'Drive to Bodh Gaya with an en-route stop at Dungeshwari (Pragbodhi) Cave Temples where Buddha meditated prior to enlightenment. Evening prayer at Bodhi Tree.',
    },
    {
      day: '05',
      title: 'Bodh Gaya & Gaya Spiritual Heritage',
      desc: 'Visit international monasteries (Bhutan, Tibet, Japan, Sri Lanka). Afternoon visit to Vishnupad Temple in Gaya along the Phalgu river.',
    },
    {
      day: '06',
      title: 'Sasaram — Grand Tomb of Sher Shah Suri',
      desc: 'Day trip to Sasaram to behold the spectacular water mausoleum of Emperor Sher Shah Suri and the fortress of Rohtasgarh.',
    },
    {
      day: '07',
      title: 'Bodh Gaya Departure',
      desc: 'Morning peaceful walk through the meditation gardens. Transfer to Gaya International Airport for return journey.',
    },
  ],
};

function initItineraryTabs() {
  const tabButtons = document.querySelectorAll('.itinerary-tab-btn');
  const listContainer = document.querySelector('.itinerary-day-list');

  if (!tabButtons.length || !listContainer) return;

  function renderItinerary(planKey) {
    const days = itineraryPlans[planKey] || itineraryPlans.day3;
    listContainer.innerHTML = days
      .map(
        (item) => `
        <div class="itinerary-day-item">
          <div class="itinerary-day-num">${item.day}</div>
          <div class="itinerary-day-content">
            <h4>${item.title}</h4>
            <p>${item.desc}</p>
          </div>
        </div>
      `
      )
      .join('');
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const plan = btn.getAttribute('data-plan');
      renderItinerary(plan);
    });
  });

  // Initial render
  renderItinerary('day3');
}

/* ==========================================================================
   7. FAQ Accordion (on contact.html)
   ========================================================================== */
function initFaqAccordion() {
  const toggles = document.querySelectorAll('.faq-toggle');
  if (!toggles.length) return;

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const parent = toggle.closest('.faq-item');
      const body = parent.querySelector('.faq-body');
      const isOpen = parent.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach((item) => {
        item.classList.remove('open');
        const b = item.querySelector('.faq-body');
        if (b) b.style.maxHeight = null;
      });

      // Toggle current
      if (!isOpen) {
        parent.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   8. Plan a Trip / Contact Form Validation & Feedback
   ========================================================================== */
function initTripPlannerForm() {
  const form = document.querySelector('#bihar-enquiry-form') || document.querySelector('#trip-planner-form');
  const confirmationCard = document.querySelector('#contact-confirmation-card');
  const sendAnotherBtn = document.querySelector('#send-another-btn');

  if (!form) return;

  // Pre-fill interest if passed in URL query param (e.g. ?interest=Spiritual or ?destination=Bodh Gaya)
  const urlParams = new URLSearchParams(window.location.search);
  const paramInterest = urlParams.get('interest');
  const paramDest = urlParams.get('preferredDestination') || urlParams.get('destination');
  
  const interestSelect = form.querySelector('[name="interest"]');
  if (interestSelect) {
    if (paramInterest) {
      for (let i = 0; i < interestSelect.options.length; i++) {
        if (interestSelect.options[i].value.toLowerCase() === paramInterest.toLowerCase() ||
            interestSelect.options[i].text.toLowerCase().includes(paramInterest.toLowerCase())) {
          interestSelect.selectedIndex = i;
          break;
        }
      }
    } else if (paramDest) {
      // Map destination to interest
      const lowerDest = paramDest.toLowerCase();
      if (lowerDest.includes('bodh') || lowerDest.includes('vaishali')) {
        interestSelect.value = 'Spiritual';
      } else if (lowerDest.includes('nalanda') || lowerDest.includes('patna') || lowerDest.includes('sasaram')) {
        interestSelect.value = 'Heritage';
      } else if (lowerDest.includes('valmiki')) {
        interestSelect.value = 'Nature';
      }
    }
  }

  function setError(inputEl, errorId, message) {
    inputEl.classList.add('input-invalid');
    const errEl = document.getElementById(errorId);
    if (errEl) {
      errEl.textContent = message;
      errEl.style.display = 'block';
    }
  }

  function clearError(inputEl, errorId) {
    inputEl.classList.remove('input-invalid');
    const errEl = document.getElementById(errorId);
    if (errEl) {
      errEl.textContent = '';
      errEl.style.display = 'none';
    }
  }

  // Clear errors on input
  const nameInput = form.querySelector('[name="name"]') || form.querySelector('[name="fullName"]');
  const emailInput = form.querySelector('[name="email"]');
  const whatsappInput = form.querySelector('[name="whatsapp"]') || form.querySelector('[name="phone"]');
  const messageInput = form.querySelector('[name="message"]') || form.querySelector('[name="specialNotes"]');
  const travelDatesInput = form.querySelector('[name="travelDates"]');
  const travelersInput = form.querySelector('[name="travelers"]');
  const serverErrorBox = document.getElementById('form-server-error');

  if (nameInput) nameInput.addEventListener('input', () => clearError(nameInput, 'error-name'));
  if (emailInput) emailInput.addEventListener('input', () => clearError(emailInput, 'error-email'));
  if (whatsappInput) whatsappInput.addEventListener('input', () => clearError(whatsappInput, 'error-whatsapp'));
  if (interestSelect) interestSelect.addEventListener('change', () => clearError(interestSelect, 'error-interest'));
  if (messageInput) messageInput.addEventListener('input', () => clearError(messageInput, 'error-message'));

  // Indian Phone Validation Helper
  function isValidIndianPhone(phoneStr) {
    if (!phoneStr) return false;
    let cleaned = phoneStr.trim().replace(/[\s\-\(\)]/g, '');
    if (cleaned.startsWith('+')) cleaned = cleaned.substring(1);
    if (cleaned.startsWith('0') && cleaned.length === 11) cleaned = cleaned.substring(1);
    if (cleaned.startsWith('91') && cleaned.length === 12) cleaned = cleaned.substring(2);
    return /^[6-9]\d{9}$/.test(cleaned);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (serverErrorBox) {
      serverErrorBox.style.display = 'none';
      serverErrorBox.textContent = '';
    }

    let hasErrors = false;

    // 1. Validate Name
    const nameVal = nameInput ? nameInput.value.trim() : '';
    if (!nameVal || nameVal.length < 2) {
      setError(nameInput, 'error-name', 'Please enter your full name (at least 2 characters).');
      hasErrors = true;
    } else {
      clearError(nameInput, 'error-name');
    }

    // 2. Validate Email
    const emailVal = emailInput ? emailInput.value.trim() : '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal) {
      setError(emailInput, 'error-email', 'Please enter your email address.');
      hasErrors = true;
    } else if (!emailRegex.test(emailVal)) {
      setError(emailInput, 'error-email', 'Please provide a valid email format (e.g. name@example.com).');
      hasErrors = true;
    } else {
      clearError(emailInput, 'error-email');
    }

    // 3. Validate WhatsApp Number
    const whatsappVal = whatsappInput ? whatsappInput.value.trim() : '';
    if (!whatsappVal) {
      setError(whatsappInput, 'error-whatsapp', 'Please enter your WhatsApp contact number.');
      hasErrors = true;
    } else if (!isValidIndianPhone(whatsappVal)) {
      setError(whatsappInput, 'error-whatsapp', 'Please enter a valid 10-digit Indian WhatsApp mobile number (e.g. 9876543210).');
      hasErrors = true;
    } else {
      clearError(whatsappInput, 'error-whatsapp');
    }

    // 4. Validate Interest
    const interestVal = interestSelect ? interestSelect.value : '';
    if (!interestVal) {
      setError(interestSelect, 'error-interest', 'Please select an area of interest.');
      hasErrors = true;
    } else {
      clearError(interestSelect, 'error-interest');
    }

    // 5. Validate Message
    const messageVal = messageInput ? messageInput.value.trim() : '';
    if (!messageVal) {
      setError(messageInput, 'error-message', 'Please write your message or travel inquiry.');
      hasErrors = true;
    } else if (messageVal.length < 5) {
      setError(messageInput, 'error-message', 'Message must be at least 5 characters long.');
      hasErrors = true;
    } else {
      clearError(messageInput, 'error-message');
    }

    if (hasErrors) {
      return;
    }

    const submitBtn = document.getElementById('submit-enquiry-btn') || form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting Enquiry to Tourism Desk...';
    }

    const payload = {
      name: nameVal,
      email: emailVal,
      whatsapp: whatsappVal,
      interest: interestVal,
      message: messageVal,
      travelDates: travelDatesInput ? travelDatesInput.value.trim() : '',
      travelers: travelersInput ? travelersInput.value.trim() : ''
    };

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        if (serverErrorBox) {
          serverErrorBox.textContent = result.error || 'Failed to submit enquiry. Please check your information and try again.';
          serverErrorBox.style.display = 'block';
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Enquiry →';
        }
        return;
      }

      // Hide form and show confirmation card
      form.style.display = 'none';

      if (confirmationCard) {
        // Populate summary
        const refIdEl = document.getElementById('confirm-ref-id');
        const confirmName = document.getElementById('confirm-name');
        const confirmEmail = document.getElementById('confirm-email');
        const confirmWhatsApp = document.getElementById('confirm-whatsapp');
        const confirmInterest = document.getElementById('confirm-interest');
        const confirmMsg = document.getElementById('confirm-message');
        const confirmWaBtn = document.getElementById('confirm-whatsapp-btn');

        if (refIdEl && result.enquiry) refIdEl.textContent = `#${result.enquiry.id}`;
        if (confirmName) confirmName.textContent = nameVal;
        if (confirmEmail) confirmEmail.textContent = emailVal;
        if (confirmWhatsApp && result.enquiry) confirmWhatsApp.textContent = result.enquiry.whatsapp;
        if (confirmInterest) confirmInterest.textContent = interestVal;
        if (confirmMsg) confirmMsg.textContent = messageVal;

        if (confirmWaBtn && result.whatsappUrl) {
          confirmWaBtn.href = result.whatsappUrl;
        }

        confirmationCard.style.display = 'block';
        confirmationCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Enquiry →';
      }
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      if (serverErrorBox) {
        serverErrorBox.textContent = 'Network or connection error. Please try again or reach our WhatsApp helpline.';
        serverErrorBox.style.display = 'block';
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Enquiry →';
      }
    }
  });

  if (sendAnotherBtn) {
    sendAnotherBtn.addEventListener('click', () => {
      if (confirmationCard) confirmationCard.style.display = 'none';
      form.style.display = 'block';
      if (nameInput) nameInput.focus();
    });
  }
}
