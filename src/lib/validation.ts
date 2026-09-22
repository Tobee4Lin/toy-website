// Shared customer-field validation used across inquiry / contact / catalog forms.
// Keep rules consistent with the backend zod schemas in public-inquiry.controller.ts.
import { z } from 'zod';

// Phone / WhatsApp: optional leading +, digits, spaces, parentheses, dashes;
// must contain at least 6 and at most 15 digits.
const WHATSAPP_REGEX = /^[+]?[\d][\d\s().-]{4,23}$/;

export function normalizePhone(value: string): string {
  return value.replace(/[^\d+]/g, '');
}

export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 6 && digits.length <= 15 && WHATSAPP_REGEX.test(value.trim());
}

export const nameField = z
  .string()
  .trim()
  .min(2, 'Please enter your name')
  .max(100, 'Name is too long');

export const companyField = z
  .string()
  .trim()
  .min(1, 'Company name is required')
  .max(150, 'Company name is too long');

export const countryField = z
  .string()
  .trim()
  .min(2, 'Please enter your country')
  .max(100, 'Country is too long');

export const emailField = z
  .string()
  .trim()
  .email('Please enter a valid email address')
  .max(150, 'Email is too long');

export const whatsappField = z
  .string()
  .trim()
  .min(6, 'WhatsApp number is required')
  .max(25, 'WhatsApp number is too long')
  .refine((v) => isValidPhone(v), 'Please enter a valid WhatsApp number');

// Optional WhatsApp (e.g. catalog download), validated only when provided.
export const whatsappOptionalField = z
  .string()
  .trim()
  .max(25, 'WhatsApp number is too long')
  .refine((v) => v === '' || isValidPhone(v), 'Please enter a valid WhatsApp number');

export const messageField = z
  .string()
  .trim()
  .max(3000, 'Message is too long')
  .optional()
  .or(z.literal(''));

// Required core customer fields used by the quote dialog.
export const customerSchema = z.object({
  name: nameField,
  company: companyField,
  country: countryField,
  email: emailField,
  whatsapp: whatsappField,
  message: messageField,
});

export type CustomerFormValues = z.infer<typeof customerSchema>;
