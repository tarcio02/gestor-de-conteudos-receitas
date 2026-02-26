import { Heart, Instagram, MessageCircle, ShoppingBag, X } from 'lucide-react'
import { ROUTES } from '../../../constants/routes'
import * as S from './styles'

type Props = {
  isOpen: boolean
  onClose: () => void
  whatsappHref: string
  whatsappLabel: string
  instagramUrl: string
  ecommerceLink: string
}

export function MenuLateral({
  isOpen,
  onClose,
  whatsappHref,
  whatsappLabel,
  instagramUrl,
  ecommerceLink,
}: Props) {
  const hasWhatsapp = Boolean(String(whatsappHref ?? '').trim())
  const hasInstagram = Boolean(String(instagramUrl ?? '').trim())
  const hasEcommerce = Boolean(String(ecommerceLink ?? '').trim())

  return (
    <>
      <S.Overlay $isOpen={isOpen} aria-label="Fechar menu lateral" onClick={onClose} />

      <S.Panel $isOpen={isOpen} role="dialog" aria-modal="true" aria-label="Menu lateral">
        <S.HeaderRow>
          <S.Title>Menu</S.Title>
          <S.CloseButton type="button" onClick={onClose} aria-label="Fechar menu">
            <X size={18} aria-hidden />
          </S.CloseButton>
        </S.HeaderRow>

        {hasWhatsapp ? (
          <S.MenuExternalLink href={whatsappHref} target="_blank" rel="noreferrer">
            <MessageCircle size={16} aria-hidden />
            {whatsappLabel}
          </S.MenuExternalLink>
        ) : null}

        {hasInstagram ? (
          <S.MenuExternalLink href={instagramUrl} target="_blank" rel="noreferrer">
            <Instagram size={16} aria-hidden />
            Instagram
          </S.MenuExternalLink>
        ) : null}

        <S.MenuLink to={ROUTES.recipes} onClick={onClose}>
          <Heart size={16} aria-hidden />
          Favoritos
        </S.MenuLink>

        {hasEcommerce ? (
          <S.MenuExternalLink href={ecommerceLink} target="_blank" rel="noreferrer" onClick={onClose}>
            <ShoppingBag size={16} aria-hidden />
            Ver Produtos
          </S.MenuExternalLink>
        ) : null}
      </S.Panel>
    </>
  )
}
