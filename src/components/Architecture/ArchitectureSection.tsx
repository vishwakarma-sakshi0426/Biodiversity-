import React from 'react';
import {
  AlertTriangle,
  Clock,
  Coins,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Workflow,
  Search,
  Database,
  Eye,
  GitBranch,
  Network
} from 'lucide-react';

interface ArchitectureSectionProps {
  darkMode?: boolean;
}

export const ArchitectureSection: React.FC<ArchitectureSectionProps> = ({ darkMode = false }) => {
  return (
    <section className={`py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      darkMode ? 'bg-[#061822] text-[#E4F4F5]' : 'bg-[#F7F2E7] text-[#1E293B]'
    }`}>
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* HEADER SECTION (Matching User Reference Image) */}
        <div className="text-center space-y-4 pt-4">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest shadow-sm ${
            darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30 text-[#9BF0FB]' : 'bg-white border-[#2F7D58]/40 text-[#1E6544]'
          }`}>
            <span className="w-2 h-2 rounded-full bg-[#2F7D58] animate-pulse" />
            AI ARCHITECTURE & SCIENTIFIC INTELLIGENCE
          </div>

          {/* Main Heading Bold per User Request: "main heading ko bold" */}
          <h1 className={`font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight ${
            darkMode ? 'text-white' : 'text-[#0B3A4A]'
          }`}>
            Research & <span className="italic font-bold text-[#1E6544] dark:text-[#9BF0FB]">Implementation</span>
          </h1>

          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-sans font-medium ${
            darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
          }`}>
            Technical architecture and data-driven solutions for systemic illegal wildlife trade monitoring and autonomous interdiction.
          </p>
        </div>

        {/* SECTION 1: THE REALITY OF GLOBAL WILDLIFE CRIME (4 Metric Boxes) */}
        <div className="space-y-6">
          <h2 className={`text-center font-serif text-2xl sm:text-3xl font-bold tracking-tight ${
            darkMode ? 'text-white' : 'text-[#0B3A4A]'
          }`}>
            The Reality of Global Wildlife Crime
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`p-6 rounded-2xl border text-center transition-all hover:scale-[1.02] shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              <div className={`font-serif text-3xl sm:text-4xl font-bold ${
                darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'
              }`}>
                $23B+
              </div>
              <div className={`text-xs font-bold uppercase tracking-wider mt-2 ${
                darkMode ? 'text-white' : 'text-[#0B3A4A]'
              }`}>
                Annual Illicit Trade
              </div>
              <div className={`text-[11px] mt-1 font-medium ${
                darkMode ? 'text-[#94A3B8]' : 'text-[#475569]'
              }`}>
                Transnational criminal revenue
              </div>
            </div>

            <div className={`p-6 rounded-2xl border text-center transition-all hover:scale-[1.02] shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              <div className={`font-serif text-3xl sm:text-4xl font-bold ${
                darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'
              }`}>
                7,000+
              </div>
              <div className={`text-xs font-bold uppercase tracking-wider mt-2 ${
                darkMode ? 'text-white' : 'text-[#0B3A4A]'
              }`}>
                Targeted Species
              </div>
              <div className={`text-[11px] mt-1 font-medium ${
                darkMode ? 'text-[#94A3B8]' : 'text-[#475569]'
              }`}>
                Mammals, reptiles, flora & marine fauna
              </div>
            </div>

            <div className={`p-6 rounded-2xl border text-center transition-all hover:scale-[1.02] shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              <div className={`font-serif text-3xl sm:text-4xl font-bold ${
                darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'
              }`}>
                150+
              </div>
              <div className={`text-xs font-bold uppercase tracking-wider mt-2 ${
                darkMode ? 'text-white' : 'text-[#0B3A4A]'
              }`}>
                Active Trafficking Rings
              </div>
              <div className={`text-[11px] mt-1 font-medium ${
                darkMode ? 'text-[#94A3B8]' : 'text-[#475569]'
              }`}>
                Across SE Asia, Africa & Latin America
              </div>
            </div>

            <div className={`p-6 rounded-2xl border text-center transition-all hover:scale-[1.02] shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              <div className={`font-serif text-3xl sm:text-4xl font-bold ${
                darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'
              }`}>
                1:1,162
              </div>
              <div className={`text-xs font-bold uppercase tracking-wider mt-2 ${
                darkMode ? 'text-white' : 'text-[#0B3A4A]'
              }`}>
                Ranger Shortage
              </div>
              <div className={`text-[11px] mt-1 font-medium ${
                darkMode ? 'text-[#94A3B8]' : 'text-[#475569]'
              }`}>
                Ratio of field rangers to protected biomes
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: CORE CHALLENGES ADDRESSED (2x2 Grid with Metric Badges) */}
        <div className="space-y-6">
          <h2 className={`text-center font-serif text-2xl sm:text-3xl font-bold tracking-tight ${
            darkMode ? 'text-white' : 'text-[#0B3A4A]'
          }`}>
            Core Challenges Addressed
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Challenge 1 */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between shadow-sm transition-all hover:shadow-md ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    darkMode ? 'bg-[#1FB6C9]/20 text-[#9BF0FB]' : 'bg-[#2F7D58]/15 text-[#1E6544]'
                  }`}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h3 className={`font-bold text-base ${
                    darkMode ? 'text-white' : 'text-[#0B3A4A]'
                  }`}>
                    The Detection Delay
                  </h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                  darkMode ? 'bg-[#1FB6C9]/20 text-[#9BF0FB]' : 'bg-[#2F7D58]/15 text-[#1E6544]'
                }`}>
                  15–30% Early Alert
                </span>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed font-sans ${
                darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
              }`}>
                By the time physical contraband is seized at container ports, wild breeding populations have already suffered irreversible collapse. Early digital detection at the social-media stage is critical for preemptive interdiction.
              </p>
            </div>

            {/* Challenge 2 */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between shadow-sm transition-all hover:shadow-md ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    darkMode ? 'bg-[#1FB6C9]/20 text-[#9BF0FB]' : 'bg-[#2F7D58]/15 text-[#1E6544]'
                  }`}>
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className={`font-bold text-base ${
                    darkMode ? 'text-white' : 'text-[#0B3A4A]'
                  }`}>
                    Smuggling Evasion & Dialect Code
                  </h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                  darkMode ? 'bg-[#1FB6C9]/20 text-[#9BF0FB]' : 'bg-[#2F7D58]/15 text-[#1E6544]'
                }`}>
                  +84% Evasion Velocity
                </span>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed font-sans ${
                darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
              }`}>
                Traffickers constantly rotate obfuscated keywords, phonetic puns, acronyms, and emoji ciphers, rendering static keyword filters and platform blacklist algorithms obsolete within weeks.
              </p>
            </div>

            {/* Challenge 3 */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between shadow-sm transition-all hover:shadow-md ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    darkMode ? 'bg-[#1FB6C9]/20 text-[#9BF0FB]' : 'bg-[#2F7D58]/15 text-[#1E6544]'
                  }`}>
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className={`font-bold text-base ${
                    darkMode ? 'text-white' : 'text-[#0B3A4A]'
                  }`}>
                    The Information Bottleneck
                  </h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                  darkMode ? 'bg-[#1FB6C9]/20 text-[#9BF0FB]' : 'bg-[#2F7D58]/15 text-[#1E6544]'
                }`}>
                  1–3 Weeks Triage Lag
                </span>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed font-sans ${
                darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
              }`}>
                Human verification backlogs cause critical intelligence to expire before warrants can be drafted. A digital marketplace lead loses 90% of actionable value once sellers rotate burner accounts after 48 hours.
              </p>
            </div>

            {/* Challenge 4 */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between shadow-sm transition-all hover:shadow-md ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    darkMode ? 'bg-[#1FB6C9]/20 text-[#9BF0FB]' : 'bg-[#2F7D58]/15 text-[#1E6544]'
                  }`}>
                    <Coins className="w-5 h-5" />
                  </div>
                  <h3 className={`font-bold text-base ${
                    darkMode ? 'text-white' : 'text-[#0B3A4A]'
                  }`}>
                    Cross-Border Jurisdictional Deficit
                  </h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                  darkMode ? 'bg-[#1FB6C9]/20 text-[#9BF0FB]' : 'bg-[#2F7D58]/15 text-[#1E6544]'
                }`}>
                  80% Value Lost
                </span>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed font-sans ${
                darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
              }`}>
                Syndicates intentionally route procurement, payments, transit, and consumer fulfillment across separate legal jurisdictions, exploiting slow inter-agency requests and disparate evidence standards.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: WHAT WE BRING (4 Horizontal Cards) */}
        <div className="space-y-6">
          <h2 className={`text-center font-serif text-2xl sm:text-3xl font-bold tracking-tight ${
            darkMode ? 'text-white' : 'text-[#0B3A4A]'
          }`}>
            What We Bring
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`p-5 rounded-2xl border shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              <h3 className={`font-bold text-sm mb-2 flex items-center gap-2 ${
                darkMode ? 'text-white' : 'text-[#0B3A4A]'
              }`}>
                <Workflow className={`w-4 h-4 ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`} />
                Intelligent Agent System
              </h3>
              <p className={`text-xs leading-relaxed ${
                darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
              }`}>
                Autonomous multi-agent forensic triage, cross-modal verification, and prioritized alert routing for intelligence analysts.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              <h3 className={`font-bold text-sm mb-2 flex items-center gap-2 ${
                darkMode ? 'text-white' : 'text-[#0B3A4A]'
              }`}>
                <Eye className={`w-4 h-4 ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`} />
                Computer Vision Stack
              </h3>
              <p className={`text-xs leading-relaxed ${
                darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
              }`}>
                Fine-grained CITES fauna identification, body-part segmentation (tusks, scales, pelts), and disguised shipping recognition.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              <h3 className={`font-bold text-sm mb-2 flex items-center gap-2 ${
                darkMode ? 'text-white' : 'text-[#0B3A4A]'
              }`}>
                <Network className={`w-4 h-4 ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`} />
                Temporal Confidence Scoring
              </h3>
              <p className={`text-xs leading-relaxed ${
                darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
              }`}>
                Multi-frame post evolution analysis, seller network reputation decay, and cross-platform listing correlation over time.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              <h3 className={`font-bold text-sm mb-2 flex items-center gap-2 ${
                darkMode ? 'text-white' : 'text-[#0B3A4A]'
              }`}>
                <ShieldCheck className={`w-4 h-4 ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`} />
                Context-Engineered AI
              </h3>
              <p className={`text-xs leading-relaxed ${
                darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
              }`}>
                Grounded CITES Appendices I/II/III taxonomy, zero-hallucination verification loops, and evidentiary chain-of-custody output.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 4: TECHNICAL ARCHITECTURE (3 Columns) */}
        <div className="space-y-6">
          <h2 className={`text-center font-serif text-2xl sm:text-3xl font-bold tracking-tight ${
            darkMode ? 'text-white' : 'text-[#0B3A4A]'
          }`}>
            Technical Architecture
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className={`p-6 rounded-2xl border shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'
              }`}>
                Frontend
              </div>
              <div className={`font-bold text-sm mb-2 ${
                darkMode ? 'text-white' : 'text-[#0B3A4A]'
              }`}>
                React 19 + TypeScript + Vite + Tailwind CSS v4
              </div>
              <p className={`text-xs leading-relaxed ${
                darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
              }`}>
                Hardware-accelerated Three.js 3D Interactive Earth with procedural bathymetry textures, dynamic camera controls, and responsive UI components.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'
              }`}>
                Backend & Ingestion
              </div>
              <div className={`font-bold text-sm mb-2 ${
                darkMode ? 'text-white' : 'text-[#0B3A4A]'
              }`}>
                Node / Express + Python Proxy + REST Endpoints
              </div>
              <p className={`text-xs leading-relaxed ${
                darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
              }`}>
                Scalable asynchronous pipeline handling image normalization, metadata extraction, forensic caching, and real-time incident logging.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'
              }`}>
                AI / ML Engine
              </div>
              <div className={`font-bold text-sm mb-2 ${
                darkMode ? 'text-white' : 'text-[#0B3A4A]'
              }`}>
                Gemini 1.5 Vision + CITES Appendices Heuristics
              </div>
              <p className={`text-xs leading-relaxed ${
                darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
              }`}>
                Multimodal visual understanding combined with heuristic OCR keyword taxonomy, CITES protection tier matching, and calibrated threat confidence.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 5: IMPLEMENTATION DETAILS (4 Technical Cards with Architecture Diagrams) */}
        <div className="space-y-6">
          <h2 className={`text-center font-serif text-2xl sm:text-3xl font-bold tracking-tight ${
            darkMode ? 'text-white' : 'text-[#0B3A4A]'
          }`}>
            Implementation Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Temporal Aggregation */}
            <div className={`p-6 rounded-2xl border shadow-sm space-y-4 ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              {/* Architecture Blueprint Diagram */}
              <div className={`rounded-xl border p-4 text-[11px] font-mono select-none overflow-x-auto ${
                darkMode ? 'bg-[#071E28] border-[#1FB6C9]/30 text-white' : 'bg-[#F4F9F6] border-[#2F7D58]/35 text-[#0B3A4A]'
              }`}>
                <div className={`text-center font-bold pb-2 border-b ${
                  darkMode ? 'text-[#9BF0FB] border-[#1FB6C9]/20' : 'text-[#1E6544] border-[#2F7D58]/25'
                }`}>
                  Time-Series Post Monitoring Window
                </div>
                
                <div className="flex items-center justify-between gap-1 py-4 text-center">
                  <div className={`p-2 rounded border shadow-xs ${
                    darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30' : 'bg-white border-[#2F7D58]/35'
                  }`}>
                    <div className="text-[10px] text-gray-500 font-bold">t=0</div>
                    <div className={`font-bold ${darkMode ? 'text-white' : 'text-[#0B3A4A]'}`}>Frame 0</div>
                    <div className={`text-[9px] font-semibold ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`}>Raw Image</div>
                  </div>
                  <div className="text-gray-400 font-bold">→</div>
                  <div className={`p-2 rounded border shadow-xs ${
                    darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30' : 'bg-white border-[#2F7D58]/35'
                  }`}>
                    <div className="text-[10px] text-gray-500 font-bold">t=1</div>
                    <div className={`font-bold ${darkMode ? 'text-white' : 'text-[#0B3A4A]'}`}>Frame 1</div>
                    <div className={`text-[9px] font-semibold ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`}>Context</div>
                  </div>
                  <div className="text-gray-400 font-bold">→</div>
                  <div className={`p-2 rounded border shadow-xs ${
                    darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30' : 'bg-white border-[#2F7D58]/35'
                  }`}>
                    <div className="text-[10px] text-gray-500 font-bold">t=2</div>
                    <div className={`font-bold ${darkMode ? 'text-white' : 'text-[#0B3A4A]'}`}>Frame 2</div>
                    <div className={`text-[9px] font-semibold ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`}>Payment</div>
                  </div>
                  <div className="text-gray-400 font-bold">→</div>
                  <div className={`p-2 rounded border shadow-xs ${
                    darkMode ? 'bg-[#1FB6C9]/20 border-[#1FB6C9]' : 'bg-[#2F7D58]/15 border-[#1E6544]'
                  }`}>
                    <div className={`text-[10px] font-bold ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`}>Aggregator</div>
                    <div className={`font-bold ${darkMode ? 'text-white' : 'text-[#0B3A4A]'}`}>Bayesian Σ</div>
                    <div className={`text-[9px] font-semibold ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`}>Audit</div>
                  </div>
                </div>

                <div className={`p-2.5 rounded border border-dashed text-[10px] ${
                  darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/40 text-gray-300' : 'bg-white border-[#2F7D58]/40 text-[#1E293B]'
                }`}>
                  <span className={`font-bold ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`}>Confidence Score:</span> P(Crime|E) = [P(E|Crime) × P(Crime)] / P(E)
                  <br />
                  <span className="opacity-90 font-medium">Cross-verified across 3 evidentiary nodes • 0.94 Conviction Threshold</span>
                </div>
              </div>

              <div>
                <h3 className={`font-bold text-base flex items-center gap-2 mb-1 ${
                  darkMode ? 'text-white' : 'text-[#0B3A4A]'
                }`}>
                  <Network className={`w-4 h-4 ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`} />
                  Temporal Aggregation
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
                }`}>
                  Real-time time-series analysis with temporal aggregation. POI / Changepoint analysis prevents transient false-positives and builds cumulative conviction across multi-image posts and revolving seller profiles.
                </p>
              </div>
            </div>

            {/* Card 2: A2A Agentic Architecture */}
            <div className={`p-6 rounded-2xl border shadow-sm space-y-4 ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              {/* Architecture Blueprint Diagram */}
              <div className={`rounded-xl border p-4 text-[11px] font-mono select-none overflow-x-auto ${
                darkMode ? 'bg-[#071E28] border-[#1FB6C9]/30 text-white' : 'bg-[#F4F9F6] border-[#2F7D58]/35 text-[#0B3A4A]'
              }`}>
                <div className={`text-center font-bold pb-2 border-b ${
                  darkMode ? 'text-[#9BF0FB] border-[#1FB6C9]/20' : 'text-[#1E6544] border-[#2F7D58]/25'
                }`}>
                  2-Step Dual-Agent Routing with Evidence Verification Loop
                </div>
                
                <div className="grid grid-cols-2 gap-3 py-3 text-center">
                  <div className={`p-2.5 rounded border ${
                    darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30' : 'bg-white border-[#2F7D58]/35'
                  }`}>
                    <div className={`text-[10px] uppercase font-bold ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`}>
                      Agent 1: Triage
                    </div>
                    <div className={`text-[11px] font-bold ${darkMode ? 'text-white' : 'text-[#0B3A4A]'}`}>
                      Intent & Slang Resolver
                    </div>
                    <div className={`text-[9px] mt-1 font-medium ${darkMode ? 'text-gray-400' : 'text-[#475569]'}`}>
                      Parses dialect & emoji ciphers
                    </div>
                  </div>
                  <div className={`p-2.5 rounded border ${
                    darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30' : 'bg-white border-[#2F7D58]/35'
                  }`}>
                    <div className={`text-[10px] uppercase font-bold ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`}>
                      Agent 2: Auditor
                    </div>
                    <div className={`text-[11px] font-bold ${darkMode ? 'text-white' : 'text-[#0B3A4A]'}`}>
                      Forensic Verification
                    </div>
                    <div className={`text-[9px] mt-1 font-medium ${darkMode ? 'text-gray-400' : 'text-[#475569]'}`}>
                      Grounds species to CITES
                    </div>
                  </div>
                </div>

                <div className={`flex items-center justify-center gap-2 py-1 text-[10px] font-bold ${
                  darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'
                }`}>
                  <span>⇄ Bidirectional Thought Exchange</span>
                  <span>•</span>
                  <span>Chain-of-Custody Verification ⇄</span>
                </div>
              </div>

              <div>
                <h3 className={`font-bold text-base flex items-center gap-2 mb-1 ${
                  darkMode ? 'text-white' : 'text-[#0B3A4A]'
                }`}>
                  <GitBranch className={`w-4 h-4 ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`} />
                  A2A Agentic Architecture
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
                }`}>
                  Dual-agent system with bidirectional routing: intent mapping to crime taxonomy and forensic guardrail alignment. Features Web Search and Thinking tools with Chain-of-Thought reasoning for transparent explainability.
                </p>
              </div>
            </div>

            {/* Card 3: Hallucination Prevention */}
            <div className={`p-6 rounded-2xl border shadow-sm space-y-4 ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              {/* Architecture Blueprint Diagram */}
              <div className={`rounded-xl border p-4 text-[11px] font-mono select-none overflow-x-auto ${
                darkMode ? 'bg-[#071E28] border-[#1FB6C9]/30 text-white' : 'bg-[#F4F9F6] border-[#2F7D58]/35 text-[#0B3A4A]'
              }`}>
                <div className={`text-center font-bold pb-2 border-b ${
                  darkMode ? 'text-[#9BF0FB] border-[#1FB6C9]/20' : 'text-[#1E6544] border-[#2F7D58]/25'
                }`}>
                  Multi-Gate Hallucination Guardrail Protocol
                </div>
                
                <div className="flex items-center justify-between gap-1.5 py-3 text-center">
                  <div className={`p-2 rounded border ${
                    darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30' : 'bg-white border-[#2F7D58]/35'
                  }`}>
                    <div className="text-[9px] text-gray-500 font-bold">Gate 1</div>
                    <div className={`text-[10px] font-bold ${darkMode ? 'text-white' : 'text-[#0B3A4A]'}`}>Zero-Shot ViT</div>
                  </div>
                  <div className="text-gray-400 font-bold">→</div>
                  <div className={`p-2 rounded border ${
                    darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30' : 'bg-white border-[#2F7D58]/35'
                  }`}>
                    <div className="text-[9px] text-gray-500 font-bold">Gate 2</div>
                    <div className={`text-[10px] font-bold ${darkMode ? 'text-white' : 'text-[#0B3A4A]'}`}>CITES Grounding</div>
                  </div>
                  <div className="text-gray-400 font-bold">→</div>
                  <div className={`p-2 rounded border ${
                    darkMode ? 'bg-[#1FB6C9]/20 border-[#1FB6C9]' : 'bg-[#2F7D58]/15 border-[#1E6544]'
                  }`}>
                    <div className={`text-[9px] font-bold ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`}>Gate 3</div>
                    <div className={`text-[10px] font-bold ${darkMode ? 'text-white' : 'text-[#0B3A4A]'}`}>Schema JSON</div>
                  </div>
                </div>

                <div className={`p-2 rounded border text-[10px] ${
                  darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30 text-gray-300' : 'bg-white border-[#2F7D58]/30 text-[#1E293B]'
                }`}>
                  <span className={`font-bold ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`}>Verification Result:</span> Zero ungrounded assertions allowed. Non-CITES fauna or legal pets automatically filtered without false positive flags.
                </div>
              </div>

              <div>
                <h3 className={`font-bold text-base flex items-center gap-2 mb-1 ${
                  darkMode ? 'text-white' : 'text-[#0B3A4A]'
                }`}>
                  <ShieldCheck className={`w-4 h-4 ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`} />
                  Hallucination Prevention
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
                }`}>
                  Multi-layer validation system combining context-engineered prompts and strict schema JSON enforcement. Passes detections through a verified CITES database loop to maintain forensic-grade evidentiary rigor.
                </p>
              </div>
            </div>

            {/* Card 4: Computer Vision Pipeline */}
            <div className={`p-6 rounded-2xl border shadow-sm space-y-4 ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              {/* Architecture Blueprint Diagram */}
              <div className={`rounded-xl border p-4 text-[11px] font-mono select-none overflow-x-auto ${
                darkMode ? 'bg-[#071E28] border-[#1FB6C9]/30 text-white' : 'bg-[#F4F9F6] border-[#2F7D58]/35 text-[#0B3A4A]'
              }`}>
                <div className={`text-center font-bold pb-2 border-b ${
                  darkMode ? 'text-[#9BF0FB] border-[#1FB6C9]/20' : 'text-[#1E6544] border-[#2F7D58]/25'
                }`}>
                  Fine-Grained Fauna & Derivative Segmentation
                </div>
                
                <div className="flex items-center justify-between gap-1.5 py-3 text-center">
                  <div className={`p-2 rounded border ${
                    darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30' : 'bg-white border-[#2F7D58]/35'
                  }`}>
                    <div className="text-[9px] text-gray-500 font-bold">Input</div>
                    <div className={`text-[10px] font-bold ${darkMode ? 'text-white' : 'text-[#0B3A4A]'}`}>Multimodal Post</div>
                  </div>
                  <div className="text-gray-400 font-bold">→</div>
                  <div className={`p-2 rounded border ${
                    darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30' : 'bg-white border-[#2F7D58]/35'
                  }`}>
                    <div className="text-[9px] text-gray-500 font-bold">Morphology</div>
                    <div className={`text-[10px] font-bold ${darkMode ? 'text-white' : 'text-[#0B3A4A]'}`}>Part Classifier</div>
                  </div>
                  <div className="text-gray-400 font-bold">→</div>
                  <div className={`p-2 rounded border ${
                    darkMode ? 'bg-[#1FB6C9]/20 border-[#1FB6C9]' : 'bg-[#2F7D58]/15 border-[#1E6544]'
                  }`}>
                    <div className={`text-[9px] font-bold ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`}>Output</div>
                    <div className={`text-[10px] font-bold ${darkMode ? 'text-white' : 'text-[#0B3A4A]'}`}>CITES Dossier</div>
                  </div>
                </div>

                <div className={`p-2 rounded border text-[10px] ${
                  darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30 text-gray-300' : 'bg-white border-[#2F7D58]/30 text-[#1E293B]'
                }`}>
                  <span className={`font-bold ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`}>Target Anatomies:</span> Raw tusks, processed ivory carvings, pangolin keratin scales, tiger bone glue, live exotic avifauna cages.
                </div>
              </div>

              <div>
                <h3 className={`font-bold text-base flex items-center gap-2 mb-1 ${
                  darkMode ? 'text-white' : 'text-[#0B3A4A]'
                }`}>
                  <Eye className={`w-4 h-4 ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`} />
                  Computer Vision Pipeline
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
                }`}>
                  Fine-tuned species identification with Gemini 1.5 Vision and morphological feature extraction. Analyzes packaging containers, obscured watermarks, and derivative parts for authentic contraband recognition.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 6: BOTTOM QUICK BADGES (Exact Replica of Reference) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
          <div className={`px-4 py-3 rounded-xl border text-center text-xs font-semibold shadow-xs ${
            darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30 text-[#9BF0FB]' : 'bg-white border-[#2F7D58]/30 text-[#0B3A4A]'
          }`}>
            <div className="font-bold">Agentic AI</div>
            <div className={`text-[10px] mt-0.5 font-medium ${darkMode ? 'text-[#B0D1DA]' : 'text-[#475569]'}`}>
              Intent mapping & task routing
            </div>
          </div>

          <div className={`px-4 py-3 rounded-xl border text-center text-xs font-semibold shadow-xs ${
            darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30 text-[#9BF0FB]' : 'bg-white border-[#2F7D58]/30 text-[#0B3A4A]'
          }`}>
            <div className="font-bold">Temporal Aggregation</div>
            <div className={`text-[10px] mt-0.5 font-medium ${darkMode ? 'text-[#B0D1DA]' : 'text-[#475569]'}`}>
              POI score drift & frame decay
            </div>
          </div>

          <div className={`px-4 py-3 rounded-xl border text-center text-xs font-semibold shadow-xs ${
            darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30 text-[#9BF0FB]' : 'bg-white border-[#2F7D58]/30 text-[#0B3A4A]'
          }`}>
            <div className="font-bold">Hallucination Guard</div>
            <div className={`text-[10px] mt-0.5 font-medium ${darkMode ? 'text-[#B0D1DA]' : 'text-[#475569]'}`}>
              Context-engineered CITES bounds
            </div>
          </div>

          <div className={`px-4 py-3 rounded-xl border text-center text-xs font-semibold shadow-xs ${
            darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30 text-[#9BF0FB]' : 'bg-white border-[#2F7D58]/30 text-[#0B3A4A]'
          }`}>
            <div className="font-bold">Computer Vision</div>
            <div className={`text-[10px] mt-0.5 font-medium ${darkMode ? 'text-[#B0D1DA]' : 'text-[#475569]'}`}>
              Multi-modal fauna segmentation
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
