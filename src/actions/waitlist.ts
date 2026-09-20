'use server';

export interface WaitlistFormInput {
  email: string;
  name?: string;
  productId: string;
  productTitle: string;
  selectedSize?: string;
  selectedColor?: string;
}

export interface WaitlistResponse {
  success: boolean;
  queueNumber?: string;
  deedId?: string;
  message: string;
  error?: string;
}

// In-memory counter seed for dynamic Hypebeast reservation sequence
let currentQueueIndex = 1401;

export async function submitWaitlist(
  input: WaitlistFormInput
): Promise<WaitlistResponse> {
  // Simulate minimal network latency for realistic UX
  await new Promise((resolve) => setTimeout(resolve, 600));

  const { email, name, productTitle, selectedSize, selectedColor } = input;

  if (!email || !email.trim()) {
    return {
      success: false,
      message: 'Email address is required to claim your digital deed.',
      error: 'MISSING_EMAIL',
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return {
      success: false,
      message: 'Invalid email address provided. Landlords love invalid emails.',
      error: 'INVALID_EMAIL',
    };
  }

  currentQueueIndex += Math.floor(Math.random() * 3) + 1;
  const queueNumber = `#${currentQueueIndex.toString().padStart(4, '0')}`;
  const randomDeedSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  const deedId = `DEED-0SQM-${currentQueueIndex}-${randomDeedSuffix}`;

  // Log in production/server console
  console.log(`[0SQM WAITLIST] New reservation:`, {
    queueNumber,
    deedId,
    email: email.trim(),
    name: name?.trim() || 'Anonymous Investor',
    product: productTitle,
    size: selectedSize || 'OS',
    color: selectedColor || 'Standard',
    timestamp: new Date().toISOString(),
  });

  return {
    success: true,
    queueNumber,
    deedId,
    message: `Digital Deed granted. You are ${queueNumber} in line for Drop 01.`,
  };
}
