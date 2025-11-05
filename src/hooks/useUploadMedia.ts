/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState } from 'react'
import axios from 'axios'

export type UploadedMedia = {
  type: 'image' | 'video' | 'link'
  url: string
}

export function useUploadMedia() {
  const [progress, setProgress] = useState<Record<string, number>>({})
  const uploadFiles = async (
    files: File[],
    concurrency = 3,
  ): Promise<UploadedMedia[]> => {
    const queue = [...files]
    const results: UploadedMedia[] = []
    let active = 0
    let index = 0

    async function processNext(): Promise<void> {
      if (queue.length === 0) return

      const file = queue.shift()!
      const currentIndex = index++
      active++

      try {
        const { data } = await axios.post(
          '/files/signed-url',
          {
            fileName: file.name,
            mimeType: file.type,
            fileSize: file.size,
          },
          {
            headers: {
              Authorization:
                typeof window !== 'undefined'
                  ? `Bearer ${localStorage.getItem('token')}`
                  : '',
            },
          },
        )

        const { signedUrl, publicUrl } = data

        await axios.put(signedUrl, file, {
          headers: { 'Content-Type': file.type },
          onUploadProgress: (e) => {
            const percent = Math.round((e.loaded / (e.total ?? 1)) * 100)
            setProgress((prev) => ({ ...prev, [file.name]: percent }))
          },
        })

        results[currentIndex] = {
          type: file.type.startsWith('video')
            ? 'video'
            : file.type.startsWith('image')
              ? 'image'
              : 'link',
          url: publicUrl,
        }
      } catch (err: any) {
        console.error('Erro ao subir arquivo', file.name, err)
        results[currentIndex] = { type: 'link', url: '' }
      } finally {
        active--
        if (queue.length > 0) await processNext()
      }
    }

    const workers = Array.from({ length: concurrency }).map(() => processNext())
    await Promise.all(workers)
    return results
  }

  return { uploadFiles, progress }
}
