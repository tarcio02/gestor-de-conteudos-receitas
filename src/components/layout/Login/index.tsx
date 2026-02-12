import * as S from './styles'

type Props = {
  message?: string
}

export function Loading({ message = 'Carregando receitas...' }: Props) {
  return (
    <S.Wrapper aria-live="polite" aria-busy="true">
      <S.Content>
        <S.Spinner />
        <S.Text>{message}</S.Text>
      </S.Content>
    </S.Wrapper>
  )
}
