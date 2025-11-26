import type { Metadata } from 'next';
import LiveEmotionPageContent from '@/components/page-sections/LiveEmotionPageContent';

export const metadata: Metadata = {
  title: 'Emotion Live | Steinsgo',
  description: 'Live facial expression estimation with your camera.',
};

export default function LivePage() {
  return <LiveEmotionPageContent />;
}
