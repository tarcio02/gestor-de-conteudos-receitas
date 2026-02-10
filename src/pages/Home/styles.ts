import styled from 'styled-components'

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

export const SectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 24px 48px;
  width: 100%;
`

export const SectionTitle = styled.h2`
  margin: 0 0 12px;
`

export const CardsGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

export const FeedbackText = styled.p`
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 24px 48px;
  width: 100%;
`
