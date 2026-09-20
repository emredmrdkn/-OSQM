import { RealityCheckResult } from '@/types/calculator';

/**
 * Builds the intent URL for sharing to X (formerly Twitter).
 */
export function getTwitterShareUrl(result: RealityCheckResult, siteUrl?: string): string {
  const url = siteUrl || (typeof window !== 'undefined' ? window.location.origin : 'https://0sqm.com');
  const city = result.city.name;
  const sqm = result.formattedSqm;
  const localItem = result.primaryHyperLocal.item.unitName;
  const localCount = result.primaryHyperLocal.count.toLocaleString();

  const tweetText = `I just ran the @0SQM Reality Check.\n\nMy life savings gets me exactly ${sqm} of ${city} (or ${localCount} ${localItem}).\n\nCheck how much microscopic land you can afford:`;
  
  const shareParams = new URLSearchParams({
    text: tweetText,
    url: `${url}?city=${result.city.id}&sqm=${result.affordableSqm}&deposit=${result.savingsAmount}`,
    hashtags: '0SQM,HousingCrisis,TheAustralianDream,RealEstate',
  });

  return `https://twitter.com/intent/tweet?${shareParams.toString()}`;
}

/**
 * Builds the intent URL for WhatsApp sharing.
 */
export function getWhatsAppShareUrl(result: RealityCheckResult, siteUrl?: string): string {
  const url = siteUrl || (typeof window !== 'undefined' ? window.location.origin : 'https://0sqm.com');
  const city = result.city.name;
  const sqm = result.formattedSqm;
  const localItem = result.primaryHyperLocal.item.unitName;
  const localCount = result.primaryHyperLocal.count.toLocaleString();

  const text = `I just ran the $0SQM Reality Check. My life savings affords ${sqm} of ${city} (or ${localCount} ${localItem})! Check yours: ${url}?city=${result.city.id}&sqm=${result.affordableSqm}`;

  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
}

/**
 * Builds the intent URL for Reddit submission.
 */
export function getRedditShareUrl(result: RealityCheckResult, siteUrl?: string): string {
  const url = siteUrl || (typeof window !== 'undefined' ? window.location.origin : 'https://0sqm.com');
  const title = `My life savings affords ${result.formattedSqm} of ${result.city.name} ($0SQM Housing Reality Check)`;
  const targetUrl = `${url}?city=${result.city.id}&sqm=${result.affordableSqm}`;

  return `https://www.reddit.com/submit?title=${encodeURIComponent(title)}&url=${encodeURIComponent(targetUrl)}`;
}

/**
 * Checks if the Web Share API is available in the current browser.
 */
export function canUseWebShare(): boolean {
  return typeof navigator !== 'undefined' && typeof navigator.share === 'function';
}

/**
 * Triggers the browser's native share sheet.
 */
export async function triggerNativeShare(
  result: RealityCheckResult,
  siteUrl?: string
): Promise<boolean> {
  if (!canUseWebShare()) return false;

  const url = siteUrl || window.location.origin;
  const shareUrl = `${url}?city=${result.city.id}&sqm=${result.affordableSqm}`;

  try {
    await navigator.share({
      title: '$0SQM — Housing Reality Check',
      text: `I can afford ${result.formattedSqm} of ${result.city.name} (${result.physicalMetaphor.title}).`,
      url: shareUrl,
    });
    return true;
  } catch {
    return false;
  }
}
