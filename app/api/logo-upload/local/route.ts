import { promises as fs } from 'fs'
import path from 'path'
import { randomBytes } from 'crypto'
import { NextResponse } from 'next/server'
import { MAX_LOGO_BYTES, logoContentType, safeFileName } from '@/lib/shop/logos'
import { LOCAL_DIR, LOCAL_PREFIX, isDev, readLocal } from '@/lib/server/logoStore'

export const dynamic = 'force-dynamic'

// Development only: saves uploads to .uploads/ so the flow works without a Blob store.
export async function POST(request: Request) {
  if (!isDev) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const form = await request.formData()
  const file = form.get('file')
  if (!(file instanceof File)) return NextResponse.json({ error: 'No file' }, { status: 400 })
  if (file.size > MAX_LOGO_BYTES) return NextResponse.json({ error: 'File is too large' }, { status: 413 })
  const id = `${randomBytes(6).toString('hex')}-${safeFileName(file.name)}`
  await fs.mkdir(LOCAL_DIR, { recursive: true })
  await fs.writeFile(path.join(LOCAL_DIR, id), Buffer.from(await file.arrayBuffer()))
  return NextResponse.json({ url: `${LOCAL_PREFIX}${id}` })
}

export async function GET(request: Request) {
  if (!isDev) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const id = new URL(request.url).searchParams.get('id') ?? ''
  const data = await readLocal(id)
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return new NextResponse(new Uint8Array(data), { headers: { 'Content-Type': logoContentType(id, '') || 'application/octet-stream' } })
}
