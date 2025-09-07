import { SharedLayout } from "@/components/shared-layout"
import { AboutHero } from "@/components/about-hero"
import { TeamSection } from "@/components/team-section"
import { CompanyStats } from "@/components/company-stats"
import { CompanyValues } from "@/components/company-values"
import { CompanyTimeline } from "@/components/company-timeline"

export default function AboutPage() {
  return (
    <SharedLayout>
      <AboutHero />
      <CompanyStats />
      <CompanyValues />
      <CompanyTimeline />
      <TeamSection />
    </SharedLayout>
  )
}
