import { useRef, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import WalletAnalyzer from './components/WalletAnalyzer';
import DualitySection from './components/DualitySection';
import UtilitySection from './components/UtilitySection';
import BroadbandTreasury from './components/TreasuryPool';
import Roadmap from './components/Roadmap';
import TeamBios from './components/TeamBios';
import FAQ from './components/FAQ';
import ButterflyRegistry from './components/ButterflyRegistry';
import SvgButterfly from './components/SvgButterfly';
import ProfileOverlay from './components/ProfileOverlay';
import ManifestoSection from './components/ManifestoSection';
import WhyKarmaExist from './components/WhyKarmaExist';
import { ArrowDown, Flame, ShieldAlert, Sparkles, Network, BookOpen, X, Heart, ExternalLink, Zap, Globe, Twitter, Link, Check, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const analyzerRef = useRef<HTMLDivElement>(null);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [currentLang, setCurrentLang] = useState<'en' | 'es' | 'zh' | 'ja'>('en');

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      const savedLang = localStorage.getItem('language-preference') as 'en' | 'es' | 'zh' | 'ja' | null;
      if (savedLang && ['en', 'es', 'zh', 'ja'].includes(savedLang)) {
        setCurrentLang(savedLang);
      } else {
        const browserLang = navigator.language || (navigator as any).userLanguage || '';
        const lowerLang = browserLang.toLowerCase();
        
        if (lowerLang.startsWith('es')) {
          setCurrentLang('es');
        } else if (lowerLang.startsWith('zh')) {
          setCurrentLang('zh');
        } else if (lowerLang.startsWith('ja')) {
          setCurrentLang('ja');
        } else {
          setCurrentLang('en');
        }
      }
    }
  }, []);

  const handleLanguageChange = (lang: 'en' | 'es' | 'zh' | 'ja') => {
    setCurrentLang(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language-preference', lang);
    }
  };

  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const copyStoryLink = () => {
    const url = typeof window !== 'undefined' ? window.location.href : 'https://karmabutterflies.com';
    navigator.clipboard.writeText(url).then(() => {
      setIsLinkCopied(true);
      setTimeout(() => setIsLinkCopied(false), 2000);
    }).catch((err) => {
      console.error('Failed to copy story link: ', err);
    });
  };

  const [isLightMode, setIsLightMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme-preference') === 'light';
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('theme-preference', isLightMode ? 'light' : 'dark');
    if (isLightMode) {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [isLightMode]);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPromo(true);
    }, 3000); // Trigger right around the 3 second mark!
    return () => clearTimeout(timer);
  }, []);

  const scrollToAnalyzer = () => {
    if (analyzerRef.current) {
      analyzerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const narrativePoints = [
    { type: 'build', text: 'Expose scams & bad actors inside early systems.', icon: ShieldAlert, color: 'text-[#F59E0B] border-white/10 bg-[#1A1A1A] hover:bg-white/5' },
    { type: 'scam', text: 'Reward honesty, developers, & ecosystem builders.', icon: Flame, color: 'text-emerald-400 border-white/10 bg-[#1A1A1A] hover:bg-white/5' },
    { type: 'help', text: 'Celebrate cultural growth & educate newcomers.', icon: Sparkles, color: 'text-cyan-400 border-white/10 bg-[#1A1A1A] hover:bg-white/5' },
    { type: 'ripple', text: 'Enforcing real accountability in the swarm.', icon: Network, color: 'text-purple-400 border-white/10 bg-[#1A1A1A] hover:bg-white/5' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#F59E0B]/30 selection:text-[#F59E0B] overflow-x-hidden pt-10 md:pt-12">
      {/* Premium background static grid coordinates */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none opacity-50" />

      {/* Narrative High-conversion Invitation Announcement Bar */}
      <div className="fixed top-0 left-0 right-0 h-10 bg-[#F59E0B] text-[#050505] px-4 text-center text-xs font-sans font-black tracking-wider flex items-center justify-center gap-2 z-[60] shadow-lg border-b border-amber-600/30">
        <span className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[45vw] sm:max-w-none flex items-center gap-1.5 justify-center">
          <span className="animate-bounce">🦋</span> 
          <span><strong>THE SWARM REVOLUTION:</strong> Helping each other, stopping scams, and sharing rewards.</span>
        </span>
        <button 
          onClick={() => setIsStoryOpen(true)}
          className="underline hover:text-amber-950 transition font-black uppercase text-[10px] tracking-widest ml-1 shrink-0 bg-black/10 px-2 py-0.5 rounded border border-black/10"
        >
          Our Story
        </button>
        <span className="opacity-30">|</span>
        <a 
          href="https://gravemint.io/"
          target="_blank"
          rel="noreferrer"
          className="bg-black text-white hover:bg-neutral-900 px-3 py-1 rounded-full text-[9px] font-mono tracking-widest hover:scale-102 transition-all shrink-0 font-extrabold flex items-center gap-1 shadow shadow-black/80"
        >
          MINT NOW ↗
        </a>
      </div>

      {/* Header Navigation */}
      <Navbar onScanClick={scrollToAnalyzer} isLightMode={isLightMode} onThemeToggle={toggleTheme} />

      {/* Hero Bento Grid Section Container */}
      <header className="relative pt-36 pb-16 md:pt-44 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Dynamic decorative backdrop circles */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F59E0B]/5 rounded-full blur-3xl pointer-events-none" />

        {/* The Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Bento Box 1: Brand / Welcome Badge */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 p-4 opacity-5 pointer-events-none">
              <svg className="w-56 h-56" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l-2 5-5 2 5 2 2 5 2-5 5-2-5-2-2-5z" />
              </svg>
            </div>
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg shadow-black/40">
                <span className="text-xl select-none">🦋</span>
              </div>
              <div>
                <h1 className="text-xl font-display font-black tracking-tight text-white leading-none uppercase">
                  KARMA BUTTERFLIES
                </h1>
                <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest block mt-1">
                  REPUTATION CREDENTIALS
                </span>
              </div>
            </div>
            <div className="space-y-4 mb-6">
              <h2 className="text-lg sm:text-2xl font-sans font-black text-[#F59E0B] tracking-tight leading-tight uppercase">
                Welcome Home, Anonymous Swarm.
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-semibold">
                Whether you're a developer, marketer, project manager, reply guy, alpha caller, trader, or absolute beginner—Karma Butterflies is built for <span className="text-[#F59E0B] font-extrabold">YOU</span>.
              </p>
              <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed font-sans font-medium">
                We're a community united to uplift high-integrity projects, support builders, expose bad actors, and ensure everyday contributors get rewarded. No gatekeeping, no insider privilege—just fair, merit-based karma.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-orange-950/20 border border-[#F59E0B]/25 text-[10px] font-mono font-black text-[#F59E0B] tracking-wider uppercase self-start shadow-md shadow-amber-500/5 hover:scale-102 transition-transform">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
              🦋 EVERY CRYPTO USER BELONGS HERE.
            </div>
          </div>

          {/* Bento Box 2: Hero Brand Focal Panel (Stunning Gold backing) */}
          <div className="lg:col-span-7 bg-[#F59E0B] text-black border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="mb-8">
              <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-black/60 block mb-2">
                Concept Release
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black leading-[0.95] tracking-tighter text-black">
                YOUR WALLET<br />TELLS A STORY.
              </h2>
              <p className="text-sm sm:text-base font-semibold leading-relaxed text-black/80 mt-4 max-w-lg">
                Every action leaves a wingbeat. Transform on-chain reputational footprint history into legacy. We are not just generative art—we are a belief system.
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 border-t border-black/10 pt-6">
              <button
                onClick={scrollToAnalyzer}
                className="px-6 py-3 bg-black text-white hover:bg-neutral-900 rounded-full font-sans font-bold text-xs tracking-wider uppercase transition shadow-md active:scale-97 cursor-pointer text-center whitespace-nowrap"
              >
                Scan Your Alignment
              </button>
              
              <a
                href="https://gravemint.io/"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-white text-black hover:bg-neutral-100 rounded-full font-sans font-black text-xs tracking-wider uppercase transition shadow-md active:scale-97 text-center whitespace-nowrap inline-flex items-center gap-2 border border-black/15 shadow-black/10"
              >
                <span>Mint Butterflies Now</span>
                <span className="text-xs">↗</span>
              </a>

              <p className="hidden md:block text-xs italic font-bold text-black/80 font-mono leading-tight">
                starts with karma.
              </p>
            </div>
          </div>

          {/* Bento Box 3: Generative Art Display */}
          <div className="lg:col-span-4 bg-gradient-to-b from-[#111111] to-[#050505] border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-between min-h-[300px]">
            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest self-start">
              Art Preview • Nexus Seed
            </span>
            <div className="my-4 animate-pulse-glow">
              <SvgButterfly variant="nexus" size={170} flappingSpeed="slow" seed="bento-home-core" />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-gray-400">Generative Butterfly Nexus</p>
              <span className="text-[9px] font-mono text-gray-600 block mt-1">
                procedural canvas engine
              </span>
            </div>
          </div>

          {/* Bento Box 4: The Movement Narrative Checklist */}
          <div className="lg:col-span-8 bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <span className="text-xs font-mono text-gray-550 uppercase tracking-widest font-bold">
                  Ecosystem Alignment
                </span>
                <span className="text-[10px] bg-amber-500/15 px-2.5 py-0.5 rounded border border-[#F59E0B]/20 text-[#F59E0B] font-mono font-bold">
                  🦋 NFTs WITH A PURPOSE
                </span>
              </div>
              
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-slate-500 text-[10px] uppercase tracking-wider block mb-1">WHO WE ARE</span>
                  <h3 className="text-xl sm:text-2xl font-sans font-black text-white tracking-tight leading-snug">
                    Karma Butterflies NFTs are for builders, creators, and believers in a better crypto space.
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-4 bg-black/40 border border-white/5 p-5 rounded-2xl">
                    <span className="font-mono text-[#F59E0B] text-[10px] uppercase tracking-widest block font-extrabold">Ecosystem Family</span>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-300 font-medium">
                      Whether you’re a developer, marketer, project manager, community member, reply guy, trader, educator, or someone looking to learn, Karma Butterflies brings together people with different skills and experiences under one community.
                    </p>
                  </div>

                  <div className="space-y-4 bg-gradient-to-br from-amber-500/5 to-transparent border border-amber-500/15 p-5 rounded-2xl flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="font-mono text-emerald-400 text-[10px] uppercase tracking-widest block font-extrabold">Our Mission</span>
                      <p className="text-xs sm:text-sm leading-relaxed text-slate-300 font-medium">
                        Our mission is to uplift promising projects, support builders, educate newcomers, create meaningful connections, and help expose bad actors who harm the crypto ecosystem.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                  <span className="text-slate-550">
                    Status: Connecting skills to real-world impacts
                  </span>
                  <span className="text-[#F59E0B] font-black">
                    ★ SHAPING THE FUTURE TOGETHER
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Massive Story Button Section (col-span-12) */}
          <div className="lg:col-span-12 mt-2">
            <button 
              onClick={() => setIsStoryOpen(true)}
              className="w-full relative group overflow-hidden bg-gradient-to-r from-stone-950 via-[#121212] to-stone-950 border-2 border-amber-500/30 hover:border-amber-500/80 rounded-2xl p-6 sm:p-8 transition-all duration-300 text-left flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="flex items-start sm:items-center gap-5 relative z-10 w-full md:w-3/4">
                <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-[#F59E0B]/30 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner">
                  📖
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#F59E0B] uppercase tracking-[0.2em] font-extrabold block mb-1.5 animate-pulse">
                    The Human Side of the Swarm
                  </span>
                  <h3 className="text-xl sm:text-2.5xl font-sans font-black text-white group-hover:text-[#F59E0B] transition-colors tracking-tight leading-none mb-2">
                    The Story Behind Karma Butterflies
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl font-medium">
                    This project wasn't born from a marketing plan. It was born during one of the hardest times of my life. Tap to read how community, karma, and healing became real-life wings.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2.5 text-black bg-[#F59E0B] hover:bg-amber-450 font-sans font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg relative z-10 self-start md:self-auto group-hover:scale-105 transition-all w-full sm:w-auto justify-center">
                <span>The Story</span>
                <span className="text-base leading-none">🦋</span>
              </div>
            </button>
          </div>

        </div>
      </header>

      {/* Balanced Duality Section component */}
      <DualitySection />

      {/* Manifesto Section backing quality and support */}
      <ManifestoSection />

      {/* Interactive Impact & Purpose Nexus: Why Karma Butterflies Exist */}
      <WhyKarmaExist />

      {/* Live Interactive Decoder Section component */}
      <section ref={analyzerRef} id="analyzer" className="py-20 relative overflow-hidden bg-[#050505] border-t border-b border-white/10">
        {/* Colorful backgrounds */}
        <div className="absolute top-1/2 left-10 w-96 h-96 rounded-full bg-[#F59E0B]/5 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono text-[#F59E0B] uppercase tracking-widest block mb-2">
              Interactive Decoding Engine
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-black text-white tracking-tight">
              Test your on-chain karma alignment.
            </h2>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              Every wallet tells a story. Paste your EVM audit address below to simulate of how our scoring system scans indexes to craft your unique generative Karma Butterfly shape.
            </p>
          </div>

          <WalletAnalyzer />
        </div>
      </section>

      {/* Complete collection registry & progressive exporter */}
      <ButterflyRegistry />

      {/* Social Identity PFP Customizer suite */}
      <ProfileOverlay />

      {/* Interactive dynamic USDT Treasury Pool matching collective values */}
      <BroadbandTreasury />

      {/* Value Architecture Utility Section component */}
      <UtilitySection />

      {/* Chronological Roadmap Section component */}
      <Roadmap />

      {/* Core Team Bios section component */}
      <TeamBios />

      {/* FAQ Accordion section component */}
      <FAQ />

      {/* Bottom Final CTA Footer Block */}
      <footer className="bg-[#050505] border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main Top footer rows */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-12 border-b border-white/5">
            {/* Logo description */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#F59E0B]">
                  <span className="text-xs select-none">🦋</span>
                </div>
                <div>
                  <span className="text-white font-sans font-bold text-sm tracking-wide block leading-none">
                    Karma Butterflies
                  </span>
                  <span className="text-gray-500 font-mono text-[8px] uppercase tracking-widest mt-1 block">
                    The Cultural Layer Of Trust
                  </span>
                </div>
              </div>
              <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
                We are transitioning from the age of speculation to the age of credentialed reputation. Join the swarms to verify, reward, and protect what is built.
              </p>
              <div className="bg-amber-950/10 border border-[#F59E0B]/10 rounded-xl p-3 max-w-sm space-y-1">
                <span className="text-[9px] font-mono text-[#F59E0B] uppercase tracking-wider block font-black">
                  Multi-Chain Launches
                </span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Community NFT launches will be on <strong className="text-slate-200">Solana</strong>, <strong className="text-slate-200">Hedera</strong>, <strong className="text-slate-200">BSC</strong>, <strong className="text-slate-200">Ethereum</strong>, and <strong className="text-slate-200">Base</strong> chain.
                </p>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                Jump To Section
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a href="#narrative" className="text-slate-400 hover:text-[#F59E0B] transition">Narrative</a>
                <a href="#duality" className="text-slate-400 hover:text-[#F59E0B] transition">Duality</a>
                <a href="#utility" className="text-slate-400 hover:text-[#F59E0B] transition">Utility</a>
                <a href="#roadmap" className="text-slate-400 hover:text-[#F59E0B] transition">Roadmap</a>
                <a href="#team" className="text-slate-400 hover:text-[#F59E0B] transition">Guardians</a>
                <a href="#faq" className="text-slate-400 hover:text-[#F59E0B] transition">FAQ</a>
              </div>
            </div>

            {/* Powerful Vision recap */}
            <div className="md:col-span-4 bg-[#1A1A1A] border border-white/10 p-5 rounded-2xl space-y-2">
              <h4 className="text-[10px] font-mono font-bold text-[#F59E0B] uppercase tracking-widest">
                The Long-Term Vision
              </h4>
              <div className="space-y-1.5 font-sans text-xs">
                <p className="text-slate-200"><strong className="text-white">KarmaScore:</strong> The reputation layer.</p>
                <p className="text-slate-200"><strong className="text-white">Karma Token:</strong> The economic layer.</p>
                <p className="text-slate-200"><strong className="text-white">Karma Butterflies:</strong> The cultural layer.</p>
              </div>
            </div>
          </div>

          {/* Copyright, standard labels */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-5 text-center text-slate-500 font-mono text-[10px] tracking-widest uppercase mt-4 border-t border-white/5">
            <div className="space-y-1 text-left sm:text-center md:text-left">
              <span>© 2026 KARMA BUTTERFLIES. ALL RIGHTS RESERVED.</span>
              <p className="text-slate-400 text-[10px] tracking-normal font-sans normal-case">
                {currentLang === 'es' && (
                  <>
                    Un producto de <span className="text-slate-200 font-semibold">Vilora Labs</span> • Respaldado por{' '}
                    <a href="https://karmascore.xyz" target="_blank" rel="noreferrer" className="text-[#F59E0B] font-bold hover:underline">
                      karmascore.xyz
                    </a>
                  </>
                )}
                {currentLang === 'zh' && (
                  <>
                    <span className="text-slate-200 font-semibold">Vilora Labs</span> 出品 • 由{' '}
                    <a href="https://karmascore.xyz" target="_blank" rel="noreferrer" className="text-[#F59E0B] font-bold hover:underline">
                      karmascore.xyz
                    </a>
                    {' '}提供支持
                  </>
                )}
                {currentLang === 'ja' && (
                  <>
                    <span className="text-slate-200 font-semibold">Vilora Labs</span> の製品 •{' '}
                    <a href="https://karmascore.xyz" target="_blank" rel="noreferrer" className="text-[#F59E0B] font-bold hover:underline">
                      karmascore.xyz
                    </a>
                    {' '}による支援
                  </>
                )}
                {currentLang === 'en' && (
                  <>
                    A product from <span className="text-slate-200 font-semibold">Vilora Labs</span> • Backed by{' '}
                    <a href="https://karmascore.xyz" target="_blank" rel="noreferrer" className="text-[#F59E0B] font-bold hover:underline">
                      karmascore.xyz
                    </a>
                  </>
                )}
                {' '}•{' '}
                <button
                  type="button"
                  onClick={() => setIsTermsOpen(true)}
                  className="text-slate-300 hover:text-[#F59E0B] font-bold hover:underline cursor-pointer transition ml-1"
                >
                  Terms of Use – Disclaimer and Limitation of Liability
                </button>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-slate-400 text-xs tracking-normal font-sans normal-case">
              {/* Interactive Language Selector */}
              <div className="flex items-center gap-1 bg-[#121214] border border-white/5 rounded-xl px-2.5 py-1 text-[10px] font-sans font-bold">
                <Globe className="w-3.5 h-3.5 text-[#F59E0B] mr-1 shrink-0" />
                <button
                  type="button"
                  onClick={() => handleLanguageChange('en')}
                  className={`px-1.5 py-0.5 rounded transition cursor-pointer ${
                    currentLang === 'en' ? 'bg-[#F59E0B] text-black font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageChange('es')}
                  className={`px-1.5 py-0.5 rounded transition cursor-pointer ${
                    currentLang === 'es' ? 'bg-[#F59E0B] text-black font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Spanish (Español) - Scale Preview"
                >
                  ES
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageChange('zh')}
                  className={`px-1.5 py-0.5 rounded transition cursor-pointer ${
                    currentLang === 'zh' ? 'bg-[#F59E0B] text-black font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Chinese (中文) - Scale Preview"
                >
                  ZH
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageChange('ja')}
                  className={`px-1.5 py-0.5 rounded transition cursor-pointer ${
                    currentLang === 'ja' ? 'bg-[#F59E0B] text-black font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Japanese (日本語) - Scale Preview"
                >
                  JA
                </button>
              </div>

              <a 
                href="https://x.com/i/communities/1989241165577613796" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition border border-white/5"
              >
                <span className="text-[#F59E0B] font-extrabold">Foster Community</span>
              </a>
              
              <a 
                href="https://x.com/buzz_bver" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-[#F59E0B] transition border border-[#F59E0B]/20"
              >
                <span>999BVERS: <strong className="text-white">@buzz_bver</strong></span>
              </a>

              <a 
                href="https://x.com/karmaaiscore" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-[#F59E0B] transition border border-[#F59E0B]/20"
              >
                <span>Karma AI: <strong className="text-white">@karmaaiscore</strong></span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Narrative Story Modal */}
      {isStoryOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#090909] border border-white/10 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl p-6 sm:p-10 relative">
            {/* Close button icon */}
            <button 
              onClick={() => setIsStoryOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all text-slate-400 hover:text-white cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Story Header */}
            <div className="mb-8 border-b border-white/5 pb-5">
              <span className="text-[10px] font-mono text-[#F59E0B] uppercase tracking-widest font-black block mb-2">
                ORIGIN STORY
              </span>
              <h2 className="text-2.5xl sm:text-3.5xl font-sans font-black text-white tracking-tight leading-tight">
                The Story Behind Karma Butterflies
              </h2>
            </div>

            {/* Story Content */}
            <div className="space-y-6 text-sm sm:text-base leading-relaxed text-slate-305 font-sans tracking-wide">
              <p className="font-extrabold text-white text-lg">
                Karma Butterflies wasn’t born from a marketing plan.
              </p>
              
              <p className="font-bold text-amber-400">
                It was born during one of the hardest periods of my life.
              </p>

              <blockquote className="border-l-2 border-[#F59E0B] pl-4 py-1 italic text-slate-200">
                Right before this project began, my wife left.
              </blockquote>

              <p>
                Like many people, I was carrying stress, pressure, and responsibilities while trying to build something meaningful. I reached a point where I felt exhausted from constantly asking for appreciation and understanding. Eventually, I stopped talking for a couple of days, hoping the silence would give me time to process everything.
              </p>

              <p className="font-semibold text-slate-250">
                Instead, when I looked up, she was gone.
              </p>

              <p>
                For days, I sent messages trying to understand what happened. Some received little response. Most received none. The reality of the situation hit hard.
              </p>

              <p>
                At the time, I was already documenting parts of my journey inside my Telegram community through messages, videos, and conversations. The people there saw the struggle in real time. They saw the uncertainty, the disappointment, and the questions that followed.
              </p>

              <p className="font-bold text-white">
                But they also saw something else.
              </p>

              <p className="font-black text-xl text-emerald-400 select-none">
                They saw a community come together.
              </p>

              <p>
                People from across the crypto space and the foster community on X reached out with encouragement, support, and kindness. Many of them were strangers. Some became friends. A few became teammates.
              </p>

              <p className="text-[#F59E0B] font-bold">
                They reminded me that pain doesn’t have to create bitterness.
              </p>

              <p className="font-extrabold text-white">
                It can create growth.
              </p>

              <p>
                That idea became the foundation of Karma Butterflies.
              </p>

              <p>
                A butterfly represents transformation. Not because life is perfect, but because challenges can change us into something stronger. The light and dark butterflies represent the reality that both joy and hardship shape who we become.
              </p>

              <p>
                Karma Butterflies is a reminder that every action matters. Every act of kindness creates a ripple. Every setback creates an opportunity to grow. Every person we meet leaves a mark on our journey.
              </p>

              <p className="font-medium text-slate-250">
                This project is dedicated to everyone who helped me keep moving forward when it would have been easier to quit.
              </p>

              {/* Poetic concluding quotes */}
              <div className="mt-8 pt-6 border-t border-white/5 space-y-2 text-center bg-amber-500/5 p-5 rounded-2xl border border-amber-500/10">
                <p className="text-base sm:text-lg font-black text-white italic tracking-tight">
                  “The community became the wings.”
                </p>
                <p className="text-base sm:text-lg font-black text-white italic tracking-tight">
                  “The journey became the butterfly.”
                </p>
                <p className="text-[#F59E0B] text-base sm:text-lg font-black italic tracking-tight">
                  “And the lesson became karma.”
                </p>
              </div>
            </div>

            {/* Share and Close actions bar */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-extrabold flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                  Share Story:
                </span>
                
                {/* Copy Link button */}
                <button
                  type="button"
                  onClick={copyStoryLink}
                  className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-mono font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition cursor-pointer"
                  title="Copy direct story link"
                >
                  {isLinkCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Link className="w-3.5 h-3.5" />
                      <span>Copy link</span>
                    </>
                  )}
                </button>

                {/* Share on X button */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    "Discover the heartbeat and powerful origin story behind Karma Butterflies 🦋—Turning positive action into ecosystem reputation."
                  )}&url=${encodeURIComponent(
                    typeof window !== "undefined" ? window.location.href : "https://karmabutterflies.com"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-mono font-bold text-slate-300 hover:text-[#1DA1F2] flex items-center gap-1.5 transition cursor-pointer"
                  title="Share on X (formerly Twitter)"
                >
                  <Twitter className="w-3.5 h-3.5 text-[#1DA1F2]" />
                  <span>Post to X</span>
                </a>
              </div>

              <button 
                onClick={() => setIsStoryOpen(false)}
                className="w-full sm:w-auto px-6 py-2.5 bg-white text-black hover:bg-slate-200 transition font-sans font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-lg hover:scale-102"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Use – Disclaimer and Limitation of Liability Modal */}
      {isTermsOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#090909] border border-white/10 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl p-6 sm:p-10 relative">
            {/* Close button icon */}
            <button 
              onClick={() => setIsTermsOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all text-slate-400 hover:text-white cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Terms Header */}
            <div className="mb-8 border-b border-white/5 pb-5">
              <span className="text-[10px] font-mono text-[#F59E0B] uppercase tracking-widest font-black block mb-2">
                OFFICIAL DISCLAIMER
              </span>
              <h2 className="text-2.5xl sm:text-3xl font-sans font-black text-white tracking-tight leading-tight">
                Terms of Use – Disclaimer & Liability Limitation
              </h2>
            </div>

            {/* Terms Content */}
            <div className="space-y-6 text-sm text-slate-300 font-sans tracking-wide">
              
              <div className="space-y-2 p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
                <span className="text-[10px] font-mono font-bold text-[#F59E0B] uppercase tracking-wider block">IMPORTANT PROTOCOL DISCLOSURES</span>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Please review this platform disclaimer meticulously. By accessing and interacting with Karma Butterflies and associated modules, you agree to the conditions defined below.
                </p>
              </div>

              {/* Point 1 */}
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-[#F59E0B] font-mono">1.</span> Informational Purposes Only
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Karma Butterflies provides commentary, visibility, discussion, and general information for informational and educational purposes only. Nothing on this platform constitutes financial, investment, legal, or trading advice.
                </p>
              </div>

              {/* Point 2 */}
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-[#F59E0B] font-mono">2.</span> No Endorsement or Recommendation
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Any reference to, discussion of, or visibility given to a project, asset, individual, or activity does not constitute an endorsement, solicitation, recommendation, guarantee, or verification of legitimacy, performance, or value.
                </p>
              </div>

              {/* Point 3 */}
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-[#F59E0B] font-mono">3.</span> Opinions, Not Statements of Fact
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  All content reflects independent opinions, observations, and community perspectives based on publicly available information or voluntary disclosures. Karma Butterflies does not present allegations, determinations of wrongdoing, or statements of fact.
                </p>
              </div>

              {/* Point 4 */}
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-[#F59E0B] font-mono">4.</span> No Market Influence or Coordination
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Karma Butterflies does not coordinate trades, organize buying or selling activity, influence market prices, provide signals, or engage in collective market behavior. Any actions taken by users or third parties are independent and voluntary.
                </p>
              </div>

              {/* Point 5 */}
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-[#F59E0B] font-mono">5.</span> No Fiduciary or Advisory Relationship
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Use of this platform does not create any fiduciary, advisory, broker, promoter, partnership, or agency relationship between Karma Butterflies and any user or third party.
                </p>
              </div>

              {/* Point 6 */}
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-[#F59E0B] font-mono">6.</span> Assumption of Risk
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Users acknowledge that participation in blockchain, digital assets, and online ecosystems involves significant risk. Users assume full responsibility for their decisions, actions, and outcomes.
                </p>
              </div>

              {/* Point 7 */}
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-[#F59E0B] font-mono">7.</span> Limitation of Liability
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  To the fullest extent permitted by law, Karma Butterflies and its operators disclaim all liability for any direct, indirect, incidental, consequential, or special damages, losses, or claims arising from the use of, reliance on, or interaction with the platform or its content.
                </p>
              </div>

              {/* Point 8 */}
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-[#F59E0B] font-mono">8.</span> No Guarantees
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Karma Butterflies makes no representations or warranties regarding accuracy, completeness, reliability, outcomes, or future performance of any information or discussion presented.
                </p>
              </div>

            </div>

            {/* Close footer button */}
            <div className="mt-8 pt-5 border-t border-white/5 flex justify-end">
              <button 
                onClick={() => setIsTermsOpen(false)}
                className="px-6 py-2.5 bg-white text-black hover:bg-slate-200 transition font-sans font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
              >
                Accept and Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3-Second Scroll/Time Promo Card */}
      <AnimatePresence>
        {showPromo && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#111111]/95 backdrop-blur-md border border-[#F59E0B]/40 p-5 rounded-2xl shadow-[0_10px_40px_rgba(245,158,11,0.15)] flex flex-col gap-3.5"
          >
            {/* Close */}
            <button
              onClick={() => setShowPromo(false)}
              className="absolute top-3.5 right-3.5 text-slate-500 hover:text-white transition cursor-pointer"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-[#F59E0B]/30 flex items-center justify-center text-2xl shrink-0 animate-pulse">
                🦋
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-[#F59E0B] uppercase tracking-[0.2em] font-extrabold flex items-center gap-1.5">
                  <span>SWARM EVENT LIVE</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                </span>
                <h4 className="text-sm font-sans font-black text-white tracking-tight">
                  Scan & Mint Butterflies Now!
                </h4>
              </div>
            </div>

            <p className="text-slate-350 text-xs leading-relaxed font-sans font-medium">
              Transform your on-chain journey into reputation. Every action leaves a wingbeat. Join the swarms of self-purifying digital karma.
            </p>

            <div className="flex items-center gap-2.5 pt-2.5 border-t border-white/5">
              <button
                onClick={() => {
                  setShowPromo(false);
                  scrollToAnalyzer();
                }}
                className="flex-1 py-2 bg-neutral-900 border border-white/10 hover:bg-neutral-800 text-white font-sans font-bold text-[10px] uppercase tracking-wider rounded-lg transition-all text-center cursor-pointer"
              >
                Scan First
              </button>
              <a
                href="https://gravemint.io/"
                target="_blank"
                rel="noreferrer"
                onClick={() => setShowPromo(false)}
                className="flex-1 py-2 bg-[#F59E0B] hover:bg-amber-400 text-black font-sans font-black text-[10px] uppercase tracking-wider rounded-lg transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Mint Now</span>
                <span>↗</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

