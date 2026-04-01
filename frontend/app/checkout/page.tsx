'use client';
import { useState } from 'react';
import { useCart } from '@/lib/cartContext';
import { placeOrder, processPayment } from '@/lib/api';
import { useRouter } from 'next/navigation';

type PayMethod = 'card' | 'mpesa' | 'sandbox';

export default function CheckoutPage() {
  const { items, subtotal, shippingCost, total, clearCart } = useCart();
  const router = useRouter();
  const [method, setMethod] = useState<PayMethod>('sandbox');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    street: '', city: '', postalCode: '',
    cardNumber: '4242 4242 4242 4242', expiry: '12/28', cvc: '123',
    mpesaPhone: '',
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // 1. Process payment
      await processPayment({ method, amount: total, cardNumber: form.cardNumber, mpesaPhone: form.mpesaPhone });

      // 2. Place order
      const order = await placeOrder({
        customer: { firstName: form.firstName, lastName: form.lastName, email: form.email },
        shippingAddress: { street: form.street, city: form.city, postalCode: form.postalCode },
        items: items.map((i) => ({ bookId: i.bookId, qty: i.qty })),
        paymentMethod: method,
      });

      clearCart();
      router.push(`/checkout/success?order=${order.orderNumber}`);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  return (
    <div className="px-6 py-10 max-w-3xl mx-auto">
      <h1 className="font-serif text-3xl font-light text-ink mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Contact */}
        <section>
          <h2 className="font-serif text-xl text-brown border-b border-[#D9CEB8] pb-2 mb-4">Contact Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="label">First Name</label><input required className="input-field" value={form.firstName} onChange={set('firstName')} placeholder="Jane" /></div>
            <div><label className="label">Last Name</label><input required className="input-field" value={form.lastName} onChange={set('lastName')} placeholder="Austen" /></div>
            <div className="col-span-2"><label className="label">Email</label><input required type="email" className="input-field" value={form.email} onChange={set('email')} placeholder="jane@example.com" /></div>
          </div>
        </section>

        {/* Shipping */}
        <section>
          <h2 className="font-serif text-xl text-brown border-b border-[#D9CEB8] pb-2 mb-4">Shipping Address</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2"><label className="label">Street</label><input required className="input-field" value={form.street} onChange={set('street')} placeholder="123 Library Lane" /></div>
            <div><label className="label">City</label><input required className="input-field" value={form.city} onChange={set('city')} placeholder="Nairobi" /></div>
            <div><label className="label">Postal Code</label><input required className="input-field" value={form.postalCode} onChange={set('postalCode')} placeholder="00100" /></div>
          </div>
        </section>

        {/* Payment */}
        <section>
          <h2 className="font-serif text-xl text-brown border-b border-[#D9CEB8] pb-2 mb-4">Payment Method</h2>
          <div className="flex gap-3 mb-5">
            {(['sandbox', 'card', 'mpesa'] as PayMethod[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMethod(m)}
                className={`flex-1 py-3 text-sm border tracking-wide font-body transition-all
                  ${method === m ? 'border-gold bg-[#FDF8EF] text-brown' : 'border-[#D9CEB8] text-muted hover:border-gold'}`}
              >
                {m === 'sandbox' ? '⚡ Sandbox' : m === 'card' ? '💳 Credit Card' : '📱 M-Pesa'}
              </button>
            ))}
          </div>

          {method === 'sandbox' && (
            <div className="bg-parchment border border-[#D9CEB8] p-4 text-sm font-body text-muted italic mb-3">
              Sandbox mode — no real charge will be made. Test card pre-filled below.
            </div>
          )}

          {(method === 'card' || method === 'sandbox') && (
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2"><label className="label">Card Number</label><input className="input-field" value={form.cardNumber} onChange={set('cardNumber')} placeholder="4242 4242 4242 4242" /></div>
              <div><label className="label">Expiry</label><input className="input-field" value={form.expiry} onChange={set('expiry')} placeholder="MM/YY" /></div>
              <div><label className="label">CVC</label><input className="input-field" value={form.cvc} onChange={set('cvc')} placeholder="123" /></div>
            </div>
          )}

          {method === 'mpesa' && (
            <div><label className="label">M-Pesa Phone</label><input required className="input-field" value={form.mpesaPhone} onChange={set('mpesaPhone')} placeholder="+254 7XX XXX XXX" /></div>
          )}
        </section>

        {/* Order summary */}
        <section className="bg-parchment border border-[#D9CEB8] p-5">
          <h2 className="font-serif text-xl mb-3">Order Summary</h2>
          {items.map((i) => (
            <div key={i.bookId} className="flex justify-between text-sm font-body text-muted mb-1">
              <span>{i.title} × {i.qty}</span>
              <span>${(i.price * i.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm font-body text-muted mt-2">
            <span>Shipping</span><span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between font-semibold text-ink border-t border-[#D9CEB8] pt-3 mt-3 font-body">
            <span>Total</span><span>${total.toFixed(2)}</span>
          </div>
        </section>

        {error && <p className="text-red-600 text-sm font-body">{error}</p>}

        <button type="submit" disabled={loading} className="btn-primary w-full text-lg py-4 disabled:opacity-60">
          {loading ? 'Processing...' : 'Place Order →'}
        </button>
      </form>

      <style jsx>{`
        .label { display: block; font-size: 0.7rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); margin-bottom: 4px; font-family: 'Crimson Pro', serif; }
      `}</style>
    </div>
  );
}
