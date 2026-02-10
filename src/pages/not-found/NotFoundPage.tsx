import styled from 'styled-components'

const Wrapper = styled.section`
  margin: 0 auto;
  max-width: 960px;
  padding: 48px 24px;
`

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 2rem;
  margin: 0;
`

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 12px;
`

export function NotFoundPage() {
  return (
    <Wrapper>
      <Title>Pagina nao encontrada</Title>
      <Description>Verifique a URL ou volte para a lista de receitas.</Description>
    </Wrapper>
  )
}
