'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
} from 'lucide-react';

import { useApp } from '@/context/AppContext';
import { buildWhatsAppUrl } from '@/lib/utils';

const PRODUCT_LINKS = [
  { label: 'Beach Toys', href: '/products/beach-toys' },
  { label: 'Bubble Toys', href: '/products/bubble-toys' },
  { label: 'RC Toys', href: '/products/rc-toys' },
  { label: 'Building Blocks', href: '/products/building-blocks' },
  { label: 'All Products', href: '/products' },
];

const COMPANY_LINKS = [
  { label: 'OEM Service', href: '/oem' },
  { label: 'About Our Factory', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const RESOURCE_LINKS = [
  { label: 'Blog', href: '/blog' },
  { label: 'Catalog', href: '/catalog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'My Selection', href: '/my-selection' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
];

export default function Footer() {
  const { config } = useApp();

  return (
    <footer className="w-full border-t border-white/5 bg-[#050F1C] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <Image
                src="/images/logo-horizontal-v2.png"
                alt="Levich Toys"
                width={220}
                height={56}
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/60">
              {config.slogan}. Your trusted toy manufacturer in Chenghai, China.
              Innovative products, reliable manufacturing, global supply.
            </p>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-[#1565FF]" />
                <a href={`mailto:${config.email}`} className="hover:text-white">
                  {config.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-[#1565FF]" />
                <span>{config.phone}</span>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 size-4 shrink-0 text-[#25D366]" />
                <a
                  href={buildWhatsAppUrl(config.whatsapp, 'Hello!')}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  WhatsApp: +{config.whatsapp}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#FF7A00]" />
                <span>{config.address}</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Products
            </h4>
            <ul className="space-y-2">
              {PRODUCT_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-2">
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources + Legal */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Resources
            </h4>
            <ul className="space-y-2">
              {RESOURCE_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wider text-white">
              Legal
            </h4>
            <ul className="space-y-2">
              {LEGAL_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Levich Toys. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {config.socialLinks.facebook && (
              <a
                href={config.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="rounded-full p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="size-4" />
              </a>
            )}
            {config.socialLinks.linkedin && (
              <a
                href={config.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-full p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-4" />
              </a>
            )}
            {config.socialLinks.instagram && (
              <a
                href={config.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="rounded-full p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="size-4" />
              </a>
            )}
            {config.socialLinks.youtube && (
              <a
                href={config.socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="rounded-full p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="YouTube"
              >
                <Youtube className="size-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
