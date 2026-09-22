// Inquiry API layer — submits to admin backend
// Configure VITE_API_BASE_URL in .env.local to point to your admin server
// Example: VITE_API_BASE_URL=http://localhost:3000

import { apiEndpoints, apiPost } from './client';

export interface InquiryPayload {
  name: string;
  company: string;
  country: string;
  email: string;
  whatsapp?: string;
  estimatedQuantity?: string;
  message?: string;
  productName?: string;
  itemNumber?: string;
  category?: string;
  pageUrl?: string;
  customizationRequirement?: string;
  file?: File | null;
  attachments?: Array<{ name: string; url: string }>;
  selectedProducts?: Array<{
    itemNumber: string;
    name: string;
    quantity: number;
  }>;
  source?: string;
}

export interface InquiryResponse {
  success: boolean;
  message: string;
  inquiryId?: string;
}

export async function submitInquiry(payload: InquiryPayload): Promise<InquiryResponse> {
  try {
    // Remove file from JSON payload (file upload handled separately if needed)
    const { file, ...data } = payload;

    const result = await apiPost<InquiryResponse>(apiEndpoints.submitInquiry, {
      ...data,
      source: data.source || 'rfq',
    });

    return result;
  } catch (error) {
    console.error('Inquiry submission failed:', error);
    return {
      success: false,
      message: 'Submission failed. Please try again or email us directly.',
    };
  }
}
