import { useEffect, useRef, useState } from 'react'
import logoSdf from '../../../assets/logo-sdf.svg'
import { HeaderContent, HeaderRoot, Logo } from './styles'

const SCROLL_DELTA = 8

export function Header() {
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    function onScroll() {
      const currentScrollY = window.scrollY
      const isScrollingDown = currentScrollY > lastScrollY.current + SCROLL_DELTA
      const isScrollingUp = currentScrollY < lastScrollY.current - SCROLL_DELTA

      if (currentScrollY <= 16) {
        setIsVisible(true)
      } else if (isScrollingDown) {
        setIsVisible(false)
      } else if (isScrollingUp) {
        setIsVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <HeaderRoot $isVisible={isVisible}>
      <HeaderContent>
        <Logo src={logoSdf} alt="SDF" />
      </HeaderContent>
    </HeaderRoot>
  )
}
