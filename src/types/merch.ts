export interface MerchVariant {
  id: string;
  sku: string;
  name: string;
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  color: string;
  colorHex: string;
  inStock: boolean;
}

export interface MerchProduct {
  id: string;
  stripePriceId: string;
  sku: string;
  title: string;
  slug: string;
  tagline: string;
  price: number;
  currency: 'AUD' | 'USD';
  imageSrc: string;
  backImageSrc?: string;
  badge?: string;
  colors: { name: string; hex: string }[];
  variants: MerchVariant[];
}

export interface WaitlistSubmission {
  productId: string;
  email: string;
  name?: string;
  city?: string;
  timestamp: string;
}
