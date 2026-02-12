import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { colorVariables } from '../../../styles/variables'

interface OpenStateProps {
  $isOpen: boolean
}

export const Overlay = styled.button<OpenStateProps>`
  background: rgba(0, 0, 0, 0.72);
  border: 0;
  cursor: pointer;
  inset: 0;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  padding: 0;
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  position: fixed;
  transition: opacity 220ms ease;
  z-index: 1290;
`

export const Panel = styled.aside<OpenStateProps>`
  background: ${colorVariables.primary};
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 100dvh;
  max-width: 320px;
  padding: 24px 18px;
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  position: fixed;
  right: 0;
  top: 0;
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(102%)')};
  transition: transform 240ms ease;
  width: 80vw;
  z-index: 1300;
`

export const HeaderRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`

export const Title = styled.h2`
  color: ${colorVariables.white};
  font-size: 1.15rem;
  margin: 0;
`

export const CloseButton = styled.button`
  align-items: center;
  background: transparent;
  border: 0;
  color: ${colorVariables.white};
  display: inline-flex;
  height: 36px;
  justify-content: center;
  padding: 0;
  width: 36px;
`

const itemStyles = `
  align-items: center;
  background: rgba(255, 255, 255, 0.06);
  border: 0;
  border-radius: 10px;
  color: ${colorVariables.white};
  display: inline-flex;
  font-size: 0.96rem;
  font-weight: 600;
  gap: 8px;
  min-height: 44px;
  padding: 0 12px;
  text-decoration: none;
`

export const MenuLink = styled(Link)`
  ${itemStyles}
`

export const MenuExternalLink = styled.a`
  ${itemStyles}
`
