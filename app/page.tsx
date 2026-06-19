import Header        from "@/components/layout/Header";
import Footer        from "@/components/layout/Footer";
import FloatingButtons from "@/components/ui/FloatingButtons";
import HeroSection     from "@/components/sections/HeroSection";
import SignatureWorks  from "@/components/sections/SignatureWorks";
import AboutSection    from "@/components/sections/AboutSection";
import PortfolioGallery from "@/components/sections/PortfolioGallery";
import Testimonials    from "@/components/sections/Testimonials";
import ContactSection  from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto w-full bg-[#0D0A0F] shadow-2xl relative overflow-hidden">
        <HeroSection />
        <SignatureWorks />
        <AboutSection />
        <PortfolioGallery />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
