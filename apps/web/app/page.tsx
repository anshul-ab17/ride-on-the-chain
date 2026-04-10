'use client';

import { useScroll, useTransform, motion, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Hero3D from '../components/Hero3D';
import { Playfair_Display, Space_Mono } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '700'] });
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'] });

export default function LandingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Scene Opacities & Transforms
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.8]);
  
  const statsOpacity = useTransform(smoothProgress, [0.15, 0.25, 0.45], [0, 1, 0]);
  const statsX = useTransform(smoothProgress, [0.15, 0.25], [100, 0]);

  const featureOpacity = useTransform(smoothProgress, [0.45, 0.55, 0.8], [0, 1, 0]);
  const featureY = useTransform(smoothProgress, [0.45, 0.55], [50, 0]);

  const [progressValue, setProgressValue] = useState(0);
  useEffect(() => {
    return smoothProgress.onChange(v => setProgressValue(v));
  }, [smoothProgress]);

  return (
    <div ref={containerRef} className="scene-container">
      {/* 3D Background Layer */}
      <Hero3D scrollProgress={progressValue} />

      <nav className="glass-nav">
        <div className={spaceMono.className} style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)' }}>
          RIDEX®
        </div>
        <div className="mono" style={{ display: 'flex', gap: '3rem' }}>
          <span>Protocol</span>
          <span>Fleet</span>
          <span>Security</span>
        </div>
      </nav>

      {/* Scene 1: Cinematic Intro */}
      <section className="scene">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale, textAlign: 'center', zIndex: 10 }}
          className="container"
        >
          <div className={`${spaceMono.className} mono`} style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
            Decentralized Mobility
          </div>
          <h1 className={playfair.className} style={{ fontSize: '10vw', lineHeight: 0.9, marginBottom: '2rem' }}>
            On-Chain <br/> <em style={{ color: 'var(--primary)', fontStyle: 'italic' }}>Elegance</em>
          </h1>
          <p style={{ maxWidth: '600px', margin: '0 auto 3rem', color: 'var(--on-surface-variant)', fontSize: '1.2rem', lineHeight: 1.6 }}>
            The first high-fidelity ride-hailing protocol engineered for the Solana ecosystem. 
            Pure logic. Zero middleman. Radical efficiency.
          </p>
          <button className="premium-button">
            ENTER THE PROTOCOL
          </button>
        </motion.div>
      </section>

      {/* Scene 2: Tech Specs */}
      <section className="scene" style={{ background: 'transparent' }}>
        <motion.div 
          style={{ opacity: statsOpacity, x: statsX, zIndex: 10 }}
          className="container"
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10vw' }}>
            <div>
              <h2 className={playfair.className} style={{ fontSize: '5rem', marginBottom: '2rem', lineHeight: 1 }}>
                Real-time <br/> Precision.
              </h2>
              <p style={{ color: 'var(--on-surface-variant)', fontSize: '1.1rem', marginBottom: '3rem' }}>
                Powered by Solana's 65,000 TPS architecture, ensuring sub-second matching and instant settlement.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {[
                { label: "PROTOCOL FEES", value: "1.2%" },
                { label: "AVG CROSS-TIME", value: "0.4s" },
                { label: "SOLANA PDA ESCROW", value: "ACTIVE" }
              ].map((stat, i) => (
                <div key={i} className="stat-card">
                  <div className="mono" style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>{stat.label}</div>
                  <div className={playfair.className} style={{ fontSize: '2.5rem' }}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Scene 3: Feature Chapters */}
      <section className="scene">
        <motion.div 
          style={{ opacity: featureOpacity, y: featureY, zIndex: 10, textAlign: 'center' }}
          className="container"
        >
          <div className="mono" style={{ color: 'var(--primary)', marginBottom: '2rem' }}>
            The Architecture
          </div>
          <h2 className={playfair.className} style={{ fontSize: '8vw', lineHeight: 1, marginBottom: '5rem' }}>
            Trustless by <br/> Design.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem', textAlign: 'left' }}>
            {[
              { title: "Direct P2P", text: "Matches occur directly on-chain, eliminating the 20% commission traps of legacy platforms." },
              { title: "Sovereign Rep", text: "Your rating is an NFT-like asset on the Solana ledger. You own your trust score." },
              { title: "Liquid Payouts", text: "Drivers receive SOL the moment the ride is complete. No waiting for weekly deposits." }
            ].map((f, i) => (
              <div key={i}>
                <h3 className={playfair.className} style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>{f.title}</h3>
                <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8 }}>{f.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Scene 4: Footer / CTA */}
      <section className="scene">
         <div style={{ textAlign: 'center' }}>
           <h2 className={playfair.className} style={{ fontSize: '6vw', marginBottom: '2rem' }}>Ready to Move?</h2>
           <button className="premium-button">CONNECT PHANTOM</button>
           <div className="mono" style={{ marginTop: '5rem', opacity: 0.3 }}>
             © 2026 RideX Protocol // Bangalore // SF // Singapore
           </div>
         </div>
      </section>

      <div className="solana-pulse" style={{ bottom: '10%', right: '10%' }} />
      <div className="solana-pulse" style={{ top: '20%', left: '-10%', opacity: 0.05 }} />
    </div>
  );
}
