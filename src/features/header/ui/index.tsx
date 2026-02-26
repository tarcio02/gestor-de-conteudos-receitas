import { useEffect, useRef, useState } from 'react'
import { Heart, Instagram, MessageCircle, ShoppingBag } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'
import { MenuLateral } from '../../../components/layout/menu-lateral'
import { MenuHamburguer } from '../../../components/ui'
import { usePublicHeaderConfig } from '../hooks'
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
const WHATSAPP_TEXT = 'Ola, vim do site, e gostaria de saber mais sobre a empresa de voces'

function extractWhatsappPhone(value: string): string {
  const raw = String(value ?? '').trim()
  if (!raw) return ''

  const byWaMe = raw.match(/wa\.me\/(\d+)/i)?.[1]
  if (byWaMe) return byWaMe

  const byPhoneParam = raw.match(/[?&]phone=(\d+)/i)?.[1]
  if (byPhoneParam) return byPhoneParam

  const digits = raw.replace(/\D/g, '')
  if (!digits) return ''

  if (digits.startsWith('55')) return digits
  if (digits.length === 10 || digits.length === 11) return `55${digits}`
  return digits
}

function buildWhatsappHref(number: string): string {
  if (!number) return ''
  return `https://wa.me/${number}?text=${encodeURIComponent(WHATSAPP_TEXT)}`
}

function isHttpUrl(value: string): boolean {
  const raw = String(value ?? '').trim()
  if (!raw) return false

  return /^https?:\/\//i.test(raw)
}

export function Header() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const lastScrollY = useRef(0)
  const location = useLocation()
  const { data } = usePublicHeaderConfig()

  const whatsappPhone = extractWhatsappPhone(String(data?.whatsappPhone ?? ''))
  const whatsappHref = buildWhatsappHref(whatsappPhone)
  const instagramRaw = String(data?.instagramUrl ?? '').trim()
  const ecommerceRaw = String(data?.ecommerceLink ?? '').trim()
  const instagramUrl = isHttpUrl(instagramRaw) ? instagramRaw : ''
  const ecommerceLink = isHttpUrl(ecommerceRaw) ? ecommerceRaw : ''
  const logoUrl = String(data?.logoUrl ?? '').trim()

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
            {whatsappHref ? (
              <NavExternalButton
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
              >
                <MessageCircle aria-hidden size={16} />
                WhatsApp
              </NavExternalButton>
            ) : null}
            {instagramUrl ? (
              <NavExternalButton
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <Instagram aria-hidden size={16} />
                Instagram
              </NavExternalButton>
            ) : null}
          </ActionsGroup>

          {logoUrl ? <Logo src={logoUrl} alt="SDF" /> : null}

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
            {ecommerceLink ? (
              <NavExternalButton
                href={ecommerceLink}
                target="_blank"
                rel="noreferrer"
                aria-label="Ver Produtos"
              >
                <ShoppingBag aria-hidden size={16} />
                Ver Produtos
              </NavExternalButton>
            ) : null}
          </ActionsGroup>

          <MobileMenuSlot>
            <MenuHamburguer onClick={() => setIsMenuOpen(true)} />
          </MobileMenuSlot>
        </HeaderContent>
      </HeaderRoot>

      <MenuLateral
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        whatsappHref={whatsappHref}
        whatsappLabel="WhatsApp"
        instagramUrl={instagramUrl}
        ecommerceLink={ecommerceLink}
      />
    </>
  )
}
