import { NormalisedListing, ListingProvider } from '@/types/listingReality';

export interface ParseResult {
  provider: ListingProvider;
  listingId?: string;
  isSupported: boolean;
  requiresManualFallback: boolean;
  isSearchOrIndexPage?: boolean;
  platformName?: string;
  cleanUrl?: string;
  extractedSuburb?: string;
  extractedPostcode?: string;
  extractedBedrooms?: number;
  guidanceMessage?: string;
  error?: string;
}

/**
 * Parses and validates a real estate listing URL.
 * Recognizes Domain, REA, Flatmates, Gumtree, and Marketplace with localized Australian guidance.
 * Rejects non-property or index/search URLs while avoiding fake data hallucination.
 */
export function parseListingUrl(rawUrl: string): ParseResult {
  if (!rawUrl || typeof rawUrl !== 'string' || !rawUrl.trim()) {
    return {
      provider: 'manual',
      isSupported: false,
      requiresManualFallback: true,
      error: 'Please paste a valid rental listing URL (or use the quick check form below).',
    };
  }

  let parsed: URL;
  try {
    const withProtocol = rawUrl.startsWith('http://') || rawUrl.startsWith('https://')
      ? rawUrl.trim()
      : `https://${rawUrl.trim()}`;
    parsed = new URL(withProtocol);
  } catch {
    return {
      provider: 'manual',
      isSupported: false,
      requiresManualFallback: true,
      error: 'Malformed URL. Please paste a full web link (e.g. https://www.domain.com.au/...).',
    };
  }

  const hostname = parsed.hostname.toLowerCase().replace(/^www\./, '');
  const pathname = parsed.pathname.toLowerCase();

  // 1. Domain.com.au Parser
  if (hostname === 'domain.com.au' || hostname.endsWith('.domain.com.au')) {
    const matchId = pathname.match(/(\d{6,12})/);
    const listingId = matchId ? matchId[1] : undefined;
    const { suburb, postcode, bedrooms } = extractMetadataFromDomainPath(pathname);

    // If it's a domain homepage, news, or general search without any listing ID or suburb slug
    if (!listingId && !suburb) {
      return {
        provider: 'domain',
        isSupported: false,
        requiresManualFallback: true,
        isSearchOrIndexPage: true,
        platformName: 'Domain',
        cleanUrl: parsed.toString(),
        error: 'This looks like a general Domain search or category page rather than a specific listing. Please paste the direct property link, or enter the suburb and rent below.',
      };
    }

    return {
      provider: 'domain',
      listingId,
      isSupported: true,
      requiresManualFallback: false,
      platformName: 'Domain',
      cleanUrl: parsed.toString(),
      extractedSuburb: suburb,
      extractedPostcode: postcode,
      extractedBedrooms: bedrooms,
      guidanceMessage: suburb
        ? `Domain listing detected in ${suburb}${bedrooms !== undefined ? ` (${bedrooms}-bed)` : ''}. Please confirm the weekly rent ($) from the ad:`
        : `Domain listing detected. Please confirm the suburb and weekly rent ($):`,
    };
  }

  // 2. RealEstate.com.au (REA) Parser
  if (hostname === 'realestate.com.au' || hostname.endsWith('.realestate.com.au')) {
    const matchId = pathname.match(/(\d{6,12})/);
    const listingId = matchId ? matchId[1] : undefined;
    const { suburb, postcode, bedrooms } = extractMetadataFromReaPath(pathname);

    // If it's realestate.com.au homepage or search page without property slug
    if (!listingId && !suburb) {
      return {
        provider: 'rea',
        isSupported: false,
        requiresManualFallback: true,
        isSearchOrIndexPage: true,
        platformName: 'RealEstate.com.au',
        cleanUrl: parsed.toString(),
        error: 'This looks like the Realestate.com.au home or search page. Please paste the specific property link, or enter details below.',
      };
    }

    return {
      provider: 'rea',
      listingId,
      isSupported: true,
      requiresManualFallback: true, // Always manual fallback until authorized partner API per Blueprint
      platformName: 'RealEstate.com.au',
      cleanUrl: parsed.toString(),
      extractedSuburb: suburb,
      extractedPostcode: postcode,
      extractedBedrooms: bedrooms,
      guidanceMessage: suburb
        ? `RealEstate.com.au listing detected in ${suburb}${bedrooms !== undefined ? ` (${bedrooms}-bed)` : ''}. Per REA platform terms, please confirm the weekly rent ($):`
        : `RealEstate.com.au listing detected. Per REA platform terms, please enter the weekly rent ($):`,
    };
  }

  // 3. Other Popular Australian Rental Portals (Warm Guidance)
  if (hostname.includes('flatmates.com.au')) {
    const fmMatch = pathname.match(/(?:flatmates|rooms-for-rent)-([a-z0-9-]+)/);
    const suburb = fmMatch ? fmMatch[1].replace(/-/g, ' ').replace(/\b\d{4}\b/, '').trim() : undefined;
    return {
      provider: 'manual',
      isSupported: false,
      requiresManualFallback: true,
      platformName: 'Flatmates.com.au',
      cleanUrl: parsed.toString(),
      extractedSuburb: suburb ? capitalize(suburb) : undefined,
      guidanceMessage: 'Flatmates.com.au share-house link detected! Automated scraping is restricted, but enter the weekly rent and suburb below to run your reality check (15 sec):',
    };
  }

  if (hostname.includes('gumtree.com.au')) {
    return {
      provider: 'manual',
      isSupported: false,
      requiresManualFallback: true,
      platformName: 'Gumtree',
      cleanUrl: parsed.toString(),
      guidanceMessage: 'Gumtree rental ad detected! Automated scraping is restricted, but enter the weekly rent and suburb below:',
    };
  }

  if (hostname.includes('rent.com.au')) {
    return {
      provider: 'manual',
      isSupported: false,
      requiresManualFallback: true,
      platformName: 'Rent.com.au',
      cleanUrl: parsed.toString(),
      guidanceMessage: 'Rent.com.au listing detected! Please confirm the suburb and weekly rent below:',
    };
  }

  if (hostname.includes('facebook.com') || hostname.includes('fb.com')) {
    return {
      provider: 'manual',
      isSupported: false,
      requiresManualFallback: true,
      platformName: 'Facebook Marketplace',
      cleanUrl: parsed.toString(),
      guidanceMessage: 'Facebook Marketplace rental link detected! Meta restricts direct scraping, but enter the details below to calculate in 15 seconds:',
    };
  }

  // 4. Clearly Non-Rental / Random Domains (e.g. google.com, youtube.com)
  return {
    provider: 'manual',
    isSupported: false,
    requiresManualFallback: true,
    error: `"${hostname}" does not appear to be an Australian rental portal. Paste a Domain or Realestate.com.au listing link, or enter details manually below:`,
  };
}

