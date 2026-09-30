import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '한국 기업 비교',
  description: '한국 주요 기업의 사업과 공개 정보를 비교해 보세요.',
  alternates: { canonical: '/kr/compare' },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
