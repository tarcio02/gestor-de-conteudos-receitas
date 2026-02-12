import { TicketPercent } from 'lucide-react'
import * as S from './styles'

type Props = {
  code: string
}

export function CardCupom({ code }: Props) {
  return (
    <S.CardRoot>
      <S.Title>
        <TicketPercent size={18} />
        Você ganhou um cupom de desconto!
      </S.Title>

      <S.CouponCode>{code}</S.CouponCode>

      <S.WarningText>
        Código temporário válido nas próximas 24h para uso em produtos da nossa empresa.
      </S.WarningText>

      <S.UseCouponButton type="button">Usar Cupom</S.UseCouponButton>
    </S.CardRoot>
  )
}
