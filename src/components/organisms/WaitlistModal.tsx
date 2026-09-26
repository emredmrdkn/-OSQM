'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { submitWaitlist } from '@/actions/waitlist';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Tape } from '@/components/atoms/Tape';
import { X, CheckCircle2, ShieldAlert, Sparkles, Copy, Check } from 'lucide-react';

export const WaitlistModal: React.FC = () => {
  const isWaitlistOpen = useAppStore((state) => state.isWaitlistOpen);
  const selectedProduct = useAppStore((state) => state.selectedProduct);
  const closeWaitlistModal = useAppStore((state) => state.closeWaitlistModal);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [queueNumber, setQueueNumber] = useState<string | null>(null);
  const [deedId, setDeedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Set default color when product changes
  React.useEffect(() => {
    if (selectedProduct && selectedProduct.colors.length > 0) {
      setSelectedColor(selectedProduct.colors[0].name);
    }
    // Reset states on open
    setIsSuccess(false);
    setErrorMessage(null);
    setQueueNumber(null);
    setDeedId(null);
  }, [selectedProduct, isWaitlistOpen]);

  if (!isWaitlistOpen || !selectedProduct) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const res = await submitWaitlist({
        email,
        name,
        productId: selectedProduct.id,
        productTitle: selectedProduct.title,
        selectedSize,
        selectedColor: selectedColor || selectedProduct.colors[0]?.name,
      });

      if (res.success && res.queueNumber) {
        setIsSuccess(true);
        setQueueNumber(res.queueNumber);
        setDeedId(res.deedId || 'DEED-0SQM-CERTIFIED');
      } else {
        setErrorMessage(res.message || 'Failed to issue deed.');
      }
    } catch (err) {
      console.error('[WaitlistModal] Error submitting deed:', err);
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyDeed = () => {
    if (deedId) {
      navigator.clipboard.writeText(
        `I just claimed Digital Deed ${deedId} (${queueNumber}) for $0SQM Drop 01. Zero square metres of land owned: https://0sqm.club`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#141414]/80 p-4 backdrop-blur-xs">
      <div
        className="relative w-full max-w-xl overflow-hidden border-4 border-[#141414] bg-[#F8F6F0] p-6 shadow-[10px_10px_0px_#141414] sm:p-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Decorative Masking Tape */}
        <Tape variant="yellow" position="top-right" className="-top-3 right-8 z-20" />
        <Tape variant="kraft" position="top-left" className="-top-3 left-8 z-20" />

        {/* Close Button */}
        <button
          onClick={closeWaitlistModal}
          className="absolute top-4 right-4 z-30 border-2 border-[#141414] bg-white p-1.5 transition-transform hover:scale-110 active:scale-95"
          aria-label="Close Deed Modal"
        >
          <X className="h-5 w-5 text-[#141414]" />
        </button>

        {/* Modal Content Header: Digital Deed Title */}
        <div className="border-b-3 border-[#141414] pb-4 text-center">
          <div className="inline-block border border-[#141414] bg-[#FFE600] px-3 py-0.5 font-mono text-[10px] font-black uppercase tracking-widest text-[#141414]">
            OFFICIAL REGISTRY // NOTARIZED CERTIFICATE
          </div>
          <h2 className="mt-2 font-[family-name:var(--font-bebas)] text-4xl font-black uppercase tracking-tight text-[#141414] sm:text-5xl">
            DIGITAL DEED OF OWNERSHIP
          </h2>
          <p className="font-mono text-xs text-gray-600 uppercase">
            CERTIFYING PROUD OWNERSHIP OF 0.00 m² OF METROPOLITAN SOIL
          </p>
        </div>

        {/* Deed Body */}
        <div className="relative mt-6">
          {/* SUCCESS OVERLAY WITH ANIMATED "REALITY CHECKED" STAMP */}
          {isSuccess ? (
            <div className="relative py-6 text-center">
              {/* Massive Red Stamp */}
              <div className="relative mx-auto my-4 inline-block -rotate-6 animate-stamp-in border-8 border-[#D32F2F] bg-red-50/90 px-8 py-3 shadow-[8px_8px_0px_#D32F2F]">
                <span className="font-[family-name:var(--font-bebas)] text-5xl font-black tracking-widest text-[#D32F2F] sm:text-7xl">
                  REALITY CHECKED
                </span>
                <div className="border-t-2 border-dashed border-[#D32F2F] pt-1 font-mono text-xs font-black uppercase tracking-widest text-[#D32F2F]">
                  KOOGEE CORGI SEAL OF ZERO DEBT
                </div>
              </div>

              {/* Dynamic Queue Number */}
              <div className="mt-6 border-3 border-[#141414] bg-[#FFE600] p-4 shadow-[4px_4px_0px_#141414]">
                <span className="font-mono text-xs font-black uppercase tracking-widest text-[#141414]">
                  DROP 01 VIP RESERVATION NUMBER
                </span>
                <div className="font-[family-name:var(--font-bebas)] text-5xl font-black text-[#141414] sm:text-6xl">
                  {queueNumber}
                </div>
                <p className="font-mono text-xs font-bold text-gray-800">
                  DEED ID: {deedId}
                </p>
              </div>

              {/* Product Confirmation Info */}
              <div className="mt-4 border-2 border-dashed border-[#141414] bg-white p-4 text-left font-mono text-xs">
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">ITEM RESERVED:</span>
                  <span className="font-bold text-[#141414]">{selectedProduct.title}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">SELECTED SPEC:</span>
                  <span className="font-bold text-[#141414]">{selectedSize} / {selectedColor}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">EMAIL CONFIRMED:</span>
                  <span className="font-bold text-[#141414]">{email}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleCopyDeed}
                  className="flex-1 justify-center text-xs font-black"
                >
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      COPIED TO CLIPBOARD!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      SHARE DEED PROOF
                    </>
                  )}
                </Button>

                <Button
                  variant="dark"
                  size="md"
                  onClick={closeWaitlistModal}
                  className="flex-1 justify-center text-xs font-black"
                >
                  DONE
                </Button>
              </div>
            </div>
          ) : (
            /* RESERVATION FORM */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product Summary Header inside Deed */}
              <div className="border-2 border-[#141414] bg-white p-3 shadow-[3px_3px_0px_#141414]">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] font-black uppercase text-gray-500">
                      REQUESTING DEED FOR:
                    </span>
                    <h4 className="font-[family-name:var(--font-bebas)] text-xl font-black text-[#141414]">
                      {selectedProduct.title}
                    </h4>
                  </div>
                  <div className="font-[family-name:var(--font-bebas)] text-2xl font-black text-[#141414]">
                    ${selectedProduct.price} {selectedProduct.currency}
                  </div>
                </div>
              </div>

              {/* Size & Color Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block font-mono text-xs font-black uppercase text-[#141414]">
                    CHOOSE SIZE:
                  </label>
                  <div className="grid grid-cols-4 gap-1">
                    {['S', 'M', 'L', 'XL'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`border-2 border-[#141414] py-1 font-mono text-xs font-black transition-colors ${
                          selectedSize === size
                            ? 'bg-[#141414] text-[#FFE600]'
                            : 'bg-white text-[#141414] hover:bg-gray-100'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-1 block font-mono text-xs font-black uppercase text-[#141414]">
                    CHOOSE COLOR:
                  </label>
                  <select
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-full border-2 border-[#141414] bg-white p-1.5 font-mono text-xs font-bold text-[#141414] focus:outline-hidden"
                  >
                    {selectedProduct.colors.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Inputs */}
              <div>
                <label className="mb-1 block font-mono text-xs font-black uppercase text-[#141414]">
                  FULL NAME (FOR THE DEED REGISTER):
                </label>
                <Input
                  type="text"
                  placeholder="e.g. Justin Case"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="font-mono text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block font-mono text-xs font-black uppercase text-[#141414]">
                  EMAIL ADDRESS (REQUIRED FOR NOTIFICATION):
                </label>
                <Input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="font-mono text-sm"
                />
              </div>

              {/* Error Callout */}
              {errorMessage && (
                <div className="flex items-center gap-2 border-2 border-[#D32F2F] bg-red-50 p-2 font-mono text-xs text-[#D32F2F]">
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Legal / Satire Guarantee */}
              <p className="font-mono text-[10px] text-gray-500 leading-tight">
                * By registering, you solemnly swear that you understand this garment guarantees exactly 0.00 square metres of real property. We respect your inbox and hate spam as much as rent increases.
              </p>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full justify-center text-sm font-black tracking-wider"
              >
                {isSubmitting ? 'ISSUING DIGITAL DEED...' : 'CLAIM DEED & JOIN WAITLIST →'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
