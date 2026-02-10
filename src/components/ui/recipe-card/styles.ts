import styled from 'styled-components'
import { colorVariables } from '../../../styles/variables'

interface CardRootProps {
  $clickable: boolean
}

export const CardRoot = styled.article<CardRootProps>`
  background: ${colorVariables.white};
  border: 1px solid ${colorVariables.border};
  border-radius: 14px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
  position: relative;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;

  &:hover {
    box-shadow: ${({ $clickable }) =>
      $clickable ? '0 14px 28px rgba(0, 0, 0, 0.1)' : '0 10px 24px rgba(0, 0, 0, 0.06)'};
    transform: ${({ $clickable }) => ($clickable ? 'translateY(-2px)' : 'none')};
  }
`

export const FavoriteButton = styled.button`
  align-items: center;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid ${colorVariables.border};
  border-radius: 9999px;
  color: ${colorVariables.primary};
  display: inline-flex;
  font-size: 1rem;
  height: 34px;
  justify-content: center;
  padding: 0;
  position: absolute;
  right: 8px;
  top: 8px;
  width: 34px;
  z-index: 2;
`

export const CardContent = styled.div<CardRootProps>`
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
`

export const CardImage = styled.img`
  aspect-ratio: 16 / 10;
  display: block;
  object-fit: cover;
  width: 100%;
`

export const CardBody = styled.div`
  padding: 0 14px 14px;
`

export const CardTitle = styled.h3`
  color: ${colorVariables.text};
  font-size: 1.05rem;
  margin: 0;
`
