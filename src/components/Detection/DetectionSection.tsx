import React, { useState, useRef } from 'react';
import { Upload, Link2, AlertTriangle, ShieldCheck, HelpCircle, Sparkles, RefreshCw, Database, CheckCircle, ExternalLink, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { analyzeContentWithAI } from './aiService';
import { AnalysisResult } from '../../types';

interface DetectionSectionProps {
  onLogAnalysisToDashboard: (record: AnalysisResult) => void;
  onNavigateToDashboard?: () => void;
  darkMode?: boolean;
}

export const DetectionSection: React.FC<DetectionSectionProps> = ({ 
  onLogAnalysisToDashboard,
  onNavigateToDashboard,
  darkMode = false
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string>('');
  const [urlInput, setUrlInput] = useState<string>('');
  const [urlError, setUrlError] = useState<string | null>(null);
  const [urlAuthWarning, setUrlAuthWarning] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [hasLoggedToDb, setHasLoggedToDb] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiDrawer, setShowApiDrawer] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Preloaded sample scenarios for instant evaluation
  const SAMPLES = [
    {
      label: 'Sample 1: Telegram Pangolin Scales',
      type: 'screenshot' as const,
      preview: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=600&q=80',
      text: 'Fresh stock arrived from Southeast Asia. 50kg dry pangolin scales. DM for price list and discreet maritime courier. WhatsApp: +60 17-8892110. No questions asked.',
      name: 'telegram_pangolin_scales_ad.png'
    },
    {
      label: 'Sample 2: Instagram Radiated Tortoise',
      type: 'url' as const,
      url: 'https://www.instagram.com/p/DB901jKx2L_/',
      preview: 'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=600&q=80',
      text: 'Rare juvenile star pattern tortoise ready for new home. High grade shell markings. Worldwide door delivery guaranteed. PM serious inquiries only. #exoticpets #tortoiseforsale'
    },
    {
      label: 'Sample 3: Ambiguous Primate Pet',
      type: 'screenshot' as const,
      preview: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=600&q=80',
      text: 'Cute baby primate looking for gentle family care. Very tame, eats fruit. Adoption fee applies. Please contact via messenger.',
      name: 'fb_slow_loris_adoption.jpg'
    },
    {
      label: 'Sample 4: Benign Gorilla Ecotourism',
      type: 'url' as const,
      url: 'https://www.tiktok.com/@safari_adventures/video/729481923048',
      preview: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=600&q=80',
      text: 'Encounter with the Hirwa gorilla family in Volcanoes National Park Rwanda guided by licensed park rangers. Conservation works! #ecotourism'
    }
  ];

  // Handle Drag & Drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a supported image format: JPG, PNG, or WEBP.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      setImageFileName(file.name);
      setAnalysisResult(null);
      setHasLoggedToDb(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sample: typeof SAMPLES[0]) => {
    if (sample.type === 'screenshot') {
      setActiveTab('upload');
      setSelectedImage(sample.preview);
      setImageFileName(sample.name || 'sample_post.png');
      setUrlInput('');
      setUrlAuthWarning(null);
    } else {
      setActiveTab('url');
      setUrlInput(sample.url || '');
      setSelectedImage(sample.preview);
      setImageFileName('url_cached_preview.png');
      setUrlAuthWarning(null);
    }
    setAnalysisResult(null);
    setHasLoggedToDb(false);
  };

  // Run AI Detection
  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    setUrlAuthWarning(null);
    setUrlError(null);

    try {
      if (activeTab === 'upload') {
        if (!selectedImage) {
          alert('Please upload a screenshot first.');
          setIsAnalyzing(false);
          return;
        }

        // Extract sample text if it matches one of our samples
        const sampleMatch = SAMPLES.find(s => s.preview === selectedImage);
        const textPayload = sampleMatch ? sampleMatch.text : `Uploaded post image file: ${imageFileName}`;

        const result = await analyzeContentWithAI(
          { type: 'screenshot', data: selectedImage, extractedText: textPayload },
          apiKey
        );
        setAnalysisResult(result);
      } else {
        // Validate URL
        if (!urlInput.trim()) {
          setUrlError('Please enter a valid social media URL.');
          setIsAnalyzing(false);
          return;
        }

        try {
          new URL(urlInput);
        } catch {
          setUrlError('Invalid URL syntax. Please enter a full URL (e.g., https://...).');
          setIsAnalyzing(false);
          return;
        }

        // Platform access check
        const isRestrictedPlatform = /instagram\.com|tiktok\.com|facebook\.com|threads\.net|t\.me/i.test(urlInput);
        const sampleMatch = SAMPLES.find(s => s.url === urlInput);

        if (isRestrictedPlatform && !sampleMatch) {
          setUrlAuthWarning(
            `Target platform (${new URL(urlInput).hostname}) requires user login and enforces anti-scraping protections. To inspect this post with highest accuracy, please take a screenshot and use Option A.`
          );
        }

        const textPayload = sampleMatch ? sampleMatch.text : `Post URL analysis target: ${urlInput}`;
        const result = await analyzeContentWithAI(
          { type: 'url', data: urlInput, extractedText: textPayload },
          apiKey
        );
        setAnalysisResult(result);
      }
    } catch (err: any) {
      alert('Analysis error: ' + (err.message || 'Failed to analyze content.'));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLogToDatabase = () => {
    if (!analysisResult) return;
    onLogAnalysisToDashboard(analysisResult);
    setHasLoggedToDb(true);
  };

  return (
    <section id="detect" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Eyebrow & Headline in Coralis Aesthetic */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#E4F4F5] text-[#0B3A4A] text-xs uppercase font-bold tracking-widest border border-[#1FB6C9]/25 mb-3">
          AI Intelligence Engine
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#0B3A4A] dark:text-white font-extrabold leading-tight tracking-tight">
          Wildlife Trade <span className="italic text-[#FF7E6B] font-extrabold">Detection</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#3A5A64] leading-relaxed">
          Submit suspicious social media posts or online listings. Our computer vision and multimodal intelligence system detects species taxonomy, disguised trafficking lexicons, and illicit trade signatures.
        </p>

        {/* Engine Transparency Pill */}
        <div className="mt-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#1FB6C9]/20 text-xs text-[#3A5A64] shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#1FB6C9]" />
          <span>
            Active Architecture: <strong className="text-[#0B3A4A]">{apiKey ? 'Gemini 1.5 Multimodal Vision API' : 'Production Heuristic Engine (Demo Mode)'}</strong>
          </span>
          <button
            onClick={() => setShowApiDrawer(!showApiDrawer)}
            className="text-[#1FB6C9] underline hover:text-[#0B3A4A] ml-2 font-medium"
          >
            {apiKey ? 'Edit API Key' : 'Configure Custom Key'}
          </button>
        </div>

        {/* Optional API Key Input */}
        {showApiDrawer && (
          <div className="mt-4 p-4 max-w-md mx-auto bg-white rounded-2xl border border-[#1FB6C9]/30 shadow-md text-left text-xs">
            <label className="font-semibold text-[#0B3A4A] block mb-1">
              Google Gemini API Key (Optional)
            </label>
            <p className="text-[#6E8890] mb-2 text-[11px]">
              Optional. If not provided, the platform uses our built-in production heuristic engine with full species taxonomy and suspicious indicator matching.
            </p>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#1FB6C9]"
            />
          </div>
        )}
      </div>

      {/* Quick Test Samples Selector */}
      <div className="mb-10 bg-white/80 backdrop-blur-sm p-4 sm:p-5 rounded-[28px] border border-[#1FB6C9]/20 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#0B3A4A] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#FF7E6B]" /> Quick Preloaded Intelligence Test Cases
          </span>
          <span className="text-[11px] text-[#6E8890]">
            Click any sample to evaluate instant AI response
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {SAMPLES.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectSample(sample)}
              className="text-left p-3 rounded-2xl bg-[#E4F4F5]/60 hover:bg-[#E4F4F5] border border-[#1FB6C9]/20 text-xs font-medium text-[#0B3A4A] transition-all hover:scale-[1.02] flex items-center justify-between group"
            >
              <span className="truncate pr-2">{sample.label}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#1FB6C9] shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ))}
        </div>
      </div>

      {/* Main Detection Card (Coralis Editorial Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Input Box: 6 cols */}
        <div className="lg:col-span-6 bg-white rounded-[36px] p-6 sm:p-8 shadow-xl border border-white/80 space-y-6">
          {/* Dual Input Tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-[#F7F2E7] rounded-full border border-[#1FB6C9]/15">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'upload'
                  ? 'bg-white text-[#0B3A4A] shadow-sm'
                  : 'text-[#6E8890] hover:text-[#0B3A4A]'
              }`}
            >
              <Upload className="w-4 h-4 text-[#1FB6C9]" />
              Upload Screenshot
            </button>
            <button
              onClick={() => setActiveTab('url')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'url'
                  ? 'bg-white text-[#0B3A4A] shadow-sm'
                  : 'text-[#6E8890] hover:text-[#0B3A4A]'
              }`}
            >
              <Link2 className="w-4 h-4 text-[#1FB6C9]" />
              Submit Post URL
            </button>
          </div>

          {/* TAB 1: SCREENSHOT UPLOAD */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />

              {!selectedImage ? (
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-[28px] p-8 text-center cursor-pointer transition-all duration-200 ${
                    dragActive
                      ? 'border-[#1FB6C9] bg-[#E4F4F5]'
                      : 'border-[#1FB6C9]/30 bg-[#F7F2E7]/50 hover:bg-[#E4F4F5]/50'
                  }`}
                >
                  <div className="w-14 h-14 mx-auto rounded-full bg-white shadow-md flex items-center justify-center text-[#1FB6C9] mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg font-medium text-[#0B3A4A]">
                    Drag & Drop Social Media Screenshot
                  </h4>
                  <p className="text-xs text-[#6E8890] mt-1">
                    Or click to browse from device. Supports JPG, PNG, WEBP up to 15MB.
                  </p>
                  <div className="mt-4">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#E4F4F5] text-[#0B3A4A] text-xs font-semibold border border-[#1FB6C9]/20">
                      Browse Files
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="relative rounded-2xl overflow-hidden bg-black/5 border border-gray-200 aspect-video flex items-center justify-center">
                    <img
                      src={selectedImage}
                      alt="Uploaded Screenshot"
                      className="max-h-full max-w-full object-contain"
                    />
                    <div className="absolute top-2 right-2 flex items-center gap-1.5">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1 rounded-full bg-white/90 hover:bg-white text-xs font-medium text-[#0B3A4A] shadow"
                      >
                        Replace
                      </button>
                      <button
                        onClick={() => {
                          setSelectedImage(null);
                          setAnalysisResult(null);
                        }}
                        className="px-3 py-1 rounded-full bg-[#FF7E6B] hover:bg-[#E86350] text-xs font-medium text-white shadow"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#6E8890] flex items-center justify-between">
                    <span>Target: {imageFileName || 'screenshot.png'}</span>
                    <span className="text-[#2F7D58] font-medium">Ready for OCR & Species Analysis</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: POST URL INPUT */}
          {activeTab === 'url' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#0B3A4A] mb-1.5">
                  Social Media Post or Marketplace Link
                </label>
                <div className="relative">
                  <input
                    type="url"
                    placeholder="https://www.instagram.com/p/... or https://t.me/..."
                    value={urlInput}
                    onChange={(e) => {
                      setUrlInput(e.target.value);
                      setUrlError(null);
                      setUrlAuthWarning(null);
                    }}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F7F2E7]/70 border border-[#1FB6C9]/30 text-sm focus:outline-none focus:border-[#1FB6C9] focus:bg-white text-[#0B3A4A]"
                  />
                  <Link2 className="absolute right-4 top-3.5 w-4 h-4 text-[#6E8890]" />
                </div>
              </div>

              {urlError && (
                <div className="p-3 rounded-2xl bg-[#FF7E6B]/15 text-[#E86350] text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{urlError}</span>
                </div>
              )}

              {urlAuthWarning && (
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p>{urlAuthWarning}</p>
                </div>
              )}

              <p className="text-[11px] text-[#6E8890] leading-relaxed">
                Supports Instagram, Facebook Groups, TikTok, X (Twitter), Telegram, and Reddit public links.
              </p>
            </div>
          )}

          {/* Submit Action Button */}
          <button
            onClick={handleRunAnalysis}
            disabled={isAnalyzing || (activeTab === 'upload' && !selectedImage) || (activeTab === 'url' && !urlInput.trim())}
            className="w-full py-4 rounded-full bg-[#FF7E6B] hover:bg-[#E86350] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold text-sm tracking-wide shadow-lg shadow-[#FF7E6B]/30 transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Executing Computer Vision & Taxonomy Analysis...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Analyze for Illegal Wildlife Trade
              </>
            )}
          </button>
        </div>

        {/* Right Output Box: 6 cols */}
        <div className="lg:col-span-6 bg-white rounded-[36px] p-6 sm:p-8 shadow-xl border border-white/80 min-h-[460px] flex flex-col justify-between">
          {!analysisResult && !isAnalyzing && (
            <div className="my-auto text-center py-12 px-4 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#E4F4F5] flex items-center justify-center text-[#1FB6C9]">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-[#0B3A4A] font-medium">
                AI Intelligence Terminal Ready
              </h3>
              <p className="text-sm text-[#6E8890] max-w-md mx-auto leading-relaxed">
                Submit an image or post link to trigger automated species detection, CITES trade restriction checks, and disguised trafficking terminology extraction.
              </p>
              <div className="inline-block text-[11px] font-semibold text-[#1FB6C9] uppercase tracking-wider bg-[#E4F4F5]/70 px-4 py-1.5 rounded-full">
                Waiting for input submission
              </div>
            </div>
          )}

          {isAnalyzing && (
            <div className="my-auto text-center py-16 px-4 space-y-4">
              <div className="relative w-16 h-16 mx-auto">
                <div className="w-16 h-16 rounded-full border-4 border-[#1FB6C9]/20 border-t-[#1FB6C9] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#0B3A4A]">
                  AI
                </div>
              </div>
              <h3 className="font-serif text-2xl text-[#0B3A4A] font-medium">
                Scanning Wildlife Cryptonyms & Taxonomy...
              </h3>
              <p className="text-xs text-[#6E8890] max-w-sm mx-auto">
                Comparing optical descriptors against CITES Appendices I & II databases and transnational crime indicators.
              </p>
            </div>
          )}

          {analysisResult && !isAnalyzing && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Prediction Badge Header (Prompt Requirement 6.2) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#6E8890]">
                    AI Evaluation Output
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                        analysisResult.prediction === 'POTENTIAL ILLEGAL WILDLIFE TRADE'
                          ? 'bg-[#FF7E6B] text-white shadow-md shadow-[#FF7E6B]/30'
                          : analysisResult.prediction === 'REQUIRES MANUAL REVIEW'
                          ? 'bg-[#1FB6C9] text-white shadow-md shadow-[#1FB6C9]/30'
                          : 'bg-[#2F7D58] text-white shadow-md shadow-[#2F7D58]/30'
                      }`}
                    >
                      {analysisResult.prediction === 'POTENTIAL ILLEGAL WILDLIFE TRADE' && <AlertTriangle className="w-3.5 h-3.5" />}
                      {analysisResult.prediction === 'REQUIRES MANUAL REVIEW' && <HelpCircle className="w-3.5 h-3.5" />}
                      {analysisResult.prediction === 'NO CLEAR EVIDENCE DETECTED' && <CheckCircle className="w-3.5 h-3.5" />}
                      {analysisResult.prediction}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#6E8890] block">
                    Confidence Metric
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#0B3A4A]">
                    {(analysisResult.confidenceScore * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Identified Species */}
              <div className="bg-[#F7F2E7]/80 p-4 rounded-2xl border border-[#1FB6C9]/15">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#0B3A4A] block mb-2">
                  Identified Wildlife Species
                </span>
                {analysisResult.identifiedSpecies.length > 0 ? (
                  <div className="space-y-2">
                    {analysisResult.identifiedSpecies.map((sp, idx) => (
                      <div key={idx} className="flex items-start justify-between text-xs">
                        <div>
                          <strong className="text-[#0B3A4A] font-semibold">{sp.commonName}</strong>
                          <div className="text-[#6E8890] italic">{sp.scientificName}</div>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#0B3A4A] text-[#9BF0FB] text-[10px] font-bold">
                          {sp.citesStatus}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#6E8890]">
                    No protected species taxonomy positively matched in submission.
                  </p>
                )}
              </div>

              {/* Suspicious Indicators Checklist */}
              {analysisResult.suspiciousIndicators.length > 0 && (
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF7E6B] block mb-2">
                    Detected Threat Indicators
                  </span>
                  <div className="space-y-2">
                    {analysisResult.suspiciousIndicators.map((ind, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl bg-white border border-[#FF7E6B]/20 shadow-sm text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <strong className="text-[#0B3A4A] font-semibold">{ind.indicator}</strong>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              ind.severity === 'high' ? 'bg-[#FF7E6B]/20 text-[#E86350]' : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {ind.severity} severity
                          </span>
                        </div>
                        <p className="mt-1 text-[#6E8890] text-[11px] leading-relaxed">
                          {ind.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suspicious Keywords detected */}
              {analysisResult.suspiciousKeywords.length > 0 && (
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#0B3A4A] block mb-1.5">
                    Extracted Trafficking Keywords
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {analysisResult.suspiciousKeywords.map((kw, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-full bg-[#FF7E6B]/15 text-[#E86350] text-xs font-mono font-medium"
                      >
                        "{kw}"
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Ethical Framing & Objective Explanation */}
              <div className="p-4 rounded-2xl bg-[#E4F4F5] border border-[#1FB6C9]/25 text-xs">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#0B3A4A] block mb-1">
                  Ethical Intelligence Assessment
                </span>
                <p className="text-[#3A5A64] leading-relaxed text-xs">
                  {analysisResult.explanation}
                </p>
                <div className="mt-2 text-[10px] text-[#6E8890] italic">
                  * Note: AI predictions represent preliminary investigative indicators requiring verification by qualified wildlife law enforcement agencies.
                </div>
              </div>

              {/* Dynamic Action: Log to Dashboard Database */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={handleLogToDatabase}
                  disabled={hasLoggedToDb}
                  className={`w-full py-3 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    hasLoggedToDb
                      ? 'bg-[#2F7D58] text-white shadow-md'
                      : 'bg-[#0B3A4A] hover:bg-[#165367] text-white shadow-md'
                  }`}
                >
                  {hasLoggedToDb ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Appended to Intelligence Database
                    </>
                  ) : (
                    <>
                      <Database className="w-4 h-4 text-[#1FB6C9]" />
                      Log to Intelligence Dashboard Database
                    </>
                  )}
                </button>

                {hasLoggedToDb && onNavigateToDashboard && (
                  <button
                    onClick={onNavigateToDashboard}
                    className="w-full py-2.5 rounded-full bg-[#1FB6C9] hover:bg-[#1693A3] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer"
                  >
                    <span>Inspect Record in Analytics Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

