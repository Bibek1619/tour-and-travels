import { connectDB } from "@/lib/db";
import { Blog } from "@/models/blog";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Eye, ArrowLeft, Tag } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";

export const revalidate = 3600;

export async function generateStaticParams() {
  await connectDB();
  const blogs = await Blog.find({ status: "published" }).select("slug").lean();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const blog = await Blog.findOne({ slug, status: "published" }).lean();

  if (!blog) return {};

  // Enhanced SEO description with keywords
  const seoDescription = blog.excerpt.length > 155 
    ? blog.excerpt.substring(0, 155) + "..." 
    : blog.excerpt;

  return buildMetadata({
    title: `${blog.title} | Hamro Yatra Nepal Travel Blog`,
    description: seoDescription,
    path: `/blog/${slug}`,
    keywords: blog.tags,
    images: [blog.featuredImage],
    article: {
      publishedTime: new Date(blog.createdAt).toISOString(),
      modifiedTime: new Date(blog.updatedAt).toISOString(),
      authors: [blog.author.name],
      tags: blog.tags,
    },
  });
}

async function getBlog(slug: string) {
  await connectDB();
  const blog = await Blog.findOne({ slug, status: "published" }).lean();
  if (!blog) return null;

  // Increment views
  await Blog.updateOne({ slug }, { $inc: { views: 1 } });

  return JSON.parse(JSON.stringify(blog));
}

