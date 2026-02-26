export type HeroSlide = {
  id: string
  userId: string
  imageUrl: string
  imageMobileUrl: string
  hasOverlay: boolean
  title: string
  highlight: string
  subtitle: string
  hasButton: boolean
  buttonLabel: string
  buttonLink: string
}

export type HeroSlidesResponse = {
  data: HeroSlide[]
}
