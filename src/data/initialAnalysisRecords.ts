import { AnalysisResult } from '../types';

export const INITIAL_ANALYSIS_RECORDS: AnalysisResult[] = [
  {
    id: 'WID-2026-8841',
    submissionDate: '2026-11-09 14:22 UTC',
    inputType: 'screenshot',
    inputSource: 'telegram_channel_wild_exotics_direct',
    prediction: 'POTENTIAL ILLEGAL WILDLIFE TRADE',
    confidenceScore: 0.94,
    threatSeverity: 'Critical',
    identifiedSpecies: [
      {
        commonName: 'Sunda Pangolin (Scales / Byproduct)',
        scientificName: 'Manis javanica',
        citesStatus: 'CITES Appendix I (Zero commercial trade quota)',
        conservationStatus: 'Critically Endangered'
      }
    ],
    extractedText: 'Fresh stock arrived from Southeast Asia. 50kg dry pangolin scales. DM for price list and discreet maritime courier. WhatsApp: +60 17-xxxxxxx. No questions asked.',
    suspiciousKeywords: ['fresh stock', 'pangolin scales', 'discreet maritime courier', 'no questions asked', 'DM for price'],
    suspiciousIndicators: [
      {
        indicator: 'CITES Appendix I Commercial Trade Offer',
        severity: 'high',
        description: 'Listing offers pangolin scales in commercial quantities which is strictly prohibited under international law.'
      },
      {
        indicator: 'Concealed Payment and Off-Platform Messaging',
        severity: 'high',
        description: 'Directing buyers to unmonitored encrypted channels (Telegram/WhatsApp) to evade platform moderation.'
      },
      {
        indicator: 'Smuggling Evasion Terminology',
        severity: 'medium',
        description: 'Phrases such as "discreet maritime courier" and "no questions asked" match established transnational cartel trafficking lexicons.'
      }
    ],
    explanation: 'The analyzed screenshot displays high-confidence indicators of commercial wildlife trafficking involving CITES Appendix I pangolin derivatives. The text explicitly offers bulk quantities of pangolin scales and promotes evasive shipping logistics.',
    analysisStatus: 'FLAGGED_FOR_HUMAN_ENFORCEMENT',
    imageUrl: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=600&q=80',
    isSample: true
  },
  {
    id: 'WID-2026-8839',
    submissionDate: '2026-11-08 09:15 UTC',
    inputType: 'url',
    inputSource: 'https://www.instagram.com/p/DB901jKx2L_/',
    prediction: 'POTENTIAL ILLEGAL WILDLIFE TRADE',
    confidenceScore: 0.89,
    threatSeverity: 'Critical',
    identifiedSpecies: [
      {
        commonName: 'Radiated Tortoise',
        scientificName: 'Astrochelys radiata',
        citesStatus: 'CITES Appendix I',
        conservationStatus: 'Critically Endangered'
      }
    ],
    extractedText: 'Rare juvenile star pattern tortoise ready for new home. High grade shell markings. Worldwide door delivery guaranteed. PM serious inquiries only. #exoticpets #tortoiseforsale',
    suspiciousKeywords: ['rare juvenile', 'ready for new home', 'worldwide door delivery', 'PM serious inquiries', 'tortoiseforsale'],
    suspiciousIndicators: [
      {
        indicator: 'International Commercial Sale of Critically Endangered Reptile',
        severity: 'high',
        description: 'Radiated tortoises are endemic to Madagascar and cannot be legally traded commercially across borders without CITES permits.'
      },
      {
        indicator: 'Disguised "Door Delivery" Claim',
        severity: 'high',
        description: 'Promises of worldwide door-to-door delivery for protected wildlife typically rely on forged health certificates or air courier smuggling.'
      }
    ],
    explanation: 'Social media post advertising commercial sale and international parcel delivery of a live CITES Appendix I reptile without permit disclosures.',
    analysisStatus: 'FLAGGED_FOR_HUMAN_ENFORCEMENT',
    imageUrl: 'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=600&q=80',
    isSample: true
  },
  {
    id: 'WID-2026-8835',
    submissionDate: '2026-11-07 19:40 UTC',
    inputType: 'screenshot',
    inputSource: 'facebook_marketplace_indonesia_group',
    prediction: 'REQUIRES MANUAL REVIEW',
    confidenceScore: 0.72,
    threatSeverity: 'Elevated',
    identifiedSpecies: [
      {
        commonName: 'Slow Loris (Species ambiguous)',
        scientificName: 'Nycticebus sp.',
        citesStatus: 'CITES Appendix I',
        conservationStatus: 'Vulnerable / Endangered'
      }
    ],
    extractedText: 'Cute baby primate looking for gentle family care. Very tame, eats fruit. Adoption fee applies. Please contact via messenger.',
    suspiciousKeywords: ['cute baby primate', 'adoption fee applies', 'tame', 'contact via messenger'],
    suspiciousIndicators: [
      {
        indicator: 'Primate Commercial Adoption Disguise',
        severity: 'medium',
        description: 'Using "adoption fee" as a disguised purchase price for a protected nocturnal primate species.'
      },
      {
        indicator: 'Zoonotic and Welfare Risk',
        severity: 'high',
        description: 'Slow lorises possess toxic venoms and are frequently subjected to tooth extraction in the illicit pet pipeline.'
      }
    ],
    explanation: 'Ambiguous listing that may represent illegal pet commerce disguised as private adoption. Requires human conservation expert review to verify species identity and country origin.',
    analysisStatus: 'FLAGGED_FOR_HUMAN_ENFORCEMENT',
    imageUrl: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=600&q=80',
    isSample: true
  },
  {
    id: 'WID-2026-8828',
    submissionDate: '2026-11-06 11:04 UTC',
    inputType: 'url',
    inputSource: 'https://www.tiktok.com/@safari_adventures/video/729481923048',
    prediction: 'NO CLEAR EVIDENCE DETECTED',
    confidenceScore: 0.96,
    threatSeverity: 'Negligible',
    identifiedSpecies: [
      {
        commonName: 'Mountain Gorilla',
        scientificName: 'Gorilla beringei beringei',
        citesStatus: 'CITES Appendix I',
        conservationStatus: 'Endangered'
      }
    ],
    extractedText: 'Incredible encounter with the Hirwa gorilla family in Volcanoes National Park Rwanda! Guided by licensed park rangers. Conservation works! #ecotourism #rwanda #gorillas',
    suspiciousKeywords: [],
    suspiciousIndicators: [],
    explanation: 'The submission depicts legal ecotourism and conservation education overseen by authorized national park rangers. No sales offers, private ownership, or trade solicitation detected.',
    analysisStatus: 'CLEARED',
    imageUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=600&q=80',
    isSample: true
  },
  {
    id: 'WID-2026-8820',
    submissionDate: '2026-11-05 16:30 UTC',
    inputType: 'screenshot',
    inputSource: 'x_post_african_curios',
    prediction: 'POTENTIAL ILLEGAL WILDLIFE TRADE',
    confidenceScore: 0.91,
    threatSeverity: 'Critical',
    identifiedSpecies: [
      {
        commonName: 'African Elephant (Carved Ivory)',
        scientificName: 'Loxodonta africana',
        citesStatus: 'CITES Appendix I',
        conservationStatus: 'Endangered'
      }
    ],
    extractedText: 'Antique carved white bone stamp cylinders and figurines. High density natural grain. Private shipping container available for Asian buyers. DM for catalog.',
    suspiciousKeywords: ['carved white bone', 'stamp cylinders', 'high density natural grain', 'private shipping container', 'DM for catalog'],
    suspiciousIndicators: [
      {
        indicator: 'Ivory Code-Word Obfuscation',
        severity: 'high',
        description: '"Carved white bone" with "natural grain" (Schreger lines) is a recognized code word used on social media to bypass algorithmic ivory filters.'
      },
      {
        indicator: 'International Bulk Export Solicitation',
        severity: 'high',
        description: 'Soliciting Asian buyers with private shipping containers indicates organized export channels.'
      }
    ],
    explanation: 'Strong probability of carved elephant ivory being traded under the pseudonym "carved white bone" with characteristic Schreger angles matching elephant dentin.',
    analysisStatus: 'FLAGGED_FOR_HUMAN_ENFORCEMENT',
    imageUrl: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=600&q=80',
    isSample: true
  },
  {
    id: 'WID-2026-8812',
    submissionDate: '2026-11-04 08:50 UTC',
    inputType: 'screenshot',
    inputSource: 'wechat_moments_screenshot_transit',
    prediction: 'POTENTIAL ILLEGAL WILDLIFE TRADE',
    confidenceScore: 0.93,
    threatSeverity: 'Critical',
    identifiedSpecies: [
      {
        commonName: 'Helmeted Hornbill (Casque / Red Ivory)',
        scientificName: 'Rhinoplax vigil',
        citesStatus: 'CITES Appendix I',
        conservationStatus: 'Critically Endangered'
      }
    ],
    extractedText: 'Collector grade solid red hornbill heads. Perfectly dried. Uncarved blocks. Safe delivery to Shenzhen/Guangzhou via Yunnan border corridor.',
    suspiciousKeywords: ['red hornbill heads', 'uncarved blocks', 'safe delivery', 'Yunnan border corridor'],
    suspiciousIndicators: [
      {
        indicator: 'Red Ivory Hornbill Casque Trade',
        severity: 'high',
        description: 'Helmeted Hornbill casques are heavily sought after as "red ivory" and are completely banned from commercial international trade.'
      },
      {
        indicator: 'Known Porous Smuggling Corridor',
        severity: 'high',
        description: 'References specific illicit border transit routes through the Golden Triangle / Yunnan overland crossings.'
      }
    ],
    explanation: 'High-threat listing advertising raw casques of the critically endangered Helmeted Hornbill along established overland wildlife smuggling corridors.',
    analysisStatus: 'FLAGGED_FOR_HUMAN_ENFORCEMENT',
    imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=600&q=80',
    isSample: true
  },
  {
    id: 'WID-2026-8805',
    submissionDate: '2026-11-03 21:18 UTC',
    inputType: 'url',
    inputSource: 'https://www.facebook.com/groups/reptile_keepers_florida/posts/882194821',
    prediction: 'REQUIRES MANUAL REVIEW',
    confidenceScore: 0.68,
    threatSeverity: 'Elevated',
    identifiedSpecies: [
      {
        commonName: 'Ball Python (Captive-bred morph)',
        scientificName: 'Python regius',
        citesStatus: 'CITES Appendix II',
        conservationStatus: 'Near Threatened'
      }
    ],
    extractedText: 'Captive bred piebald ball python male. Hatched July 2026. Feeding on frozen thawed mice. Local pickup in Tampa or certified overnight reptile courier. Papers provided.',
    suspiciousKeywords: ['certified overnight reptile courier', 'papers provided'],
    suspiciousIndicators: [
      {
        indicator: 'Regulated Species Online Transaction',
        severity: 'low',
        description: 'CITES Appendix II species traded domestically with stated captive-breeding documentation.'
      }
    ],
    explanation: 'Appears to be a legal domestic captive-bred reptile transaction with husbandry records, but requires manual confirmation of local state wildlife exhibition licensing.',
    analysisStatus: 'COMPLETED',
    imageUrl: 'https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?auto=format&fit=crop&w=600&q=80',
    isSample: true
  },
  {
    id: 'WID-2026-8798',
    submissionDate: '2026-11-02 14:02 UTC',
    inputType: 'url',
    inputSource: 'https://twitter.com/NatGeoWildlife/status/17218391028301',
    prediction: 'NO CLEAR EVIDENCE DETECTED',
    confidenceScore: 0.98,
    threatSeverity: 'Negligible',
    identifiedSpecies: [
      {
        commonName: 'Snow Leopard',
        scientificName: 'Panthera uncia',
        citesStatus: 'CITES Appendix I',
        conservationStatus: 'Vulnerable'
      }
    ],
    extractedText: 'Camera trap footage from Hemis National Park Ladakh shows a mother snow leopard and her two cubs navigating a rocky ridge. Field research supported by Snow Leopard Trust.',
    suspiciousKeywords: [],
    suspiciousIndicators: [],
    explanation: 'Official scientific field research and wildlife documentary publication. Zero commercial or illicit trade indicators.',
    analysisStatus: 'CLEARED',
    imageUrl: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=600&q=80',
    isSample: true
  }
];

