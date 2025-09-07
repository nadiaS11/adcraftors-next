import { SharedLayout } from "@/components/shared-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Calendar, Users, Target, CheckCircle } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

const caseStudyData = {
  "ecommerce-revolution": {
    id: "ecommerce-revolution",
    title: "E-commerce Revolution",
    client: "FashionForward",
    industry: "Fashion & Retail",
    description: "Complete digital transformation resulting in 450% increase in online sales",
    challenge:
      "FashionForward was struggling with an outdated e-commerce platform, poor user experience, and declining online sales. Their conversion rate was below industry standards, and they were losing customers to competitors with more modern digital experiences.",
    solution:
      "We implemented a comprehensive digital transformation strategy including a complete website redesign, advanced analytics implementation, personalized marketing campaigns, and conversion rate optimization techniques.",
    results: [
      { metric: "Sales Increase", value: "450%", description: "Total online revenue growth" },
      { metric: "Conversion Rate", value: "8.2%", description: "Up from 1.8% baseline" },
      { metric: "ROI", value: "320%", description: "Return on marketing investment" },
      { metric: "Page Load Speed", value: "2.1s", description: "Improved from 8.3s" },
      { metric: "Mobile Traffic", value: "75%", description: "Increase in mobile conversions" },
      { metric: "Customer Retention", value: "65%", description: "Repeat purchase rate" },
    ],
    image: "/ecommerce-fashion-website-modern.png",
    category: "E-commerce",
    color: "bg-primary",
    duration: "6 months",
    teamSize: "8 specialists",
    services: ["Web Development", "UX/UI Design", "Digital Marketing", "Analytics", "SEO Optimization"],
    technologies: ["Next.js", "Shopify Plus", "Google Analytics 4", "Facebook Ads", "Google Ads"],
    testimonial: {
      quote:
        "AdCraftors transformed our entire digital presence. The results exceeded our wildest expectations, and our online sales have never been stronger.",
      author: "Sarah Johnson",
      position: "CEO, FashionForward",
    },
  },
  "saas-growth-strategy": {
    id: "saas-growth-strategy",
    title: "SaaS Growth Strategy",
    client: "CloudTech Solutions",
    industry: "Software & Technology",
    description: "Strategic campaign that tripled user acquisition and reduced CAC by 60%",
    challenge:
      "CloudTech Solutions faced high customer acquisition costs, low conversion rates from trial to paid subscriptions, and struggled to scale their user base effectively in a competitive SaaS market.",
    solution:
      "We developed a comprehensive growth strategy focusing on content marketing, product-led growth tactics, conversion funnel optimization, and targeted advertising campaigns across multiple channels.",
    results: [
      { metric: "User Growth", value: "300%", description: "Monthly active users increase" },
      { metric: "CAC Reduction", value: "60%", description: "Customer acquisition cost decrease" },
      { metric: "MRR Growth", value: "280%", description: "Monthly recurring revenue growth" },
      { metric: "Trial Conversion", value: "35%", description: "Trial to paid conversion rate" },
      { metric: "Churn Reduction", value: "45%", description: "Monthly churn rate improvement" },
      { metric: "LTV Increase", value: "180%", description: "Customer lifetime value growth" },
    ],
    image: "/saas-dashboard-analytics-modern.png",
    category: "SaaS",
    color: "bg-accent",
    duration: "8 months",
    teamSize: "6 specialists",
    services: ["Growth Marketing", "Content Strategy", "Conversion Optimization", "Product Marketing", "Analytics"],
    technologies: ["HubSpot", "Mixpanel", "Intercom", "LinkedIn Ads", "Content Management"],
    testimonial: {
      quote:
        "The growth strategy AdCraftors implemented was game-changing. We've achieved sustainable, scalable growth that continues to compound month over month.",
      author: "Michael Chen",
      position: "Founder, CloudTech Solutions",
    },
  },
  "brand-transformation": {
    id: "brand-transformation",
    title: "Brand Transformation",
    client: "GreenLife Organics",
    industry: "Organic Food & Wellness",
    description: "Complete rebrand and digital strategy that established market leadership",
    challenge:
      "GreenLife Organics had a fragmented brand identity, limited market presence, and struggled to communicate their value proposition effectively to health-conscious consumers in a crowded organic food market.",
    solution:
      "We executed a complete brand transformation including new visual identity, messaging strategy, website redesign, and integrated marketing campaigns across digital and traditional channels.",
    results: [
      { metric: "Brand Awareness", value: "180%", description: "Unaided brand recognition increase" },
      { metric: "Market Share", value: "25%", description: "Regional market share captured" },
      { metric: "Customer Loyalty", value: "92%", description: "Net Promoter Score" },
      { metric: "Social Engagement", value: "400%", description: "Social media engagement growth" },
      { metric: "Website Traffic", value: "350%", description: "Organic website traffic increase" },
      { metric: "Sales Growth", value: "220%", description: "Overall sales increase" },
    ],
    image: "/organic-food-brand-website-green.png",
    category: "Branding",
    color: "bg-secondary",
    duration: "4 months",
    teamSize: "5 specialists",
    services: ["Brand Strategy", "Visual Identity", "Website Design", "Content Marketing", "Social Media"],
    technologies: ["Adobe Creative Suite", "WordPress", "Instagram", "Facebook", "Email Marketing"],
    testimonial: {
      quote:
        "AdCraftors didn't just redesign our brand – they helped us discover who we truly are. The transformation has been incredible for our business and our customers love the new direction.",
      author: "Emily Rodriguez",
      position: "Marketing Director, GreenLife Organics",
    },
  },
}

