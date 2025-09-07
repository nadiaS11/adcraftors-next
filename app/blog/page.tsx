import { SharedLayout } from "@/components/shared-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const blogPosts = [
  {
    id: "ai-search-ranking-tactics",
    title: "How to Rank in AI Search in 2025: 6 Tactics from Industry Experts",
    excerpt:
      "AI search traffic is set to overtake traditional search by 2028. Learn 6 proven tactics to improve your AI presence.",
    author: "Industry Experts",
    date: "Aug 21, 2025",
    readTime: "9 min read",
    category: "AI",
    image: "/google-ai-search-marketing.png",
    featured: true,
  },
  {
    id: "track-google-ai-mode-visibility",
    title: "How to Track Your Google AI Mode Visibility with AdCraftors",
    excerpt:
      "Learn how to track your Google AI Mode visibility using AdCraftors. Analyze competitors, track rankings, and grow your presence in AI search.",
    author: "Margarita Loktionova",
    date: "Aug 19, 2025",
    readTime: "6 min read",
    category: "AI",
    image: "/content-marketing-trends-2024.png",
    featured: false,
  },
  {
    id: "google-ai-mode-optimization",
    title: "What Is Google AI Mode? (+ How to Optimize for It in 2025)",
    excerpt:
      "Learn what Google AI Mode is, how it changes SEO, and the key steps you can take to get your content featured in it.",
    author: "Alex Lindley",
    date: "Aug 18, 2025",
    readTime: "9 min read",
    category: "AI",
    image: "/competitor-analysis-business-strategy.png",
    featured: false,
  },
  {
    id: "adcraftors-expert-tips",
    title: "AdCraftors Expert Tips: Real-World Uses You Need to Try",
    excerpt:
      "See how advanced users are unlocking AdCraftors' full potential—from defending SEO in court to building scalable AI workflows and reporting systems.",
    author: "Luke Harsel",
    date: "Aug 27, 2025",
    readTime: "6 min read",
    category: "General SEO",
    image: "/social-media-analytics-roi-measurement.png",
    featured: false,
  },
  {
    id: "search-engine-marketing",
    title: "Search Engine Marketing (SEM): What It Is & How to Do It",
    excerpt:
      "Search engine marketing is a digital marketing practice used to increase your site's visibility in search engines.",
    author: "Carlos Silva",
    date: "Aug 26, 2025",
    readTime: "13 min read",
    category: "General Marketing",
    image: "/email-marketing-automation-workflows.png",
    featured: false,
  },
  {
    id: "guest-posts-guide",
    title: "Guest Posts: What They Are & How to Get Yours Published",
    excerpt: "Guest posts are articles you write and publish on other websites. Here's how to get them.",
    author: "Ana Camarena",
    date: "Aug 21, 2025",
    readTime: "10 min read",
    category: "Content",
    image: "/local-seo-optimization-business.png",
    featured: false,
  },
]

const editorsChoice = [
  {
    title: "What Are Backlinks in SEO & How Do I Get Them?",
    excerpt:
      "Backlinks are links that one site gets from another. They can drive traffic and benefit the linked site's SEO.",
    category: "Link Building",
    readTime: "10 min read",
  },
  {
    title: "The 29 Best Free SEO Tools for 2025",
    excerpt: "The best free SEO tools for 2025 include Keyword Magic Tool, Position Tracking, and Google Analytics 4.",
    category: "General SEO",
    readTime: "12 min read",
  },
]

export default function BlogPage() {
  const featuredPost = blogPosts[0]
  const regularPosts = blogPosts.slice(1)

  return (
    <SharedLayout>
      <section className="section-padding bg-background">
        <div className="container-standard max-w-5xl">
          <div className="space-y-8">
            <Link href={`/blog/${featuredPost.id}`}>
              <article className="bg-card border border-border rounded-xl p-8 mb-12 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                        {featuredPost.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground font-medium">{featuredPost.readTime}</span>
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors cursor-pointer">
                      {featuredPost.title}
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                      <span className="font-semibold text-foreground">{featuredPost.author}</span>
                      <span className="text-muted-foreground/70">{featuredPost.date}</span>
                    </div>
                  </div>
                  <div className="lg:col-span-1">
                    <div className="overflow-hidden rounded-xl">
                      <img
                        src={featuredPost.image || "/placeholder.svg?height=300&width=400"}
                        alt={featuredPost.title}
                        className="w-full h-64 lg:h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>
              </article>
            </Link>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.id}`}>
                    <article className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer h-full">
                      <div className="flex flex-col h-full">
                        <div className="overflow-hidden">
                          <img
                            src={post.image || "/placeholder.svg?height=200&width=300"}
                            alt={post.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-3 flex flex-col flex-grow">
                          <div className="flex items-center gap-3 mb-4">
                            <Badge
                              variant="outline"
                              className={`text-xs font-semibold px-3 py-.5 rounded-xl border-2 ${
                                post.category === "AI"
                                  ? "border-blue-500 text-blue-600 bg-blue-50"
                                  : post.category === "General SEO"
                                    ? "border-green-500 text-green-600 bg-green-50"
                                    : post.category === "General Marketing"
                                      ? "border-purple-500 text-purple-600 bg-purple-50"
                                      : "border-primary text-primary bg-primary/5"
                              }`}
                            >
                              {post.category}
                            </Badge>
                            <span className="text-sm text-muted-foreground font-medium">{post.readTime}</span>
                          </div>
                          <h2 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors mb-3 flex-grow">
                            {post.title}
                          </h2>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-auto pt-4 border-t border-primary/50">
                            <span className="font-semibold text-foreground ">{post.author}</span>
                            <span className="text-muted-foreground/70 ">{post.date}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex justify-center pt-12">
              <Button
                variant="outline"
                className="px-10 py-4 text-base font-semibold bg-card hover:bg-primary hover:text-primary-foreground border-2 border-border hover:border-primary transition-all duration-300 rounded-xl"
              >
                Load more articles
              </Button>
            </div>
          </div>

          <div className="mt-20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-10 text-center border border-primary/20">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              We solve marketing problems with AdCraftors-powered content. You can, too - and get paid for it.
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              Monetize your audience with the AdCraftors Affiliate Program - perfect for creators, agencies & marketers.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              Earn with AdCraftors
            </Button>
            <div className="mt-6 text-base text-muted-foreground">
              <span className="font-bold text-2xl text-primary">+$200</span> Your affiliate income
            </div>
          </div>

          <div className="mt-20">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold text-foreground">Editors' Choice</h2>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      num === 1
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {num}
                  </button>
                ))}
                <span className="text-muted-foreground mx-2">...</span>
                <button className="w-12 h-10 rounded-lg text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200">
                  298
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {editorsChoice.map((post, index) => (
                <article
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all duration-300 group cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className="text-xs font-semibold px-3 py-1.5 rounded-full border-2 border-primary text-primary bg-primary/5"
                      >
                        {post.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground font-medium">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SharedLayout>
  )
}
