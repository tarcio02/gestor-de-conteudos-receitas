import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const BANNERS_DIR = path.resolve('src/assets/images/banners')
const MOBILE_NAME_TOKEN = '-mobile'
const MAX_WIDTH_DESKTOP = 1920
const MAX_WIDTH_MOBILE = 900
const WEBP_QUALITY_DESKTOP = 76
const WEBP_QUALITY_MOBILE = 72

async function optimizeBanners() {
  const files = await readdir(BANNERS_DIR)
  const pngFiles = files.filter((file) => file.toLowerCase().endsWith('.png'))

  if (!pngFiles.length) {
    console.log('Nenhum PNG encontrado em src/assets/images/banners.')
    return
  }

  for (const file of pngFiles) {
    const inputPath = path.join(BANNERS_DIR, file)
    const outputPath = inputPath.replace(/\.png$/i, '.webp')
    const isMobile = file.includes(MOBILE_NAME_TOKEN)
    const maxWidth = isMobile ? MAX_WIDTH_MOBILE : MAX_WIDTH_DESKTOP
    const quality = isMobile ? WEBP_QUALITY_MOBILE : WEBP_QUALITY_DESKTOP

    const image = sharp(inputPath)
    const metadata = await image.metadata()
    const width = metadata.width ?? maxWidth

    let pipeline = sharp(inputPath)
    if (width > maxWidth) {
      pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true })
    }

    await pipeline.webp({ quality, effort: 5 }).toFile(outputPath)

    const [before, after] = await Promise.all([stat(inputPath), stat(outputPath)])
    const reduction = (((before.size - after.size) / before.size) * 100).toFixed(1)

    console.log(
      `${file} -> ${path.basename(outputPath)} | ${Math.round(before.size / 1024)}KB -> ${Math.round(after.size / 1024)}KB (${reduction}% menor)`,
    )
  }
}

optimizeBanners().catch((error) => {
  console.error('Falha ao otimizar banners:', error)
  process.exitCode = 1
})
