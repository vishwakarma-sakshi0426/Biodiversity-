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
      darkMode ? 'bg-[#061822] text-[#E4F4F5]' : 'bg-[#F7F2E7] text-[#3A5A64]'
    }`}>
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* HEADER SECTION (Matching User Reference Image) */}
        <div className="text-center space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest shadow-sm bg-white/80 border-[#2F7D58]/30 text-[#2F7D58]">
            <span className="w-2 h-2 rounded-full bg-[#2F7D58] animate-pulse" />
            AI ARCHITECTURE & SCIENTIFIC INTELLIGENCE
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight tracking-tight">
            Research & <span className="italic font-light text-[#2F7D58]">Implementation</span>
          </h1>

          <p className="text-sm sm:text-base max-w-2xl mx-auto opacity-80 leading-relaxed font-sans">
            Technical architecture and data-driven solutions for systemic illegal wildlife trade monitoring and autonomous interdiction.
          </p>
        </div>

        {/* SECTION 1: THE REALITY OF GLOBAL WILDLIFE CRIME (4 Metric Boxes) */}
        <div className="space-y-6">
          <h2 className="text-center font-serif text-2xl font-semibold text-[#0B3A4A] dark:text-[#9BF0FB]">
            The Reality of Global Wildlife Crime
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`p-6 rounded-2xl border text-center transition-all hover:scale-[1.02] shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/20'
            }`}>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#2F7D58] dark:text-[#9BF0FB]">
                $23B+
              </div>
              <div className="text-xs font-bold uppercase tracking-wider mt-2 opacity-90">
                Annual Illicit Trade
              </div>
              <div className="text-[11px] opacity-60 mt-1">
                Transnational criminal revenue
              </div>
            </div>

            <div className={`p-6 rounded-2xl border text-center transition-all hover:scale-[1.02] shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/20'
            }`}>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#2F7D58] dark:text-[#9BF0FB]">
                7,000+
              </div>
              <div className="text-xs font-bold uppercase tracking-wider mt-2 opacity-90">
                Targeted Species
              </div>
              <div className="text-[11px] opacity-60 mt-1">
                Mammals, reptiles, flora & marine fauna
              </div>
            </div>

            <div className={`p-6 rounded-2xl border text-center transition-all hover:scale-[1.02] shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/20'
            }`}>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#2F7D58] dark:text-[#9BF0FB]">
                150+
              </div>
              <div className="text-xs font-bold uppercase tracking-wider mt-2 opacity-90">
                Active Trafficking Rings
              </div>
              <div className="text-[11px] opacity-60 mt-1">
                Across SE Asia, Africa & Latin America
              </div>
            </div>

            <div className={`p-6 rounded-2xl border text-center transition-all hover:scale-[1.02] shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/20'
            }`}>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#2F7D58] dark:text-[#9BF0FB]">
                1:1,162
              </div>
              <div className="text-xs font-bold uppercase tracking-wider mt-2 opacity-90">
                Ranger Shortage
              </div>
              <div className="text-[11px] opacity-60 mt-1">
                Ratio of field rangers to protected biomes
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: CORE CHALLENGES ADDRESSED (2x2 Grid with Metric Badges) */}
        <div className="space-y-6">
          <h2 className="text-center font-serif text-2xl font-semibold text-[#0B3A4A] dark:text-[#9BF0FB]">
            Core Challenges Addressed
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Challenge 1 */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between shadow-sm transition-all hover:shadow-md ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/20'
            }`}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#2F7D58]/10 text-[#2F7D58] flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-[#0B3A4A] dark:text-[#E4F4F5]">
                    The Detection Delay
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#2F7D58]/10 text-[#2F7D58] shrink-0">
                  15–30% Early Alert
                </span>
              </div>
              <p className="text-xs sm:text-sm opacity-80 leading-relaxed font-sans">
                By the time physical contraband is seized at container ports, wild breeding populations have already suffered irreversible collapse. Early digital detection at the social-media stage is critical for preemptive interdiction.
              </p>
            </div>

            {/* Challenge 2 */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between shadow-sm transition-all hover:shadow-md ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/20'
            }`}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#2F7D58]/10 text-[#2F7D58] flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-[#0B3A4A] dark:text-[#E4F4F5]">
                    Smuggling Evasion & Dialect Code
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#2F7D58]/10 text-[#2F7D58] shrink-0">
                  +84% Evasion Velocity
                </span>
              </div>
              <p className="text-xs sm:text-sm opacity-80 leading-relaxed font-sans">
                Traffickers constantly rotate obfuscated keywords, phonetic puns, acronyms, and emoji ciphers, rendering static keyword filters and platform blacklist algorithms obsolete within weeks.
              </p>
            </div>

            {/* Challenge 3 */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between shadow-sm transition-all hover:shadow-md ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/20'
            }`}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#2F7D58]/10 text-[#2F7D58] flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-[#0B3A4A] dark:text-[#E4F4F5]">
                    The Information Bottleneck
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#2F7D58]/10 text-[#2F7D58] shrink-0">
                  1–3 Weeks Triage Lag
                </span>
              </div>
              <p className="text-xs sm:text-sm opacity-80 leading-relaxed font-sans">
                Human verification backlogs cause critical intelligence to expire before warrants can be drafted. A digital marketplace lead loses 90% of actionable value once sellers rotate burner accounts after 48 hours.
              </p>
            </div>

            {/* Challenge 4 */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between shadow-sm transition-all hover:shadow-md ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/20'
            }`}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#2F7D58]/10 text-[#2F7D58] flex items-center justify-center">
                    <Coins className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-[#0B3A4A] dark:text-[#E4F4F5]">
                    Cross-Border Jurisdictional Deficit
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#2F7D58]/10 text-[#2F7D58] shrink-0">
                  80% Value Lost
                </span>
              </div>
              <p className="text-xs sm:text-sm opacity-80 leading-relaxed font-sans">
                Syndicates intentionally route procurement, payments, transit, and consumer fulfillment across separate legal jurisdictions, exploiting slow inter-agency requests and disparate evidence standards.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: WHAT WE BRING (4 Horizontal Cards) */}
        <div className="space-y-6">
          <h2 className="text-center font-serif text-2xl font-semibold text-[#0B3A4A] dark:text-[#9BF0FB]">
            What We Bring
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`p-5 rounded-2xl border shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/20'
            }`}>
              <h3 className="font-bold text-sm text-[#0B3A4A] dark:text-[#9BF0FB] mb-2 flex items-center gap-2">
                <Workflow className="w-4 h-4 text-[#2F7D58]" />
                Intelligent Agent System
              </h3>
              <p className="text-xs opacity-80 leading-relaxed">
                Autonomous multi-agent forensic triage, cross-modal verification, and prioritized alert routing for intelligence analysts.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/20'
            }`}>
              <h3 className="font-bold text-sm text-[#0B3A4A] dark:text-[#9BF0FB] mb-2 flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#2F7D58]" />
                Computer Vision Stack
              </h3>
              <p className="text-xs opacity-80 leading-relaxed">
                Fine-grained CITES fauna identification, body-part segmentation (tusks, scales, pelts), and disguised shipping recognition.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/20'
            }`}>
              <h3 className="font-bold text-sm text-[#0B3A4A] dark:text-[#9BF0FB] mb-2 flex items-center gap-2">
                <Network className="w-4 h-4 text-[#2F7D58]" />
                Temporal Confidence Scoring
              </h3>
              <p className="text-xs opacity-80 leading-relaxed">
                Multi-frame post evolution analysis, seller network reputation decay, and cross-platform listing correlation over time.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/20'
            }`}>
              <h3 className="font-bold text-sm text-[#0B3A4A] dark:text-[#9BF0FB] mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2F7D58]" />
                Context-Engineered AI
              </h3>
              <p className="text-xs opacity-80 leading-relaxed">
                Grounded CITES Appendices I/II/III taxonomy, zero-hallucination verification loops, and evidentiary chain-of-custody output.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 4: TECHNICAL ARCHITECTURE (3 Columns) */}
        <div className="space-y-6">
          <h2 className="text-center font-serif text-2xl font-semibold text-[#0B3A4A] dark:text-[#9BF0FB]">
            Technical Architecture
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className={`p-6 rounded-2xl border shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/20'
            }`}>
              <div className="text-xs font-bold uppercase tracking-wider text-[#2F7D58] dark:text-[#9BF0FB] mb-2">
                Frontend
              </div>
              <div className="font-bold text-sm text-[#0B3A4A] dark:text-[#E4F4F5] mb-2">
                React 19 + TypeScript + Vite + Tailwind CSS v4
              </div>
              <p className="text-xs opacity-75 leading-relaxed">
                Hardware-accelerated Three.js 3D Interactive Earth with procedural bathymetry textures, dynamic camera controls, and responsive UI components.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/20'
            }`}>
              <div className="text-xs font-bold uppercase tracking-wider text-[#2F7D58] dark:text-[#9BF0FB] mb-2">
                Backend & Ingestion
              </div>
              <div className="font-bold text-sm text-[#0B3A4A] dark:text-[#E4F4F5] mb-2">
                Node / Express + Python Proxy + REST Endpoints
              </div>
              <p className="text-xs opacity-75 leading-relaxed">
                Scalable asynchronous pipeline handling image normalization, metadata extraction, forensic caching, and real-time incident logging.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/20'
            }`}>
              <div className="text-xs font-bold uppercase tracking-wider text-[#2F7D58] dark:text-[#9BF0FB] mb-2">
                AI / ML Engine
              </div>
              <div className="font-bold text-sm text-[#0B3A4A] dark:text-[#E4F4F5] mb-2">
                Gemini 1.5 Vision + CITES Appendices Heuristics
              </div>
              <p className="text-xs opacity-75 leading-relaxed">
                Multimodal visual understanding combined with heuristic OCR keyword taxonomy, CITES protection tier matching, and calibrated threat confidence.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 5: IMPLEMENTATION DETAILS (4 Technical Cards with Architecture Diagrams) */}
        <div className="space-y-6">
          <h2 className="text-center font-serif text-2xl font-semibold text-[#0B3A4A] dark:text-[#9BF0FB]">
            Implementation Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Temporal Aggregation */}
            <div className={`p-6 rounded-2xl border shadow-sm space-y-4 ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/20'
            }`}>
              {/* Architecture Blueprint Diagram */}
              <div className="rounded-xl border border-[#2F7D58]/30 bg-[#F4F9F6] dark:bg-[#071E28] p-4 text-[11px] font-mono select-none overflow-x-auto">
                <div className="text-center font-bold text-[#2F7D58] dark:text-[#9BF0FB] pb-2 border-b border-[#2F7D58]/20">
                  Time-Series Post Monitoring Window
                </div>
                
                <div className="flex items-center justify-between gap-1 py-4 text-center">
                  <div className="p-2 rounded bg-white dark:bg-[#0B2533] border border-[#2F7D58]/30 shadow-xs">
                    <div className="text-[10px] text-gray-500">t=0</div>
                    <div className="font-semibold text-[#0B3A4A] dark:text-[#E4F4F5]">Frame 0</div>
                    <div className="text-[9px] text-[#2F7D58]">Raw Image</div>
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="p-2 rounded bg-white dark:bg-[#0B2533] border border-[#2F7D58]/30 shadow-xs">
                    <div className="text-[10px] text-gray-500">t=1</div>
                    <div className="font-semibold text-[#0B3A4A] dark:text-[#E4F4F5]">Frame 1</div>
                    <div className="text-[9px] text-[#2F7D58]">Context</div>
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="p-2 rounded bg-white dark:bg-[#0B2533] border border-[#2F7D58]/30 shadow-xs">
                    <div className="text-[10px] text-gray-500">t=2</div>
                    <div className="font-semibold text-[#0B3A4A] dark:text-[#E4F4F5]">Frame 2</div>
                    <div className="text-[9px] text-[#2F7D58]">Payment</div>
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="p-2 rounded bg-[#2F7D58]/10 border border-[#2F7D58] shadow-xs">
                    <div className="text-[10px] text-[#2F7D58]">Aggregator</div>
                    <div className="font-bold text-[#2F7D58] dark:text-[#9BF0FB]">Bayesian Σ</div>
                    <div className="text-[9px] text-[#2F7D58]">Audit</div>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-white dark:bg-[#0B2533] border border-dashed border-[#2F7D58]/40 text-[10px] text-gray-600 dark:text-gray-300">
                  <span className="font-bold text-[#2F7D58]">Confidence Score:</span> P(Crime|E) = [P(E|Crime) × P(Crime)] / P(E)
                  <br />
                  <span className="opacity-75">Cross-verified across 3 evidentiary nodes • 0.94 Conviction Threshold</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-base text-[#0B3A4A] dark:text-[#E4F4F5] flex items-center gap-2 mb-1">
                  <Network className="w-4 h-4 text-[#2F7D58]" />
                  Temporal Aggregation
                </h3>
                <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                  Real-time time-series analysis with temporal aggregation. POI / Changepoint analysis prevents transient false-positives and builds cumulative conviction across multi-image posts and revolving seller profiles.
                </p>
              </div>
            </div>

            {/* Card 2: A2A Agentic Architecture */}
            <div className={`p-6 rounded-2xl border shadow-sm space-y-4 ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/20'
            }`}>
              {/* Architecture Blueprint Diagram */}
              <div className="rounded-xl border border-[#2F7D58]/30 bg-[#F4F9F6] dark:bg-[#071E28] p-4 text-[11px] font-mono select-none overflow-x-auto">
                <div className="text-center font-bold text-[#2F7D58] dark:text-[#9BF0FB] pb-2 border-b border-[#2F7D58]/20">
                  2-Step Dual-Agent Routing with Evidence Verification Loop
                </div>
                
                <div className="grid grid-cols-2 gap-3 py-3 text-center">
                  <div className="p-2.5 rounded bg-white dark:bg-[#0B2533] border border-[#2F7D58]/30">
                    <div className="text-[10px] uppercase font-bold text-[#2F7D58]">Agent 1: Triage</div>
                    <div className="text-[11px] font-semibold text-[#0B3A4A] dark:text-[#E4F4F5]">Intent & Slang Resolver</div>
                    <div className="text-[9px] text-gray-500 mt-1">Parses dialect & emoji ciphers</div>
                  </div>
                  <div className="p-2.5 rounded bg-white dark:bg-[#0B2533] border border-[#2F7D58]/30">
                    <div className="text-[10px] uppercase font-bold text-[#2F7D58]">Agent 2: Auditor</div>
                    <div className="text-[11px] font-semibold text-[#0B3A4A] dark:text-[#E4F4F5]">Forensic Verification</div>
                    <div className="text-[9px] text-gray-500 mt-1">Grounds species to CITES</div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 py-1 text-[10px] text-[#2F7D58]">
                  <span>⇄ Bidirectional Thought Exchange</span>
                  <span>•</span>
                  <span>Chain-of-Custody Verification ⇄</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-base text-[#0B3A4A] dark:text-[#E4F4F5] flex items-center gap-2 mb-1">
                  <GitBranch className="w-4 h-4 text-[#2F7D58]" />
                  A2A Agentic Architecture
                </h3>
                <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                  Dual-agent system with bidirectional routing: intent mapping to crime taxonomy and forensic guardrail alignment. Features Web Search and Thinking tools with Chain-of-Thought reasoning for transparent explainability.
                </p>
              </div>
            </div>

            {/* Card 3: Hallucination Prevention */}
            <div className={`p-6 rounded-2xl border shadow-sm space-y-4 ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/20'
            }`}>
              {/* Architecture Blueprint Diagram */}
              <div className="rounded-xl border border-[#2F7D58]/30 bg-[#F4F9F6] dark:bg-[#071E28] p-4 text-[11px] font-mono select-none overflow-x-auto">
                <div className="text-center font-bold text-[#2F7D58] dark:text-[#9BF0FB] pb-2 border-b border-[#2F7D58]/20">
                  Multi-Gate Hallucination Guardrail Protocol
                </div>
                
                <div className="flex items-center justify-between gap-1.5 py-3 text-center">
                  <div className="p-2 rounded bg-white dark:bg-[#0B2533] border border-[#2F7D58]/30">
                    <div className="text-[9px] text-gray-400">Gate 1</div>
                    <div className="text-[10px] font-bold text-[#0B3A4A] dark:text-[#E4F4F5]">Zero-Shot ViT</div>
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="p-2 rounded bg-white dark:bg-[#0B2533] border border-[#2F7D58]/30">
                    <div className="text-[9px] text-gray-400">Gate 2</div>
                    <div className="text-[10px] font-bold text-[#0B3A4A] dark:text-[#E4F4F5]">CITES Grounding</div>
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="p-2 rounded bg-[#2F7D58]/10 border border-[#2F7D58]">
                    <div className="text-[9px] text-[#2F7D58]">Gate 3</div>
                    <div className="text-[10px] font-bold text-[#2F7D58]">Schema JSON</div>
                  </div>
                </div>

                <div className="p-2 rounded bg-white dark:bg-[#0B2533] border border-[#2F7D58]/20 text-[10px] text-gray-600 dark:text-gray-300">
                  <span className="font-bold text-[#2F7D58]">Verification Result:</span> Zero ungrounded assertions allowed. Non-CITES fauna or legal pets automatically filtered without false positive flags.
                </div>
              </div>

              <div>
                <h3 className="font-bold text-base text-[#0B3A4A] dark:text-[#E4F4F5] flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#2F7D58]" />
                  Hallucination Prevention
                </h3>
                <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                  Multi-layer validation system combining context-engineered prompts and strict schema JSON enforcement. Passes detections through a verified CITES database loop to maintain forensic-grade evidentiary rigor.
                </p>
              </div>
            </div>

            {/* Card 4: Computer Vision Pipeline */}
            <div className={`p-6 rounded-2xl border shadow-sm space-y-4 ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/20'
            }`}>
              {/* Architecture Blueprint Diagram */}
              <div className="rounded-xl border border-[#2F7D58]/30 bg-[#F4F9F6] dark:bg-[#071E28] p-4 text-[11px] font-mono select-none overflow-x-auto">
                <div className="text-center font-bold text-[#2F7D58] dark:text-[#9BF0FB] pb-2 border-b border-[#2F7D58]/20">
                  Fine-Grained Fauna & Derivative Segmentation
                </div>
                
                <div className="flex items-center justify-between gap-1.5 py-3 text-center">
                  <div className="p-2 rounded bg-white dark:bg-[#0B2533] border border-[#2F7D58]/30">
                    <div className="text-[9px] text-gray-400">Input</div>
                    <div className="text-[10px] font-bold text-[#0B3A4A] dark:text-[#E4F4F5]">Multimodal Post</div>
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="p-2 rounded bg-white dark:bg-[#0B2533] border border-[#2F7D58]/30">
                    <div className="text-[9px] text-gray-400">Morphology</div>
                    <div className="text-[10px] font-bold text-[#0B3A4A] dark:text-[#E4F4F5]">Part Classifier</div>
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="p-2 rounded bg-[#2F7D58]/10 border border-[#2F7D58]">
                    <div className="text-[9px] text-[#2F7D58]">Output</div>
                    <div className="text-[10px] font-bold text-[#2F7D58]">CITES Dossier</div>
                  </div>
                </div>

                <div className="p-2 rounded bg-white dark:bg-[#0B2533] border border-[#2F7D58]/20 text-[10px] text-gray-600 dark:text-gray-300">
                  <span className="font-bold text-[#2F7D58]">Target Anatomies:</span> Raw tusks, processed ivory carvings, pangolin keratin scales, tiger bone glue, live exotic avifauna cages.
                </div>
              </div>

              <div>
                <h3 className="font-bold text-base text-[#0B3A4A] dark:text-[#E4F4F5] flex items-center gap-2 mb-1">
                  <Eye className="w-4 h-4 text-[#2F7D58]" />
                  Computer Vision Pipeline
                </h3>
                <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                  Fine-tuned species identification with Gemini 1.5 Vision and morphological feature extraction. Analyzes packaging containers, obscured watermarks, and derivative parts for authentic contraband recognition.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 6: BOTTOM QUICK BADGES (Exact Replica of Reference) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
          <div className={`px-4 py-3 rounded-xl border text-center text-xs font-semibold shadow-xs ${
            darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20 text-[#9BF0FB]' : 'bg-white border-[#2F7D58]/20 text-[#2F7D58]'
          }`}>
            <div className="font-bold">Agentic AI</div>
            <div className="text-[10px] opacity-70 mt-0.5">Intent mapping & task routing</div>
          </div>

          <div className={`px-4 py-3 rounded-xl border text-center text-xs font-semibold shadow-xs ${
            darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20 text-[#9BF0FB]' : 'bg-white border-[#2F7D58]/20 text-[#2F7D58]'
          }`}>
            <div className="font-bold">Temporal Aggregation</div>
            <div className="text-[10px] opacity-70 mt-0.5">POI score drift & frame decay</div>
          </div>

          <div className={`px-4 py-3 rounded-xl border text-center text-xs font-semibold shadow-xs ${
            darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20 text-[#9BF0FB]' : 'bg-white border-[#2F7D58]/20 text-[#2F7D58]'
          }`}>
            <div className="font-bold">Hallucination Guard</div>
            <div className="text-[10px] opacity-70 mt-0.5">Context-engineered CITES bounds</div>
          </div>

          <div className={`px-4 py-3 rounded-xl border text-center text-xs font-semibold shadow-xs ${
            darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20 text-[#9BF0FB]' : 'bg-white border-[#2F7D58]/20 text-[#2F7D58]'
          }`}>
            <div className="font-bold">Computer Vision</div>
            <div className="text-[10px] opacity-70 mt-0.5">Multi-modal fauna segmentation</div>
          </div>
        </div>

      </div>
    </section>
  );
};
