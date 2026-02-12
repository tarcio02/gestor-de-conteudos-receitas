import { Heart, Instagram, MessageCircle, ShoppingBag, X } from 'lucide-react'
import { ROUTES } from '../../../constants/routes'
import * as S from './styles'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export function MenuLateral({ isOpen, onClose }: Props) {
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

        <S.MenuExternalLink href="https://wa.me/5500000000000" target="_blank" rel="noreferrer">
          <MessageCircle size={16} aria-hidden />
          WhatsApp
        </S.MenuExternalLink>

        <S.MenuExternalLink href="https://www.instagram.com" target="_blank" rel="noreferrer">
          <Instagram size={16} aria-hidden />
          Instagram
        </S.MenuExternalLink>

        <S.MenuLink to={ROUTES.recipes} onClick={onClose}>
          <Heart size={16} aria-hidden />
          Favoritos
        </S.MenuLink>

        <S.MenuLink to={ROUTES.login} onClick={onClose}>
          <ShoppingBag size={16} aria-hidden />
          Ver Produtos
        </S.MenuLink>
      </S.Panel>
    </>
  )
}
