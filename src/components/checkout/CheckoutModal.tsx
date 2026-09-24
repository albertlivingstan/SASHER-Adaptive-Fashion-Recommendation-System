import React, { useState } from 'react';
import { useSasher } from '../../context/SasherContext';
import { 
  X, 
  CreditCard, 
  QrCode, 
  Building2, 
  Clock, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  ChevronRight, 
  Download,
  AlertCircle
} from 'lucide-react';
import { PaymentMethodType, CompletedOrder } from '../../types';

export const CheckoutModal: React.FC = () => {
  const { 
    cart, 
    isCheckoutModalOpen, 
    closeCheckout, 
    completeOrder,
    clearCart
  } = useSasher();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('CARD');
  
  // Card Form State
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardName, setCardName] = useState('Albert G.');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvv, setCardCvv] = useState('842');

  // UPI State
  const [upiId, setUpiId] = useState('albert87g@okhdfcbank');
  const [upiVerified, setUpiVerified] = useState(true);

  // Net Banking State
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // BNPL State
  const [selectedInstallmentPlan, setSelectedInstallmentPlan] = useState<'3_months' | '6_months'>('3_months');

  // Shipping Form State
  const [shippingAddress, setShippingAddress] = useState({
    fullName: 'Albert G.',
    email: 'albert87g@gmail.com',
    street: '124 Horizon Boulevard, Suite 8',
    city: 'Bangalore',
    postalCode: '560001',
    country: 'India'
  });

  // Promo code
  const [promoCode, setPromoCode] = useState('RESEARCH15');
  const [promoApplied, setPromoApplied] = useState(true);

  // Processing & Success State
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>('');
  const [confirmedOrder, setConfirmedOrder] = useState<CompletedOrder | null>(null);

  if (!isCheckoutModalOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = promoApplied ? Math.round(subtotal * 0.15) : 0;
  const shippingCost = subtotal >= 25000 ? 0 : 450;
  const taxAmount = Math.round((subtotal - discountAmount) * 0.12);
  const finalTotal = subtotal - discountAmount + shippingCost + taxAmount;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const steps = [
      'Establishing 256-Bit SSL Gateway Session...',
      'Verifying Tokenized Payment Credentials...',
      'Synthesizing Cryptographic Research Journal Hash...',
      'Authorizing Ledger Transaction...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setProcessingStep(steps[i]);
      await new Promise(r => setTimeout(r, 600));
    }

    const orderNum = `ORD-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const journalHash = `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

    const newOrder: CompletedOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      timestamp: Date.now(),
      items: [...cart],
      subtotal,
      discount: discountAmount,
      tax: taxAmount,
      shipping: shippingCost,
      total: finalTotal,
      currency: cart[0]?.product.currency || '₹',
      paymentMethod,
      paymentReference: `PAY-${Date.now().toString(36).toUpperCase()}`,
      shippingAddress: { ...shippingAddress },
      journalHash
    };

    completeOrder(newOrder);
    setConfirmedOrder(newOrder);
    setIsProcessing(false);
    clearCart();
  };

  const handleClose = () => {
    setConfirmedOrder(null);
    closeCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="relative w-full max-w-4xl bg-[#121316] border border-[#27272a] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Gradient Accent */}
        <div className="h-1 w-full" style={{ background: 'var(--brand-gradient)' }} />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#27272a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#ff6b1a]/15 text-[#ff6b1a] flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#f5f5f7]">
                {confirmedOrder ? 'Order Confirmed & Ledger Sealed' : 'Secure Checkout & Payment Portal'}
              </h2>
              <p className="text-xs text-[#a1a1aa] flex items-center gap-1.5 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
                <span>256-Bit TLS Encryption · Biometric Gaze Telemetry Validated</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 text-[#71717a] hover:text-[#f5f5f7] rounded-lg transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONFIRMATION SCREEN */}
        {confirmedOrder ? (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 mx-auto flex items-center justify-center animate-in zoom-in-50">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase text-[#10b981] font-bold tracking-wider">
                Payment Authorized & Verified
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl text-[#f5f5f7] mt-1">
                Thank You for Your Order
              </h3>
              <p className="text-sm text-[#a1a1aa] mt-2 max-w-md mx-auto">
                Your transaction has been securely processed. A formal research ledger entry and receipt have been generated.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="max-w-xl mx-auto bg-[#18181b] rounded-xl border border-[#27272a] p-5 text-left text-xs font-mono space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#27272a]">
                <span className="text-[#71717a]">Order Number:</span>
                <span className="text-[#f5f5f7] font-bold">{confirmedOrder.orderNumber}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#27272a]">
                <span className="text-[#71717a]">Payment Method:</span>
                <span className="text-[#10b981] font-bold">{confirmedOrder.paymentMethod}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#27272a]">
                <span className="text-[#71717a]">Total Paid:</span>
                <span className="text-[#f5f5f7] font-bold text-sm">
                  {confirmedOrder.currency}{confirmedOrder.total.toLocaleString('en-IN')}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#71717a] block mb-1">JOURNAL TRANSACTION HASH:</span>
                <span className="text-[11px] text-[#ff6b1a] break-all block bg-[#121316] p-2 rounded border border-[#27272a]">
                  {confirmedOrder.journalHash}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#f5f5f7] hover:bg-white text-[#09090b] text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          /* CHECKOUT FORM SCREEN */
          <form onSubmit={handlePay} className="grid grid-cols-1 lg:grid-cols-12 max-h-[80vh] overflow-y-auto">
            
            {/* Left Column: Payment Methods & Shipping */}
            <div className="lg:col-span-7 p-6 space-y-6 border-b lg:border-b-0 lg:border-r border-[#27272a]">
              
              {/* Payment Method Selector */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-[#a1a1aa] block mb-3 font-semibold">
                  Select Payment Method
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'CARD', label: 'Credit Card', icon: CreditCard },
                    { id: 'UPI', label: 'UPI / QR', icon: QrCode },
                    { id: 'NET_BANKING', label: 'Net Banking', icon: Building2 },
                    { id: 'BNPL', label: '0% EMI', icon: Clock }
                  ].map(method => {
                    const isSelected = paymentMethod === method.id;
                    const Icon = method.icon;
                    return (
                      <button
                        type="button"
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id as PaymentMethodType)}
                        data-magnetic
                        className={`p-3 rounded-xl border text-left flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#18181b] border-[#ff6b1a] text-[#f5f5f7] shadow-lg ring-1 ring-[#ff6b1a]/30'
                            : 'bg-[#141416] border-[#27272a] text-[#a1a1aa] hover:border-[#3f3f46]'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-[#ff6b1a]' : 'text-[#71717a]'}`} />
                        <span className="text-[11px] font-medium">{method.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* METHOD 1: CREDIT / DEBIT CARD */}
              {paymentMethod === 'CARD' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  {/* Virtual Obsidian Card Preview */}
                  <div className="relative aspect-[1.8/1] max-w-sm mx-auto rounded-2xl p-5 text-white shadow-2xl border border-white/10 flex flex-col justify-between overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #1c1c1f 0%, #0d0d10 50%, #17171a 100%)'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-7 rounded bg-gradient-to-r from-amber-400 to-amber-200 shadow-inner flex items-center justify-center">
                        <div className="w-8 h-5 border border-amber-800/40 rounded-sm" />
                      </div>
                      <span className="font-mono text-sm tracking-wider font-bold text-white/90">
                        VISA PLATINUM
                      </span>
                    </div>

                    <div className="py-2">
                      <span className="font-mono text-base tracking-[0.2em] font-medium">
                        {cardNumber}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-white/70 uppercase">
                      <div>
                        <span className="text-[8px] block text-white/40">CARDHOLDER</span>
                        <span>{cardName}</span>
                      </div>
                      <div>
                        <span className="text-[8px] block text-white/40">EXPIRES</span>
                        <span>{cardExpiry}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Form Inputs */}
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-[11px] font-mono text-[#a1a1aa] block mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#ff6b1a] rounded-xl px-3.5 py-2.5 text-xs text-[#f5f5f7] font-mono outline-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-mono text-[#a1a1aa] block mb-1">Valid Thru (MM/YY)</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={e => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#ff6b1a] rounded-xl px-3.5 py-2.5 text-xs text-[#f5f5f7] font-mono outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-[#a1a1aa] block mb-1">Security Code (CVV)</label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={e => setCardCvv(e.target.value)}
                          placeholder="•••"
                          maxLength={4}
                          className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#ff6b1a] rounded-xl px-3.5 py-2.5 text-xs text-[#f5f5f7] font-mono outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* METHOD 2: UPI / QR SCAN */}
              {paymentMethod === 'UPI' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-4 bg-[#18181b] rounded-xl border border-[#27272a] flex flex-col sm:flex-row items-center gap-5">
                    {/* Simulated Dynamic UPI QR Code */}
                    <div className="w-28 h-28 p-2 rounded-xl bg-white flex items-center justify-center shrink-0">
                      <div className="w-full h-full border-2 border-black grid grid-cols-5 gap-0.5 p-1">
                        {Array.from({ length: 25 }).map((_, i) => (
                          <div 
                            key={i} 
                            className={`rounded-xs ${
                              (i % 2 === 0 || i % 3 === 0) ? 'bg-black' : 'bg-transparent'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 text-center sm:text-left">
                      <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-[#10b981]/15 text-[#10b981] font-bold">
                        Scan with Any UPI App
                      </span>
                      <p className="text-xs text-[#a1a1aa]">
                        Scan via Google Pay, PhonePe, Paytm, or BHIM. Instant zero-fee verification.
                      </p>
                      <span className="text-[11px] font-mono text-[#71717a] block">
                        Dynamic QR expires in 04:48 min
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#a1a1aa] block mb-1">Or Enter Virtual Payment Address (VPA)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={upiId}
                        onChange={e => setUpiId(e.target.value)}
                        placeholder="yourname@upi"
                        className="flex-1 bg-[#18181b] border border-[#27272a] focus:border-[#ff6b1a] rounded-xl px-3.5 py-2.5 text-xs text-[#f5f5f7] font-mono outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setUpiVerified(true)}
                        className="px-3 py-2 bg-[#27272a] hover:bg-[#3f3f46] text-[#10b981] rounded-xl text-xs font-mono font-semibold"
                      >
                        {upiVerified ? 'Verified ✓' : 'Verify'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* METHOD 3: NET BANKING */}
              {paymentMethod === 'NET_BANKING' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <label className="text-[11px] font-mono text-[#a1a1aa] block">Popular Banks</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Bank'].map(bank => (
                      <button
                        type="button"
                        key={bank}
                        onClick={() => setSelectedBank(bank)}
                        className={`p-3 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer ${
                          selectedBank === bank
                            ? 'bg-[#18181b] border-[#ff6b1a] text-[#f5f5f7] shadow'
                            : 'bg-[#141416] border-[#27272a] text-[#a1a1aa] hover:border-[#3f3f46]'
                        }`}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* METHOD 4: 0% INTEREST EMI / BNPL */}
              {paymentMethod === 'BNPL' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <label className="text-[11px] font-mono text-[#a1a1aa] block">Select Installment Schedule (0% Interest)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedInstallmentPlan('3_months')}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedInstallmentPlan === '3_months'
                          ? 'bg-[#18181b] border-[#ff6b1a] text-[#f5f5f7] ring-1 ring-[#ff6b1a]/30'
                          : 'bg-[#141416] border-[#27272a] text-[#a1a1aa]'
                      }`}
                    >
                      <span className="text-xs font-bold block text-[#f5f5f7]">3 Monthly Installments</span>
                      <span className="text-sm font-mono font-semibold text-[#10b981] mt-1 block">
                        ₹{Math.round(finalTotal / 3).toLocaleString('en-IN')} / mo
                      </span>
                      <span className="text-[10px] text-[#71717a] mt-1 block">No cost EMI · Pre-approved</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedInstallmentPlan('6_months')}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedInstallmentPlan === '6_months'
                          ? 'bg-[#18181b] border-[#ff6b1a] text-[#f5f5f7] ring-1 ring-[#ff6b1a]/30'
                          : 'bg-[#141416] border-[#27272a] text-[#a1a1aa]'
                      }`}
                    >
                      <span className="text-xs font-bold block text-[#f5f5f7]">6 Monthly Installments</span>
                      <span className="text-sm font-mono font-semibold text-[#10b981] mt-1 block">
                        ₹{Math.round(finalTotal / 6).toLocaleString('en-IN')} / mo
                      </span>
                      <span className="text-[10px] text-[#71717a] mt-1 block">No cost EMI · Pre-approved</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Shipping Address Inputs */}
              <div className="pt-4 border-t border-[#27272a]/70 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[#a1a1aa] block font-semibold">
                  Delivery Destination
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono text-[#71717a] block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={shippingAddress.fullName}
                      onChange={e => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                      className="w-full bg-[#18181b] border border-[#27272a] rounded-xl px-3 py-2 text-xs text-[#f5f5f7] outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-[#71717a] block mb-1">Email for Receipt</label>
                    <input
                      type="email"
                      value={shippingAddress.email}
                      onChange={e => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                      className="w-full bg-[#18181b] border border-[#27272a] rounded-xl px-3 py-2 text-xs text-[#f5f5f7] outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#71717a] block mb-1">Street Address</label>
                  <input
                    type="text"
                    value={shippingAddress.street}
                    onChange={e => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                    className="w-full bg-[#18181b] border border-[#27272a] rounded-xl px-3 py-2 text-xs text-[#f5f5f7] outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Ledger Review */}
            <div className="lg:col-span-5 p-6 bg-[#0f1012] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#a1a1aa] block font-semibold">
                  Order Summary ({cart.reduce((a, b) => a + b.quantity, 0)} Items)
                </span>

                {/* Items preview list */}
                <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1">
                  {cart.map(item => (
                    <div key={`${item.product.id}-${item.size}`} className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2.5">
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.name} 
                          className="w-10 h-12 object-cover rounded-md bg-[#18181b]"
                        />
                        <div>
                          <h4 className="text-[#f5f5f7] font-medium line-clamp-1 max-w-[150px]">
                            {item.product.name}
                          </h4>
                          <span className="text-[10px] text-[#71717a]">
                            Qty: {item.quantity} · Size: {item.size}
                          </span>
                        </div>
                      </div>
                      <span className="text-[#f5f5f7] font-semibold">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Promo Voucher Input */}
                <div className="pt-3 border-t border-[#27272a]">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value)}
                      placeholder="Promo Code"
                      className="flex-1 bg-[#18181b] border border-[#27272a] rounded-xl px-3 py-1.5 text-xs text-[#f5f5f7] font-mono uppercase"
                    />
                    <button
                      type="button"
                      onClick={() => setPromoApplied(true)}
                      className="px-3 py-1.5 bg-[#27272a] text-[#ff6b1a] rounded-xl text-xs font-mono font-semibold"
                    >
                      {promoApplied ? 'Applied ✓' : 'Apply'}
                    </button>
                  </div>
                  {promoApplied && (
                    <span className="text-[10px] font-mono text-[#10b981] mt-1 block">
                      RESEARCH15 Applied: 15% Academic Project Discount
                    </span>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-1.5 text-xs font-mono pt-3 border-t border-[#27272a]">
                  <div className="flex justify-between text-[#a1a1aa]">
                    <span>Cart Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-[#10b981]">
                      <span>Project Discount (15%)</span>
                      <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#a1a1aa]">
                    <span>Express Courier</span>
                    <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span>
                  </div>
                  <div className="flex justify-between text-[#a1a1aa]">
                    <span>Estimated GST (12%)</span>
                    <span>₹{taxAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-base text-[#f5f5f7] font-bold pt-2 border-t border-[#27272a]">
                    <span>Final Total</span>
                    <span className="text-[#ff6b1a]">₹{finalTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-[#27272a] space-y-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  data-magnetic
                  className="w-full py-3.5 px-4 bg-[#f5f5f7] hover:bg-white text-[#09090b] rounded-xl text-xs font-semibold tracking-wider uppercase transition-all shadow-xl cursor-pointer flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>{processingStep}</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Authorize Payment & Complete Order</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-[#71717a]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>Verified PCI-DSS Level 1 Compliant Transaction</span>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
