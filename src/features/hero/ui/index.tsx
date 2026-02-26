import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ApiMessage, Loading } from '../../../components/layout'
import { usePublicHero } from '../hooks'
import * as S from './styles'

const MOBILE_BREAKPOINT = 601
const AUTO_PLAY_MS = 10000

function isMobileViewport() {
  return window.innerWidth < MOBILE_BREAKPOINT
}

export function Hero() {
  const { data, loading, error } = usePublicHero()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(isMobileViewport)

  useEffect(() => {
    function handleResize() {
      setIsMobile(isMobileViewport())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const slides = useMemo(() => {
    return data.map((slide) => ({
      ...slide,
      image: isMobile && slide.imageMobileUrl ? slide.imageMobileUrl : slide.imageUrl,
    }))
  }, [data, isMobile])

  useEffect(() => {
    if (currentSlide < slides.length) return
    setCurrentSlide(0)
  }, [currentSlide, slides.length])

  useEffect(() => {
    if (slides.length <= 1) return

    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, AUTO_PLAY_MS)

    return () => window.clearInterval(interval)
  }, [slides.length])

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const handleDotClick = (index: number) => {
    setCurrentSlide(index)
  }

  if (loading) {
    return <Loading message="Carregando hero..." />
  }

  if (error) {
    return <ApiMessage title="Erro ao carregar hero" message={error} />
  }

  if (slides.length === 0) {
    return null
  }

  const slide = slides[currentSlide]
  const hasTitle = Boolean(slide.title)
  const hasHighlight = Boolean(slide.highlight)
  const hasSubtitle = Boolean(slide.subtitle)
  const hasButton = slide.hasButton && Boolean(slide.buttonLabel) && Boolean(slide.buttonLink)
  const hasImage = Boolean(slide.image)
  const hasOverlay = slide.hasOverlay

  return (
    <S.StylesHero>
      {hasImage ? <S.BackgroundImage key={currentSlide} $bgImage={slide.image} /> : null}
      {hasImage && hasOverlay ? <S.GradientOverlay /> : null}

      <S.MainContent>
        <S.ContentWrapper key={currentSlide}>
          <S.TextContent>
            {hasTitle ? (
              <S.Title>
                {slide.title}
                {hasHighlight ? (
                  <>
                    <br />
                    <S.HighlightText>{slide.highlight}</S.HighlightText>
                  </>
                ) : null}
              </S.Title>
            ) : null}

            {hasSubtitle ? <S.Description>{slide.subtitle}</S.Description> : null}

            {hasButton ? (
              <S.ButtonsWrapper to={slide.buttonLink} $delay="0.4s">
                {slide.buttonLabel}
              </S.ButtonsWrapper>
            ) : null}

            {slides.length > 1 ? (
              <S.CarouselControls $delay="0.6s">
                <S.CarouselButton onClick={handlePrev} aria-label="Slide anterior" type="button">
                  <ChevronLeft aria-hidden size={18} />
                </S.CarouselButton>

                <S.DotsContainer>
                  {slides.map((_, index) => (
                    <S.Dot
                      key={index}
                      $active={index === currentSlide}
                      onClick={() => handleDotClick(index)}
                      aria-label={`Ir para slide ${index + 1}`}
                      type="button"
                    />
                  ))}
                </S.DotsContainer>

                <S.CarouselButton onClick={handleNext} aria-label="Proximo slide" type="button">
                  <ChevronRight aria-hidden size={18} />
                </S.CarouselButton>
              </S.CarouselControls>
            ) : null}
          </S.TextContent>
        </S.ContentWrapper>
      </S.MainContent>
    </S.StylesHero>
  )
}
