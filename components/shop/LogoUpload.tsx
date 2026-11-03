'use client'

import { useEffect, useRef, useState } from 'react'
import { upload } from '@vercel/blob/client'
import { LOGO_ACCEPT, MAX_LOGOS_PER_ITEM, MAX_LOGO_BYTES, fileSize, logoContentType, safeFileName, type LogoRef } from '@/lib/shop/logos'

export type LogoFile = LogoRef & { key: string; status: 'uploading' | 'done' | 'error'; preview: string | null; error?: string }

let modePromise: Promise<'blob' | 'local' | 'off'> | null = null
const uploadMode = () =>
  (modePromise ??= fetch('/api/logo-upload')
    .then((r) => r.json())
    .then((d) => d.mode)
    .catch(() => 'off'))

async function uploadLogo(file: File): Promise<string> {
  const mode = await uploadMode()
  const type = logoContentType(file.name, file.type)
  if (mode === 'blob') {
    const blob = await upload(`logos/${safeFileName(file.name)}`, file, { access: 'public', handleUploadUrl: '/api/logo-upload', contentType: type || undefined })
    return blob.url
  }
  if (mode === 'local') {
    const body = new FormData()
    body.append('file', file)
    const res = await fetch('/api/logo-upload/local', { method: 'POST', body })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Upload failed')
    return data.url
  }
  throw new Error('Uploads are offline — email your logo with the order instead.')
}

export const doneLogos = (files: LogoFile[]): LogoRef[] =>
  files.filter((f) => f.status === 'done').map(({ name, url, size, type }) => ({ name, url, size, type }))

/** Drop zone that uploads each file the moment it is chosen. */
export default function LogoUpload({
  files,
  onChange,
  compact = false,
}: {
  files: LogoFile[]
  onChange: (update: (prev: LogoFile[]) => LogoFile[]) => void
  compact?: boolean
}) {
  const [dragging, setDragging] = useState(false)
  const input = useRef<HTMLInputElement>(null)
  const previews = useRef<string[]>([])

  useEffect(() => () => previews.current.forEach((u) => URL.revokeObjectURL(u)), [])

  const add = (list: FileList | null | undefined) => {
    if (!list?.length) return
    const room = MAX_LOGOS_PER_ITEM - files.length
    Array.from(list)
      .slice(0, Math.max(0, room))
      .forEach((file) => {
        const key = `${Date.now()}-${Math.random().toString(36).slice(2)}`
        const type = logoContentType(file.name, file.type)
        const preview = type.startsWith('image/') && !/heic|heif|photoshop|tiff/.test(type) ? URL.createObjectURL(file) : null
        if (preview) previews.current.push(preview)
        const entry: LogoFile = { key, name: file.name, url: '', size: file.size, type, status: 'uploading', preview }
        if (file.size > MAX_LOGO_BYTES) {
          onChange((prev) => [...prev, { ...entry, status: 'error', error: `Over ${fileSize(MAX_LOGO_BYTES)} — email it to us instead` }])
          return
        }
        onChange((prev) => [...prev, entry])
        uploadLogo(file)
          .then((url) => onChange((prev) => prev.map((f) => (f.key === key ? { ...f, url, status: 'done' } : f))))
          .catch((err: Error) => onChange((prev) => prev.map((f) => (f.key === key ? { ...f, status: 'error', error: err.message } : f))))
      })
    if (input.current) input.current.value = ''
  }

  const full = files.length >= MAX_LOGOS_PER_ITEM

  return (
    <div>
      {!full && (
        <label
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); add(e.dataTransfer.files) }}
          className={`flex flex-col items-center justify-center gap-2 border border-dashed text-center cursor-pointer transition-colors ${compact ? 'px-4 py-4' : 'px-6 py-8'} ${
            dragging ? 'border-cream bg-white/5' : 'border-white/25 hover:border-cream/60'
          }`}
        >
          <input ref={input} type="file" multiple accept={LOGO_ACCEPT} className="sr-only" onChange={(e) => add(e.target.files)} />
          <span className="font-sans font-semibold text-sm uppercase tracking-[0.14em]">
            {files.length ? 'Add another file' : compact ? 'Upload your logo' : 'Choose files or drop them here'}
          </span>
          {!compact && (
            <span className="font-sans text-xs text-cream/50 max-w-sm">
              No perfect file needed — a photo of your truck, shirt or business card works. Images, PDF, AI, EPS, PSD or ZIP, up to {MAX_LOGOS_PER_ITEM} files.
            </span>
          )}
        </label>
      )}
      {files.length > 0 && (
        <ul className="mt-3 flex flex-col gap-2">
          {files.map((f) => (
            <li key={f.key} className="flex items-center gap-3 border border-white/15 px-3 py-2">
              <span className="h-10 w-10 flex-shrink-0 bg-[#141312] flex items-center justify-center overflow-hidden">
                {f.preview ? (
                  <img src={f.preview} alt="" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="font-sans text-[9px] font-semibold uppercase text-cream/60">{f.name.split('.').pop()}</span>
                )}
              </span>
              <span className="flex-1 min-w-0">
                <span className="block font-sans text-sm truncate">{f.name}</span>
                <span className={`block font-sans text-[11px] ${f.status === 'error' ? 'text-[#ff8a80]' : 'text-cream/50'}`}>
                  {f.status === 'uploading' ? 'Uploading…' : f.status === 'done' ? `Uploaded ✓ · ${fileSize(f.size)}` : f.error}
                </span>
              </span>
              <button
                type="button"
                onClick={() => onChange((prev) => prev.filter((x) => x.key !== f.key))}
                className="font-sans text-[11px] uppercase tracking-[0.14em] text-cream/50 hover:text-cream underline underline-offset-4"
                aria-label={`Remove ${f.name}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
