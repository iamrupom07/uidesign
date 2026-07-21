import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import CapabilitiesStrip from "@/components/home/CapabilitiesStrip";
import StatsBar from "@/components/home/StatsBar";
import WelcomeSection from "@/components/home/WelcomeSection";
import MissionVision from "@/components/home/MissionVision";
import ProcessFlow from "@/components/home/ProcessFlow";
import IndustriesGrid from "@/components/home/IndustriesGrid";
import ServicesOverview from "@/components/home/ServicesOverview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ValuesBand from "@/components/home/ValuesBand";
import Testimonials from "@/components/home/Testimonials";
import FeaturedResources from "@/components/home/FeaturedResources";
import EngagementModels from "@/components/home/EngagementModels";
import FAQ from "@/components/home/FAQ";
import CTABanner from "@/components/home/CTABanner";
import ContactSection from "@/components/home/ContactSection";
import TechnicalCursor from "@/components/ui/TechnicalCursor";

export default function Home() {
  return (
    <>
      <TechnicalCursor />
      <Header />

      <main>
        <Hero />
        <CapabilitiesStrip />
        <StatsBar />
        <WelcomeSection />
        <MissionVision />
        <ProcessFlow />
        <IndustriesGrid />
        <ServicesOverview />
        <WhyChooseUs />
        <ValuesBand />
        <Testimonials />
        <FeaturedResources />
        <EngagementModels />
        <FAQ />
        <CTABanner />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
