import * as S from './styles'

type Props = {
  title?: string
  message: string
}

export function ApiMessage({ title = 'Erro ao carregar dados', message }: Props) {
  return (
    <S.Wrapper>
      <S.Card role="alert" aria-live="polite">
        <S.Title>{title}</S.Title>
        <S.Message>{message}</S.Message>
        <S.RetryButton type="button" onClick={() => window.location.reload()}>
          Tentar Novamente
        </S.RetryButton>
      </S.Card>
    </S.Wrapper>
  )
}
