"use client";

import { SiteThemeProvider } from '@/components/sections/ThemeProvider';
import BillboardHero from '@/components/sections/layouts/hero/BillboardHero';
import CtaAbout from '@/components/sections/layouts/about/CtaAbout';
import HowToBuy3D from '@/components/sections/layouts/howtobuy/3DHTB';
import TextGridTokenomics from '@/components/sections/layouts/tokenomics/TextGridTokenomics';
import FooterLogoEmphasisBackgroundGradient from '@/components/footer/FooterLogoEmphasisBackgroundGradient';

export default function Home() {
  return (
    <SiteThemeProvider theme={{ styleVariant: "futuristicAndOutOfBox", colorTemplate: 2, textAnimation: "slide" }}>
      <div id="nav" data-section="nav">
        <NavbarBase
          logoSrc="/images/logo.svg"
          logoAlt="AuroraPulse Logo"
          leftButtonText="Get Notified"
          onLeftButtonClick={() => {}}
          className="bg-transparent"
        />
      </div>

      <div id="hero" data-section="hero" className="scroll-mt-24">
        <BillboardHero
          title="Welcome to AuroraPulse"
          subtitle="Discover the future of crypto"
        />
      </div>

      <div id="about" data-section="about" className="scroll-mt-24">
        <CtaAbout
          title="Get to Know Us"
          descriptions={["We are committed to transparency in crypto trading.", "Join us on this exciting journey.", "Our platform is designed for everyone."]}
        />
      </div>

      <div id="how-to-buy" data-section="how-to-buy" className="scroll-mt-24">
        <HowToBuy3D
          title="How to Buy"
          steps={[
            { title: "Step 1: Create an Account", description: "Sign up on our platform", image: "/images/placeholder1.avif", position: "left", isCenter: false },
            { title: "Step 2: Verify Your Identity", description: "Complete the KYC process", image: "/images/placeholder2.avif", position: "center", isCenter: true },
            { title: "Step 3: Start Trading", description: "Begin your trading journey", image: "/images/placeholder3.avif", position: "right", isCenter: false }
          ]}
        />
      </div>

      <div id="tokenomics" data-section="tokenomics" className="scroll-mt-24">
        <TextGridTokenomics
          title="Tokenomics Overview"
          description="Explore our token distribution and benefits."
          tokenData={[
            { value: "1M", description: "Total Supply" },
            { value: "60%", description: "Circulating Supply" },
            { value: "20%", description: "Team Allocation" },
            { value: "10%", description: "Marketing" },
            { value: "10%", description: "Reserves" }
          ]}
        />
      </div>

      <div id="footer" data-section="footer" className="scroll-mt-24">
        <FooterLogoEmphasisBackgroundGradient
          logoSrc="/images/logo.svg"
          logoAlt="AuroraPulse Logo"
          logoText="AuroraPulse"
          items={[
            { label: "Privacy Policy", onClick: () => {} },
            { label: "Terms of Service", onClick: () => {} },
            { label: "Contact", onClick: () => {} }
          ]}
          className="bg-transparent"
        />
      </div>
    </SiteThemeProvider>
  );
}
