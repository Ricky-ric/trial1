'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const params = useSearchParams();
  const orderNumber = params.get('order') || 'MERLIN-????';

  return (
    <div className="px-10 py-20 text-center max-w-lg mx-auto">
      <div className="text-5xl mb-6">✦</div>
      <h1 className="font-serif text-4xl font-light text-ink mb-4">Order Confirmed!</h1>
      <p className="font-body text-muted text-lg leading-relaxed mb-8">
        Thank you for your purchase. Your books are on their way to you.
      </p>
      <div className="border border-[#D9CEB8] inline-block px-8 py-3 font-serif text-brown text-lg mb-8">
        Order #{orderNumber}
      </div>
      <div className="flex justify-center gap-4">
        <Link href="/" className="btn-primary">Continue Shopping</Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="p-10 text-muted font-body">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
