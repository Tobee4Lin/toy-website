'use client';

import { motion } from 'framer-motion';
import { Shield, Mail } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';

const SECTIONS = [
  {
    id: 'information-we-collect',
    title: '1. Information We Collect',
    content: `We collect information you provide directly to us when you:\n\n• Submit inquiry forms or request for quotation (RFQ)\n• Download our product catalog\n• Contact us via email or WhatsApp\n• Request product samples\n• Use our "My Selection" feature\n\nThe information we collect may include your name, company name, email address, phone number, WhatsApp number, country, and any other details you choose to provide in your messages.\n\nWhen you visit our website, we may also automatically collect certain information through cookies and similar technologies, including your IP address, browser type, referring pages, and pages visited.`,
  },
  {
    id: 'how-we-use-information',
    title: '2. How We Use Your Information',
    content: `We use the information we collect for the following purposes:\n\n• To respond to your inquiries and provide customer service\n• To process and fulfill your product catalog download requests\n• To send you requested product information, quotations, and samples\n• To communicate with you about new products, promotions, and industry updates (where you have consented)\n• To improve our website, products, and services\n• To detect, prevent, and address technical issues or fraudulent activity\n• To comply with legal obligations\n\nWe do not sell, rent, or trade your personal information to third parties for their marketing purposes.`,
  },
  {
    id: 'information-sharing',
    title: '3. Information Sharing',
    content: `We may share your information in the following circumstances:\n\n• With our carefully selected manufacturing partners and suppliers when necessary to process your inquiry, provide quotations, or fulfill your order. These partners are obligated to protect your information and use it only for the purposes we specify.\n• With service providers who assist us in operating our business (such as email service providers, CRM platforms, analytics providers, and hosting services). These providers have access to your information only to perform tasks on our behalf.\n• When required by law or to protect our rights, property, or safety, or the rights, property, or safety of others.\n• In connection with a business transaction such as a merger, acquisition, or sale of assets.`,
  },
  {
    id: 'data-security',
    title: '4. Data Security',
    content: `We take reasonable measures to protect the personal information we collect and maintain. These measures include secure data storage, access controls, and regular security assessments. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.\n\nWe retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. If you would like us to delete your information, please contact us.`,
  },
  {
    id: 'cookies',
    title: '5. Cookies and Analytics',
    content: `We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small files stored on your device that help us remember your preferences, understand how you use our website, and improve our services.\n\nWe may use analytics tools (such as Google Analytics) to collect information about website traffic and usage patterns. These tools may collect information such as your IP address, pages visited, time spent on pages, and referral URLs. This information helps us improve our website and better understand our visitors.\n\nYou can control cookies through your browser settings. Disabling cookies may affect certain functionality of our website.`,
  },
  {
    id: 'third-party-links',
    title: '6. Third-Party Links',
    content: `Our website may contain links to third-party websites, such as social media platforms or external services. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of any third-party websites you visit.\n\nThis privacy policy applies only to information collected by our website.`,
  },
  {
    id: 'childrens-privacy',
    title: '7. Children\'s Privacy',
    content: `Our website is designed for business-to-business (B2B) purposes and is directed at businesses and professionals, not children. We do not knowingly collect personal information from children under the age of 13. If you believe we have collected information from a child, please contact us and we will promptly remove it.`,
  },
  {
    id: 'your-rights',
    title: '8. Your Rights',
    content: `Depending on your location, you may have certain rights regarding your personal information, including:\n\n• Access: You can request a copy of the personal information we hold about you.\n• Correction: You can request correction of inaccurate or incomplete information.\n• Deletion: You can request deletion of your personal information, subject to certain exceptions.\n• Restriction: You can request restriction of processing under certain conditions.\n• Opt-out of marketing: You can opt out of marketing communications at any time by following the unsubscribe link in our emails or contacting us directly.\n\nTo exercise these rights, please contact us using the information provided below.`,
  },
  {
    id: 'contact',
    title: '9. Contact Us',
    content: `If you have any questions, concerns, or requests regarding this privacy policy or our data practices, please contact us.\n\nWe may update this privacy policy from time to time. The latest version will always be posted on this page with the "Last Updated" date at the top. We encourage you to review this policy periodically.`,
  },
];

export default function PrivacyPolicyContent() {
  const { config } = useApp();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-[#071A2D] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(21_101_255_0.2),transparent_50%)]" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge className="mb-4 bg-white/10 text-white">
              <Shield className="mr-1 size-3" />
              Legal
            </Badge>
            <h1 className="text-4xl font-black md:text-5xl">Privacy Policy</h1>
            <p className="mx-auto mt-3 max-w-xl text-white/70">
              Last updated: January 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <article className="w-full py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
            We are committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, and safeguard your information when
            you visit our website or interact with our services. By using our
            website, you agree to the practices described in this policy.
          </p>

          <div className="space-y-8">
            {SECTIONS.map((section, i) => (
              <motion.section
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.4, delay: i * 0.02 }}
              >
                <h2 className="mb-3 text-xl font-bold text-[#071A2D]">
                  {section.title}
                </h2>
                <div className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                  {section.content}
                </div>
              </motion.section>
            ))}
          </div>

          {/* Contact card */}
          <Card className="mt-12 border-[#1565FF]/20 bg-[#F5F7FA]">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#1565FF]/10 text-[#1565FF]">
                  <Mail className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#071A2D]">
                    Privacy Questions?
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    For any questions about this privacy policy or our data
                    practices, contact us at{' '}
                    <a
                      href={`mailto:${config.email}`}
                      className="font-medium text-[#1565FF]"
                    >
                      {config.email}
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </article>
    </div>
  );
}
