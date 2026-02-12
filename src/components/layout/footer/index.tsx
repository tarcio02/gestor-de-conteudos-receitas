import { Instagram, Mail, MapPin, MessageCircle } from 'lucide-react'
import * as S from './styles'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <S.FooterRoot>
      <S.FooterContent>
        <S.CopyText>© {year} Sabor da Feira. Todos os direitos reservados.</S.CopyText>
        <S.LocationText>
          <MapPin size={16} />
          Vitoria da Conquista
        </S.LocationText>
        <S.SocialLinks>
          <S.SocialButton
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </S.SocialButton>
          <S.SocialButton
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
          >
            <MessageCircle size={20} />
          </S.SocialButton>
          <S.SocialButton href="mailto:contato@sabordafeira.com.br" aria-label="Email">
            <Mail size={20} />
          </S.SocialButton>
        </S.SocialLinks>
      </S.FooterContent>
    </S.FooterRoot>
  )
}
