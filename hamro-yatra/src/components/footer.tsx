import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "./ui/separator";
import { getPageContent } from "@/lib/page-content";
import { connectDB } from "@/lib/db";
import { TourPackage } from "@/models/tourPackage";
import { Adventure } from "@/models/adventure";
import type { FooterLinkItem } from "@/lib/page-content/types";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

async function getAutoPopularTours(limit: number): Promise<FooterLinkItem[]> {
  await connectDB();
  const [tours, treks] = await Promise.all([
    TourPackage.find({
      category: "tour",
      status: "published",
    } as unknown as Parameters<typeof TourPackage.find>[0])
      .sort({ sortOrder: 1, createdAt: -1 })
      .limit(limit)
      .lean(),
    TourPackage.find({
      category: "trek",
      status: "published",
    } as unknown as Parameters<typeof TourPackage.find>[0])
      .sort({ sortOrder: 1, createdAt: -1 })
      .limit(limit)
      .lean(),
  ]);
  const items = [
    ...tours.map((t) => ({
      label: t.title,
      href: `/tours/${t.slug}`,
    })),
    ...treks.map((t) => ({
      label: t.title,
      href: `/treks/${t.slug}`,
    })),
  ];
  return items.slice(0, limit);
}

async function getAutoPopularAdventures(limit: number): Promise<FooterLinkItem[]> {
  await connectDB();
  const adventures = await Adventure.find({
    status: "published",
  } as unknown as Parameters<typeof Adventure.find>[0])
    .sort({ featured: -1, createdAt: -1 })
    .limit(limit)
    .select("name slug")
    .lean();
  return adventures.map((a) => ({
    label: a.name,
    href: `/adventures/${a.slug}`,
  }));
}

export async function Footer() {
  const content = await getPageContent("footer");

  const popularTours =
    content.popularTours.auto && content.popularTours.limit > 0
      ? await getAutoPopularTours(content.popularTours.limit)
      : content.popularTours.items.filter((i) => i.label && i.href);
  const popularAdventures =
    content.popularAdventures.auto && content.popularAdventures.limit > 0
      ? await getAutoPopularAdventures(content.popularAdventures.limit)
      : content.popularAdventures.items.filter((i) => i.label && i.href);

  const socialLinks = [
    content.social.facebook && {
      href: content.social.facebook,
      icon: <FacebookIcon className="h-6 w-6" />,
      className:
        "bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all transform hover:scale-110",
    },
    content.social.instagram && {
      href: content.social.instagram,
      icon: <InstagramIcon className="h-6 w-6" />,
      className:
        "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all transform hover:scale-110",
    },
    content.social.tiktok && {
      href: content.social.tiktok,
      icon: <TikTokIcon className="h-6 w-6" />,
      className:
        "bg-gray-900 hover:bg-black text-white w-12 h-12 rounded-full flex items-center justify-center transition-all transform hover:scale-110",
    },
    content.social.youtube && {
      href: content.social.youtube,
      icon: <YoutubeIcon className="h-6 w-6" />,
      className:
        "bg-red-600 hover:bg-red-700 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all transform hover:scale-110",
    },
  ].filter(
    (s): s is { href: string; icon: React.ReactElement; className: string } =>
      Boolean(s)
  );

  const smallSocial = [
    content.social.facebook && {
      href: content.social.facebook,
      icon: <FacebookIcon className="h-5 w-5" />,
    },
    content.social.instagram && {
      href: content.social.instagram,
      icon: <InstagramIcon className="h-5 w-5" />,
    },
    content.social.tiktok && {
      href: content.social.tiktok,
      icon: <TikTokIcon className="h-5 w-5" />,
    },
    content.social.youtube && {
      href: content.social.youtube,
      icon: <YoutubeIcon className="h-5 w-5" />,
    },
  ].filter(
    (s): s is { href: string; icon: React.ReactElement } => Boolean(s)
  );

  return (
    <footer className="bg-primary/5 border-t">
      {/* Associations, Payment & Social Section */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 divide-y md:divide-y-0 divide-gray-100 text-center">
            <div className="pt-6 md:pt-0 first:pt-0">
              <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-gray-900">
                {content.associations.title}
              </h4>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                {content.associations.items
                  .filter((i) => i.image)
                  .map((item, idx) => (
                    <img
                      key={idx}
                      src={item.image}
                      alt={item.alt || "Association logo"}
                      className="h-12 sm:h-16 object-contain hover:scale-110 transition-transform"
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
              </div>
            </div>

            <div className="pt-6 md:pt-0">
              <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-gray-900">
                {content.payments.title}
              </h4>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                {content.payments.items
                  .filter((i) => i.label)
                  .map((item, idx) => (
                    <div
                      key={idx}
                      className={`bg-white border-2 border-gray-300 rounded-lg px-4 py-2 sm:px-6 sm:py-3 transition-colors ${
                        idx === 2 ? "hover:border-gray-600" : ""
                      }`}
                    >
                      <span className="text-sm sm:text-xl font-bold text-gray-700">
                        {item.label}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="pt-6 md:pt-0">
              <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-gray-900">
                {content.follow.title}
              </h4>
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                {socialLinks.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={s.className}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            {content.company.logo && (
              <Link href="/" className="inline-block">
                <img
                  src={content.company.logo}
                  alt={content.company.title}
                  className="w-16 h-16 rounded-full object-cover mb-4"
                  loading="lazy"
                  decoding="async"
                />
              </Link>
            )}
            <h3 className="font-bold text-xl mb-4 text-primary">
              {content.company.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {content.company.description}
            </p>
            <div className="flex gap-3">
              {smallSocial.map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{content.quickLinks.title}</h4>
            <ul className="space-y-2 text-sm">
              {content.quickLinks.items
                .filter((i) => i.label && i.href)
                .map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Popular Tour Packages */}
          <div>
            <h4 className="font-semibold mb-4">{content.popularTours.title}</h4>
            <ul className="space-y-2 text-sm">
              {popularTours.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Adventures */}
          <div>
            <h4 className="font-semibold mb-4">
              {content.popularAdventures.title}
            </h4>
            <ul className="space-y-2 text-sm">
              {popularAdventures.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="font-semibold mb-4">{content.contact.title}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">
                  {content.contact.address}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href={`tel:${content.contact.phone.replace(/\s/g, "")}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {content.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href={`mailto:${content.contact.email}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {content.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground text-center">
          <p>{content.bottom.copyright}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={content.bottom.privacy.href} className="hover:text-primary transition-colors">
              {content.bottom.privacy.label}
            </Link>
            <Link href={content.bottom.terms.href} className="hover:text-primary transition-colors">
              {content.bottom.terms.label}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;