export type SupportedLanguage = 'en' | 'es' | 'fr' | 'id' | 'hi';

export interface TranslationDictionary {
  brandSubtitle: string;
  navEarth: string;
  navDetect: string;
  navDashboard: string;
  navArchitecture: string;
  ctaDetect: string;
  ctaAnalytics: string;
  heroEyebrow: string;
  heroTitleLine1: string;
  heroTitleLine2Pre: string;
  heroTitleLine2Highlight: string;
  heroDescription: string;
  heroCtaDetect: string;
  heroCtaMission: string;
  statHotspots: string;
  statHotspotsLabel: string;
  statSeized: string;
  statSeizedLabel: string;
  statPrecision: string;
  statPrecisionLabel: string;
  rotateNotice: string;
  darkMode: string;
  lightMode: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    brandSubtitle: 'Global Wildlife Intelligence',
    navEarth: 'Earth & Mission',
    navDetect: 'Wildlife Trade Detection',
    navDashboard: 'Intelligence Dashboard',
    navArchitecture: 'Architecture & Research',
    ctaDetect: 'AI Detection Tool',
    ctaAnalytics: 'Intelligence Dashboard',
    heroEyebrow: 'GLOBAL WILDLIFE INTELLIGENCE',
    heroTitleLine1: 'Protect the wild.',
    heroTitleLine2Pre: 'Preserve our ',
    heroTitleLine2Highlight: 'living Earth.',
    heroDescription: "Explore Earth's biodiversity hotspots, uncover reported wildlife crime incidents, and identify the digital traces of illegal wildlife trade.",
    heroCtaDetect: 'DETECT WILDLIFE TRADE',
    heroCtaMission: 'Discover Our Mission',
    statHotspots: '10+',
    statHotspotsLabel: 'Hotspots Mapped',
    statSeized: '8.8k+',
    statSeizedLabel: 'Tonnes Seized',
    statPrecision: '94%',
    statPrecisionLabel: 'AI Precision',
    rotateNotice: 'Interactive 3D Globe • Drag to rotate',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode'
  },
  hi: {
    brandSubtitle: 'ग्लोबल वाइल्डलाइफ इंटेलिजेंस',
    navEarth: 'पृथ्वी और मिशन',
    navDetect: 'तस्करी पहचान (AI)',
    navDashboard: 'इंटेलीजेंस डैशबोर्ड',
    navArchitecture: 'आर्किटेक्चर व रिसर्च',
    ctaDetect: 'AI पहचान टूल',
    ctaAnalytics: 'एनालिटिक्स देखें',
    heroEyebrow: 'वैश्विक वन्यजीव आसूचना',
    heroTitleLine1: 'वन्यजीवों की रक्षा करें।',
    heroTitleLine2Pre: 'संजोएं हमारी ',
    heroTitleLine2Highlight: 'जीवंत पृथ्वी।',
    heroDescription: 'पृथ्वी के जैव विविधता हॉटस्पॉट खोजें, वन्यजीव अपराधों का विवरण देखें और सोशल मीडिया पर अवैध व्यापार के डिजिटल निशान पहचानें।',
    heroCtaDetect: 'तस्करी की पहचान करें',
    heroCtaMission: 'हमारा मिशन जानें',
    statHotspots: '10+',
    statHotspotsLabel: 'हॉटस्पॉट मानचित्रित',
    statSeized: '8.8k+',
    statSeizedLabel: 'टन जब्त सामग्री',
    statPrecision: '94%',
    statPrecisionLabel: 'AI सटीकता',
    rotateNotice: 'इंटरैक्टिव 3D ग्लोब • घुमाने के लिए ड्रैग करें',
    darkMode: 'डार्क मोड',
    lightMode: 'लाइट मोड'
  },
  es: {
    brandSubtitle: 'Inteligencia Global de Vida Silvestre',
    navEarth: 'Tierra y Misión',
    navDetect: 'Detección de Tráfico',
    navDashboard: 'Panel de Análisis',
    navArchitecture: 'Arquitectura e Investigación',
    ctaDetect: 'Herramienta IA',
    ctaAnalytics: 'Ver Analítica',
    heroEyebrow: 'INTELIGENCIA GLOBAL DE VIDA SILVESTRE',
    heroTitleLine1: 'Protege la vida silvestre.',
    heroTitleLine2Pre: 'Preserva nuestra ',
    heroTitleLine2Highlight: 'Tierra viva.',
    heroDescription: 'Explora los puntos críticos de biodiversidad, descubre incidentes de delitos contra la fauna y rastrea el comercio ilegal en redes sociales.',
    heroCtaDetect: 'DETECTAR TRÁFICO',
    heroCtaMission: 'Descubre la Misión',
    statHotspots: '10+',
    statHotspotsLabel: 'Puntos Críticos',
    statSeized: '8.8k+',
    statSeizedLabel: 'Toneladas Incautadas',
    statPrecision: '94%',
    statPrecisionLabel: 'Precisión IA',
    rotateNotice: 'Globo 3D interactivo • Arrastra para rotar',
    darkMode: 'Modo Oscuro',
    lightMode: 'Modo Claro'
  },
  fr: {
    brandSubtitle: 'Renseignement Mondial sur la Faune',
    navEarth: 'Terre & Mission',
    navDetect: 'Détection du Trafic',
    navDashboard: 'Tableau de Bord',
    navArchitecture: 'Architecture & Recherche',
    ctaDetect: 'Outil IA',
    ctaAnalytics: 'Voir Analytique',
    heroEyebrow: 'INTELLIGENCE FAUNIQUE MONDIALE',
    heroTitleLine1: 'Protégez la faune.',
    heroTitleLine2Pre: 'Préservez notre ',
    heroTitleLine2Highlight: 'Terre vivante.',
    heroDescription: "Explorez les points chauds de biodiversité, découvrez les crimes contre la faune et identifiez les traces numériques du trafic illégal.",
    heroCtaDetect: 'DÉTECTER LE TRAFIC',
    heroCtaMission: 'Découvrir la Mission',
    statHotspots: '10+',
    statHotspotsLabel: 'Points Chauds',
    statSeized: '8.8k+',
    statSeizedLabel: 'Tonnes Saisies',
    statPrecision: '94%',
    statPrecisionLabel: 'Précision IA',
    rotateNotice: 'Globe 3D interactif • Glissez pour tourner',
    darkMode: 'Mode Sombre',
    lightMode: 'Mode Clair'
  },
  id: {
    brandSubtitle: 'Intelijen Satwa Liar Global',
    navEarth: 'Bumi & Misi',
    navDetect: 'Deteksi Perdagangan Ilegal',
    navDashboard: 'Dasbor Analitik',
    navArchitecture: 'Arsitektur & Riset',
    ctaDetect: 'Alat Deteksi AI',
    ctaAnalytics: 'Lihat Analitik',
    heroEyebrow: 'INTELIJEN SATWA LIAR GLOBAL',
    heroTitleLine1: 'Lindungi alam liar.',
    heroTitleLine2Pre: 'Lestarikan ',
    heroTitleLine2Highlight: 'Bumi kita.',
    heroDescription: 'Jelajahi hotspot keanekaragaman hayati, ungkap kejahatan satwa liar, dan lacak jejak digital perdagangan satwa ilegal di media sosial.',
    heroCtaDetect: 'DETEKSI PERDAGANGAN',
    heroCtaMission: 'Pelajari Misi Kami',
    statHotspots: '10+',
    statHotspotsLabel: 'Hotspot Terpetakan',
    statSeized: '8.8k+',
    statSeizedLabel: 'Ton Disita',
    statPrecision: '94%',
    statPrecisionLabel: 'Presisi AI',
    rotateNotice: 'Bola Dunia 3D Interaktif • Geser untuk memutar',
    darkMode: 'Mode Gelap',
    lightMode: 'Mode Terang'
  }
};

