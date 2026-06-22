import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem } from '../types';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const faqItems: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'What is KarmaScore and how do these butterflies fit in?',
      answer: 'KarmaScore is a decentralized reputation and trust evaluation layer for web3. It aggregates wallets transaction histories, smart contract deployments, and proven community help signals. Karma Butterflies represent the cultural layer of this framework: each butterfly acts as a membership badge, proving you are part of a movement to establish trust, transparency, and accountability in crypto.'
    },
    {
      id: 'faq-2',
      question: 'Are Light Butterflies more valuable than Shadow Butterflies?',
      answer: 'Absolutely not. Light and Shadow are equal partners in our ecosystem duality. Light butterflies represent standard-bearing builders, teachers, and guides. Shadow butterflies represent lessons learned, survival, adaptation, and active exposure of exploits or bad actors. Without darkness, there is no light; mistakes are critical for growth. Both collections bear equivalent governance weights and ecosystem utility.'
    },
    {
      id: 'faq-3',
      question: 'Where will the official NFT minting event take place?',
      answer: 'The official minting contract will be deployed on a high-speed rollup partner launchpad to ensure minimal gas fees. We will post verified links inside our private Alpha circle. This landing page serves as the focal point for reputation and preview scanning. Please check our official channels (Twitter/X) or scan your wallet above to check your preliminary Whitelist rating.'
    },
    {
      id: 'faq-4',
      question: 'How is the wallet score and alignment calculated in the analyzer?',
      answer: 'Our decentralized reputation engine decodes indices like smart contracts deployed (Light Points), helpful forum/developer commits (Helper Points), transaction counts, and gas usage history against rug-risk exposure rates (Shadow Points). This makes characters in your EVM address map deterministically into a unique mathematical butterfly shape and alignment quotient.'
    },
    {
      id: 'faq-5',
      question: 'What concrete rewards do Karma Butterfly holders receive?',
      answer: 'Holders receive special trust multipliers on reputation indexes, entry to private alpha channels, voting rights in safety watchlists, and community bounty rewards for maintaining a safe digital playground. Additionally, our voluntary charity channel operates to clean up the "dirty side" of crypto—assisting scam victims, funding educational resources, and building browser warnings to root out malicious groups.'
    }
  ];

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-[#050505] border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono text-[#F59E0B] uppercase tracking-widest block mb-1 font-bold">
            Answers & Clarity
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            Everything you need to understand about the Karma Butterflies cultural movement, reputation systems, and dual scarcity structure.
          </p>
        </div>

        {/* Collapsible Accordion Block */}
        <div className="space-y-4">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={`border rounded-2xl transition-all duration-300 bg-[#1A1A1A] ${
                  isOpen ? 'border-[#F59E0B]/30' : 'border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${
                      isOpen ? 'text-[#F59E0B]' : 'text-slate-500'
                    }`} />
                    <span className="text-sm sm:text-base font-sans font-semibold text-slate-100 pr-4">
                      {item.question}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#F59E0B] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {/* Animated collapse item */}
                {isOpen && (
                  <div className="px-6 pb-6 pl-15 border-t border-white/5 pt-4 animate-fadeIn">
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
