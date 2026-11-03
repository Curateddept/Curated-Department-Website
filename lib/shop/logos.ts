// Shared rules for customer logo uploads (used by the browser and the API routes).

export type LogoRef = { name: string; url: string; size: number; type: string }

export const MAX_LOGO_BYTES = 25 * 1024 * 1024
export const MAX_LOGOS_PER_ITEM = 5
export const LOGO_ACCEPT = 'image/*,.pdf,.ai,.eps,.svg,.psd,.zip'

const BY_EXT: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  heic: 'image/heic',
  heif: 'image/heif',
  svg: 'image/svg+xml',
  pdf: 'application/pdf',
  ai: 'application/postscript',
  eps: 'application/postscript',
  psd: 'image/vnd.adobe.photoshop',
  zip: 'application/zip',
}

export const ALLOWED_LOGO_TYPES = Array.from(new Set([...Object.values(BY_EXT), 'application/x-zip-compressed', 'image/tiff', 'image/bmp']))

/** Browsers often report "" for .ai/.eps/.psd — fall back to the extension. */
export function logoContentType(name: string, type: string) {
  if (type && ALLOWED_LOGO_TYPES.includes(type)) return type
  const ext = name.split('.').pop()?.toLowerCase() ?? ''
  return BY_EXT[ext] ?? type
}

export const safeFileName = (name: string) =>
  name.normalize('NFKD').replace(/[^\w.\-]+/g, '-').replace(/-+/g, '-').slice(-80) || 'logo'

export const fileSize = (n: number) => (n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`)
