// API client configuration
// Set NEXT_PUBLIC_API_BASE_URL in .env.local to point to your admin backend
// Example: NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
// If empty, requests go to same origin (/api/...)

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const apiEndpoints = {
  submitInquiry: `${API_BASE_URL}/api/public/inquiries`,
  submitLead: `${API_BASE_URL}/api/public/leads`,
};

export async function apiPost<T>(url: string, data: unknown): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}
