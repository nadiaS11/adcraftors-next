import { SharedLayout } from "@/components/shared-layout"
import { HeroSection } from "@/components/hero-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CaseStudiesPreview } from "@/components/case-studies-preview"
import { FeaturesSection } from "@/components/features-section"
import { CTASection } from "@/components/cta-section"

export default function HomePage() {
  return (
    <SharedLayout>
      <HeroSection />
      <TestimonialsSection />
      <CaseStudiesPreview />
      <FeaturesSection />
      <CTASection />
    </SharedLayout>
  )
}
