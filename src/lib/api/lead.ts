// Lead capture API for catalog downloads — submits to admin backend
// Configure VITE_API_BASE_URL in .env.local to point to your admin server

import { apiEndpoints, apiPost } from './client';

export interface LeadPayload {
  name: string;
  company: string;
  country: string;
  email: string;
  whatsapp?: string;
  productInterest?: string;
  sourcePage?: string;
  category?: string;
}

export interface LeadResponse {
  success: boolean;
  message: string;
  downloadUrl?: string;
}

// Fallback catalog URL if backend doesn't return one
const FALLBACK_CATALOG_URL = '/catalog.pdf';

export async function submitLead(payload: LeadPayload): Promise<LeadResponse> {
  try {
    const result = await apiPost<LeadResponse>(apiEndpoints.submitLead, {
      ...payload,
      source: 'catalog',
    });

    // Use backend-provided URL or fallback
    if (result.success && !result.downloadUrl) {
      result.downloadUrl = FALLBACK_CATALOG_URL;
    }

    return result;
  } catch (error) {
    console.error('Lead submission failed:', error);
    return {
      success: false,
      message: 'Download failed. Please try again or contact us.',
    };
  }
}
