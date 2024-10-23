import JSZip from 'jszip'
import { saveAs } from 'file-saver'

const iconSizes = {
  iOS: [20, 29, 40, 60, 76, 83.5, 1024],
  Android: [36, 48, 72, 96, 144, 192, 512],
  Favicon: [16, 32, 48],
  Web: [192, 512],
  watchOS: [24, 27.5, 29, 40, 44, 50, 86, 98, 108, 1024],
  macOS: [16, 32, 64, 128, 256, 512, 1024],
  iPad: [20, 29, 40, 76, 83.5],
}

export async function generateIcons(
  image: File,
  selectedPlatforms: string[],
): Promise<void> {
  const zip = new JSZip()

  for (const platform of selectedPlatforms) {
    const folder = zip.folder(platform)
    if (!folder) continue

    for (const size of iconSizes[platform as keyof typeof iconSizes]) {
      const resizedImage = await resizeImage(image, size)
      folder.file(`icon_${size}x${size}.png`, resizedImage, { base64: true })
    }
  }

  const content = await zip.generateAsync({ type: 'blob' })
  saveAs(content, 'app_icons.zip')
}

async function resizeImage(file: File, size: number): Promise<string> {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = e => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0, size, size)
        resolve(canvas.toDataURL('image/png').split(',')[1])
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  })
}
