import { ROUTES } from '../../../constants/routes'
import { usePublicFooterConfig } from '../../../features/footer/hooks'
import * as S from './styles'

export function Footer() {
  const year = new Date().getFullYear()
  const { data } = usePublicFooterConfig()
  const companyName = String(data?.companyName ?? '').trim() || 'Sabor da Feira'

  return (
    <S.FooterRoot>
      <S.FooterContent>
        <S.CopyText>&copy; {year} {companyName}. Todos os direitos reservados.</S.CopyText>
        <S.LoginLink to={ROUTES.login}>Login</S.LoginLink>
      </S.FooterContent>
    </S.FooterRoot>
  )
}