function extractMetadataFromDomainPath(pathname: string): {
  suburb?: string;
  postcode?: string;
  bedrooms?: number;
} {
  // Example: /12-smith-st-surry-hills-nsw-2010-12345678
  const nswMatch = pathname.match(/([a-z0-9-]+)-nsw-(\d{4})/);
  let suburb: string | undefined;
  let postcode: string | undefined;
  let bedrooms: number | undefined;

  if (nswMatch) {
    postcode = nswMatch[2];
    const rawSlug = nswMatch[1];
    // Look for street suffixes to identify the start of suburb
    const parts = rawSlug.split('-');
    const streetSuffixes = ['st', 'street', 'rd', 'road', 'ave', 'avenue', 'dr', 'drive', 'pl', 'place', 'ct', 'court', 'cres', 'crescent', 'pde', 'parade', 'way', 'hwy', 'highway'];
    let suffixIdx = -1;
    for (let i = 0; i < parts.length; i++) {
      if (streetSuffixes.includes(parts[i])) {
        suffixIdx = i;
        break;
      }
    }
    if (suffixIdx !== -1 && suffixIdx < parts.length - 1) {
      suburb = parts.slice(suffixIdx + 1).map(capitalize).join(' ');
    } else {
      suburb = parts.slice(-2).map(capitalize).join(' ');
    }
  }

  // Bedroom detection
  const bedMatch = pathname.match(/(\d+)[- ]*(?:bed|bedroom)/);
  if (bedMatch) {
    bedrooms = parseInt(bedMatch[1], 10);
  } else if (pathname.includes('studio')) {
    bedrooms = 0;
  }

  return { suburb, postcode, bedrooms };
}

