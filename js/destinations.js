/**
 * Bihar Tourism — Destinations Engine & Data Catalog
 * Multi-Page vanilla JavaScript logic for destinations.html and destination.html
 */

// 1. Comprehensive Destination Data Catalog
const destinationsData = [
  {
    id: 'bodh-gaya',
    aliases: ['bodhgaya', 'bodh_gaya'],
    name: 'Bodh Gaya',
    category: 'Spiritual',
    categories: ['Spiritual'],
    shortDescription: 'The supreme spiritual cradle where Prince Siddhartha attained Enlightenment beneath the sacred Bodhi Tree in 528 BCE. Home to the UNESCO World Heritage Mahabodhi Temple and multinational Buddhist monasteries.',
    image: '/uploads/bodhgaya-gallery.jpg',
    gallery: [
      '/uploads/bodhgaya-gallery.jpg',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      '/assets/bodhgaya.svg'
    ],
    location: 'Gaya District, South Bihar (115 km south of Patna)',
    overview: 'Bodh Gaya is globally venerated as the holiest of the four primary Buddhist pilgrimage sites. Here, on the serene banks of the Phalgu River (ancient Neranjara), Prince Siddhartha Gautama sat in deep meditative contemplation under a pipal tree and attained Buddhahood. Today, Bodh Gaya is an international sanctuary of peaceful meditation, drawing monks, scholars, and spiritual seekers from Japan, Thailand, Sri Lanka, Bhutan, Tibet, and across the globe.',
    historicalSignificance: 'Emperor Ashoka visited Bodh Gaya around 260 BCE, approximately 250 years after the Buddha attained Enlightenment. He erected the original temple and the revered Diamond Throne (Vajrasana) marking the exact spot where the Buddha sat. In the 5th–6th century CE during the Gupta Dynasty, the present majestic 55-meter high sandstone Mahabodhi Temple spire was constructed, standing as one of the earliest brick temples surviving in eastern India.',
    mainAttractions: [
      {
        title: 'Mahabodhi Temple Complex',
        desc: 'A soaring 55-meter (180 ft) pyramidal shikhara adorned with intricate plaster niches, votive stupas, and ancient carved stone railings dating back to the Sunga and Gupta periods.'
      },
      {
        title: 'The Sacred Bodhi Tree',
        desc: 'Direct descendant of the original Sri Maha Bodhi tree beneath which the Buddha attained supreme Enlightenment. Monks and devotees sit in silent meditation under its sheltering boughs.'
      },
      {
        title: 'Vajrasana (Diamond Throne)',
        desc: 'Carved polished sandstone slab positioned between the Bodhi tree and temple, marking the unshakeable seat of enlightenment.'
      },
      {
        title: 'The 80-Foot Great Buddha Statue',
        desc: 'Colossal seated stone statue of Lord Buddha unveiled by the 14th Dalai Lama in 1989, surrounded by ten primary disciples in peaceful contemplation.'
      },
      {
        title: 'International Monasteries',
        desc: 'Exquisite architectural pavilions built by Buddhist nations including the Royal Thai Monastery, Japanese Indosan Nipponji, Bhutanese Temple, and Tibetan Karma Temple.'
      }
    ],
    whyVisit: [
      {
        title: 'Soul-Stirring Serenity',
        desc: 'Experience the profound peace of morning chanting and twilight butter lamp prayers around the Mahabodhi lotus pond.'
      },
      {
        title: 'Living UNESCO Heritage',
        desc: 'Walk among archaeological masterpieces where 2,500 years of global devotion are etched into every brick and stone.'
      },
      {
        title: 'Global Cultural Tapestry',
        desc: 'Witness architectural styles, meditation practices, and monastic traditions from across Asia in one sacred town.'
      }
    ],
    bestTime: 'October to March is ideal with pleasant temperatures (12°C–25°C). Buddha Jayanti (April/May) and the Kalachakra festival offer grand international ceremonies.',
    travelInfo: {
      airport: 'Gaya International Airport (GAY) is 12 km away, connecting seasonal international charters and domestic flights. Patna Airport (PAT) is 115 km away.',
      railway: 'Gaya Junction (16 km) is a major Indian Railways junction on the Grand Chord line, connected by Rajdhani and Vande Bharat expresses.',
      road: 'Well-connected via NH 22 and the 4-lane Patna–Gaya Expressway (approx. 2.5 hours by cab or state tourist coach).',
      timings: 'Mahabodhi Temple: Open daily from 5:00 AM to 9:00 PM. Electronic devices must be deposited at secure lockers at the gate.'
    }
  },
  {
    id: 'nalanda',
    aliases: ['nalanda-mahavihara', 'nalandamahavihara'],
    name: 'Nalanda',
    category: 'History',
    categories: ['History'],
    shortDescription: 'The ancient world’s legendary residential university that flourished for 700 years. Spanning vast red brick ruins, monumental votive stupas, lecture halls, and dormitories for over 10,000 scholars.',
    image: '/assets/nalanda.svg',
    location: 'Nalanda District, Central Bihar (90 km southeast of Patna, 15 km from Rajgir)',
    overview: 'Nalanda Mahavihara was the ancient world’s foremost international university, flourishing uninterruptedly from the 5th to the 12th century CE under the patronage of Gupta kings and Emperor Harsha. Here, 10,000 scholars and 2,000 revered acharyas studied Buddhist philosophy, astronomy, medicine, logic, grammar, and metaphysics. Students traveled from China, Korea, Japan, Tibet, Mongolia, Sri Lanka, and Persia, undergoing rigorous oral entrance examinations to gain admittance.',
    historicalSignificance: 'Described in vivid detail by the 7th-century Chinese traveler Xuanzang (Hiuen Tsang), who lived and studied here for five years, Nalanda housed the legendary multi-story library complex called Dharmaganj (comprising Ratnasagara, Ratnodadhi, and Ratnaranjaka). Nalanda represents the pinnacle of ancient Indian pedagogical and residential monastic architecture, inscribed as a UNESCO World Heritage Site in 2016.',
    mainAttractions: [
      {
        title: 'Temple No. 3 (Great Votive Stupa)',
        desc: 'Monumental stepped stupa towering over the monastic complex, featuring seven distinct tiers of reconstruction and fine 5th-century Gupta stucco sculptures in sculpted niches.'
      },
      {
        title: 'Excavated Monasteries (Monastery 1 to 11)',
        desc: 'Remarkably preserved monastic residential quarters featuring central lecture courtyards, stone beds, meditation niches, individual monk rooms, and ancient wells.'
      },
      {
        title: 'Nalanda Archaeological Museum',
        desc: 'Treasury of ancient bronze, stone, and terracotta antiquities excavated from Nalanda and Rajgir, including rare Pala bronze statues, seals, and inscriptions.'
      },
      {
        title: 'Xuanzang Memorial Hall',
        desc: 'A grand Sino-Indian peace pagoda and memorial hall built in honor of the revered Chinese monk, housing relics and historical murals of his 16-year journey.'
      }
    ],
    whyVisit: [
      {
        title: 'The World’s First Global University',
        desc: 'Stand where humanity’s earliest international residential campus championed reason, science, and free debate centuries before Oxford or Bologna.'
      },
      {
        title: 'Architectural Genius',
        desc: 'Observe the sophisticated drainage systems, acoustic courtyard angles, and weathered red terracotta bricks that survived nine centuries.'
      },
      {
        title: 'Inspiring Scholarship Legacy',
        desc: 'Feel the intellectual aura where foundational masters Nagarjuna, Aryabhata, Dharmakirti, and Shantarakshita composed world-changing treatises.'
      }
    ],
    bestTime: 'October to March offers cool, pleasant weather for walking across the extensive open-air archaeological excavations.',
    travelInfo: {
      airport: 'Jayprakash Narayan Airport, Patna (PAT) is 85 km away (approx. 2 hours via Bakhtiyarpur 4-lane highway).',
      railway: 'Rajgir Railway Station (15 km) and Bakhtiyarpur Junction (45 km) offer seamless connections to major Indian cities.',
      road: 'Excellent road connectivity on SH 78 connecting Rajgir, Bodh Gaya, and Patna. Daily BSTDC tourist coaches available.',
      timings: 'Archaeological Ruins: 9:00 AM to 5:00 PM (Daily). Museum: 9:00 AM to 5:00 PM (Closed on Fridays).'
    }
  },
  {
    id: 'rajgir',
    aliases: ['rajagriha'],
    name: 'Rajgir',
    category: 'History / Spiritual',
    categories: ['History', 'Spiritual'],
    shortDescription: 'Ancient capital of the Magadha Empire cradled by seven sacred hills. Features the white dome of Vishwa Shanti Stupa, aerial chairlift ropeway, Griddhakuta Peak, Venu Vana, and natural hot springs.',
    image: '/assets/rajgir.svg',
    location: 'Nalanda District, Central Bihar (100 km from Patna, 15 km from Nalanda)',
    overview: 'Rajgir (ancient Rajagriha — "Abode of Kings") was the first imperial capital of the mighty Magadhan kingdom during the reigns of Kings Bimbisara and Ajatashatru. Surrounded by a natural fortress of seven green hills (Ratnagiri, Vipulagiri, Vaibhargiri, Songiri, Udayagiri, Chhathagiri, and Sailagiri), Rajgir was the beloved winter retreat of Gautama Buddha, who delivered seminal sermons here. It is equally sacred to Jainism as the site where Lord Mahavira spent fourteen monsoons.',
    historicalSignificance: 'At Griddhakuta (Vulture’s Peak), Lord Buddha set in motion the Second Wheel of Dharma, preaching the Heart Sutra and the Lotus Sutra. Shortly after Buddha’s Mahaparinirvana in 483 BCE, the historic First Buddhist Council was convened in the Saptaparni Cave on Vaibhargiri hill under the patronage of King Ajatashatru to recite and preserve the Buddha’s teachings.',
    mainAttractions: [
      {
        title: 'Vishwa Shanti Stupa (World Peace Pagoda)',
        desc: 'A dazzling white marble stupa crowning Ratnagiri hill at an altitude of 1,000 feet, featuring four golden Buddha statues depicting birth, enlightenment, teaching, and passing.'
      },
      {
        title: 'Aerial Chairlift Ropeway',
        desc: 'India’s earliest scenic single-seater ropeway climbing exhilaratingly up the steep forested slopes of Ratnagiri hill to the Peace Pagoda.'
      },
      {
        title: 'Griddhakuta (Vulture’s Peak)',
        desc: 'The historic rock outcrop where the Buddha meditated and delivered iconic Mahayana discourses, offering panoramic valley views.'
      },
      {
        title: 'Venu Vana (Bamboo Grove)',
        desc: 'The tranquil botanical bamboo sanctuary gifted to Lord Buddha by King Bimbisara as the first monastic residence.'
      },
      {
        title: 'Brahmakund Natural Sulphur Hot Springs',
        desc: 'Sacred thermal mineral springs at the foot of Vaibhargiri hill, renowned for their therapeutic healing properties.'
      },
      {
        title: 'Cyclopean Wall & Bimbisara Jail',
        desc: 'Ancient 40-kilometer stone masonry wall built with massive unhewn stones dating back to the 6th century BCE, alongside ruins of the prison where Bimbisara meditated on Griddhakuta.'
      }
    ],
    whyVisit: [
      {
        title: 'Unique Hilltop Majesty',
        desc: 'Spectacular panoramas of dense forests and rolling hill ranges viewed from the summit of Vishwa Shanti Stupa.'
      },
      {
        title: 'Dual Historical & Spiritual Pulse',
        desc: 'A living crossroads where Buddhist history, Jain Tirthankaras, ancient royal fortifications, and therapeutic springs intertwine.'
      },
      {
        title: 'Eco-Tourism Adventures',
        desc: 'Trek along scenic ridge trails, explore Ghora Katora Lake via eco-friendly tongas, and visit the modern Rajgir Glass Skywalk.'
      }
    ],
    bestTime: 'October to March. The annual Rajgir Mahotsav in winter brings mesmerizing classical dance and music performances to the hill valley.',
    travelInfo: {
      airport: 'Patna Airport (100 km) and Gaya Airport (78 km).',
      railway: 'Rajgir Railway Station connects directly to Patna Junction, Kolkata, and New Delhi with express and passenger trains.',
      road: 'Scenic 4-lane highway from Patna (approx. 2.5 hours). Local battery rickshaws and horse carriages (tongas) operate between sites.',
      timings: 'Vishwa Shanti Stupa: 9:00 AM to 5:30 PM. Ropeway: 9:00 AM to 5:00 PM (Closed 1:00 PM to 2:00 PM lunch).'
    }
  },
  {
    id: 'patna',
    aliases: ['pataliputra'],
    name: 'Patna',
    category: 'History',
    categories: ['History'],
    shortDescription: 'The legendary Pataliputra, seat of the Mauryan and Gupta empires along the holy Ganges. Features the beehive Golghar, world-class Bihar Museum, Takht Sri Patna Sahib, and Kumhrar ruins.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
      '/assets/patna.svg'
    ],
    location: 'Central Bihar along the southern bank of the River Ganges',
    overview: 'Patna, known in antiquity as Pataliputra, is one of the oldest continuously inhabited cities on earth, founded in 490 BCE by King Ajatashatru. As the imperial capital of Emperor Chandragupta Maurya and Emperor Ashoka the Great, it was described by Greek ambassador Megasthenes as a fortified metropolis surrounded by 570 towers and 64 gates. Today, modern Patna bridges three millennia of culture, academic treasures, river spirituality, and vibrant culinary arts.',
    historicalSignificance: 'Pataliputra was the cradle from which Emperor Ashoka ruled an empire that stretched across South Asia and disseminated the ideals of dhamma and non-violence. It was the birthplace of Guru Gobind Singh Ji (1666 CE), the tenth Sikh Guru who founded the Khalsa. Scholars like Chanakya composed the <em>Arthashastra</em>, and astronomer Aryabhata pioneered Indian trigonometry and the heliocentric theory here.',
    mainAttractions: [
      {
        title: 'Bihar Museum',
        desc: 'A world-class architectural masterpiece designed by Maki and Associates (Japan), exhibiting over 2,000 masterworks including the Didarganj Yakshi (3rd century BCE) and Mauryan royal seals.'
      },
      {
        title: 'Golghar Granary',
        desc: 'An iconic 29-meter high beehive-shaped granary erected in 1786 by Captain John Garstin, featuring twin external spiral staircases offering commanding views of the Ganges.'
      },
      {
        title: 'Takht Sri Patna Sahib',
        desc: 'One of the five Takhts of Sikhism, marking the holy birthplace of Guru Gobind Singh Ji along the old city ghats, renowned for its golden sanctum and 24x7 langar.'
      },
      {
        title: 'Kumhrar Mauryan Excavations',
        desc: 'Archaeological park containing the excavated remains of the 80-pillared assembly hall of the Mauryan Empire and ancient Buddhist monastery Anand Vihar.'
      },
      {
        title: 'Ganga Aarti at NIT Ghat',
        desc: 'Every weekend evening, Vedic priests perform a grand choral Aarti with brass tiered lamps reflecting across the holy river Ganges.'
      }
    ],
    whyVisit: [
      {
        title: 'A Continuum of Civilizations',
        desc: 'Trace the unbroken story of India from Mauryan stone columns and medieval Sultanate monuments to British colonial landmarks.'
      },
      {
        title: 'World-Class Museum Experience',
        desc: 'The Bihar Museum ranks among the finest cultural museums in Asia, with curated interactive experiential galleries for all ages.'
      },
      {
        title: 'Epicurean Delights',
        desc: 'Sample traditional Bihari gastronomy: freshly baked Litti Chokha with ghee, succulent Champaran handi meat, and sweet Anarsa.'
      }
    ],
    bestTime: 'October to March offers cool weather and coincides with Diwali, Chhath Puja, and Prakash Parv celebrations.',
    travelInfo: {
      airport: 'Jayprakash Narayan Airport (PAT) is located inside the city, connecting major Indian metros with frequent daily flights.',
      railway: 'Patna Junction (PNBE), Rajendra Nagar Terminal, and Patliputra Junction are major railway centers.',
      road: 'Extensive multi-lane highways connect to Bodh Gaya, Nalanda, Rajgir, Vaishali, and Varanasi. Metro system currently under development.',
      timings: 'Bihar Museum: 10:30 AM to 5:00 PM (Closed Mondays). Golghar: Sunrise to Sunset.'
    }
  },
  {
    id: 'vaishali',
    aliases: ['vaishali-republic'],
    name: 'Vaishali',
    category: 'History / Spiritual',
    categories: ['History', 'Spiritual'],
    shortDescription: 'The world’s first democratic republic where the Licchavis governed with an elected assembly. Birthplace of Lord Mahavira and location of Emperor Ashoka’s intact monolithic Lion Pillar and Relic Stupa.',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80',
      '/assets/vaishali.svg'
    ],
    location: 'Vaishali District, North Bihar (55 km north of Patna via Digha Bridge)',
    overview: 'Vaishali holds an immortal place in world history as the capital of the ancient Licchavi Republic (Vajjian Confederacy), recognized as the earliest known democratic republic in human history with an elected senate. It is deeply sacred to both Jains and Buddhists: Lord Mahavira, the 24th Tirthankara, was born at Kundalpur in Vaishali in 599 BCE; and Lord Buddha preached his Last Sermon here, officially inaugurating the Bhikkhuni Sangha (female monastic order).',
    historicalSignificance: 'Following the Buddha’s Mahaparinirvana, the Licchavis erected an earthen stupa over one-eighth of his sacred ashes, discovered by archaeologists in 1958. Emperor Ashoka erected one of his finest polished sandstone pillars here, uniquely crowned with a single seated lion facing north along the Buddha’s final pilgrimage path to Kushinagar.',
    mainAttractions: [
      {
        title: 'Ashokan Lion Pillar at Kolhua',
        desc: 'A 11-meter tall monolithic pillar of highly polished Chunar sandstone crowned by a magnificent seated lion capital, preserved in complete perfection beside a sacred brick stupa.'
      },
      {
        title: 'Buddha Relic Stupa',
        desc: 'The ancient 5th century BCE mud-brick stupa excavated in 1958 containing the stone casket with the corporeal ash relics of Lord Buddha.'
      },
      {
        title: 'Abhishek Pushkarini (Coronation Tank)',
        desc: 'The sacred rectangular tank whose consecrated waters were used to anoint the 7,707 elected representatives of the ancient Licchavi republic.'
      },
      {
        title: 'Kundalpur (Mahavira Birthplace)',
        desc: 'A serene Jain shrine with a white marble temple marking the revered birthplace of Lord Mahavira, featuring an international research institute.'
      },
      {
        title: 'Vishwa Shanti Stupa, Vaishali',
        desc: 'A majestic white peace pagoda built by the Nipponzan Myohoji community on the tranquil banks of Abhishek Pushkarini.'
      }
    ],
    whyVisit: [
      {
        title: 'The Birthplace of Democracy',
        desc: 'Stand on the exact soil where collective decision-making and republican self-governance were practiced 2,600 years ago.'
      },
      {
        title: 'Complete Ashokan Pillar',
        desc: 'Behold one of the very few intact Ashokan pillars in the world, still crowned by its original lion capital.'
      },
      {
        title: 'Twin Spiritual Heritage',
        desc: 'Experience the shared reverence of Jain ahimsa and Buddhist compassion in an idyllic countryside atmosphere.'
      }
    ],
    bestTime: 'October to March offers pleasant rural walking weather. Mahavira Jayanti in March/April draws thousands of Jain pilgrims.',
    travelInfo: {
      airport: 'Patna Airport (PAT) is 60 km away via the JP Ganga Setu and Digha Bridge (approx. 1.5 hours drive).',
      railway: 'Hajipur Junction (35 km) and Muzaffarpur Junction (36 km) are the closest major railway stations.',
      road: 'Connected via NH 722 and SH 74. Day excursions from Patna are widely available with cabs and tourist buses.',
      timings: 'Archaeological sites: Sunrise to Sunset (Daily). Archaeological Museum: 9:00 AM to 5:00 PM (Closed Fridays).'
    }
  },
  {
    id: 'valmiki-tiger-reserve',
    aliases: ['valmiki', 'valmikitigerreserve'],
    name: 'Valmiki Tiger Reserve',
    category: 'Nature',
    categories: ['Nature'],
    shortDescription: 'Bihar’s crowning eco-tourism wilderness spanning 898 sq km of dense Sal forest along the Gandak River at the Himalayan foothills. Safe haven for Bengal tigers, leopards, rhinos, and elephants.',
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80',
      '/assets/valmiki.svg'
    ],
    location: 'West Champaran District, North-West Bihar (along the Indo-Nepal international border)',
    overview: 'Nestled against the dramatic backdrop of the Shiwalik Himalayan foothills, Valmiki Tiger Reserve (VTR) is the only national park and tiger reserve in Bihar. Spanning 898 square kilometers of moist deciduous Sal forests, cane brakes, and sprawling wetlands along the Narayani (Gandak) River, Valmiki forms an unbroken transboundary wildlife corridor with Nepal’s Chitwan National Park. It is celebrated for its thriving royal Bengal tiger population, wilderness jeep safaris, and pristine river ecology.',
    historicalSignificance: 'According to the ancient epic Ramayana, the hermitage of Maharshi Valmiki (Valmiki Ashram) where Devi Sita gave birth to Lava and Kusha was located here near the confluence of the Sonaha and Gandak rivers. Emperor Ashoka passed through this region on his imperial pilgrimage, leaving behind the historic Lauriya Nandangarh pillar nearby.',
    mainAttractions: [
      {
        title: 'Jungle Jeep Safaris',
        desc: 'Guided open-top 4x4 safaris through the core Madanpur, Gonauli, and Valmikinagar ranges to track Bengal tigers, leopards, wild dogs, and barking deer.'
      },
      {
        title: 'Gandak River Rafting & Boating',
        desc: 'Motorboat tours and gentle rafting along the crystal-clear Gandak River, spotting gharials, marsh mugger crocodiles, and migratory birds.'
      },
      {
        title: 'Triveni Sangam & Valmiki Ashram',
        desc: 'Sacred confluence of three rivers at the Nepal border, offering panoramic mountain vistas and forest trails to the ancient hermitage.'
      },
      {
        title: 'Canopy Eco-Cottages & Treehouses',
        desc: 'Comfortable eco-lodges, riverside bamboo cottages, and treehouse stays developed by the Bihar State Forest Department.'
      },
      {
        title: 'Tharu Tribal Village Cultural Walk',
        desc: 'Engage with the indigenous Tharu tribal communities, discovering their traditional eco-friendly mud homes, herbal folklore, and folk dance.'
      }
    ],
    whyVisit: [
      {
        title: 'Untouched Himalayan Foothill Wilderness',
        desc: 'Escape the crowds in one of India’s most scenic, unhurried, and biodiverse wildlife sanctuaries.'
      },
      {
        title: 'Surging Tiger & Wildlife Sightings',
        desc: 'Witness a successful conservation renaissance with tiger numbers growing alongside wild elephants, one-horned rhinos, and 250+ bird species.'
      },
      {
        title: 'Sustainable Eco-Tourism',
        desc: 'Stay in solar-powered riverside eco-resorts with authentic organic local gastronomy and indigenous nature guides.'
      }
    ],
    bestTime: 'November to April is the prime safari season. The park remains closed during the monsoon season (July to mid-October).',
    travelInfo: {
      airport: 'Gorakhpur Airport (110 km) in Uttar Pradesh or Patna Airport (295 km). Bagdogra Airport is 380 km.',
      railway: 'Valmikinagar Road (VNE) is 45 km away; Bagaha (BHI) is 50 km away with connections to Gorakhpur, Patna, and Delhi.',
      road: 'Accessible via NH 727 from Gorakhpur (approx. 3 hours) or Patna (approx. 6 hours via Bettiah).',
      timings: 'Morning Safari: 6:00 AM – 10:00 AM. Evening Safari: 2:30 PM – 5:30 PM. Bookings available via the state eco-tourism portal.'
    }
  }
];

