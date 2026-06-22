import { Twitter, Github, Linkedin, Shield, Heart, Zap } from 'lucide-react';
import { TeamMember } from '../types';

export default function TeamBios() {
  const teamMembers: TeamMember[] = [
    {
      id: 'vesper',
      name: 'Vesper Hex',
      role: 'Co-Founder & Chief Protocol Architect',
      bio: 'Spent 7 years designing database clustering logic and decentralized indexing patterns. Vesper directs the multi-chain KarmaScore reputation vectors and is a believer in transparent web3 metrics.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250&h=250',
      badge: 'Nexus',
      twitter: 'https://twitter.com',
      github: 'https://github.com'
    },
    {
      id: 'zephyr',
      name: 'Zephyr Shadow',
      role: 'Lead Blockchain Security Researcher',
      bio: 'Ex-whitehat auditor who specializes in state-machine vulnerability detection and EVM honeypot isolation. Zephyr coordinates the Shadow Butterfly anti-corruption tracker streams.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250&h=250',
      badge: 'Shadow',
      twitter: 'https://twitter.com',
      github: 'https://github.com'
    },
    {
      id: 'aura',
      name: 'Aura Bloom',
      role: 'Creative Director & Swarm Catalyst',
      bio: 'Interactive SVG fine-artist and branding strategist originally focused on algorithmic bio-mimicry. Aura leads the community swarm growth campaigns and designed the procedural butterfly wings.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250&h=250',
      badge: 'Light',
      twitter: 'https://twitter.com',
      github: 'https://github.com'
    }
  ];

  return (
    <section id="team" className="py-24 relative overflow-hidden bg-[#050505] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono text-[#F59E0B] uppercase tracking-widest block mb-1 font-bold">
            Ecosystem Guardians
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-black text-white tracking-tight">
            The Karma Butterflies Core Contributors
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            A distributed network of security analysts, systems architects, and generative artists committed to replacing empty hype with verifiable trust.
          </p>
        </div>

        {/* 3-Column Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-[#1A1A1A] border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Avatar with customized alignment glow rings */}
                <div className="relative mb-6 self-start inline-block">
                  <div className={`absolute -inset-1 rounded-full bg-gradient-to-tr blur opacity-40 group-hover:opacity-75 transition duration-300 ${
                    member.badge === 'Light'
                      ? 'from-[#F59E0B] to-amber-400'
                      : member.badge === 'Shadow'
                      ? 'from-purple-600 to-pink-500'
                      : 'from-[#F59E0B] to-purple-600'
                  }`} />
                  <img
                    src={member.avatar}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-full object-cover border-2 border-[#1A1A1A] relative z-10"
                  />

                  {/* Alignment mini icon */}
                  <span className={`absolute bottom-0 right-0 z-20 w-6 h-6 rounded-full border border-white/5 flex items-center justify-center text-[10px] ${
                    member.badge === 'Light'
                      ? 'bg-amber-950 text-amber-400 font-bold'
                      : member.badge === 'Shadow'
                      ? 'bg-purple-950 text-purple-400 font-bold'
                      : 'bg-stone-900 text-[#F59E0B] font-bold'
                  }`} title={`${member.badge} Alignment Badge`}>
                    {member.badge === 'Light' ? (
                      <Heart className="w-3 h-3 fill-amber-400/20" />
                    ) : member.badge === 'Shadow' ? (
                      <Shield className="w-3 h-3 fill-purple-400/20" />
                    ) : (
                      <Zap className="w-3 h-3 fill-amber-450/20" />
                    )}
                  </span>
                </div>

                {/* Info Text */}
                <div className="space-y-1">
                  <span className={`inline-block text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded border border-white/5 ${
                    member.badge === 'Light'
                      ? 'text-amber-400 bg-amber-950/20'
                      : member.badge === 'Shadow'
                      ? 'text-purple-400 bg-purple-950/20'
                      : 'text-[#F59E0B] bg-orange-950/20'
                  }`}>
                    {member.badge} Core
                  </span>
                  <h3 className="text-lg font-sans font-black text-white tracking-tight pt-1">
                    {member.name}
                  </h3>
                  <p className="text-slate-400 font-sans font-medium text-xs">
                    {member.role}
                  </p>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed mt-4">
                  {member.bio}
                </p>
              </div>

              {/* Social Channels */}
              <div className="flex gap-4 pt-6 border-t border-white/5 mt-6">
                {member.twitter && (
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 px-2 border border-white/5 rounded-lg hover:border-white/20 hover:text-[#F59E0B] text-slate-500 text-xs transition duration-200 flex items-center gap-1.5"
                  >
                    <Twitter className="w-3.5 h-3.5" />
                    <span className="font-mono text-[10px]">twitter</span>
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 px-2 border border-white/5 rounded-lg hover:border-white/20 hover:text-[#F59E0B] text-slate-500 text-xs transition duration-200 flex items-center gap-1.5"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span className="font-mono text-[10px]">github</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
