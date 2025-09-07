import { SharedLayout } from "@/components/shared-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Calendar, Users } from "lucide-react"
import Link from "next/link"

const caseStudies = [
  {
    id: "ecommerce-revolution",
    title: "E-commerce Revolution",
    client: "FashionForward",
    description: "Complete digital transformation resulting in 450% increase in online sales",
    results: [
      { metric: "Sales Increase", value: "450%" },
      { metric: "Conversion Rate", value: "8.2%" },
      { metric: "ROI", value: "320%" },
    ],
    image: "/ecommerce-fashion-website-modern.png",
    category: "E-commerce",
    color: "bg-primary",
    duration: "6 months",
    teamSize: "8 specialists",
  },
  {
    id: "saas-growth-strategy",
    title: "SaaS Growth Strategy",
    client: "CloudTech Solutions",
    description: "Strategic campaign that tripled user acquisition and reduced CAC by 60%",
    results: [
      { metric: "User Growth", value: "300%" },
      { metric: "CAC Reduction", value: "60%" },
      { metric: "MRR Growth", value: "280%" },
    ],
    image: "/saas-dashboard-analytics-modern.png",
    category: "SaaS",
    color: "bg-accent",
    duration: "8 months",
    teamSize: "6 specialists",
  },
  {
    id: "brand-transformation",
    title: "Brand Transformation",
    client: "GreenLife Organics",
    description: "Complete rebrand and digital strategy that established market leadership",
    results: [
      { metric: "Brand Awareness", value: "180%" },
      { metric: "Market Share", value: "25%" },
      { metric: "Customer Loyalty", value: "92%" },
    ],
    image: "/organic-food-brand-website-green.png",
    category: "Branding",
    color: "bg-secondary",
    duration: "4 months",
    teamSize: "5 specialists",
  },
]

export default function CaseStudiesPage() {
  return (
    <SharedLayout>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-background to-muted/30">
        <div className="container-standard text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6">Our Success Stories</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how we've helped businesses transform their digital presence and achieve remarkable growth through
            strategic marketing and innovative solutions.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <Card
                key={study.id}
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-card border-border"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={study.image || "/placeholder.svg"}
                    alt={study.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className={`absolute top-4 left-4 ${study.color} text-white px-3 py-1 rounded-full text-sm font-medium`}
                  >
                    {study.category}
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-serif font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-primary font-medium text-sm mb-3">{study.client}</p>
                    <p className="text-muted-foreground leading-relaxed mb-4">{study.description}</p>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {study.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {study.teamSize}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {study.results.map((result, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">{result.value}</div>
                        <div className="text-xs text-muted-foreground">{result.metric}</div>
                      </div>
                    ))}
                  </div>

                  <Link href={`/case-studies/${study.id}`}>
                    <Button
                      variant="ghost"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      View Full Case Study
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-standard text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Ready to Write Your Success Story?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss how we can help transform your business and achieve similar results.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary">
              Start Your Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </SharedLayout>
  )
}