export default function CaseStudyDetailPage({ params }: { params: { slug: string } }) {
  const caseStudy = caseStudyData[params.slug as keyof typeof caseStudyData]

  if (!caseStudy) {
    notFound()
  }

  return (
    <SharedLayout>
      {/* Header */}
      <section className="relative bg-gradient-to-br from-primary/10 to-accent/10 section-padding">
        <div className="container-standard">
          <Link href="/case-studies" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Case Studies
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className={`inline-block ${caseStudy.color} text-white px-4 py-2 rounded-full text-sm font-medium mb-4`}
              >
                {caseStudy.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">{caseStudy.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{caseStudy.description}</p>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{caseStudy.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{caseStudy.teamSize}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  <span>{caseStudy.industry}</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src={caseStudy.image || "/placeholder.svg"}
                alt={caseStudy.title}
                className="w-full h-80 object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results Overview */}
      <section className="section-padding bg-muted/30">
        <div className="container-standard">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Key Results</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {caseStudy.results.map((result, index) => (
              <Card key={index} className="text-center p-6">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{result.value}</div>
                <div className="font-medium text-foreground mb-1">{result.metric}</div>
                <div className="text-sm text-muted-foreground">{result.description}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="section-padding">
        <div className="container-standard">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">The Challenge</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{caseStudy.challenge}</p>
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">Our Solution</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{caseStudy.solution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services & Technologies */}
      <section className="section-padding bg-muted/30">
        <div className="container-standard">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8">
              <h3 className="text-2xl font-serif font-bold mb-6">Services Provided</h3>
              <div className="space-y-3">
                {caseStudy.services.map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-serif font-bold mb-6">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {caseStudy.technologies.map((tech, index) => (
                  <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-padding">
        <div className="container-narrow text-center">
          <blockquote className="text-2xl md:text-3xl font-serif text-foreground mb-8 leading-relaxed">
            "{caseStudy.testimonial.quote}"
          </blockquote>
          <div className="text-lg">
            <div className="font-semibold text-foreground">{caseStudy.testimonial.author}</div>
            <div className="text-muted-foreground">{caseStudy.testimonial.position}</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-standard text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Ready for Similar Results?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss how we can help transform your business like we did for {caseStudy.client}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/case-studies">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                View More Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </SharedLayout>
  )
}
