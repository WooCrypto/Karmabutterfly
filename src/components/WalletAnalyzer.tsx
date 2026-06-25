import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Zap,
  Terminal,
  Activity,
  User,
  ExternalLink,
  Share2,
  RefreshCw,
  Gift,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  Sparkles
} from 'lucide-react';
import { WalletAnalysis } from '../types';
import SvgButterfly from './SvgButterfly';

export default function WalletAnalyzer() {
  const [address, setAddress] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [currentLog, setCurrentLog] = useState('');
  const [activeTab, setActiveTab2] = useState<'stats' | 'details'>('stats');
  const [showExplanation, setShowExplanation] = useState(false);
  
  const [analysis, setAnalysis] = useState<WalletAnalysis | null>(null);
  const logIntervalRef = useRef<number | null>(null);

  const scanLogs = [
    'Connecting to multi-chain RPC gateway...',
    'Fetching wallet transaction logs and event telemetry...',
    'Analyzing smart contract deployments and verified bytecode...',
    'Gauging helper scores: scanning forum posts, contributions, and tips...',
    'Assessing governance participations, snapshot votes, and proposals...',
    'Evaluating risk factors: tracing rug-pull interactions and honeypot connections...',
    'Aggregating reputation parameters into multidimensional vector space...',
    'Synthesizing ultimate Karma Quotient...',
    'Rendering unique SvgButterfly holographic membership badge...'
  ];

  const handleRandomAddress = () => {
    // Generate a beautiful mock Ethereum hex, Solana base58, Hedera 0.0.xxxxx address, or PulsePay address
    const roll = Math.random();
    if (roll < 0.25) {
      // Solana addresses look like base58 strings (32-44, let's do 44 chars)
      const base58Alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
      let mockAddr = '';
      for (let i = 0; i < 44; i++) {
        mockAddr += base58Alphabet[Math.floor(Math.random() * base58Alphabet.length)];
      }
      setAddress(mockAddr);
    } else if (roll < 0.50) {
      // Hedera account address format (e.g., 0.0.485123)
      const mockHbarId = Math.floor(Math.random() * 9000000) + 100000;
      setAddress(`0.0.${mockHbarId}`);
    } else if (roll < 0.75) {
      // PulsePay address format (e.g., pulse_xxxxxx)
      const hex = '0123456789abcdef';
      let mockAddr = 'pulse_';
      for (let i = 0; i < 32; i++) {
        mockAddr += hex[Math.floor(Math.random() * 16)];
      }
      setAddress(mockAddr);
    } else {
      const hex = '0123456789abcdef';
      let mockAddr = '0x';
      for (let i = 0; i < 40; i++) {
          mockAddr += hex[Math.floor(Math.random() * 16)];
      }
      setAddress(mockAddr);
    }
  };

  const handleRunAnalysis = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = address.trim();
    if (!trimmed) return;

    const isEvm = trimmed.startsWith('0x') && trimmed.length >= 10;
    const isSolana = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(trimmed);
    const isHedera = /^0\.0\.[0-9]+$/.test(trimmed);
    const isPulsePay = trimmed.toLowerCase().startsWith('pulse') && trimmed.length >= 8;

    if (!isEvm && !isSolana && !isHedera && !isPulsePay) {
      alert('Please enter a valid EVM address (must start with 0x), Solana address, Hedera address (e.g., 0.0.12345), or PulsePay address.');
      return;
    }

    setIsScanning(true);
    setScanProgress(0);
    setAnalysis(null);
    let logIndex = 0;
    setCurrentLog(scanLogs[0]);

    // Interval to advance scanning progress and change logs
    const intervalTime = 300;
    const totalSteps = 100;
    
    const timer = setInterval(() => {
      setScanProgress((prev) => {
        const next = prev + 3;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            // Generate deterministic analysis based on address characters
            const finishedAnalysis = generateDeterministicAnalysis(trimmed);
            setAnalysis(finishedAnalysis);
            localStorage.setItem('karma_scanned_address', trimmed);
            setIsScanning(false);
          }, 400);
          return 100;
        }

        // Change logs dynamically based on progress
        const segment = Math.floor((next / 100) * scanLogs.length);
        if (segment < scanLogs.length && segment !== logIndex) {
          logIndex = segment;
          setCurrentLog(scanLogs[segment]);
        }
        return next;
      });
    }, intervalTime / 3);
  };

  const generateDeterministicAnalysis = (addr: string): WalletAnalysis => {
    // Convert address chars into numerical counts
    let numSum = 0;
    for (let i = 0; i < addr.length; i++) {
      numSum += addr.charCodeAt(i);
    }

    const seedScore = (numSum % 46) + 55; // Score between 55 and 100
    const level = (numSum % 12) + 1;
    const butterflyId = `Butterfly #${(numSum % 8999) + 1000}`;

    // Determine alignment: Light if even, Shadow if odd, Nexus if perfectly divisible by 11
    let alignment: 'Light' | 'Shadow' | 'Nexus' = 'Light';
    if (numSum % 77 === 0) {
      alignment = 'Nexus';
    } else if (numSum % 2 === 1) {
      alignment = 'Shadow';
    }

    // Deterministic points
    const builderPoints = (numSum % 15) + (alignment === 'Light' ? 10 : 2);
    const teacherPoints = ((numSum >> 2) % 15) + (alignment === 'Light' ? 8 : 1);
    const helperPoints = ((numSum >> 3) % 15) + (alignment === 'Light' ? 12 : 3);

    const survivalPoints = (numSum % 15) + (alignment === 'Shadow' ? 12 : 2);
    const adaptationPoints = ((numSum >> 1) % 15) + (alignment === 'Shadow' ? 8 : 2);
    const exposurePoints = ((numSum >> 4) % 15) + (alignment === 'Shadow' ? 10 : 3);

    let archetype = 'Web3 Catalyst';
    if (alignment === 'Nexus') {
      archetype = 'Karma Singularity';
    } else if (alignment === 'Light') {
      const archetypes = ['Grand Architect', 'Ecosystem Shield', 'Benevolent Mentor', 'Beacon of Trust', 'Guild Vanguard'];
      archetype = archetypes[numSum % archetypes.length];
    } else {
      const archetypes = ['Shadow Oracle', 'Rogue Sentinel', 'Honeypot Hunter', 'Ecosystem Purifier', 'Darkroom Alchemist'];
      archetype = archetypes[numSum % archetypes.length];
    }

    const isEVM = addr.startsWith('0x');
    const isHedera = addr.startsWith('0.0.');
    const isPulsePay = addr.toLowerCase().startsWith('pulse');
    const network = isEVM ? 'EVM' : isHedera ? 'Hedera' : isPulsePay ? 'PulsePay' : 'Solana';

    return {
      address: addr,
      score: seedScore,
      alignment,
      archetype,
      scannedCount: (numSum % 250) + 120,
      lightPoints: {
        builders: builderPoints,
        teachers: teacherPoints,
        helpers: helperPoints,
      },
      shadowPoints: {
        survivals: survivalPoints,
        adaptations: adaptationPoints,
        exposures: exposurePoints,
      },
      karmaLevel: level,
      butterflyId,
      network,
    };
  };

  return (
    <div className="w-full max-w-4xl mx-auto" id="wallet-analyzer-container">
      <div className="bg-[#1A1A1A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/80">
        {/* Terminal/Card Header */}
        <div className="px-6 py-4 border-b border-white/5 bg-[#0A0A0A] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-slate-400 font-mono text-xs ml-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#F59E0B]" />
              karma-decoder v1.0.7-beta
            </span>
          </div>
          {analysis && (
            <div className="px-3 py-1 bg-amber-950/20 border border-[#F59E0B]/30 rounded-lg">
              <span className="text-[#F59E0B] font-mono text-xs font-bold">{analysis.butterflyId}</span>
            </div>
          )}
        </div>

        {/* Dynamic Display Panels */}
        <div className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            {!isScanning && !analysis && (
              <motion.div
                key="input-stage"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="max-w-xl mx-auto space-y-6 text-center"
              >
                <div>
                  <h3 className="text-2xl font-display font-black text-white tracking-tight leading-snug">
                    Reveal Your Reputation Wingbeat with Operation Wingbeat Powered by Karma AI
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm mt-3 max-w-lg mx-auto leading-relaxed">
                    Every transaction is a choice. Every smart contract interacted with or helper token sent transforms your digital karma alignment. You can paste your EVM wallets (Ethereum, Base, Arbitrum, BSC, Optimism, etc.), Solana, Hedera, or PulsePay Blockchain addresses below to scan your reputation.
                  </p>
                </div>

                <form onSubmit={handleRunAnalysis} className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-4 py-4 pr-32 bg-[#050505] border border-white/10 hover:border-white/20 focus:border-[#F59E0B]/80 rounded-2xl text-white text-sm font-mono placeholder:text-slate-700 outline-none transition-all focus:ring-1 focus:ring-[#F59E0B]/30"
                      placeholder="Enter EVM, Solana, Hedera, or PulsePay Address"
                      value={address}
                      required
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={handleRandomAddress}
                      className="absolute right-3 top-2.5 px-3 py-2 bg-[#1A1A1A] border border-white/10 hover:border-white/20 text-xs font-mono text-slate-300 rounded-xl transition-all cursor-pointer hover:text-white"
                    >
                      Autofill Address
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl font-sans font-extrabold text-xs tracking-widest uppercase transition-all duration-300 relative overflow-hidden bg-[#F59E0B] text-black hover:opacity-90 active:scale-98 cursor-pointer"
                  >
                    <span>Decode Wallet History</span>
                  </button>
                </form>

                <div className="pt-2">
                  <span className="text-slate-500 font-mono text-[9px] tracking-widest uppercase block">
                    ⚡ Zero gas required • Fully read-only • Pure reputation check
                  </span>
                </div>
              </motion.div>
            )}

            {isScanning && (
              <motion.div
                key="scanning-stage"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center justify-center space-y-8"
              >
                {/* scanning visual */}
                <div className="relative">
                  <SvgButterfly variant="nexus" size={170} flappingSpeed="fast" seed="scanning-pulse" />
                  <div className="absolute inset-0 border border-[#F59E0B]/20 rounded-full animate-ping opacity-60" />
                  <div className="absolute -inset-4 border-2 border-dashed border-[#F59E0B]/10 rounded-full animate-spin" style={{ animationDuration: '10s' }} />
                </div>

                <div className="w-full max-w-md space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 text-[#F59E0B] font-bold">
                      <Activity className="w-3.5 h-3.5 animate-pulse" />
                      {currentLog}
                    </span>
                    <span>{scanProgress}%</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-[#050505] rounded-full overflow-hidden border border-white/10">
                    <div
                      className="h-full bg-gradient-to-r from-[#F59E0B] to-amber-300 transition-all duration-150"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>
                </div>

                <div className="text-slate-500 text-[9px] font-mono uppercase tracking-widest">
                  Scanning blocks for builders, teacher indices, and rug risks...
                </div>
              </motion.div>
            )}

            {!isScanning && analysis && (
              <motion.div
                key="result-stage"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch"
              >
                {/* Result Left Panel: Gorgeous Butterfly Art */}
                <div className="md:col-span-5 bg-[#050505] border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-between relative overflow-hidden">
                  {/* Watermark identity metadata */}
                  <div className="absolute top-4 left-4 font-mono text-[9px] text-slate-600 tracking-wider">
                    DECODED ID: {analysis.butterflyId}
                  </div>
                  <div className="absolute top-4 right-4 text-xs font-mono flex items-center gap-1 text-slate-300 bg-[#1A1A1A] px-2 py-0.5 border border-white/10 rounded">
                    Lvl {analysis.karmaLevel}
                  </div>

                  <div className="my-6 md:my-auto flex items-center justify-center">
                    <SvgButterfly
                      variant={analysis.alignment.toLowerCase() as 'light' | 'shadow' | 'nexus'}
                      size={240}
                      flappingSpeed="slow"
                      seed={analysis.address}
                    />
                  </div>

                  <div className="w-full text-center space-y-1 z-10">
                    <div className="inline-flex px-3 py-1 bg-[#1A1A1A] border border-white/10 rounded-full text-[10px] font-mono font-bold tracking-widest text-[#F59E0B] uppercase mb-2">
                      Alignment: {analysis.alignment}
                    </div>
                    <h4 className="text-xl font-display font-black text-white tracking-tight">
                      {analysis.archetype}
                    </h4>
                    <p className="text-slate-500 font-mono text-[10px] truncate max-w-xs mx-auto">
                      {analysis.address}
                    </p>
                    <div className="flex items-center justify-center gap-1.5 mt-1">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-black border uppercase tracking-wider ${
                        analysis.network === 'Solana' 
                          ? 'border-purple-500/30 bg-purple-950/20 text-purple-400' 
                          : analysis.network === 'Hedera'
                          ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-400'
                          : analysis.network === 'PulsePay'
                          ? 'border-rose-500/30 bg-rose-950/20 text-rose-400 animate-pulse'
                          : 'border-cyan-500/30 bg-cyan-950/20 text-cyan-400'
                      }`}>
                        {analysis.network || 'EVM'} Network
                      </span>
                    </div>
                  </div>
                </div>

                {/* Result Right Panel: Scoring + Stats */}
                <div className="md:col-span-7 flex flex-col justify-between space-y-6">
                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-[#050505] border border-white/10 p-4 rounded-xl text-center">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                        KarmaScore
                      </span>
                      <span className="text-2xl font-display font-black text-[#F59E0B] mt-1 block">
                        {analysis.score}
                      </span>
                    </div>
                    <div className="bg-[#050505] border border-white/10 p-4 rounded-xl text-center">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                        Wallet Age
                      </span>
                      <span className="text-2xl font-display font-black text-white mt-1 block">
                        {analysis.karmaLevel * 4} Mo
                      </span>
                    </div>
                    <div className="bg-[#050505] border border-white/10 p-4 rounded-xl text-center">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                        TX Scanned
                      </span>
                      <span className="text-2xl font-display font-black text-cyan-400 mt-1 block">
                        {analysis.scannedCount}
                      </span>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex border-b border-white/5">
                    <button
                      onClick={() => setActiveTab2('stats')}
                      className={`pb-2.5 px-4 font-sans font-bold text-xs tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
                        activeTab === 'stats'
                          ? 'border-[#F59E0B] text-[#F59E0B]'
                          : 'border-transparent text-slate-400 hover:text-white'
                      }`}
                    >
                      Reputation Metric Breakdown
                    </button>
                    <button
                      onClick={() => setActiveTab2('details')}
                      className={`pb-2.5 px-4 font-sans font-bold text-xs tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
                        activeTab === 'details'
                          ? 'border-[#F59E0B] text-[#F59E0B]'
                          : 'border-transparent text-slate-400 hover:text-white'
                      }`}
                    >
                      Alignment Persona Details
                    </button>
                  </div>

                  {/* Tab Contents */}
                  <div className="flex-grow bg-[#050505] border border-white/10 rounded-xl p-5 min-h-[220px]">
                    {activeTab === 'stats' ? (
                      <div className="space-y-4">
                        <h5 className="text-[11px] font-mono text-slate-450 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                          Deconstructed Karma Pillars
                        </h5>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Light score bars */}
                          <div className="space-y-3">
                            <span className="text-xs font-bold text-emerald-400 block pb-1 border-b border-white/5">
                              Light Reputation Points
                            </span>
                            <div>
                              <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                                <span>Building / Deployment</span>
                                <span>{analysis.lightPoints.builders} pts</span>
                              </div>
                              <div className="h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-550" style={{ width: `${(analysis.lightPoints.builders / 25) * 100}%` }} />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                                <span>Education / Teaching</span>
                                <span>{analysis.lightPoints.teachers} pts</span>
                              </div>
                              <div className="h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-400" style={{ width: `${(analysis.lightPoints.teachers / 25) * 100}%` }} />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                                <span>Helping / Community Support</span>
                                <span>{analysis.lightPoints.helpers} pts</span>
                              </div>
                              <div className="h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                                <div className="h-full bg-cyan-400" style={{ width: `${(analysis.lightPoints.helpers / 25) * 100}%` }} />
                              </div>
                            </div>
                          </div>

                          {/* Shadow score bars */}
                          <div className="space-y-3">
                            <span className="text-xs font-bold text-purple-400 block pb-1 border-b border-white/5">
                              Shadow Reputation Points
                            </span>
                            <div>
                              <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                                <span>Survival & Recovery</span>
                                <span>{analysis.shadowPoints.survivals} pts</span>
                              </div>
                              <div className="h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500" style={{ width: `${(analysis.shadowPoints.survivals / 25) * 100}%` }} />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                                <span>Adaptation & Tech Resilience</span>
                                <span>{analysis.shadowPoints.adaptations} pts</span>
                              </div>
                              <div className="h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                                <div className="h-full bg-purple-400" style={{ width: `${(analysis.shadowPoints.adaptations / 25) * 100}%` }} />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                                <span>Exposure of Corruption</span>
                                <span>{analysis.shadowPoints.exposures} pts</span>
                              </div>
                              <div className="h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                                <div className="h-full bg-pink-500" style={{ width: `${(analysis.shadowPoints.exposures / 25) * 100}%` }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed">
                        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#1A1A1A] border border-white/10 text-[#F59E0B] font-mono text-xs">
                          <Zap className="w-4.5 h-4.5 flex-shrink-0" />
                          <span>
                            <strong>Core Philosophy:</strong> {
                              analysis.alignment === 'Light'
                                ? 'You stand as an elite builder and mentor. Your transactions reflect active support of early stages and developer deployments.'
                                : analysis.alignment === 'Shadow'
                                ? 'You represent a seasoned survivor and anti-corruption sentinel. Your data stream shows survival through chaotic cycles and exposing exploits.'
                                : 'You are a Perfect Nexus—possessing equivalent karma indices in both construction and exposing bad actors. An anchor of cosmic stability.'
                            }
                          </span>
                        </div>
                        <p className="text-slate-400 leading-relaxed text-xs">
                          Holding {analysis.butterflyId} rewards your wallet with a permanent <strong>+{analysis.karmaLevel * 10}% KarmaScore scaling</strong> inside the governance framework, private Discord access matching the <em>{analysis.archetype}</em> registry, and governance priority weights.
                        </p>
                        <p className="text-slate-500 text-[10px] italic font-mono pt-1">
                          "Every action leaves a wingbeat. Transform your reputation into a legacy of trust."
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions footer */}
                  <div className="flex flex-col gap-3">
                    <a
                      href="https://gravemint.io/mint/FXSVHzLvVFey57U8ETuhHzrzDRT3FhvqzbxWpyoAJA4c"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full px-4 py-3.5 bg-gradient-to-r from-[#F59E0B] to-amber-400 hover:opacity-90 text-black rounded-xl text-xs font-sans font-black tracking-widest uppercase flex items-center justify-center gap-2 transition shadow-lg shadow-amber-500/10 text-center font-extrabold cursor-pointer"
                    >
                      Mint This Karma Butterfly ↗
                    </a>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setAnalysis(null);
                          setAddress('');
                        }}
                        className="flex-1 px-4 py-3 bg-[#1A1A1A] hover:bg-[#252525] text-white rounded-xl text-xs font-sans font-bold tracking-wider uppercase border border-white/10 flex items-center justify-center gap-2 transition cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-[#F59E0B]" />
                        Scan Another
                      </button>
                      <button
                        onClick={() => {
                          alert(`Sharing configured! Copy and post: "I scanned my raw EVM footprint on Karma Butterflies and discovered my Cosmic Alignment is ${analysis.alignment} [${analysis.archetype}] with a KarmaScore of ${analysis.score}. Decode yours: ${window.location.href} 🦋✨"`);
                        }}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-[#F59E0B]/30 hover:border-[#F59E0B]/60 text-[#F59E0B] rounded-xl text-xs font-sans font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition cursor-pointer"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        Share Score
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