async function getRelatedBlogs(category: string, currentSlug: string, limit = 3) {
  await connectDB();
  const blogs = await Blog.find({
    status: "published",
    category,
    slug: { $ne: currentSlug },
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  return JSON.parse(JSON.stringify(blogs));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = await getRelatedBlogs(blog.category, blog.slug);

  // Article JSON-LD
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.featuredImage,
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt,
    author: {
      "@type": "Person",
      name: blog.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "Hamro Yatra Adventure",
      logo: {
        "@type": "ImageObject",
        url: "https://hamroyatraadventure.com/hamro%20yatra.jpeg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://hamroyatraadventure.com/blog/${slug}`,
    },
    articleBody: blog.content,
    wordCount: blog.content.split(/\s+/).length,
    keywords: blog.tags.join(", "),
    articleSection: blog.category,
    timeRequired: `PT${blog.readTime}M`,
    inLanguage: "en-US",
  };

  // Breadcrumb JSON-LD
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
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: `https://hamroyatraadventure.com/blog/${slug}`,
      },
    ],
  };

  // Organization JSON-LD
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Hamro Yatra Adventure",
    url: "https://hamroyatraadventure.com",
    logo: "https://hamroyatraadventure.com/hamro%20yatra.jpeg",
    description: "26+ years Nepal tour operator - trekking, tours, vehicle rental",
    sameAs: [
      "https://www.facebook.com/hamroyatraadventure",
      "https://www.instagram.com/hamroyatraadventure",
    ],
  };

  return (
    <div>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={organizationJsonLd} />
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Article Content */}
        <article className="pt-4 pb-16" itemScope itemType="https://schema.org/BlogPosting">
          <div className="max-w-4xl mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-orange-600">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-orange-600">
                Blog
              </Link>
              <span>/</span>
              <span className="text-gray-800">{blog.category}</span>
            </nav>

            {/* Hero Image */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8">
              <Image
                src={blog.featuredImage}
                alt={blog.title}
                fill
                priority
                className="object-cover"
                quality={90}
                itemProp="image"
              />
            </div>

            {/* Category & Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="bg-orange-100 text-orange-700 text-sm font-medium px-4 py-1.5 rounded-full" itemProp="articleSection">
                {blog.category}
              </span>
              <time className="flex items-center gap-1 text-sm text-gray-500" dateTime={blog.createdAt} itemProp="datePublished">
                <Calendar className="w-4 h-4" />
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span itemProp="timeRequired" content={`PT${blog.readTime}M`}>{blog.readTime} min</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Eye className="w-4 h-4" />
                {blog.views} views
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight" itemProp="headline">
              {blog.title}
            </h1>

            {/* Author */}
            <p className="text-gray-600 mb-8" itemProp="author" itemScope itemType="https://schema.org/Person">
              By <span itemProp="name">{blog.author.name}</span>
            </p>

            {/* Excerpt */}
            {blog.excerpt && (
              <p className="text-lg text-gray-700 leading-relaxed mb-8 pb-8 border-b" itemProp="description">
                {blog.excerpt}
              </p>
            )}

            {/* Content */}
            <div className="prose-custom space-y-6 text-gray-700 leading-relaxed" itemProp="articleBody">
              {blog.content.split("\n").map((paragraph: string, idx: number) => {
                // H1
                if (paragraph.startsWith("# ")) {
                  return (
                    <h2 key={idx} className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
                      {paragraph.replace("# ", "")}
                    </h2>
                  );
                }
                // H2
                if (paragraph.startsWith("## ")) {
                  return (
                    <h3 key={idx} className="text-xl md:text-2xl font-bold text-gray-900 mt-10 mb-4">
                      {paragraph.replace("## ", "")}
                    </h3>
                  );
                }
                // H3
                if (paragraph.startsWith("### ")) {
                  return (
                    <h4 key={idx} className="text-lg md:text-xl font-bold text-gray-900 mt-8 mb-3">
                      {paragraph.replace("### ", "")}
                    </h4>
                  );
                }
                // H4
                if (paragraph.startsWith("#### ")) {
                  return (
                    <h5 key={idx} className="text-base md:text-lg font-semibold text-gray-900 mt-6 mb-2">
                      {paragraph.replace("#### ", "")}
                    </h5>
                  );
                }
                // Bold paragraph
                if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                  return (
                    <p key={idx} className="font-semibold text-gray-900 mt-4">
                      {paragraph.replace(/\*\*/g, "")}
                    </p>
                  );
                }
                // List item
                if (paragraph.startsWith("- ") || paragraph.startsWith("* ")) {
                  const text = paragraph.replace(/^[*-] /, "");
                  // Check for bold text and links in list items
                  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
                  return (
                    <li key={idx} className="ml-5 mb-2" style={{ listStyleType: 'disc' }}>
                      {parts.map((part, i) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                          return <strong key={i} className="font-semibold text-gray-900">{part.replace(/\*\*/g, "")}</strong>;
                        }
                        const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
                        if (linkMatch) {
                          return (
                            <Link key={i} href={linkMatch[2]} className="text-orange-600 hover:text-orange-700 underline font-medium">
                              {linkMatch[1]}
                            </Link>
                          );
                        }
                        return <span key={i}>{part}</span>;
                      })}
                    </li>
                  );
                }
                // Checkmark list (✅)
                if (paragraph.startsWith("✅")) {
                  const text = paragraph.replace("✅ ", "");
                  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
                  return (
                    <div key={idx} className="flex gap-2 mb-2">
                      <span className="text-green-600">✅</span>
                      <span>
                        {parts.map((part, i) => {
                          if (part.startsWith("**") && part.endsWith("**")) {
                            return <strong key={i} className="font-semibold text-gray-900">{part.replace(/\*\*/g, "")}</strong>;
                          }
                          const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
                          if (linkMatch) {
                            return (
                              <Link key={i} href={linkMatch[2]} className="text-orange-600 hover:text-orange-700 underline font-medium">
                                {linkMatch[1]}
                              </Link>
                            );
                          }
                          return <span key={i}>{part}</span>;
                        })}
                      </span>
                    </div>
                  );
                }
                // X mark list (❌)
                if (paragraph.startsWith("❌") || paragraph.startsWith("⛔")) {
                  const icon = paragraph.startsWith("❌") ? "❌" : "⛔";
                  const text = paragraph.replace(/^[❌⛔] /, "");
                  return (
                    <div key={idx} className="flex gap-2 mb-2">
                      <span>{icon}</span>
                      <span>{text}</span>
                    </div>
                  );
                }
                // Horizontal rule
                if (paragraph.trim() === "---") {
                  return <hr key={idx} className="my-8 border-gray-200" />;
                }
                // Empty line
                if (paragraph.trim() === "") {
                  return null;
                }
                // Regular paragraph - handle inline bold and links
                const parts = paragraph.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
                return (
                  <p key={idx} className="mb-4 leading-relaxed">
                    {parts.map((part, i) => {
                      // Bold text
                      if (part.startsWith("**") && part.endsWith("**")) {
                        return <strong key={i} className="font-semibold text-gray-900">{part.replace(/\*\*/g, "")}</strong>;
                      }
                      // Markdown link [text](url)
                      const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
                      if (linkMatch) {
                        return (
                          <Link key={i} href={linkMatch[2]} className="text-orange-600 hover:text-orange-700 underline font-medium">
                            {linkMatch[1]}
                          </Link>
                        );
                      }
                      return <span key={i}>{part}</span>;
                    })}
                  </p>
                );
              })}
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <div className="flex items-center gap-3 flex-wrap">
                  <Tag className="w-5 h-5 text-gray-500" />
                  {blog.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors"
                      itemProp="keywords"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            <div className="mt-12 pt-8 border-t" itemProp="author" itemScope itemType="https://schema.org/Person">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-xl flex-shrink-0">
                  {blog.author.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1" itemProp="name">{blog.author.name}</h3>
                  <p className="text-gray-600 text-sm" itemProp="description">
                    Experienced Nepal travel guide at Hamro Yatra Adventure with 26+ years expertise in trekking, tours, and adventure travel.
                  </p>
                </div>
              </div>
            </div>

            {/* Back to Blog Button */}
            <div className="mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to All Articles
              </Link>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedBlogs.length > 0 && (
          <section className="py-16 bg-white border-t">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedBlogs.map((post: typeof blog) => (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug}`}
                    className="block group bg-white rounded-xl overflow-hidden border hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-xs text-orange-600 font-medium">
                        {post.category}
                      </span>
                      <h3 className="text-lg font-bold text-gray-800 mt-2 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}m
                        </span>
                        <span>·</span>
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
        )}
      </main>
      <Footer />
    </div>
  );
}
