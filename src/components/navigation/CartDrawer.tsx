import React from 'react';
import { useSasher } from '../../context/SasherContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    isCartDrawerOpen, 
    setIsCartDrawerOpen,
    openCheckout
  } = useSasher();

  if (!isCartDrawerOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 25000;
  const progressToFreeShipping = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-[#0c0d0e]/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121316] border-l border-[#27272a] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#27272a]/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#e2a876]" />
              <h3 className="font-editorial text-2xl text-[#f4f4f5]">Your Shopping Bag</h3>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-[#71717a] hover:text-[#f4f4f5] transition-colors cursor-pointer"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="px-6 py-3 bg-[#18191d] border-b border-[#27272a]/50 text-xs">
            <div className="flex justify-between text-[11px] font-mono-tabular mb-1">
              <span className="text-[#a1a1aa]">
                {subtotal >= freeShippingThreshold 
                  ? 'Complimentary Express Courier Unlocked' 
                  : `Add ₹${(freeShippingThreshold - subtotal).toLocaleString('en-IN')} for Free Express Delivery`}
              </span>
              <span className="text-[#f4f4f5] font-semibold">{progressToFreeShipping}%</span>
            </div>
            <div className="w-full bg-[#27272a] h-1 rounded-full overflow-hidden">
              <div 
                className="bg-[#10b981] h-full transition-all duration-300"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div 
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 p-3 rounded-xl bg-[#18191d]/60 border border-[#27272a]/60"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover object-center rounded-lg bg-[#27272a]"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono-tabular uppercase tracking-wider text-[#71717a]">
                          {item.product.brand}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#71717a] hover:text-[#ef4444] transition-colors p-1"
                          aria-label="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="text-xs font-medium text-[#f4f4f5] line-clamp-1">
                        {item.product.name}
                      </h4>
                      <div className="text-[11px] text-[#a1a1aa] mt-0.5 font-mono-tabular">
                        Size: {item.size}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 border border-[#27272a] rounded-md px-1.5 py-0.5 bg-[#121316]">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="text-[#a1a1aa] hover:text-[#f4f4f5] p-0.5"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono-tabular text-[#f4f4f5] px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="text-[#a1a1aa] hover:text-[#f4f4f5] p-0.5"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono-tabular text-xs font-semibold text-[#f4f4f5]">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center text-[#71717a] space-y-2">
                <ShoppingBag className="w-8 h-8 mx-auto text-[#3f3f46]" />
                <p className="text-sm">Your shopping bag is empty.</p>
              </div>
            )}
          </div>

          {/* Footer Checkout Module */}
          <div className="p-6 border-t border-[#27272a]/70 bg-[#121316] space-y-4">
            <div className="space-y-1.5 text-xs font-mono-tabular">
              <div className="flex justify-between text-[#a1a1aa]">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#a1a1aa]">
                <span>Express Courier</span>
                <span>{subtotal >= freeShippingThreshold ? 'FREE' : '₹450'}</span>
              </div>
              <div className="flex justify-between text-sm text-[#f4f4f5] font-bold pt-2 border-t border-[#27272a]/60">
                <span>Estimated Total</span>
                <span>
                  ₹{(subtotal + (subtotal >= freeShippingThreshold ? 0 : 450)).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              onClick={openCheckout}
              disabled={cart.length === 0}
              className="w-full py-3.5 px-4 bg-[#f4f4f5] hover:bg-white disabled:bg-[#27272a] disabled:text-[#71717a] text-[#09090b] rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
