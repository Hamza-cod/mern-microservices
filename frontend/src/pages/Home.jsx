import { Workflow } from "lucide-react"
import FeatureSection from "../components/Geust/FeatureSection"
import HeroSection from "../components/Geust/HeroSection"
import Pricing from "../components/Geust/Pricing"
import Footer from "../components/Geust/Footer"
import Testimonials from "../components/Geust/Testimonials"


function Home() {
  
  return (
    <>
    <div className="max-w-7xl mx-auto pt-20 px-6">
        <HeroSection />
        <FeatureSection />
        <Workflow />
        <Pricing />
        <Testimonials />
        <Footer />
      </div>
    </>
  )
}

export default Home