function extractMetadataFromReaPath(pathname: string): {
  suburb?: string;
  postcode?: string;
  bedrooms?: number;
} {
  // Example: /property-apartment-nsw-bondi+beach-123456
  let suburb: string | undefined;
  let postcode: string | undefined;
  let bedrooms: number | undefined;

  const match = pathname.match(/nsw-([a-z0-9+]+)/);
  if (match) {
    const raw = match[1].replace(/\+/g, ' ');
    suburb = raw.split(' ').map(capitalize).join(' ');
  }

  const pcMatch = pathname.match(/\b(2\d{3})\b/);
  if (pcMatch) postcode = pcMatch[1];

  const bedMatch = pathname.match(/(\d+)[- ]*(?:bed|bedroom)/);
  if (bedMatch) {
    bedrooms = parseInt(bedMatch[1], 10);
  } else if (pathname.includes('studio')) {
    bedrooms = 0;
  }

  return { suburb, postcode, bedrooms };
}

function capitalize(s: string): string {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Maps a manual fallback form payload to a unified NormalisedListing object.
 */
export function mapManualToNormalisedListing(input: {
  weeklyRent: number;
  suburb: string;
  postcode?: string;
  bedrooms?: number;
  bathrooms?: number;
  internalAreaM2?: number;
  address?: string;
  listingUrl?: string;
}): NormalisedListing {
  const safeRent = Math.max(0, Number(input.weeklyRent) || 0);
  const area = input.internalAreaM2 && input.internalAreaM2 > 0 ? input.internalAreaM2 : undefined;

  return {
    provider: 'manual',
    objective: 'rent',
    headline: `${input.bedrooms !== undefined ? `${input.bedrooms} Bed in ` : ''}${input.suburb.trim()}`,
    address: input.address?.trim() || `${input.suburb.trim()}, NSW`,
    suburb: input.suburb.trim(),
    postcode: input.postcode?.trim() || '2000',
    state: 'NSW',
    weeklyRent: safeRent > 0 ? safeRent : null,
    bedrooms: input.bedrooms !== undefined ? Number(input.bedrooms) : 1,
    bathrooms: input.bathrooms !== undefined ? Number(input.bathrooms) : 1,
    propertyType: 'apartment',
    internalAreaM2: area,
    listingUrl: input.listingUrl,
    quality: {
      sourceFetchedAt: new Date().toISOString(),
      areaMissing: area === undefined,
      priceUnclear: safeRent <= 0,
      benchmarkWeak: false,
    },
  };
}

/**
 * Fetches a Domain listing via official API if credentials exist.
 */
export async function fetchDomainListing(
  listingId: string,
  rawUrl?: string
): Promise<NormalisedListing | null> {
  const apiKey = process.env.DOMAIN_API_KEY;

  if (!apiKey) {
    return null;
  }

  try {
    const res = await fetch(`https://api.domain.com.au/v1/listings/${listingId}`, {
      headers: {
        'X-Api-Key': apiKey,
        Accept: 'application/json',
      },
    });

    if (res.ok) {
      const data = await res.json();
      const priceNum =
        typeof data.priceDetails?.price === 'number'
          ? data.priceDetails.price
          : parseRentFromText(data.priceDetails?.displayPrice || '');

      return {
        provider: 'domain',
        providerListingId: listingId,
        listingUrl: rawUrl || `https://www.domain.com.au/${listingId}`,
        objective: 'rent',
        headline: data.headline || `${data.bedrooms || 1} Bed Apartment`,
        address: data.addressParts?.displayAddress || `${data.addressParts?.suburb}, NSW`,
        suburb: data.addressParts?.suburb || 'Sydney',
        postcode: data.addressParts?.postcode || '2000',
        state: data.addressParts?.state || 'NSW',
        weeklyRent: priceNum,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        propertyType: data.propertyTypes?.[0] || 'apartment',
        internalAreaM2: data.areaM2 || undefined,
        quality: {
          sourceFetchedAt: new Date().toISOString(),
          areaMissing: !data.areaM2,
          priceUnclear: priceNum === null,
          benchmarkWeak: false,
        },
      };
    }
  } catch (err) {
    console.warn('Domain API fetch failed:', err);
  }

  return null;
}

function parseRentFromText(text: string): number | null {
  const match = text.replace(/,/g, '').match(/\$?(\d{3,4})/);
  return match ? Number(match[1]) : null;
}