// Helper to look up a destination by ID or alias
function getDestinationById(destId) {
  if (!destId) return null;
  const cleanId = String(destId).trim().toLowerCase();
  return destinationsData.find(d => 
    d.id.toLowerCase() === cleanId || 
    (d.aliases && d.aliases.some(a => a.toLowerCase() === cleanId))
  ) || null;
}

/* ==========================================================================
   2. Logic for DESTINATIONS PAGE (destinations.html)
   ========================================================================== */
function initDestinationsCatalog() {
  const container = document.getElementById('destinations-grid-container');
  const searchInput = document.getElementById('destination-search');
  const clearBtn = document.getElementById('search-clear-btn');
  const categoryButtons = document.querySelectorAll('.category-pill-btn');
  const noResultsBox = document.getElementById('no-destinations-box');
  const resetBtn = document.getElementById('reset-filters-btn');

  if (!container || !searchInput) return;

  let currentCategory = 'All';
  let currentSearchQuery = '';

  // Render cards into container
  function renderCards(destinations) {
    if (destinations.length === 0) {
      container.innerHTML = '';
      if (noResultsBox) noResultsBox.style.display = 'flex';
      return;
    }

    if (noResultsBox) noResultsBox.style.display = 'none';

    container.innerHTML = destinations.map(dest => `
      <article class="dest-card" data-destination-id="${dest.id}">
        <div class="dest-card-media">
          <img 
            src="${dest.image}" 
            alt="${dest.name} in Bihar" 
            class="dest-card-img" 
            loading="lazy"
            onerror="if(this.src.indexOf('.svg')===-1){this.src='/assets/${dest.id}.svg';}"
          />
        </div>
        <div class="dest-card-content">
          <div class="dest-card-meta">
            <span>${dest.category}</span>
            <span class="meta-sep">·</span>
            <span>${dest.location.split(',')[0]}</span>
          </div>
          <h3 class="dest-card-title">${dest.name}</h3>
          <p class="dest-card-desc">${dest.shortDescription}</p>
          <div class="dest-card-footer">
            <a href="destination.html?id=${dest.id}" class="dest-card-btn" aria-label="View details for ${dest.name}">
              View Details <span>&rarr;</span>
            </a>
          </div>
        </div>
      </article>
    `).join('');
  }

  // Unified filter matching logic
  function applyFilters() {
    const query = currentSearchQuery.trim().toLowerCase();

    const filtered = destinationsData.filter(dest => {
      // 1. Category check
      let matchesCategory = false;
      if (currentCategory === 'All') {
        matchesCategory = true;
      } else {
        matchesCategory = dest.categories.some(cat => 
          cat.toLowerCase() === currentCategory.toLowerCase()
        );
      }

      // 2. Search check (destination name, category, location, and description)
      let matchesSearch = true;
      if (query) {
        const nameMatch = dest.name.toLowerCase().includes(query);
        const catMatch = dest.category.toLowerCase().includes(query);
        const locMatch = dest.location.toLowerCase().includes(query);
        const descMatch = dest.shortDescription.toLowerCase().includes(query);
        matchesSearch = nameMatch || catMatch || locMatch || descMatch;
      }

      return matchesCategory && matchesSearch;
    });

    renderCards(filtered);
  }

  // Search input handler
  searchInput.addEventListener('input', (e) => {
    currentSearchQuery = e.target.value;
    if (clearBtn) {
      clearBtn.style.display = currentSearchQuery.length > 0 ? 'inline-flex' : 'none';
    }
    applyFilters();
  });

  // Clear search button handler
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      currentSearchQuery = '';
      clearBtn.style.display = 'none';
      searchInput.focus();
      applyFilters();
    });
  }

  // Category buttons handler
  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category') || 'All';
      applyFilters();
    });
  });

  // Reset filters button in the empty state
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      searchInput.value = '';
      currentSearchQuery = '';
      if (clearBtn) clearBtn.style.display = 'none';
      currentCategory = 'All';
      categoryButtons.forEach(b => {
        if (b.getAttribute('data-category') === 'All') {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });
      applyFilters();
    });
  }

  // Check URL parameters for pre-applied search or category
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get('category');
  const initialSearch = urlParams.get('search');

  if (initialCategory) {
    categoryButtons.forEach(btn => {
      if (btn.getAttribute('data-category')?.toLowerCase() === initialCategory.toLowerCase()) {
        btn.click();
      }
    });
  }

  if (initialSearch) {
    searchInput.value = initialSearch;
    currentSearchQuery = initialSearch;
    if (clearBtn) clearBtn.style.display = 'inline-flex';
    applyFilters();
  } else {
    // Initial render
    renderCards(destinationsData);
  }
}

