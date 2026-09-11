'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Share2, MessageCircle, Send } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { buildWhatsAppUrl } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import type { IBlogPost } from '@/data/blog';

interface BlogDetailActionsProps {
  post: IBlogPost;
}

export default function BlogDetailActions({ post }: BlogDetailActionsProps) {
  const router = useRouter();
  const { config, openRfqDialog } = useApp();

  const handleShare = async () => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: shareUrl,
        });
      } catch {
        /* user cancelled */
      }
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied to clipboard');
      } catch {
        fallbackCopy(shareUrl);
      }
    } else {
      fallbackCopy(shareUrl);
    }
  };

  const fallbackCopy = (text: string) => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      toast.success('Link copied to clipboard');
    } catch {
      toast.error('Copy failed, please copy the URL manually');
    }
  };

  const handleWhatsApp = () => {
    const msg = `I found this article interesting: ${post.title}\n${typeof window !== 'undefined' ? window.location.href : ''}`;
    window.open(
      buildWhatsAppUrl(config.whatsapp, msg),
      '_blank',
      'noopener,noreferrer',
    );
  };

  const handleQuote = () => {
    trackEvent('request_quote_click', { source: 'blog_detail' });
    openRfqDialog();
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        className="mb-6 text-muted-foreground"
      >
        <ArrowLeft className="mr-1.5 size-4" />
        Back to Blog
      </Button>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="mr-1.5 size-4" />
            Share
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleWhatsApp}
            className="border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/5"
          >
            <MessageCircle className="mr-1.5 size-4" />
            WhatsApp
          </Button>
        </div>
        <Button
          onClick={handleQuote}
          className="bg-[#FF7A00] text-white hover:bg-[#FF7A00]/90"
        >
          <Send className="mr-2 size-4" />
          Discuss Your Project
        </Button>
      </div>
    </>
  );
}
