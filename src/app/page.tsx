"use client";
import { SiteThemeProvider } from '@/components/sections/ThemeProvider';
import NavbarBase from '@/components/navigation/NavbarBase';
import BillboardHero from '@/components/sections/layouts/hero/BillboardHero';
import CtaAbout from '@/components/sections/layouts/about/CtaAbout';
import HowToBuy3D from '@/components/sections/layouts/howtobuy/3DHTB';
import TextGridTokenomics from '@/components/sections/layouts/tokenomics/TextGridTokenomics';
import FooterLogoEmphasisBackgroundGradient from '@/components/footer/FooterLogoEmphasisBackgroundGradient';

export default function Home() {
  const styleVariant = "futuristicAndOutOfBox";
  const colorTemplate = 2;
  const textAnimation = "slide";

  return (
    <SiteThemeProvider theme={{ styleVariant, colorTemplate, textAnimation }}>
      <div id="nav" data-section="nav">
        <NavbarBase
          logoSrc="/images/logo.svg"
          logoAlt="AuroraPulse Logo"
          leftButtonText="Get Notified"
          className="bg-transparent sticky top-0 z-50"
        />
      </div>
      <div id="hero" data-section="hero" className="scroll-mt-24">
        <BillboardHero
          title="Welcome to AuroraPulse"
          subtitle="Dive into the world of crypto with us!"
        />
      </div>
      <div id="about" data-section="about" className="scroll-mt-24">
        <CtaAbout
          title="Learn More About Us"
          descriptions={["We are on a mission to empower users in the crypto space.", "Join the adventure and stay ahead in the digital economy.", "Our platform offers seamless transactions and comprehensive guides."]}
        />
      </div>
      <div id="how-to-buy" data-section="how-to-buy" className="scroll-mt-24">
        <HowToBuy3D
          title="How to Buy"
          steps={[
            { title: "Step 1", description: "Create an account.", image: "/images/placeholder1.avif", position: "left", isCenter: false },
            { title: "Step 2", description: "Verify your identity.", image: "/images/placeholder2.avif", position: "center", isCenter: true },
            { title: "Step 3", description: "Start buying your first tokens.", image: "/images/placeholder3.avif", position: "right", isCenter: false },
          ]}
        />
      </div>
      <div id="tokenomics" data-section="tokenomics" className="scroll-mt-24">
        <TextGridTokenomics
          title="Tokenomics Overview"
          description="Understand the key metrics governing our tokens."
          tokenData={[
            { value: "20M", description: "Total Supply" },
            { value: "8M", description: "Circulating Supply" },
            { value: "12M", description: "Locked Liquidity" },
          ]}
        />
      </div>
      <div id="footer" data-section="footer" className="scroll-mt-24">
        <FooterLogoEmphasisBackgroundGradient
          logoSrc="/images/logo.svg"
          logoAlt="AuroraPulse Logo"
          items={[
            { label: "Privacy Policy", onClick: () => console.log('Navigate to Privacy Policy') },
            { label: "Terms of Service", onClick: () => console.log('Navigate to Terms of Service') },
            { label: "Contact Us", onClick: () => console.log('Navigate to Contact Us') },
          ]}
          logoText="AuroraPulse"
        />
      </div>
    </SiteThemeProvider>
  );
}
