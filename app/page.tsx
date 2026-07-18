import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import WelcomeSection from "@/components/home/WelcomeSection";
import MissionVision from "@/components/home/MissionVision";
import ProcessFlow from "@/components/home/ProcessFlow";
import IndustriesGrid from "@/components/home/IndustriesGrid";
import ServicesOverview from "@/components/home/ServicesOverview";
import ValuesBand from "@/components/home/ValuesBand";
import Testimonials from "@/components/home/Testimonials";
import FeaturedResources from "@/components/home/FeaturedResources";
import EngagementModels from "@/components/home/EngagementModels";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <>
      <Header />
      <div className="hatch-divider" />
      <main>
        <Hero />
        <div className="hatch-divider" />
        <StatsBar />
        <div className="hatch-divider" />
        <WelcomeSection />
        <div className="hatch-divider" />
        <MissionVision />
        <div className="hatch-divider" />
        <ProcessFlow />
        <div className="hatch-divider" />
        <IndustriesGrid />
        <div className="hatch-divider" />
        <ServicesOverview />
        <div className="hatch-divider" />
        <ValuesBand />
        <div className="hatch-divider" />
        <Testimonials />
        <div className="hatch-divider" />
        <FeaturedResources />
        <div className="hatch-divider" />
        <EngagementModels />
        <div className="hatch-divider" />
        <ContactSection />
        <div className="hatch-divider" />
      </main>
      <Footer />
    </>
  );
}
