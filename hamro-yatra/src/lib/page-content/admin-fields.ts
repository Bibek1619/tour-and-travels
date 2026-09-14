import type { FieldGroup } from "@/lib/admin-config";
import type { PageContentSlug } from "./defaults";

export const PAGE_CONTENT_LABELS: Record<PageContentSlug, string> = {
  home: "Homepage",
  about: "About Page",
  adventures: "Adventures Page",
  tours: "Tours Page",
  "trek-packages": "Trek Packages Page",
  "seat-booking": "Seat Booking Page",
  "vehicle-booking": "Vehicle Booking Page",
  contact: "Contact Page",
};

const iconHelp = "Icon name (e.g. Star, Users, MapPin, Clock, Award, Mountain, Bus)";

export const PAGE_CONTENT_GROUPS: Record<PageContentSlug, FieldGroup[]> = {
  home: [
    {
      title: "Hero",
      fields: [
        { name: "hero.title", label: "Title", type: "text" },
        { name: "hero.subtitle", label: "Subtitle", type: "textarea" },
        { name: "hero.ctaText", label: "Button Text", type: "text" },
        { name: "hero.tourLinkText", label: "Tour Link Text", type: "text" },
        { name: "hero.tourLink", label: "Tour Link", type: "text" },
        { name: "hero.trekLinkText", label: "Trek Link Text", type: "text" },
        { name: "hero.trekLink", label: "Trek Link", type: "text" },
      ],
    },
    {
      title: "Intro",
      fields: [
        { name: "intro.welcomeTitle", label: "Welcome Title", type: "text" },
        { name: "intro.welcomeHighlight", label: "Highlight Word", type: "text" },
        { name: "intro.subtitle", label: "Subtitle", type: "text" },
        { name: "intro.description1", label: "Description 1", type: "textarea" },
        { name: "intro.description2", label: "Description 2", type: "textarea" },
        { name: "intro.description3", label: "Description 3", type: "textarea" },
        { name: "intro.image", label: "Image", type: "image" },
        { name: "intro.whyChooseTitle", label: "Overlay Title", type: "text" },
        {
          name: "intro.highlights",
          label: "Highlights (Icon [TAB] Text per line)",
          type: "rows",
          columns: [
            { key: "icon", label: "Icon" },
            { key: "text", label: "Text" },
          ],
          help: iconHelp,
        },
        {
          name: "intro.stats",
          label: "Stats (Icon [TAB] Value [TAB] Label per line)",
          type: "rows",
          columns: [
            { key: "icon", label: "Icon" },
            { key: "value", label: "Value" },
            { key: "label", label: "Label" },
          ],
          help: iconHelp,
        },
        { name: "intro.ctaText", label: "CTA Text", type: "text" },
        { name: "intro.ctaLink", label: "CTA Link", type: "text" },
      ],
    },
    {
      title: "Best Selling",
      fields: [
        { name: "sections.bestSelling.eyebrow", label: "Eyebrow", type: "text" },
        { name: "sections.bestSelling.title", label: "Title", type: "text" },
        { name: "sections.bestSelling.subtitle", label: "Subtitle", type: "textarea" },
        { name: "sections.bestSelling.image", label: "Section Image (optional)", type: "image" },
      ],
    },
    {
      title: "Daily Bus Services",
      fields: [
        { name: "sections.dailyTrips.title", label: "Title", type: "text" },
        { name: "sections.dailyTrips.subtitle", label: "Subtitle", type: "textarea" },
      ],
    },
    {
      title: "Best Trip Spotlight (Manang)",
      fields: [
        { name: "sections.bestTrip.badge", label: "Badge", type: "text" },
        { name: "sections.bestTrip.badgeSub", label: "Badge Subtext", type: "text" },
        { name: "sections.bestTrip.title", label: "Title", type: "text" },
        { name: "sections.bestTrip.location", label: "Location", type: "text" },
        { name: "sections.bestTrip.description", label: "Description", type: "textarea" },
        { name: "sections.bestTrip.image", label: "Image", type: "image" },
        { name: "sections.bestTrip.ctaText", label: "CTA Button Text", type: "text" },
        { name: "sections.bestTrip.ctaHref", label: "CTA Button Link", type: "text" },
        { name: "sections.bestTrip.whatsappNumber", label: "WhatsApp Number", type: "text" },
        { name: "sections.bestTrip.whatsappMessage", label: "WhatsApp Message", type: "text" },
        {
          name: "sections.bestTrip.stats",
          label: "Stats (Icon [TAB] Value [TAB] Label per line)",
          type: "rows",
          columns: [
            { key: "icon", label: "Icon" },
            { key: "value", label: "Value" },
            { key: "label", label: "Label" },
          ],
          help: iconHelp,
        },
        { name: "sections.bestTrip.highlights", label: "Highlights (one per line)", type: "list" },
      ],
    },
    {
      title: "Destinations",
      fields: [
        { name: "sections.destinations.eyebrow", label: "Eyebrow", type: "text" },
        { name: "sections.destinations.title", label: "Title", type: "text" },
        { name: "sections.destinations.subtitle", label: "Subtitle", type: "textarea" },
        { name: "sections.destinations.image", label: "Section Image (optional)", type: "image" },
      ],
    },
    {
      title: "Testimonials",
      fields: [
        { name: "sections.testimonials.badge", label: "Badge", type: "text" },
        { name: "sections.testimonials.title", label: "Title", type: "text" },
        { name: "sections.testimonials.highlight", label: "Highlight Word", type: "text" },
        { name: "sections.testimonials.video", label: "Testimonial Video", type: "video" },
        { name: "sections.testimonials.videoThumbnail", label: "Video Thumbnail (Poster)", type: "image" },
      ],
    },
    {
      title: "Why Us",
      fields: [
        { name: "whyUs.sectionTitle", label: "Section Title", type: "text" },
        { name: "whyUs.sectionHeading", label: "Heading", type: "text" },
        { name: "whyUs.headingHighlight", label: "Heading Highlight Word", type: "text" },
        { name: "whyUs.subheading", label: "Subheading", type: "text" },
        { name: "whyUs.subheadingHighlight", label: "Subheading Highlight Word", type: "text" },
        { name: "whyUs.description", label: "Description", type: "textarea" },
        { name: "whyUs.ctaText", label: "CTA Text", type: "text" },
        { name: "whyUs.ctaLink", label: "CTA Link", type: "text" },
        {
          name: "whyUs.slides",
          label: "Slides (Type [TAB] Video/Image URL [TAB] Title [TAB] Subtitle per line)",
          type: "rows",
          columns: [
            { key: "type", label: "Type (video/image)" },
            { key: "src", label: "Video/Image URL" },
            { key: "title", label: "Title" },
            { key: "subtitle", label: "Subtitle" },
          ],
        },
        {
          name: "whyUs.features",
          label: "Features (Icon [TAB] Title [TAB] Badge [TAB] Description per line)",
          type: "rows",
          columns: [
            { key: "icon", label: "Icon" },
            { key: "title", label: "Title" },
            { key: "badge", label: "Badge" },
            { key: "description", label: "Description" },
          ],
          help: "Descriptions cannot contain tabs.",
        },
      ],
    },
  ],
  about: [
    {
      title: "Hero",
      fields: [
        { name: "hero.title", label: "Title", type: "text" },
        { name: "hero.subtitle", label: "Subtitle", type: "textarea" },
        { name: "hero.ctaText", label: "CTA Text", type: "text" },
        { name: "hero.ctaLink", label: "CTA Link", type: "text" },
      ],
    },
    {
      title: "Company Story",
      fields: [
        { name: "story.title", label: "Title", type: "text" },
        { name: "story.paragraph", label: "Paragraph", type: "textarea" },
        {
          name: "story.points",
          label: "Points (Icon [TAB] Text per line)",
          type: "rows",
          columns: [
            { key: "icon", label: "Icon" },
            { key: "text", label: "Text" },
          ],
          help: iconHelp,
        },
        {
          name: "story.badges",
          label: "Badges (Icon [TAB] Title per line)",
          type: "rows",
          columns: [
            { key: "icon", label: "Icon" },
            { key: "title", label: "Title" },
          ],
          help: iconHelp,
        },
      ],
    },
    {
      title: "Stats",
      fields: [
        {
          name: "stats.items",
          label: "Stats (Icon [TAB] Number [TAB] Label per line)",
          type: "rows",
          columns: [
            { key: "icon", label: "Icon" },
            { key: "number", label: "Number" },
            { key: "label", label: "Label" },
          ],
          help: iconHelp,
        },
      ],
    },
    {
      title: "Our Promise",
      fields: [
        { name: "promise.title", label: "Title", type: "text" },
        { name: "promise.subtitle", label: "Subtitle", type: "textarea" },
        {
          name: "promise.cards",
          label: "Cards (Icon [TAB] Title [TAB] Description per line)",
          type: "rows",
          columns: [
            { key: "icon", label: "Icon" },
            { key: "title", label: "Title" },
            { key: "description", label: "Description" },
          ],
          help: "Description cannot contain tabs.",
        },
      ],
    },
    {
      title: "Why Choose Our Guides",
      fields: [
        { name: "guides.title", label: "Title", type: "text" },
        { name: "guides.subtitle", label: "Subtitle", type: "textarea" },
        {
          name: "guides.features",
          label: "Features (Icon [TAB] Title [TAB] Description per line)",
          type: "rows",
          columns: [
            { key: "icon", label: "Icon" },
            { key: "title", label: "Title" },
            { key: "description", label: "Description" },
          ],
        },
      ],
    },
    {
      title: "Team Members",
      fields: [
        { name: "team.title", label: "Title", type: "text" },
        { name: "team.subtitle", label: "Subtitle", type: "textarea" },
        {
          name: "team.members",
          label: "Members (Name [TAB] Role [TAB] Experience [TAB] Image URL [TAB] Specialization [TAB] Certifications per line)",
          type: "rows",
          columns: [
            { key: "name", label: "Name" },
            { key: "role", label: "Role" },
            { key: "experience", label: "Experience" },
            { key: "image", label: "Image URL" },
            { key: "specialization", label: "Specialization" },
            { key: "certifications", label: "Certifications (comma separated)" },
          ],
        },
      ],
    },
    {
      title: "Testimonials",
      fields: [
        { name: "testimonials.title", label: "Title", type: "text" },
        { name: "testimonials.subtitle", label: "Subtitle", type: "text" },
        {
          name: "testimonials.items",
          label: "Items (Text [TAB] Author [TAB] Rating per line)",
          type: "rows",
          columns: [
            { key: "text", label: "Text" },
            { key: "author", label: "Author" },
            { key: "rating", label: "Rating" },
          ],
        },
      ],
    },
    {
      title: "CTA",
      fields: [
        { name: "cta.title", label: "Title", type: "text" },
        { name: "cta.subtitle", label: "Subtitle", type: "textarea" },
        { name: "cta.primaryText", label: "Primary Button Text", type: "text" },
        { name: "cta.primaryLink", label: "Primary Button Link", type: "text" },
        { name: "cta.secondaryText", label: "Secondary Button Text", type: "text" },
        { name: "cta.secondaryLink", label: "Secondary Button Link", type: "text" },
      ],
    },
  ],
  adventures: [
    {
      title: "Hero",
      fields: [
        { name: "hero.title", label: "Title", type: "text" },
        { name: "hero.subtitle", label: "Subtitle", type: "textarea" },
        { name: "hero.image", label: "Background Image", type: "image" },
      ],
    },
    {
      title: "CTA",
      fields: [
        { name: "cta.title", label: "Title", type: "text" },
        { name: "cta.subtitle", label: "Subtitle", type: "textarea" },
        { name: "cta.primaryText", label: "Primary Button Text", type: "text" },
        { name: "cta.primaryLink", label: "Primary Button Link", type: "text" },
        { name: "cta.secondaryText", label: "Secondary Button Text", type: "text" },
        { name: "cta.secondaryLink", label: "Secondary Button Link", type: "text" },
      ],
    },
  ],
  tours: [
    {
      title: "Hero",
      fields: [
        { name: "hero.title", label: "Title", type: "text" },
        { name: "hero.subtitle", label: "Subtitle", type: "textarea" },
        { name: "hero.image", label: "Background Image", type: "image" },
      ],
    },
    {
      title: "Tour Section",
      fields: [
        { name: "section.title", label: "Title", type: "text" },
        { name: "section.subtitle", label: "Subtitle", type: "textarea" },
      ],
    },
    {
      title: "Customize CTA",
      fields: [
        { name: "customize.title", label: "Title", type: "text" },
        { name: "customize.paragraph", label: "Paragraph", type: "textarea" },
        {
          name: "customize.points",
          label: "Points (Icon [TAB] Text per line)",
          type: "rows",
          columns: [
            { key: "icon", label: "Icon" },
            { key: "text", label: "Text" },
          ],
          help: iconHelp,
        },
        { name: "customize.primaryText", label: "Primary Button Text", type: "text" },
        { name: "customize.primaryLink", label: "Primary Button Link", type: "text" },
        { name: "customize.secondaryText", label: "Secondary Button Text", type: "text" },
        { name: "customize.secondaryLink", label: "Secondary Button Link", type: "text" },
        { name: "customize.videoSrc", label: "Video Source", type: "text" },
        { name: "customize.helpText", label: "Help Text", type: "text" },
        { name: "customize.email", label: "Email", type: "text" },
        { name: "customize.phone", label: "Phone", type: "text" },
      ],
    },
  ],
  "trek-packages": [
    {
      title: "Hero",
      fields: [
        { name: "hero.title", label: "Title", type: "text" },
        { name: "hero.subtitle", label: "Subtitle", type: "textarea" },
        { name: "hero.image", label: "Background Image", type: "image" },
      ],
    },
    {
      title: "Region Section",
      fields: [
        { name: "section.title", label: "Title", type: "text" },
        { name: "section.subtitle", label: "Subtitle", type: "textarea" },
      ],
    },
    {
      title: "Info Cards",
      fields: [
        {
          name: "info.cards",
          label: "Cards (Icon [TAB] Title [TAB] Description per line)",
          type: "rows",
          columns: [
            { key: "icon", label: "Icon" },
            { key: "title", label: "Title" },
            { key: "description", label: "Description" },
          ],
        },
      ],
    },
  ],
  "seat-booking": [
    {
      title: "Hero",
      fields: [
        { name: "hero.title", label: "Title", type: "text" },
        {
          name: "hero.badges",
          label: "Badges (Icon [TAB] Label per line)",
          type: "rows",
          columns: [
            { key: "icon", label: "Icon" },
            { key: "label", label: "Label" },
          ],
          help: iconHelp,
        },
        { name: "hero.subtitle", label: "Subtitle", type: "textarea" },
      ],
    },
    {
      title: "Routes Section",
      fields: [
        { name: "section.title", label: "Title", type: "text" },
        { name: "empty.title", label: "Empty State Title", type: "text" },
        { name: "empty.message", label: "Empty State Message", type: "textarea" },
      ],
    },
  ],
  "vehicle-booking": [
    {
      title: "Hero",
      fields: [{ name: "hero.title", label: "Title", type: "text" }],
    },
  ],
  contact: [
    {
      title: "Hero",
      fields: [
        { name: "hero.eyebrow", label: "Eyebrow", type: "text" },
        { name: "hero.title", label: "Title", type: "text" },
        { name: "hero.subtitle", label: "Subtitle", type: "textarea" },
      ],
    },
    {
      title: "Contact Info",
      fields: [
        {
          name: "info.items",
          label: "Items (Label [TAB] Value [TAB] Link per line)",
          type: "rows",
          columns: [
            { key: "label", label: "Label" },
            { key: "value", label: "Value" },
            { key: "link", label: "Link (optional)" },
          ],
        },
      ],
    },
    {
      title: "Contact Form",
      fields: [
        { name: "form.title", label: "Title", type: "text" },
        { name: "form.subtitle", label: "Subtitle", type: "text" },
      ],
    },
    {
      title: "FAQs",
      fields: [
        { name: "faq.title", label: "Title", type: "text" },
        {
          name: "faq.items",
          label: "FAQs (Question [TAB] Answer per line)",
          type: "rows",
          columns: [
            { key: "q", label: "Question" },
            { key: "a", label: "Answer" },
          ],
          help: "Answers cannot contain tabs.",
        },
      ],
    },
    {
      title: "Social",
      fields: [
        { name: "social.title", label: "Title", type: "text" },
        { name: "social.subtitle", label: "Subtitle", type: "text" },
        {
          name: "social.items",
          label: "Items (Label [TAB] URL per line)",
          type: "rows",
          columns: [
            { key: "label", label: "Label" },
            { key: "href", label: "URL" },
          ],
        },
      ],
    },
  ],
};