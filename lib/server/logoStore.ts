import { promises as fs } from 'fs'
import path from 'path'

// Local stand-in for Vercel Blob so uploads and order emails can be tested on `next dev`.
export const LOCAL_DIR = path.join(process.cwd(), '.uploads')
export const LOCAL_PREFIX = '/api/logo-upload/local?id='

export const isDev = process.env.NODE_ENV !== 'production'
export const blobEnabled = Boolean(process.env.BLOB_READ_WRITE_TOKEN)

export const isLocalId = (id: string) => /^[a-z0-9]{12}-[\w.\-]{1,80}$/i.test(id)

export async function readLocal(id: string) {
  if (!isLocalId(id)) return null
  try {
    return await fs.readFile(path.join(LOCAL_DIR, id))
  } catch {
    return null
  }
}

/** Only fetch logo files we stored ourselves — never an arbitrary URL from the request. */
export async function loadLogo(url: string): Promise<Buffer | null> {
  if (url.startsWith(LOCAL_PREFIX)) return isDev ? readLocal(url.slice(LOCAL_PREFIX.length)) : null
  let u: URL
  try {
    u = new URL(url)
  } catch {
    return null
  }
  if (u.protocol !== 'https:' || !u.hostname.endsWith('.public.blob.vercel-storage.com')) return null
  const res = await fetch(u, { cache: 'no-store' })
  if (!res.ok) return null
  return Buffer.from(await res.arrayBuffer())
}

export function isStoredLogoUrl(url: string) {
  if (url.startsWith(LOCAL_PREFIX)) return isDev
  try {
    const u = new URL(url)
    return u.protocol === 'https:' && u.hostname.endsWith('.public.blob.vercel-storage.com')
  } catch {
    return false
  }
}
