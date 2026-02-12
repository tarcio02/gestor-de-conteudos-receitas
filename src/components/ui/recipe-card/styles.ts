import styled from 'styled-components'
import { colorVariables } from '../../../styles/variables'

interface CardRootProps {
  $clickable: boolean
}

interface FavoriteButtonProps {
  $active: boolean
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

export const FavoriteButton = styled.button<FavoriteButtonProps>`
  align-items: center;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid ${colorVariables.border};
  border-radius: 9999px;
  color: ${({ $active }) => ($active ? colorVariables.primary : colorVariables.textMuted)};
  display: inline-flex;
  height: 34px;
  justify-content: center;
  opacity: ${({ $active }) => ($active ? 0.86 : 1)};
  padding: 0;
  position: absolute;
  right: 8px;
  top: 8px;
  width: 34px;
  z-index: 2;

  svg {
    stroke-width: 2.1;
  }
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
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 14px 14px;
`

export const CardTitle = styled.h3`
  color: ${colorVariables.text};
  font-size: 1.05rem;
  margin: 0;
`

export const BadgesRow = styled.div`
  display: flex;
`

export const TimeBadge = styled.span`
  align-items: center;
  background: rgba(255, 168, 1, 0.14);
  border: 1px solid rgba(255, 168, 1, 0.5);
  border-radius: 9999px;
  color: ${colorVariables.text};
  display: inline-flex;
  font-size: 0.8rem;
  font-weight: 600;
  gap: 6px;
  line-height: 1;
  padding: 5px 10px;
  width: fit-content;
  margin-top: 16px;
`

export const CardDescription = styled.p`
  color: ${colorVariables.textMuted};
  display: -webkit-box;
  font-size: 0.92rem;
  line-height: 1.4;
  margin: 0;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`

export const ViewRecipeButton = styled.button`
  align-items: center;
  background: rgba(168, 7, 7, 0.08);
  border: 1px solid ${colorVariables.primary};
  border-radius: 10px;
  color: ${colorVariables.primary};
  display: inline-flex;
  font-size: 0.88rem;
  font-weight: 600;
  gap: 6px;
  justify-content: center;
  margin-top: 2px;
  padding: 8px 10px;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: ${colorVariables.primary};
    color: ${colorVariables.white};
    transform: translateY(-1px);
  }
`
