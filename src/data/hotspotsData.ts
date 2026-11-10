import { HotspotType } from '../types';

export const BIODIVERSITY_HOTSPOTS: HotspotType[] = [
  {
    id: 'hotspot-indo-burma',
    name: 'Indo-Burma Hotspot',
    region: 'Southeast Asia',
    country: 'Vietnam, Laos, Cambodia, Thailand, Myanmar',
    lat: 16.5,
    lng: 101.0,
    image: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=800&q=80',
    description: 'Tropical river basins and limestone karsts. Primary habitat for heavily trafficked Asian pangolins, tigers, and endemic ungulates.',
    biodiversitySignificance: 'Over 13,000 plant species and 430 mammal species under extreme snaring pressure.',
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
        name: 'Indochinese Tiger',
        scientificName: 'Panthera tigris corbetti',
        status: 'Critically Endangered (IUCN)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80'
      }
    ],
    conservationAction: 'Intensive anti-snaring ranger patrols across the Annamite Range.'
  },
  {
    id: 'hotspot-madagascar',
    name: 'Madagascar & Indian Ocean Islands',
    region: 'East Africa / Indian Ocean',
    country: 'Madagascar',
    lat: -18.766947,
    lng: 46.869107,
    image: 'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format&fit=crop&w=800&q=80',
    description: 'Isolated for 80 million years. Over 90% of wildlife and 80% of plants exist nowhere else on Earth.',
    biodiversitySignificance: '100+ species of lemurs and the rarest tortoises heavily targeted by international collectors.',
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
      }
    ],
    conservationAction: 'Dry forest community reserves and microchipping endemic radiated tortoises.'
  },
  {
    id: 'hotspot-sundaland',
    name: 'Sundaland Hotspot',
    region: 'Maritime Southeast Asia',
    country: 'Indonesia, Malaysia, Brunei',
    lat: -0.789275,
    lng: 113.921327,
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80',
    description: 'Lowland dipterocarp rainforests and peat swamps spanning Borneo, Sumatra, and the Malay Peninsula.',
    biodiversitySignificance: 'Habitat for critically endangered Bornean orangutans, Sumatran tigers, and Helmeted Hornbills.',
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
        status: 'Critically Endangered (Red Ivory Poaching)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80'
      }
    ],
    conservationAction: 'Bioacoustic canopy monitoring detecting chainsaws and gunshot signatures.'
  },
  {
    id: 'hotspot-tropical-andes',
    name: 'Tropical Andes',
    region: 'South America',
    country: 'Colombia, Ecuador, Peru, Bolivia',
    lat: -9.189967,
    lng: -75.015152,
    image: 'https://images.unsplash.com/photo-1568480541687-16c2f73eea4c?auto=format&fit=crop&w=800&q=80',
    description: 'The most biologically diverse hotspot on Earth, stretching from Andean peaks to Amazon cloud forests.',
    biodiversitySignificance: 'One-sixth of all plant life and the world’s highest diversity of amphibians (670 endemic).',
    threatLevel: 'Critical',
    species: [
      {
        name: 'Spectacled Bear',
        scientificName: 'Tremarctos ornatus',
        status: 'Vulnerable (IUCN)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1568480541687-16c2f73eea4c?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Jaguar',
        scientificName: 'Panthera onca',
        status: 'Near Threatened (Targeted for canine trade)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=800&q=80'
      }
    ],
    conservationAction: 'Manu to Yasuní biological corridors protecting indigenous territories.'
  },
  {
    id: 'hotspot-western-ghats',
    name: 'Western Ghats & Sri Lanka',
    region: 'South Asia',
    country: 'India & Sri Lanka',
    lat: 11.0,
    lng: 76.5,
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=800&q=80',
    description: '1,600 km mountain chain along India’s western coast with evergreen cloud forests and shola montane grasslands.',
    biodiversitySignificance: 'Habitat for Asian elephants, Lion-tailed macaques, and Indian star tortoises.',
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
        status: 'Vulnerable (Poached for exotic pet trade)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=800&q=80'
      }
    ],
    conservationAction: 'AI-assisted thermal drones safeguarding elephant migration corridors.'
  },
  {
    id: 'hotspot-congo-basin',
    name: 'Congo Basin & Guinean Forests',
    region: 'Central & West Africa',
    country: 'DR Congo, Gabon, Republic of Congo, Cameroon',
    lat: -0.228021,
    lng: 20.0,
    image: 'https://images.unsplash.com/photo-1574063413132-355dbfd83e23?auto=format&fit=crop&w=800&q=80',
    description: 'World’s second-largest tropical rainforest and primary carbon sink, holding irreplaceable primary peatlands.',
    biodiversitySignificance: 'Home to forest elephants, lowland gorillas, and white-bellied pangolins.',
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
      }
    ],
    conservationAction: 'Eco-guard patrols equipped with encrypted communication in Dzanga-Sangha.'
  },
  {
    id: 'hotspot-mesoamerica',
    name: 'Mesoamerica Hotspot',
    region: 'Central America',
    country: 'Costa Rica, Panama, Guatemala, Mexico',
    lat: 14.5,
    lng: -89.5,
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80',
    description: 'Biological bridge between North and South America, spanning cloud forests and volcanic ridges.',
    biodiversitySignificance: '8% of world terrestrial biodiversity on just 0.5% of planetary landmass.',
    threatLevel: 'High',
    species: [
      {
        name: 'Scarlet Macaw',
        scientificName: 'Ara macao',
        status: 'Targeted by illegal pet trade',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Resplendent Quetzal',
        scientificName: 'Pharomachrus mocinno',
        status: 'Near Threatened (IUCN)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1522926193341-e9faf685c65f?auto=format&fit=crop&w=800&q=80'
      }
    ],
    conservationAction: 'Community nesting boxes and satellite-monitored forest reserves.'
  },
  {
    id: 'hotspot-coral-triangle',
    name: 'Coral Triangle',
    region: 'Western Pacific',
    country: 'Indonesia, Philippines, Papua New Guinea',
    lat: 1.5,
    lng: 125.0,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    description: 'Center of global marine biodiversity containing 76% of all known coral species.',
    biodiversitySignificance: 'Vital nursery for hawksbill sea turtles, whale sharks, and humphead wrasse.',
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
        status: 'Endangered (Targeted for fins)',
        citesAppendix: 'Appendix II',
        image: 'https://images.unsplash.com/photo-1560275619-4cc9f59adc0a?auto=format&fit=crop&w=800&q=80'
      }
    ],
    conservationAction: 'Satellite AIS tracking to intercept illegal, unreported, and unregulated fishing.'
  },
  {
    id: 'hotspot-himalaya',
    name: 'Himalaya Hotspot',
    region: 'South & Central Asia',
    country: 'Nepal, Bhutan, India, Tibet',
    lat: 28.394857,
    lng: 84.124008,
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80',
    description: 'Highest alpine mountain ecosystems on Earth, harboring rare predators adapted to extreme altitudes.',
    biodiversitySignificance: 'Habitat for snow leopards, red pandas, and musk deer.',
    threatLevel: 'High',
    species: [
      {
        name: 'Snow Leopard',
        scientificName: 'Panthera uncia',
        status: 'Vulnerable (Pelt & bone poaching)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Red Panda',
        scientificName: 'Ailurus fulgens',
        status: 'Endangered (Pet & pelt trade)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'
      }
    ],
    conservationAction: 'DNA scat sampling and community livestock insurance schemes.'
  },
  {
    id: 'hotspot-atlantic-forest',
    name: 'Atlantic Forest (Mata Atlântica)',
    region: 'South America',
    country: 'Brazil, Paraguay, Argentina',
    lat: -22.9,
    lng: -43.2,
    image: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=800&q=80',
    description: 'Coastal rainforest biome with extreme endemism, now reduced to 12% of its historical range.',
    biodiversitySignificance: 'Home to golden lion tamarins, jaguars, and rare macaws.',
    threatLevel: 'Critical',
    species: [
      {
        name: 'Golden Lion Tamarin',
        scientificName: 'Leontopithecus rosalia',
        status: 'Endangered (IUCN)',
        citesAppendix: 'Appendix I',
        image: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=800&q=80'
      }
    ],
    conservationAction: 'Canopy wildlife bridges connecting fragmented forest reserves.'
  }
];
