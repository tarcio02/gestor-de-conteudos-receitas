import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as S from './styles'

import banner1 from '../../../assets/images/banners/banner.webp'
import banner1Mobile from '../../../assets/images/banners/banner-mobile.webp'
import banner2 from '../../../assets/images/banners/bannerB.webp'
import banner2Mobile from '../../../assets/images/banners/bannerB-mobile.webp'
import banner3 from '../../../assets/images/banners/bannerC.webp'
import banner3Mobile from '../../../assets/images/banners/bannerC-mobile.webp'

const MOBILE_BREAKPOINT = 601
const AUTO_PLAY_MS = 10000

function isMobileViewport() {
  return window.innerWidth < MOBILE_BREAKPOINT
}

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(isMobileViewport)

  useEffect(() => {
    function handleResize() {
      setIsMobile(isMobileViewport())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const slides = useMemo(
    () => [
      {
        image: isMobile ? banner1Mobile : banner1,
        title: 'Conheca as Receitas',
        highlight: 'Sabor da SDF!',
        description:
          'Descubra o sabor e a qualidade que so nos podemos oferecer. Feito com cuidado para voce.',
      },
      {
        image: isMobile ? banner2Mobile : banner2,
        title: 'Massa crocante,',
        highlight: 'recheio generoso!',
        description: 'Perfeita para quem ama aquele pastel bem recheado e sequinho.',
      },
      {
        image: isMobile ? banner3Mobile : banner3,
        title: 'Do freezer',
        highlight: 'direto pra festa!',
        description: 'Praticidade e sabor para os melhores momentos com a familia e amigos.',
      },
    ],
    [isMobile],
  )

  useEffect(() => {
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

  const slide = slides[currentSlide]

  return (
    <S.StylesHero>
      <S.BackgroundImage key={currentSlide} $bgImage={slide.image} />
      <S.GradientOverlay />

      <S.MainContent>
        <S.ContentWrapper key={currentSlide}>
          <S.TextContent>
            <S.Title>
              {slide.title}
              <br />
              <S.HighlightText>{slide.highlight}</S.HighlightText>
            </S.Title>

            <S.Description>{slide.description}</S.Description>

            <S.ButtonsWrapper to="/recipes" $delay="0.4s">
              Quero Experimentar!
            </S.ButtonsWrapper>

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
          </S.TextContent>
        </S.ContentWrapper>
      </S.MainContent>
    </S.StylesHero>
  )
}
