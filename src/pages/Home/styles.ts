import { colorVariables } from '../../styles/variables'
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

export const SectionBlock = styled.section`
  scroll-margin-top: 108px;
`

export const SectionTitle = styled.h2`
  align-items: center;
  color: ${colorVariables.text};
  display: flex;
  font-size: 1.5rem;
  gap: 8px;
  line-height: 1.2;
  margin: 0 0 12px;
`

export const SectionTitleIcon = styled.span<{ $tone?: 'primary' }>`
  align-items: center;
  background: rgba(168, 7, 7, 0.12);
  border: 1px solid rgba(168, 7, 7, 0.45);
  border-radius: 9999px;
  color: ${colorVariables.primary};
  display: inline-flex;
  height: 26px;
  justify-content: center;
  line-height: 1;
  flex-shrink: 0;
  width: 26px;

  svg {
    display: block;
  }
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
