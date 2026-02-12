import { useEffect, useRef, useState } from 'react'
import { Heart, Instagram, MessageCircle, ShoppingBag } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import logoSdf from '../../../assets/logo-sdf.svg'
import { ROUTES } from '../../../constants/routes'
import { MenuHamburguer } from '../../ui'
import { MenuLateral } from '../menu-lateral'
import {
  ActionsGroup,
  HeaderContent,
  HeaderRoot,
  Logo,
  MobileMenuSlot,
  NavButton,
  NavExternalButton,
} from './styles'

const SCROLL_DELTA = 8

export function Header() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const lastScrollY = useRef(0)
  const location = useLocation()

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

  useEffect(() => {
    function onEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  return (
    <>
      <HeaderRoot $isVisible={isVisible}>
        <HeaderContent>
          <ActionsGroup>
            <NavExternalButton
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <MessageCircle aria-hidden size={16} />
              WhatsApp
            </NavExternalButton>
            <NavExternalButton
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Instagram aria-hidden size={16} />
              Instagram
            </NavExternalButton>
          </ActionsGroup>

          <Logo src={logoSdf} alt="SDF" />

          <ActionsGroup>
            <NavButton
              to={{ pathname: ROUTES.recipes, hash: '#receitas' }}
              onClick={() => {
                if (location.pathname !== ROUTES.recipes) return

                window.setTimeout(() => {
                  const recipesSection = document.getElementById('receitas')
                  recipesSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }, 0)
              }}
            >
              <Heart aria-hidden size={16} />
              Favoritos
            </NavButton>
            <NavButton to={ROUTES.login}>
              <ShoppingBag aria-hidden size={16} />
              Ver Produtos
            </NavButton>
          </ActionsGroup>

          <MobileMenuSlot>
            <MenuHamburguer onClick={() => setIsMenuOpen(true)} />
          </MobileMenuSlot>
        </HeaderContent>
      </HeaderRoot>

      <MenuLateral isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
