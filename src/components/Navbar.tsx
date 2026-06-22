import { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  Shield, 
  Twitter, 
  Sun, 
  Moon, 
  ChevronDown, 
  Lock, 
  Coins, 
  TrendingUp, 
  Sparkles, 
  Heart, 
  Award, 
  HelpingHand,
  Info
} from 'lucide-react';

interface NavbarProps {
  onScanClick: () => void;
  isLightMode: boolean;
  onThemeToggle: () => void;
}

export default function Navbar({ onScanClick, isLightMode, onThemeToggle }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const triggerWhyKarma = (view: 'utility' | 'pillars', tab?: 'support' | 'uplift' | 'impact' | 'help') => {
    const event = new CustomEvent('set-why-karma-view', { detail: { view, tab } });
    window.dispatchEvent(event);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const menuItems = [
    { label: 'Narrative', href: '#narrative' },
    { label: 'Duality', href: '#duality' },
    { label: 'Registry', href: '#registry' },
    { label: 'PFP Overlay', href: '#profile-overlay' },
    { label: 'Treasury', href: '#treasury' },
    { label: 'Karma Gamez 🎮', href: 'https://karmagamez.xyz', external: true },
    { label: 'Utility', href: '#utility' },
  ];

  return (
    <nav
      id="main-nav"
      className={`fixed top-10 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-[#F59E0B] to-amber-400 group-hover:scale-105 transition-transform duration-300 shadow-md shadow-amber-500/20">
              <span className="text-slate-950 font-sans font-bold text-lg select-none">🦋</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-sans font-bold text-base tracking-wide leading-none group-hover:text-[#F59E0B] transition-colors">
                Karma Butterflies
              </span>
              <span className="text-slate-400 font-mono text-[9px] uppercase tracking-widest leading-none mt-1">
                by KarmaScore
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className={
                  item.external 
                    ? 'text-amber-400 hover:text-[#F59E0B] hover:scale-105 font-sans font-black text-xs tracking-wider uppercase transition-all flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-lg' 
                    : 'text-slate-300 hover:text-[#F59E0B] font-sans font-medium text-xs tracking-wider uppercase transition-colors'
                }
              >
                {item.label}
              </a>
            ))}

            {/* Why Karma Dropdown Trigger */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onMouseEnter={() => setDropdownOpen(true)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-sans font-black tracking-wider uppercase transition-all cursor-pointer ${
                  dropdownOpen ? 'text-[#F59E0B] bg-white/5' : 'text-amber-400 hover:text-[#F59E0B]'
                }`}
              >
                <span>Why Karma?</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${dropdownOpen ? 'rotate-180 text-[#F59E0B]' : ''}`} />
              </button>

              {/* Mega Dropdown Menu Container */}
              {dropdownOpen && (
                <div 
                  onMouseLeave={() => setDropdownOpen(false)}
                  className="absolute right-1/2 translate-x-1/2 top-full mt-2 w-[480px] bg-neutral-950 border border-white/10 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.8)] overflow-hidden z-50 p-4 animate-fade-in"
                >
                  <div className="grid grid-cols-2 gap-4">
                    {/* Column 1: Financial & Holder Perks */}
                    <div className="space-y-2 border-r border-white/5 pr-4">
                      <div className="text-[9px] font-mono font-black text-amber-500 uppercase tracking-widest pb-1 border-b border-white/5 flex items-center gap-1.5">
                        <Coins className="w-3 h-3 text-amber-500" />
                        <span>HOLDER UTILITIES</span>
                      </div>
                      
                      <button
                        onClick={() => triggerWhyKarma('utility')}
                        className="w-full text-left p-2 rounded-xl hover:bg-white/5 transition group flex flex-col cursor-pointer"
                      >
                        <span className="text-xs font-sans font-black text-white group-hover:text-amber-400 transition-colors">
                          Why Karma Butterflies?
                        </span>
                        <span className="text-[10px] text-slate-400 leading-normal mt-0.5">
                          How we help normal crypto users out-perform insiders.
                        </span>
                      </button>

                      <button
                        onClick={() => triggerWhyKarma('utility')}
                        className="w-full text-left p-2 rounded-xl hover:bg-white/5 transition group flex flex-col cursor-pointer"
                      >
                        <span className="text-xs font-sans font-black text-white group-hover:text-amber-400 transition-colors flex items-center gap-1">
                          <Lock className="w-3 h-3 text-amber-550" />
                          <span>Private Deal Flow</span>
                        </span>
                        <span className="text-[10px] text-slate-400 leading-normal mt-0.5">
                          Get first access to presales, whitelists, and beta rounds.
                        </span>
                      </button>

                      <button
                        onClick={() => triggerWhyKarma('utility')}
                        className="w-full text-left p-2 rounded-xl hover:bg-white/5 transition group flex flex-col cursor-pointer"
                      >
                        <span className="text-xs font-sans font-black text-white group-hover:text-amber-400 transition-colors flex items-center gap-1">
                          <Coins className="w-3 h-3 text-emerald-400" />
                          <span>Marketing Mining</span>
                        </span>
                        <span className="text-[10px] text-slate-400 leading-normal mt-0.5">
                          Earn real payouts for memes, reviews, and posts.
                        </span>
                      </button>

                      <button
                        onClick={() => triggerWhyKarma('utility')}
                        className="w-full text-left p-2 rounded-xl hover:bg-white/5 transition group flex flex-col cursor-pointer"
                      >
                        <span className="text-xs font-sans font-black text-white group-hover:text-amber-400 transition-colors flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-purple-400" />
                          <span>Revenue Share Vault</span>
                        </span>
                        <span className="text-[10px] text-slate-400 leading-normal mt-0.5">
                          Direct payouts from client fees and AI Defi pools.
                        </span>
                      </button>
                    </div>

                    {/* Column 2: Ecosystem & Mission Pillars */}
                    <div className="space-y-2 pl-1">
                      <div className="text-[9px] font-mono font-black text-emerald-400 uppercase tracking-widest pb-1 border-b border-white/5 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-emerald-400" />
                        <span>ECOSYSTEM PILLARS</span>
                      </div>

                      <button
                        onClick={() => triggerWhyKarma('pillars', 'support')}
                        className="w-full text-left p-2 rounded-xl hover:bg-white/5 transition group flex flex-col cursor-pointer"
                      >
                        <span className="text-xs font-sans font-black text-white group-hover:text-emerald-450 transition-colors flex items-center gap-1">
                          <Heart className="w-3 h-3 text-amber-500" />
                          <span>Support Others</span>
                        </span>
                        <span className="text-[10px] text-slate-400 leading-normal mt-0.5">
                          Providing direct counseling and peer networks.
                        </span>
                      </button>

                      <button
                        onClick={() => triggerWhyKarma('pillars', 'uplift')}
                        className="w-full text-left p-2 rounded-xl hover:bg-white/5 transition group flex flex-col cursor-pointer"
                      >
                        <span className="text-xs font-sans font-black text-white group-hover:text-emerald-450 transition-colors flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-emerald-400" />
                          <span>Uplift Builders</span>
                        </span>
                        <span className="text-[10px] text-slate-400 leading-normal mt-0.5">
                          Free graphics, audits and exposure for good builders.
                        </span>
                      </button>

                      <button
                        onClick={() => triggerWhyKarma('pillars', 'impact')}
                        className="w-full text-left p-2 rounded-xl hover:bg-white/5 transition group flex flex-col cursor-pointer"
                      >
                        <span className="text-xs font-sans font-black text-white group-hover:text-emerald-450 transition-colors flex items-center gap-1">
                          <Award className="w-3 h-3 text-purple-400" />
                          <span>Create Lasting Impact</span>
                        </span>
                        <span className="text-[10px] text-slate-400 leading-normal mt-0.5">
                          Turn constructive deeds into on-chain reputation.
                        </span>
                      </button>

                      <button
                        onClick={() => triggerWhyKarma('pillars', 'help')}
                        className="w-full text-left p-2 rounded-xl hover:bg-white/5 transition group flex flex-col cursor-pointer"
                      >
                        <span className="text-xs font-sans font-black text-white group-hover:text-emerald-450 transition-colors flex items-center gap-1">
                          <HelpingHand className="w-3 h-3 text-cyan-400" />
                          <span>Help to those in Need</span>
                        </span>
                        <span className="text-[10px] text-slate-400 leading-normal mt-0.5">
                          Clean hand-on assistance when times are hard.
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Dropdown Footer Banner */}
                  <div className="mt-3 pt-3 border-t border-white/5 text-center text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                    ⚡ Now the average holder gets paid for contributing.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={onThemeToggle}
              className="p-1.5 text-slate-400 hover:text-[#F59E0B] transition-all rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center cursor-pointer hover:scale-105"
              title={isLightMode ? 'Switch to Dark Mode' : 'Switch to High-Contrast Light Mode'}
            >
              {isLightMode ? (
                <Moon className="w-4 h-4 text-[#F59E0B]" />
              ) : (
                <Sun className="w-4 h-4 text-amber-450 animate-pulse" />
              )}
            </button>

            {/* Social Icons */}
            <a
              href="https://x.com/karmaaiscore"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-slate-400 hover:text-[#F59E0B] transition-colors"
              title="Twitter / X"
            >
              <Twitter className="w-4 h-4" />
            </a>
            
            <button
              id="nav-scan-wallet-btn"
              onClick={onScanClick}
              className="relative px-4 py-2 rounded-xl group overflow-hidden bg-slate-900 border border-[#F59E0B]/30 text-white font-sans font-semibold text-xs tracking-wider uppercase hover:border-[#F59E0B]/80 transition-all duration-300 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#F59E0B]/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] to-amber-300 font-bold">
                Scan Wallet
              </span>
            </button>

            <a
              href="https://gravemint.io/"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-[#F59E0B] text-black hover:bg-amber-400 rounded-xl font-sans font-black text-xs tracking-wider uppercase transition shadow-md hover:scale-102 flex items-center justify-center cursor-pointer font-extrabold"
            >
              Mint ↗
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onThemeToggle}
              className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors"
              title={isLightMode ? 'Dark Theme' : 'Light Theme'}
            >
              {isLightMode ? <Moon className="w-3.5 h-3.5 text-[#F59E0B]" /> : <Sun className="w-3.5 h-3.5 text-amber-405" />}
            </button>
            <button
              onClick={onScanClick}
              className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-[#F59E0B]/10 to-amber-500/15 border border-[#F59E0B]/30 text-[10px] font-bold text-[#F59E0B] uppercase tracking-wider"
            >
              Scan
            </button>
            <a
              href="https://gravemint.io/"
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1.5 rounded-lg bg-white text-black text-[10px] font-black uppercase tracking-wider font-extrabold flex items-center justify-center"
            >
              Mint ↗
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 text-slate-400 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-900 px-4 py-4 animate-fadeIn space-y-3 max-h-[85vh] overflow-y-auto">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className={
                item.external
                  ? 'block py-2 pb-2.5 text-amber-400 hover:text-[#F59E0B] font-sans font-black text-xs tracking-widest uppercase border-b border-white/5 animate-pulse'
                  : 'block py-2 text-slate-300 hover:text-[#F59E0B] font-sans font-medium text-xs tracking-widest uppercase border-b border-white/5'
              }
            >
              {item.label}
            </a>
          ))}

          {/* Multi-tier expanding drawer for "Why Karma" utilities on mobile */}
          <div className="bg-white/5 rounded-2xl p-3 space-y-2 mt-2">
            <button
              onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
              className="w-full flex items-center justify-between text-[#F59E0B] font-sans font-extrabold text-xs tracking-widest uppercase py-1"
            >
              <span>Why Karma Butterflies?</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {mobileDropdownOpen && (
              <div className="space-y-3.5 pt-3 border-t border-white/5 pl-2 animate-fadeIn">
                <button
                  onClick={() => triggerWhyKarma('utility')}
                  className="w-full text-left block text-xs font-semibold text-slate-300 hover:text-[#F59E0B] transition"
                >
                  💡 <span className="underline">Main Overview</span>
                </button>
                <button
                  onClick={() => triggerWhyKarma('utility')}
                  className="w-full text-left block text-xs font-semibold text-slate-300 hover:text-[#F59E0B] transition"
                >
                  🔒 <span className="underline">Private Deal Flow</span>
                </button>
                <button
                  onClick={() => triggerWhyKarma('utility')}
                  className="w-full text-left block text-xs font-semibold text-slate-300 hover:text-[#F59E0B] transition"
                >
                  🪙 <span className="underline">Marketing Mining</span>
                </button>
                <button
                  onClick={() => triggerWhyKarma('utility')}
                  className="w-full text-left block text-xs font-semibold text-slate-300 hover:text-[#F59E0B] transition"
                >
                  📈 <span className="underline">Revenue Share Vault</span>
                </button>
                
                <div className="h-[1px] bg-white/5 my-2" />
                
                <button
                  onClick={() => triggerWhyKarma('pillars', 'support')}
                  className="w-full text-left block text-xs font-semibold text-slate-300 hover:text-[#F59E0B] transition"
                >
                  ❤️ <span className="underline">Support Others</span>
                </button>
                <button
                  onClick={() => triggerWhyKarma('pillars', 'uplift')}
                  className="w-full text-left block text-xs font-semibold text-slate-300 hover:text-[#F59E0B] transition"
                >
                  ✨ <span className="underline">Uplift Builders</span>
                </button>
                <button
                  onClick={() => triggerWhyKarma('pillars', 'impact')}
                  className="w-full text-left block text-xs font-semibold text-slate-300 hover:text-[#F59E0B] transition"
                >
                  🏆 <span className="underline">Create Lasting Impact</span>
                </button>
                <button
                  onClick={() => triggerWhyKarma('pillars', 'help')}
                  className="w-full text-left block text-xs font-semibold text-slate-300 hover:text-[#F59E0B] transition"
                >
                  🤝 <span className="underline">Help in Need</span>
                </button>
              </div>
            )}
          </div>

          <div className="pt-3.5 border-t border-white/5 grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onScanClick();
              }}
              className="w-full text-center py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-sans font-bold text-xs uppercase tracking-wider"
            >
              Scan Wallet
            </button>
            <a
              href="https://gravemint.io/"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-[#F59E0B] text-black font-sans font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1"
            >
              <span>Mint Now</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
