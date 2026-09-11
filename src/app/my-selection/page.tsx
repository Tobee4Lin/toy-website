import type { Metadata } from 'next';
import MySelectionContent from '@/components/selection/MySelectionContent';

export const metadata: Metadata = {
  title: 'My Selection | Request a Combined Quote',
  description:
    'Review your selected toy products and request a combined quote. Add quantities and notes, then submit an RFQ or contact us via WhatsApp.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MySelectionPage() {
  return <MySelectionContent />;
}
