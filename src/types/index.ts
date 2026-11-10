export type HotspotType = {
  id: string;
  name: string;
  region: string;
  country: string;
  lat: number;
  lng: number;
  description: string;
  biodiversitySignificance: string;
  threatLevel: 'Critical' | 'High' | 'Vulnerable';
  species: {
    name: string;
    scientificName: string;
    status: string;
    image: string;
    citesAppendix: 'Appendix I' | 'Appendix II' | 'Appendix III';
  }[];
  conservationAction: string;
  youtubeFeed: {
    title: string;
    videoId: string;
    isLive: boolean;
    channelName: string;
    fallbackRecordedId?: string;
  };
};

export type IncidentCategory = 
  | 'Illegal Wildlife Trafficking'
  | 'Animal Smuggling'
  | 'Illegal Wildlife Sales'
  | 'Protected Species Trade'
  | 'Illegal Wildlife Markets'
  | 'Wildlife Trafficking Seizures';

export type IncidentType = {
  id: string;
  title: string;
  country: string;
  locationName: string;
  lat: number;
  lng: number;
  date: string;
  speciesInvolved: string[];
  category: IncidentCategory;
  description: string;
  seizureQuantity: string;
  sourceOrganization: string;
  newsArticleTitle: string;
  articleUrl: string;
  isVerified: boolean;
};

export type DetectionPrediction = 
  | 'POTENTIAL ILLEGAL WILDLIFE TRADE'
  | 'NO CLEAR EVIDENCE DETECTED'
  | 'REQUIRES MANUAL REVIEW';

export type AnalysisResult = {
  id: string;
  submissionDate: string;
  inputType: 'screenshot' | 'url';
  inputSource: string;
  prediction: DetectionPrediction;
  confidenceScore: number;
  identifiedSpecies: {
    commonName: string;
    scientificName: string;
    citesStatus: string;
    conservationStatus: string;
  }[];
  extractedText: string;
  suspiciousKeywords: string[];
  suspiciousIndicators: {
    indicator: string;
    severity: 'high' | 'medium' | 'low';
    description: string;
  }[];
  explanation: string;
  analysisStatus: 'COMPLETED' | 'FLAGGED_FOR_HUMAN_ENFORCEMENT' | 'CLEARED';
  threatSeverity: 'Critical' | 'Elevated' | 'Low' | 'Negligible';
  imageUrl?: string;
  isSample?: boolean;
};
