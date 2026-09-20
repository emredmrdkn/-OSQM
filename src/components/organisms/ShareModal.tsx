'use client';

import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { ShareableRealityCard } from '@/components/molecules/ShareableRealityCard';
import { Button } from '@/components/atoms/Button';
import { useShareCard } from '@/hooks/useShareCard';
import {
  getTwitterShareUrl,
  getWhatsAppShareUrl,
  canUseWebShare,
  triggerNativeShare,
} from '@/lib/share';
import {
  X,
  Download,
  Copy,
  Check,
  Share2,
  Send,
  Loader2,
} from 'lucide-react';

export const ShareModal: React.FC = () => {
  const { isShareModalOpen, closeShareModal, result } = useAppStore();
  const { downloadCard, copyCardToClipboard, isGenerating, copySuccess, error } =
    useShareCard();
  const [showXCopyTip, setShowXCopyTip] = React.useState(false);

  if (!isShareModalOpen) return null;

  const twitterUrl = getTwitterShareUrl(result);
  const whatsappUrl = getWhatsAppShareUrl(result);
  const showNativeShare = canUseWebShare();

  const handleDownload = () => {
    const filename = `0sqm-reality-${result.city.id}-${result.affordableSqm}sqm.png`;
    downloadCard('shareable-reality-card-preview', filename);
  };

  const handleCopy = () => {
    copyCardToClipboard('shareable-reality-card-preview');
  };

  const handlePostToX = async () => {
    // Automatically copy image to clipboard so user can press Cmd+V in Twitter!
    await copyCardToClipboard('shareable-reality-card-preview');
    setShowXCopyTip(true);
    window.open(twitterUrl, '_blank');
  };

  const handleNativeShare = async () => {
    await triggerNativeShare(result);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={closeShareModal} />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-2xl bg-[#F8F6F0] border-4 border-[#141414] shadow-[8px_8px_0px_#141414] p-5 sm:p-7 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-[#141414]">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black font-[family-name:var(--font-bebas)] text-[#141414]">
              Share Your Reality Card
            </span>
            <span className="bg-[#FFE600] text-[#141414] text-[10px] font-black uppercase px-2 py-0.5 border border-[#141414]">
              Viral Mode
            </span>
          </div>

          <button
            type="button"
            onClick={closeShareModal}
            className="p-1 border border-[#141414] bg-white hover:bg-[#FFE600] text-[#141414] transition-colors cursor-pointer shadow-[2px_2px_0px_#141414]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Preview (Target for html-to-image) */}
        <div className="w-full overflow-hidden flex justify-center my-2 p-2 bg-[#EAE5D9]/50 border border-dashed border-[#141414]">
          <ShareableRealityCard
            id="shareable-reality-card-preview"
            result={result}
            className="w-full"
          />
        </div>

        {/* X Auto-Copy Notification Tip */}
        {showXCopyTip && (
          <div className="my-2 p-3 bg-[#FFE600] border-2 border-[#141414] text-[#141414] text-xs font-black shadow-[3px_3px_0px_#141414] animate-in fade-in flex items-center gap-2">
            <span className="text-lg">📸</span>
            <span>
              <strong>Görsel panonuza kopyalandı!</strong> Açılan X (Twitter) penceresinde tweet kutusuna gelip <strong>Cmd + V</strong> (veya sağ tık &gt; Yapıştır) yaparak kart görselini doğrudan ekleyebilirsiniz!
            </span>
          </div>
        )}

        {/* Status Message */}
        {copySuccess && !showXCopyTip && (
          <div className="my-2 p-2 bg-emerald-100 border border-emerald-600 text-emerald-900 text-xs font-bold text-center flex items-center justify-center gap-1.5 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Image copied to clipboard! Paste it directly into your chat or story.</span>
          </div>
        )}

        {error && (
          <div className="my-2 p-2 bg-red-100 border border-red-600 text-red-900 text-xs font-bold text-center">
            {error}
          </div>
        )}

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5">
          <Button
            variant="primary"
            size="md"
            disabled={isGenerating}
            onClick={handleDownload}
            icon={
              isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )
            }
          >
            Download PNG (1200x630)
          </Button>

          <Button
            variant="outline"
            size="md"
            disabled={isGenerating}
            onClick={handleCopy}
            icon={copySuccess ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          >
            {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
          </Button>

          <Button
            variant="dark"
            size="md"
            disabled={isGenerating}
            onClick={handlePostToX}
            icon={<Share2 className="w-4 h-4 text-[#FFE600]" />}
          >
            Post to X (Twitter)
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={() => window.open(whatsappUrl, '_blank')}
            icon={<Send className="w-4 h-4 text-emerald-600" />}
          >
            Send on WhatsApp
          </Button>

          {showNativeShare && (
            <div className="sm:col-span-2">
              <Button
                variant="ghost"
                size="sm"
                fullWidth
                onClick={handleNativeShare}
                icon={<Share2 className="w-3.5 h-3.5" />}
              >
                More Share Options (System Sheet)
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
