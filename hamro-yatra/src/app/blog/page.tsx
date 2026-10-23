import { connectDB } from "@/lib/db";
import { Blog } from "@/models/blog";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Eye, ArrowRight } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/json-ld";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Nepal Travel Blog - Trekking Guides, Adventure Tips & Stories | Hamro Yatra",
  description:
    "Expert Nepal travel guides from experienced trekkers. EBC & ABC trekking tips, Scorpio rental advice, best time to visit Nepal, paragliding guides & more. 26+ years experience.",
  path: "/blog",
  keywords: [
    "Nepal travel blog",
    "Nepal trekking guide",
    "Everest Base Camp guide",
    "Annapurna Base Camp tips",
    "Nepal travel tips 2026",
    "best time trek Nepal",
    "Scorpio rental Pokhara guide",
    "paragliding Pokhara blog",
    "Nepal adventure blog",
    "Himalayan trekking advice",
    "Nepal tour planning",
    "trek difficulty Nepal",
    "altitude sickness prevention",
    "Nepal travel planning blog",
  ],
});

async function getBlogs() {
  await connectDB();
  const blogs = await Blog.find({ status: "published" })
    .sort({ featured: -1, createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(blogs));
}

async function getCategories() {
  await connectDB();
  const categories = await Blog.distinct("category", { status: "published" });
  return categories;
}

export default async function BlogPage() {
  const blogs = await getBlogs();
  const categories = await getCategories();
  const featuredPost = blogs[0];
  const recentPosts = blogs.slice(1);

  // JSON-LD for blog listing page
  const blogListJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Hamro Yatra Adventure Travel Blog",
    description: "Expert Nepal travel guides, trekking tips, and adventure stories from experienced guides",
    url: "https://hamroyatraadventure.com/blog",
    publisher: {
      "@type": "Organization",
      name: "Hamro Yatra Adventure",
      logo: {
        "@type": "ImageObject",
        url: "https://hamroyatraadventure.com/hamro%20yatra.jpeg",
      },
    },
    blogPost: blogs.slice(0, 10).map((post: typeof featuredPost) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: post.featuredImage,
      datePublished: post.createdAt,
      dateModified: post.updatedAt,
      author: {
        "@type": "Person",
        name: post.author.name,
      },
      publisher: {
        "@type": "Organization",
        name: "Hamro Yatra Adventure",
      },
      url: `https://hamroyatraadventure.com/blog/${post.slug}`,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://hamroyatraadventure.com/blog/${post.slug}`,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://hamroyatraadventure.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://hamroyatraadventure.com/blog",
      },
    ],
  };

  return (
    <div>
      <JsonLd data={blogListJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nepal Travel Blog & Trekking Guides
            </h1>
            <p className="text-lg text-white/90 max-w-2xl">
              Expert trekking guides, travel tips, and adventure stories from experienced Himalayan guides. 26+ years of Nepal travel expertise.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-wrap gap-2">
              <Link
                href="/blog"
                className="px-4 py-2 rounded-full text-sm font-medium bg-orange-100 text-orange-700"
              >
                All Posts
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/blog?category=${encodeURIComponent(category)}`}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Featured Story
              </h2>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="block group"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="relative h-80 rounded-xl overflow-hidden">
                    <Image
                      src={featuredPost.featuredImage}
                      alt={featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                        {featuredPost.category}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-4 group-hover:text-orange-600 transition-colors">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(featuredPost.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime} min read
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        {featuredPost.views} views
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 text-orange-600 font-semibold group-hover:gap-3 transition-all">
                      Read More
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Recent Posts Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              Recent Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post: typeof featuredPost) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  className="block group bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}m
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {post.views}
                        </div>
                      </div>
                      <span>
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
