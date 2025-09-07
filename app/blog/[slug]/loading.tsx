import { SharedLayout } from "@/components/shared-layout"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <SharedLayout>
      <article className="py-8">
        {/* Back to Blog */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Skeleton className="h-6 w-32" />
        </div>

        {/* Article Header */}
        <header className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Skeleton className="h-6 w-24 mb-4" />
              <Skeleton className="h-12 w-full mb-4" />
              <Skeleton className="h-12 w-3/4 mb-6" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-2/3" />
            </div>

            <div className="flex items-center gap-6 mb-8">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-20" />
            </div>

            <div className="flex items-center gap-3 mb-8">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>

            <Skeleton className="aspect-video w-full rounded-lg" />
          </div>
        </header>

        {/* Article Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              <div className="lg:col-span-3 space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-8 w-1/2 mt-8" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="lg:col-span-1">
                <Skeleton className="h-48 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </article>
    </SharedLayout>
  )
}