/* ==========================================================================
   3. Logic for DESTINATION DETAIL PAGE (destination.html)
   ========================================================================== */
function initDestinationDetailPage() {
  const detailContainer = document.getElementById('destination-detail-root');
  if (!detailContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const destId = urlParams.get('id');
  const destination = getDestinationById(destId);

  if (!destination) {
    // Fallback: Destination not found
    detailContainer.innerHTML = `
      <div class="container section">
        <div class="no-destinations-box" style="display: flex;">
          <div class="no-destinations-icon">🏛️</div>
          <h2 class="no-destinations-title">Destination Not Found</h2>
          <p class="no-destinations-text">
            We could not find the tourist destination you requested (${destId ? `"${destId}"` : 'No destination ID provided'}). Browse our complete catalog of iconic Bihar destinations.
          </p>
          <a href="destinations.html" class="btn btn-primary">
            &larr; Back to Destinations
          </a>
        </div>
      </div>
    `;
    return;
  }

  // Update document title and meta description
  document.title = `${destination.name} — Bihar Tourism`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', `Explore ${destination.name}, Bihar. ${destination.shortDescription}`);
  }

  // Render the destination details
  detailContainer.innerHTML = `
    <!-- Top Back Navigation Bar -->
    <div class="detail-top-nav-bar">
      <div class="container" style="display: flex; justify-content: space-between; align-items: center;">
        <a href="destinations.html" class="btn-back-link">
          &larr; Back to All Destinations
        </a>
        <span style="font-size: 0.8125rem; color: var(--color-text-light);">
          Category: <strong style="color: var(--color-primary);">${destination.category}</strong>
        </span>
      </div>
    </div>

    <!-- Hero Section with Large Image & Headings -->
    <section class="dest-detail-hero">
      <div class="dest-detail-hero-media">
        <img 
          src="${destination.image}" 
          alt="${destination.name} monument view" 
          class="dest-detail-hero-img" 
          onerror="if(this.src.indexOf('.svg')===-1){this.src='/assets/${destination.id}.svg';}"
        />
        <div class="dest-detail-hero-scrim"></div>
      </div>
      <div class="container dest-detail-hero-content">
        <div class="dest-detail-meta-line">
          <span>${destination.category}</span>
          <span>·</span>
          <span>${destination.location.split(',')[0]}</span>
        </div>
        <h1 class="dest-detail-title">${destination.name}</h1>
        <div class="dest-detail-location">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>${destination.location}</span>
        </div>
      </div>
    </section>

    <!-- Main Detail Layout (Overview + Sidebar) -->
    <section class="container dest-detail-layout">
      <!-- Left Column: Primary Content -->
      <div class="dest-detail-main-content">
        <!-- Overview -->
        <div>
          <h2 class="dest-detail-section-title">Overview</h2>
          <p class="dest-detail-prose">${destination.overview}</p>
        </div>

        <!-- Historical & Cultural Significance -->
        <div>
          <h2 class="dest-detail-section-title">Historical & Cultural Significance</h2>
          <p class="dest-detail-prose">${destination.historicalSignificance}</p>
        </div>

        <!-- Main Attractions -->
        <div>
          <h2 class="dest-detail-section-title">Main Attractions & Landmarks</h2>
          <div class="attractions-grid">
            ${destination.mainAttractions.map(attraction => `
              <div class="attraction-card">
                <h4>${attraction.title}</h4>
                <p>${attraction.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Why Visit -->
        <div>
          <h2 class="dest-detail-section-title">Why Visit ${destination.name}</h2>
          <ul class="why-visit-list">
            ${destination.whyVisit.map(reason => `
              <li class="why-visit-item">
                <div>
                  <h4 style="font-family: var(--font-serif); font-size: 1.0625rem; font-weight: 600; margin-bottom: 0.25rem;">
                    ${reason.title}
                  </h4>
                  <p>${reason.desc}</p>
                </div>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Visual Photo Gallery -->
        ${(destination.gallery && destination.gallery.length > 0) ? `
        <div style="margin-top: 2.5rem;">
          <h2 class="dest-detail-section-title">Photo Gallery & Visual Highlights</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.25rem; margin-top: 1rem;">
            ${destination.gallery.map((imgUrl, i) => `
              <div style="height: 175px; border-radius: 8px; overflow: hidden; background: #1e293b; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                <img 
                  src="${imgUrl}" 
                  alt="${destination.name} photo ${i+1}" 
                  style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;" 
                  loading="lazy"
                  onerror="this.src='/assets/${destination.id}.svg'"
                  onmouseover="this.style.transform='scale(1.06)'"
                  onmouseout="this.style.transform='scale(1)'"
                />
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}
      </div>

      <!-- Right Column: Sidebar Travel Information -->
      <aside class="dest-detail-sidebar">
        <!-- Best Time to Visit Card -->
        <div class="dest-info-card">
          <h3 class="dest-info-card-header">Best Time to Visit</h3>
          <p style="font-size: 0.9375rem; color: var(--color-text-muted); line-height: 1.6;">
            ${destination.bestTime || 'October to March'}
          </p>
        </div>

        <!-- Travel & Connectivity Information -->
        <div class="dest-info-card">
          <h3 class="dest-info-card-header">Travel Information</h3>
          <div class="dest-info-list">
            <div class="dest-info-item">
              <strong>Nearest Airport</strong>
              <span>${(destination.travelInfo && destination.travelInfo.airport) || 'Patna Airport (PAT) / Gaya Airport (GAY)'}</span>
            </div>
            <div class="dest-info-item">
              <strong>Nearest Railway Station</strong>
              <span>${(destination.travelInfo && destination.travelInfo.railway) || 'Major Indian Railways Junctions connect to all key cities'}</span>
            </div>
            <div class="dest-info-item">
              <strong>Road Connectivity</strong>
              <span>${(destination.travelInfo && destination.travelInfo.road) || 'Well-connected via Bihar State Expressways and National Highways'}</span>
            </div>
            <div class="dest-info-item">
              <strong>Visiting Timings</strong>
              <span>${(destination.travelInfo && destination.travelInfo.timings) || 'Open Daily (Sunrise to Sunset)'}</span>
            </div>
          </div>
        </div>

        <!-- Plan a Trip CTA Banner -->
        <div class="dest-sidebar-cta">
          <h3>Experience ${destination.name}</h3>
          <p>Let our certified travel consultants craft a personalized itinerary including local guides and hotel accommodations.</p>
          <a href="contact.html?preferredDestination=${encodeURIComponent(destination.name)}" class="btn btn-gold" style="width: 100%;">
            Plan a Trip to ${destination.name}
          </a>
          <div style="margin-top: 1rem;">
            <a href="destinations.html" class="btn btn-secondary" style="width: 100%;">
              &larr; Browse All Destinations
            </a>
          </div>
        </div>
      </aside>
    </section>
  `;
}

// Sync destinations with backend API so Admin additions, edits and deletions reflect live on public site
async function syncRemoteDestinations() {
  try {
    const res = await fetch('/api/destinations');
    const data = await res.json();
    if (data.success && Array.isArray(data.destinations)) {
      const remoteIds = new Set(data.destinations.map(d => d.id || d.slug));

      // Remove deleted or unpublished only if server returns full catalog
      if (data.destinations.length >= 6) {
        for (let i = destinationsData.length - 1; i >= 0; i--) {
          const item = destinationsData[i];
          if (!remoteIds.has(item.id) && !remoteIds.has(item.slug)) {
            destinationsData.splice(i, 1);
          }
        }
      }

      // Add or update
      data.destinations.forEach(remote => {
        const targetId = remote.slug || remote.id;
        const idx = destinationsData.findIndex(d => d.id === targetId || d.id === remote.id || (d.slug && d.slug === targetId));

        const mainAttractions = Array.isArray(remote.highlights) && remote.highlights.length > 0
          ? remote.highlights.map(h => ({ title: typeof h === 'string' ? h : h.title || 'Highlight', desc: typeof h === 'object' && h.desc ? h.desc : 'Prominent attraction in ' + remote.name }))
          : [
              { title: 'Key Attraction', desc: remote.shortDescription },
              { title: 'Historic & Cultural Landmark', desc: 'Renowned heritage site attracting pilgrims, scholars, and travelers.' }
            ];

        if (idx !== -1) {
          destinationsData[idx].name = remote.name;
          destinationsData[idx].category = remote.category;
          destinationsData[idx].categories = (remote.category || '').split('/').map(c => c.trim());
          destinationsData[idx].shortDescription = remote.shortDescription;
          destinationsData[idx].location = remote.location || 'Bihar, India';
          destinationsData[idx].image = remote.image || '/assets/bodhgaya.svg';
          destinationsData[idx].bestTime = remote.bestTime || 'October to March';
          if (remote.overview || remote.fullDescription) {
            destinationsData[idx].overview = remote.overview || remote.fullDescription;
          }
          if (Array.isArray(remote.highlights) && remote.highlights.length > 0) {
            destinationsData[idx].mainAttractions = mainAttractions;
          }
          if (remote.gallery && Array.isArray(remote.gallery)) {
            destinationsData[idx].gallery = remote.gallery;
          }
        } else {
          // Newly added destination from Admin Panel
          destinationsData.push({
            id: targetId,
            slug: targetId,
            aliases: [targetId, remote.id],
            name: remote.name,
            category: remote.category,
            categories: (remote.category || '').split('/').map(c => c.trim()),
            shortDescription: remote.shortDescription,
            image: remote.image || '/assets/bodhgaya.svg',
            gallery: Array.isArray(remote.gallery) ? remote.gallery : [remote.image || '/assets/bodhgaya.svg'],
            location: remote.location || 'Bihar, India',
            overview: remote.overview || remote.fullDescription || remote.shortDescription,
            historicalSignificance: remote.fullDescription || remote.overview || remote.shortDescription,
            mainAttractions,
            whyVisit: [
              { title: 'Authentic Experience', desc: 'Immerse yourself in vibrant spiritual, ecological, and cultural landmarks.' },
              { title: 'Memorable Journey', desc: 'Discover ancient stories and timeless Bihar architecture.' }
            ],
            bestTime: remote.bestTime || 'October to March',
            travelInfo: {
              airport: 'Patna Airport (PAT) / Gaya Airport (GAY)',
              railway: 'Major rail junctions connect to all Indian metropolitan cities',
              road: 'Connected via Bihar State Highways and National Expressways',
              timings: 'Open Daily (Sunrise to Sunset)'
            }
          });
        }
      });
    }
  } catch (err) {
    console.warn('Using bundled destinations data (backend sync optional):', err);
  }
}

// Auto-run on DOM ready
document.addEventListener('DOMContentLoaded', async () => {
  await syncRemoteDestinations();
  initDestinationsCatalog();
  initDestinationDetailPage();
});

// Export globally for browser & module compatibility
if (typeof window !== 'undefined') {
  window.destinationsData = destinationsData;
  window.getDestinationById = getDestinationById;
}
