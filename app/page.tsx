import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import WelcomeSection from "@/components/home/WelcomeSection";
import IndustriesGrid from "@/components/home/IndustriesGrid";
import ServicesOverview from "@/components/home/ServicesOverview";
import ValuesBand from "@/components/home/ValuesBand";
import FeaturedResources from "@/components/home/FeaturedResources";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <WelcomeSection />
        <IndustriesGrid />
        <ServicesOverview />
        <ValuesBand />
        <FeaturedResources />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
