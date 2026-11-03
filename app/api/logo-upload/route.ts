import { NextResponse } from 'next/server'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { ALLOWED_LOGO_TYPES, MAX_LOGO_BYTES } from '@/lib/shop/logos'
import { blobEnabled, isDev } from '@/lib/server/logoStore'

export const dynamic = 'force-dynamic'

// Tells the browser where to send files: Vercel Blob in production, the local stand-in on `next dev`.
export function GET() {
  return NextResponse.json({ mode: blobEnabled ? 'blob' : isDev ? 'local' : 'off' })
}

// Issues short-lived Blob upload tokens so large logo files go straight from the browser to storage.
export async function POST(request: Request) {
  if (!blobEnabled) return NextResponse.json({ error: 'Uploads are not configured' }, { status: 503 })
  const body = (await request.json()) as HandleUploadBody
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith('logos/')) throw new Error('Invalid upload path')
        return {
          allowedContentTypes: ALLOWED_LOGO_TYPES,
          maximumSizeInBytes: MAX_LOGO_BYTES,
          addRandomSuffix: true,
        }
      },
      onUploadCompleted: async () => {},
    })
    return NextResponse.json(result)
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 })
  }
}
