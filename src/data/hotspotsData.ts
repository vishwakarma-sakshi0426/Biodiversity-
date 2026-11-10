import { HotspotType } from '../types';

export const BIODIVERSITY_HOTSPOTS: HotspotType[] = [
  {
    id: 'hotspot-indo-burma',
    name: 'Indo-Burma Hotspot',
    region: 'Southeast Asia',
    country: 'Vietnam, Laos, Cambodia, Thailand, Myanmar',
    lat: 16.5,
    lng: 101.0,
    description: 'Encompassing over 2 million square kilometers of tropical river basins, coastal mangroves, and limestone karsts. It is one of the most biologically rich and critically endangered hotspots on Earth.',
    biodiversitySignificance: 'Home to over 13,000 plant species (5,000 endemic), 430 mammal species, and 1,200 bird species. Crucial habitat for the world’s most heavily trafficked mammals including all Asian pangolin species.',
    threatLevel: 'Critical',
    species: [
      {
        name: 'Sunda Pangolin',
        scientificName: 'Manis javanica',
        status: 'Critically Endangered (IUCN)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Saola (Asian Unicorn)',
        scientificName: 'Pseudoryx nghetinhensis',
        status: 'Critically Endangered (IUCN)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Indochinese Tiger',
        scientificName: 'Panthera tigris corbetti',
        status: 'Critically Endangered (IUCN)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80'
      }
    ],
    conservationAction: 'Intensive anti-snaring patrols with ranger units and satellite surveillance across the Annamite Range.',
    youtubeFeed: {
      title: 'Southeast Asia Tropical Rainforest & River Basin Cam',
      videoId: 'YDax_aMh_2g',
      isLive: true,
      channelName: 'Wild Earth & Rainforest Alliance',
      fallbackRecordedId: 'yG9G4eEa0nI'
    }
  },
  {
    id: 'hotspot-madagascar',
    name: 'Madagascar & Indian Ocean Islands',
    region: 'East Africa / Indian Ocean',
    country: 'Madagascar',
    lat: -18.766947,
    lng: 46.869107,
    description: 'An evolutionary crucible isolated for over 80 million years. More than 90% of Madagascar’s wildlife and 80% of its plants exist nowhere else in the universe.',
    biodiversitySignificance: 'Over 11,200 vascular plant species (83% endemic), 100+ species of lemurs, and nearly 300 reptile species including the rarest tortoises on Earth.',
    threatLevel: 'Critical',
    species: [
      {
        name: 'Radiated Tortoise',
        scientificName: 'Astrochelys radiata',
        status: 'Critically Endangered (IUCN)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Ring-Tailed Lemur',
        scientificName: 'Lemur catta',
        status: 'Endangered (IUCN)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Panther Chameleon',
        scientificName: 'Furcifer pardalis',
        status: 'Least Concern (Targeted by illegal pet trade)',
        citesAppendix: 'Appendix II',
        image: 'https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?auto=format&fit=crop&w=800&q=80'
      }
    ],
    conservationAction: 'Community-led dry forest reserves and microchipping endemic radiated tortoises to thwart poachers.',
    youtubeFeed: {
      title: 'Madagascar Wildlife & Forest Sanctuary Live',
      videoId: 'O8xmyqPr-hE',
      isLive: true,
      channelName: 'Madagascar Fauna & Flora Group',
      fallbackRecordedId: 'wTcNtgA6gHs'
    }
  },
  {
    id: 'hotspot-sundaland',
    name: 'Sundaland Hotspot',
    region: 'Maritime Southeast Asia',
    country: 'Indonesia, Malaysia, Brunei, Singapore',
    lat: -0.789275,
    lng: 113.921327,
    description: 'Spanning the Indonesian archipelago, Borneo, and Sumatra, this hotspot harbors ancient lowland dipterocarp rainforests and peat swamp forests.',
    biodiversitySignificance: 'Home to 25,000 vascular plant species (15,000 endemic), the critically endangered Bornean and Sumatran orangutans, Sumatran tigers, and Sumatran rhinos.',
    threatLevel: 'Critical',
    species: [
      {
        name: 'Bornean Orangutan',
        scientificName: 'Pongo pygmaeus',
        status: 'Critically Endangered (IUCN)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Helmeted Hornbill',
        scientificName: 'Rhinoplax vigil',
        status: 'Critically Endangered (Red Ivory poaching)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Malayan Sun Bear',
        scientificName: 'Helarctos malayanus',
        status: 'Vulnerable (IUCN)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=800&q=80'
      }
    ],
    conservationAction: 'Smart bioacoustic forest monitors to detect chainsaws and gunshot signatures within 2 minutes of occurrence.',
    youtubeFeed: {
      title: 'Borneo Rainforest Canopy & Sanctuary Feed',
      videoId: 'yG9G4eEa0nI',
      isLive: true,
      channelName: 'Borneo Orangutan Survival',
      fallbackRecordedId: 'x6d3qM2m-u4'
    }
  },
  {
    id: 'hotspot-tropical-andes',
    name: 'Tropical Andes',
    region: 'South America',
    country: 'Colombia, Ecuador, Peru, Bolivia, Venezuela',
    lat: -9.189967,
    lng: -75.015152,
    description: 'The most biologically diverse hotspot in the world. Stretches from the snow-capped Andean peaks to the western Amazon cloud forests.',
    biodiversitySignificance: 'Contains about one-sixth of all plant life in the world (30,000 species) and the world’s highest diversity of amphibians (980 species, 670 endemic).',
    threatLevel: 'Critical',
    species: [
      {
        name: 'Spectacled Bear (Andean Bear)',
        scientificName: 'Tremarctos ornatus',
        status: 'Vulnerable (IUCN)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1568480541687-16c2f73eea4c?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Jaguar',
        scientificName: 'Panthera onca',
        status: 'Near Threatened (Targeted for canine teeth)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Andean Condor',
        scientificName: 'Vultur gryphus',
        status: 'Vulnerable (IUCN)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&w=800&q=80'
      }
    ],
    conservationAction: 'Transnational biological corridors connecting Manu National Park with Yasuní Biosphere Reserve.',
    youtubeFeed: {
      title: 'Cloud Forest & Hummingbird Sanctuary Live Cam',
      videoId: 'J3w1Dq7qGbc',
      isLive: true,
      channelName: 'Andean Wildlife Sanctuary',
      fallbackRecordedId: 'k_P_S30qW0g'
    }
  },
  {
    id: 'hotspot-western-ghats',
    name: 'Western Ghats & Sri Lanka',
    region: 'South Asia',
    country: 'India & Sri Lanka',
    lat: 11.0,
    lng: 76.5,
    description: 'A 1,600 km mountain chain along India’s western coast that captures southwest monsoon rains, creating lush evergreen cloud forests and shola montane grasslands.',
    biodiversitySignificance: 'Over 5,000 vascular plant species, 139 mammal species, and more than 80% of amphibians found here are endemic.',
    threatLevel: 'High',
    species: [
      {
        name: 'Lion-Tailed Macaque',
        scientificName: 'Macaca silenus',
        status: 'Endangered (IUCN)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Indian Star Tortoise',
        scientificName: 'Geochelone elegans',
        status: 'Vulnerable (Heavily poached for pet trade)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Asian Elephant',
        scientificName: 'Elephas maximus',
        status: 'Endangered (IUCN)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=800&q=80'
      }
    ],
    conservationAction: 'AI-assisted thermal drones protecting wildlife migration corridors across the Nilgiri Biosphere.',
    youtubeFeed: {
      title: 'Nilgiri Elephant Corridor & Rainforest Live',
      videoId: 'Dxz38r4KqJ0',
      isLive: true,
      channelName: 'Wildlife Trust of India & explore.org',
      fallbackRecordedId: 'aM3_oW3EwL4'
    }
  },
  {
    id: 'hotspot-congo-basin',
    name: 'Congo Basin & Guinean Forests',
    region: 'Central & West Africa',
    country: 'DR Congo, Gabon, Republic of Congo, Cameroon',
    lat: -0.228021,
    lng: 20.0,
    description: 'The world’s second-largest tropical rainforest and primary carbon sink, holding irreplaceable primary peatlands and river drainages.',
    biodiversitySignificance: 'Habitat for over 10,000 plant species, bonobos, okapis, forest elephants, and thousands of endemic freshwater fish.',
    threatLevel: 'Critical',
    species: [
      {
        name: 'African Forest Elephant',
        scientificName: 'Loxodonta cyclotis',
        status: 'Critically Endangered (IUCN)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1574063413132-355dbfd83e23?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Western Lowland Gorilla',
        scientificName: 'Gorilla gorilla gorilla',
        status: 'Critically Endangered (IUCN)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'White-Bellied Pangolin',
        scientificName: 'Phataginus tricuspis',
        status: 'Endangered (Intensively poached)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=800&q=80'
      }
    ],
    conservationAction: 'Armed eco-guards equipped with encrypted VHF radios safeguarding Dzanga-Sangha and Salonga reserves.',
    youtubeFeed: {
      title: 'Mpala African Wildlife Waterhole Live Cam',
      videoId: 'YDax_aMh_2g',
      isLive: true,
      channelName: 'explore.org African Wildlife',
      fallbackRecordedId: 'yG9G4eEa0nI'
    }
  },
  {
    id: 'hotspot-mesoamerica',
    name: 'Mesoamerica Hotspot',
    region: 'Central America',
    country: 'Costa Rica, Panama, Guatemala, Belize, Southern Mexico',
    lat: 14.5,
    lng: -89.5,
    description: 'A biological land bridge connecting North and South America, spanning cloud forests, volcanic ridges, and coastal coral reefs.',
    biodiversitySignificance: 'Contains 17,000 plant species and 8% of the world’s terrestrial biodiversity on just 0.5% of the planet’s landmass.',
    threatLevel: 'High',
    species: [
      {
        name: 'Scarlet Macaw',
        scientificName: 'Ara macao',
        status: 'Least Concern globally, poached locally',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Baird’s Tapir',
        scientificName: 'Tapirus bairdii',
        status: 'Endangered (IUCN)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef6?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Resplendent Quetzal',
        scientificName: 'Pharomachrus mocinno',
        status: 'Near Threatened (IUCN)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1522926193341-e9faf685c65f?auto=format&fit=crop&w=800&q=80'
      }
    ],
    conservationAction: 'Costa Rica’s Pago por Servicios Ambientales (PSA) model and community nesting boxes for macaws.',
    youtubeFeed: {
      title: 'Costa Rica Toucan & Canopy Live Stream',
      videoId: 'k_P_S30qW0g',
      isLive: true,
      channelName: 'Toucan Rescue Ranch Costa Rica',
      fallbackRecordedId: 'J3w1Dq7qGbc'
    }
  },
  {
    id: 'hotspot-coral-triangle',
    name: 'Coral Triangle',
    region: 'Western Pacific',
    country: 'Indonesia, Philippines, Papua New Guinea, Solomon Islands',
    lat: 1.5,
    lng: 125.0,
    description: 'The Amazon of the oceans, containing 76% of all known coral species and over 3,000 species of reef fish.',
    biodiversitySignificance: 'Center of global marine biodiversity, vital nursery for pelagic sharks, marine turtles, and endangered cetaceans.',
    threatLevel: 'Critical',
    species: [
      {
        name: 'Hawksbill Sea Turtle',
        scientificName: 'Eretmochelys imbricata',
        status: 'Critically Endangered (Tortoiseshell trade)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Whale Shark',
        scientificName: 'Rhincodon typus',
        status: 'Endangered (Targeted for fins and oil)',
        citesAppendix: 'Appendix II',
        image: 'https://images.unsplash.com/photo-1560275619-4cc9f59adc0a?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Humphead Wrasse',
        scientificName: 'Cheilinus undulatus',
        status: 'Endangered (Live reef food fish trade)',
        citesAppendix: 'Appendix II',
        image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=800&q=80'
      }
    ],
    conservationAction: 'Multi-nation satellite vessel tracking (AIS) to combat illegal, unreported, and unregulated (IUU) fishing.',
    youtubeFeed: {
      title: 'Coral Reef Marine Biodiversity Live Cam',
      videoId: 'F109TZt3nRM',
      isLive: true,
      channelName: 'Monterey Bay & Pacific Reef Live',
      fallbackRecordedId: '2g811Eo7K8U'
    }
  },
  {
    id: 'hotspot-himalaya',
    name: 'Himalaya Hotspot',
    region: 'South & Central Asia',
    country: 'Nepal, Bhutan, Northern India, Tibet',
    lat: 28.394857,
    lng: 84.124008,
    description: 'Home to the world’s highest peaks, providing water to more than one billion people downstream and holding rare alpine biodiversity.',
    biodiversitySignificance: 'Habitat for 10,000 plant species, 300 mammal species, and rare alpine predators specially adapted to extreme elevations.',
    threatLevel: 'High',
    species: [
      {
        name: 'Snow Leopard',
        scientificName: 'Panthera uncia',
        status: 'Vulnerable (Poached for pelts and bones)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Red Panda',
        scientificName: 'Ailurus fulgens',
        status: 'Endangered (Illegal pet and pelt trade)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Himalayan Musk Deer',
        scientificName: 'Moschus leucogaster',
        status: 'Endangered (Musk pod poaching)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=800&q=80'
      }
    ],
    conservationAction: 'Community snow leopard insurance schemes and DNA scat sampling across high-altitude Himalayan passes.',
    youtubeFeed: {
      title: 'Himalayan Snow Leopard & Alpine Wildlife Stream',
      videoId: 'O8xmyqPr-hE',
      isLive: true,
      channelName: 'Himalayan Wildlife Cam',
      fallbackRecordedId: 'wTcNtgA6gHs'
    }
  },
  {
    id: 'hotspot-atlantic-forest',
    name: 'Atlantic Forest (Mata Atlântica)',
    region: 'South America',
    country: 'Brazil, Paraguay, Argentina',
    lat: -22.9,
    lng: -43.2,
    description: 'Once covering 1.2 million km² along the Atlantic coast of Brazil, now reduced to less than 12% of its original cover but harboring extreme endemism.',
    biodiversitySignificance: 'Over 20,000 plant species (40% endemic), and more than 260 mammal species including four species of lion tamarins.',
    threatLevel: 'Critical',
    species: [
      {
        name: 'Golden Lion Tamarin',
        scientificName: 'Leontopithecus rosalia',
        status: 'Endangered (IUCN)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Lear’s Macaw',
        scientificName: 'Anodorhynchus leari',
        status: 'Endangered (IUCN)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Maned Three-Toed Sloth',
        scientificName: 'Bradypus torquatus',
        status: 'Vulnerable (IUCN)',
        citesAppendix: 'Appendix II',
        image: 'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=800&q=80'
      }
    ],
    conservationAction: 'Canopy wildlife bridges connecting fragmented forest reserves across Rio de Janeiro state.',
    youtubeFeed: {
      title: 'Atlantic Rainforest Bird Sanctuary Live',
      videoId: 'J3w1Dq7qGbc',
      isLive: true,
      channelName: 'Mata Atlantica Sanctuary',
      fallbackRecordedId: 'k_P_S30qW0g'
    }
  }
];
