'use client';
import { useCart } from '@/lib/cartContext';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQty, subtotal, shippingCost, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="px-10 py-20 text-center">
        <p className="font-serif text-2xl text-ink mb-2">Your cart is empty</p>
        <p className="text-muted font-body mb-8">Find your next favourite book.</p>
        <Link href="/books" className="btn-primary">Browse Books</Link>
      </div>
    );
  }

  return (
    <div className="px-10 py-10 max-w-5xl mx-auto">
      <h1 className="font-serif text-3xl font-light text-ink border-b border-[#D9CEB8] pb-4 mb-8">
        Your Cart
      </h1>

      <div className="flex gap-10 items-start">
        {/* Items */}
        <div className="flex-1 space-y-4">
          {items.map((item) => (
            <div key={item.bookId} className="flex gap-4 items-center p-4 border border-[#D9CEB8] bg-parchment">
              {/* Mini cover */}
              <div className="w-14 h-20 flex-shrink-0" style={{ background: item.coverColor }} />

              <div className="flex-1">
                <p className="font-serif text-base font-semibold text-ink">{item.title}</p>
                <p className="text-xs text-muted font-body mb-2">{item.author}</p>
                <p className="text-gold font-semibold font-body">${item.price.toFixed(2)}</p>

                {/* Qty */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQty(item.bookId, item.qty - 1)}
                    className="w-6 h-6 border border-[#D9CEB8] flex items-center justify-center hover:bg-ink hover:text-cream transition-colors text-sm"
                  >
                    −
                  </button>
                  <span className="text-sm font-body w-5 text-center">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.bookId, item.qty + 1)}
                    className="w-6 h-6 border border-[#D9CEB8] flex items-center justify-center hover:bg-ink hover:text-cream transition-colors text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="font-body text-sm font-semibold text-ink mb-2">
                  ${(item.price * item.qty).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(item.bookId)}
                  className="text-muted hover:text-red-600 text-sm transition-colors font-body"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="w-72 flex-shrink-0 border border-[#D9CEB8] bg-parchment p-6">
          <h2 className="font-serif text-xl mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm font-body text-muted mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
            </div>
          </div>
          <div className="flex justify-between font-semibold text-ink border-t border-[#D9CEB8] pt-3 mb-6 font-body">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Link href="/checkout" className="btn-dark w-full block text-center">
            Proceed to Checkout →
          </Link>
          <Link href="/books" className="block text-center text-xs text-muted mt-3 hover:text-gold font-body">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
