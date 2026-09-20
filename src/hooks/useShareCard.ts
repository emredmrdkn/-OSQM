'use client';

import { useState } from 'react';
import { toPng, toBlob } from 'html-to-image';

export function useShareCard() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Captures the DOM element and downloads it as a PNG file.
   */
  const downloadCard = async (elementId: string, filename = '0sqm-reality-card.png') => {
    const node = document.getElementById(elementId);
    if (!node) {
      setError('Card element not found.');
      return false;
    }

    try {
      setIsGenerating(true);
      setError(null);

      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 2, // High resolution output
        backgroundColor: '#F8F6F0',
      });

      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();
      return true;
    } catch (err) {
      console.error('Error generating image:', err);
      setError('Failed to generate image. Please try again.');
      return false;
    } finally {
      setIsGenerating(false);
    }
  };

  /**
   * Captures the DOM element and copies the image directly to the system clipboard.
   */
  const copyCardToClipboard = async (elementId: string) => {
    const node = document.getElementById(elementId);
    if (!node) {
      setError('Card element not found.');
      return false;
    }

    try {
      setIsGenerating(true);
      setError(null);

      const blob = await toBlob(node, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#F8F6F0',
      });

      if (!blob) {
        throw new Error('Could not create image blob');
      }

      if (navigator.clipboard && typeof ClipboardItem !== 'undefined') {
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2500);
        return true;
      } else {
        throw new Error('Clipboard API not supported in this browser.');
      }
    } catch (err) {
      console.error('Clipboard copy error:', err);
      setError('Failed to copy to clipboard.');
      return false;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    downloadCard,
    copyCardToClipboard,
    isGenerating,
    copySuccess,
    error,
  };
}
