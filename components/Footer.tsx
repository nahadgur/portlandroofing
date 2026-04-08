import Link from "next/link";
import { SITE } from "@/lib/config";

interface FooterLink {
  label: string;
  href: string;
}

const COMPANY_LINKS: FooterLink[] = [
  { label: "Contact",      href: "/contact" },
  { label: "Cost Index",   href: "/or-cost-index" },
  { label: "Blog",         href: "/blog" },
  { label: "Guides",       href: "/guides" },
  { label: "All Cities",   href: "/oregon" },
  { label: "All Services", href: "/services" },
];

const SERVICE_LINKS: FooterLink[] = [
  { label: "Roof Replacement",    href: "/services/roof-replacement" },
  { label: "Roof Repair",         href: "/services/roof-repair" },
  { label: "Metal Roofing",       href: "/services/metal-roofing" },
  { label: "Cedar Shake Roofing", href: "/services/cedar-shake-roofing" },
  { label: "Flat Roofing",        href: "/services/flat-roofing" },
];

const RESOURCE_LINKS: FooterLink[] = [
  { label: "How to Choose a Contractor",  href: "/guides/how-to-choose-roofing-contractor-oregon" },
  { label: "Oregon Roof Maintenance",     href: "/guides/oregon-roof-maintenance-guide" },
  { label: "Understanding Roofing Costs", href: "/guides/understanding-oregon-roofing-costs" },
  { label: "Best Materials for Oregon",   href: "/blog/best-roofing-materials-oregon-climate" },
  { label: "When to Replace Your Roof",   href: "/blog/when-to-replace-your-roof-warning-signs" },
  { label: "Oregon Roofing Permits",      href: "/blog/oregon-roofing-permits-what-homeowners-need-to-know" },
  { label: "HB 4029 Solar Guide",         href: "/blog/oregon-hb4029-solar-roofing-guide" },
];

const CITY_LINKS: FooterLink[] = [
  { label: "Portland",  href: "/oregon/portland" },
  { label: "Eugene",    href: "/oregon/eugene" },
  { label: "Salem",     href: "/oregon/salem" },
  { label: "Bend",      href: "/oregon/bend" },
  { label: "Medford",   href: "/oregon/medford" },
  { label: "Beaverton", href: "/oregon/beaverton" },
  { label: "Hillsboro", href: "/oregon/hillsboro" },
  { label: "Gresham",   href: "/oregon/gresham" },
];

function FooterColumn({
  title,
  links,
  extra,
}: {
  title: string;
  links: FooterLink[];
  extra?: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#0066CC]">
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="footer-link text-sm text-[#64748B]"
            >
              {link.label}
            </Link>
          </li>
        ))}
        {extra && <li>{extra}</li>}
      </ul>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F172A] border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* 4-column grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <FooterColumn title="Company" links={COMPANY_LINKS} />
          <FooterColumn title="Services" links={SERVICE_LINKS} />
          <FooterColumn title="Guides &amp; Blog" links={RESOURCE_LINKS} />
          <FooterColumn
            title="Cities"
            links={CITY_LINKS}
            extra={
              <Link
                href="/oregon"
                className="text-sm font-medium text-[#0066CC] transition-colors hover:text-white"
              >
                View All Cities
              </Link>
            }
          />
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-slate-800 pt-8">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-sm text-[#64748B]">
              &copy; {currentYear} {SITE.name}. All rights reserved.
            </p>
            <Link
              href="/contact"
              className="footer-link text-sm text-[#64748B]"
            >
              Contact Us →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
