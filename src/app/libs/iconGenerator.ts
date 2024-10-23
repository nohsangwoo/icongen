import JSZip from 'jszip'
import { saveAs } from 'file-saver'

const iconSizes = {
  iOS: [
    { size: 20, name: '20.png' },
    { size: 29, name: '29.png' },
    { size: 40, name: '40.png' },
    { size: 50, name: '50.png' },
    { size: 57, name: '57.png' },
    { size: 58, name: '58.png' },
    { size: 60, name: '60.png' },
    { size: 72, name: '72.png' },
    { size: 76, name: '76.png' },
    { size: 80, name: '80.png' },
    { size: 87, name: '87.png' },
    { size: 100, name: '100.png' },
    { size: 114, name: '114.png' },
    { size: 120, name: '120.png' },
    { size: 144, name: '144.png' },
    { size: 152, name: '152.png' },
    { size: 167, name: '167.png' },
    { size: 180, name: '180.png' },
    { size: 1024, name: '1024.png' },
  ],
  Android: [
    { size: 36, name: 'mipmap-hdpi/ic_launcher.png' },
    { size: 48, name: 'mipmap-mdpi/ic_launcher.png' },
    { size: 72, name: 'mipmap-xhdpi/ic_launcher.png' },
    { size: 96, name: 'mipmap-xxhdpi/ic_launcher.png' },
    { size: 144, name: 'mipmap-xxxhdpi/ic_launcher.png' },
  ],
  macOS: [
    { size: 16, name: '16.png' },
    { size: 32, name: '32.png' },
    { size: 64, name: '64.png' },
    { size: 128, name: '128.png' },
    { size: 256, name: '256.png' },
    { size: 512, name: '512.png' },
  ],
  watchOS: [
    { size: 48, name: '48.png' },
    { size: 55, name: '55.png' },
    { size: 66, name: '66.png' },
    { size: 88, name: '88.png' },
    { size: 92, name: '92.png' },
    { size: 102, name: '102.png' },
    { size: 172, name: '172.png' },
    { size: 196, name: '196.png' },
    { size: 216, name: '216.png' },
  ],
}

export async function generateIcons(
  image: File,
  selectedPlatforms: string[],
): Promise<void> {
  const zip = new JSZip()

  if (
    selectedPlatforms.includes('iOS') ||
    selectedPlatforms.includes('watchOS') ||
    selectedPlatforms.includes('macOS')
  ) {
    const assetsFolder = zip
      .folder('Assets.xcassets')
      ?.folder('AppIcon.appiconset')
    if (assetsFolder) {
      for (const platform of ['iOS', 'watchOS', 'macOS']) {
        if (selectedPlatforms.includes(platform)) {
          for (const { size, name } of iconSizes[
            platform as keyof typeof iconSizes
          ]) {
            const resizedImage = await resizeImage(image, size)
            assetsFolder.file(name, resizedImage, { base64: true })
          }
        }
      }

      // Contents.json 파일 추가
      const contentsJsonResponse = await fetch('/Contents.json')
      const contentsJsonText = await contentsJsonResponse.text()
      assetsFolder.file('Contents.json', contentsJsonText)
    }
  }

  if (selectedPlatforms.includes('Android')) {
    const androidFolder = zip.folder('android')
    if (androidFolder) {
      for (const { size, name } of iconSizes.Android) {
        const resizedImage = await resizeImage(image, size)
        androidFolder.file(name, resizedImage, { base64: true })
      }
    }
  }

  if (selectedPlatforms.includes('Web')) {
    const resizedImage192 = await resizeImage(image, 192)
    zip.file('playstore.png', resizedImage192, { base64: true })
    const resizedImage512 = await resizeImage(image, 512)
    zip.file('appstore.png', resizedImage512, { base64: true })
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
