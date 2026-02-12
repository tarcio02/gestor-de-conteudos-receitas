import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { colorVariables } from '../../../styles/variables'

interface HeaderRootProps {
  $isVisible: boolean
}

export const HEADER_HEIGHT = 88

export const HeaderRoot = styled.header<HeaderRootProps>`
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  background-color: transparent;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  transform: translateY(0);
  transition: transform 180ms ease-in-out;
  z-index: 1200;

  ${({ $isVisible }) =>
    !$isVisible &&
    css`
      transform: translateY(-100%);
    `}
`

export const HeaderContent = styled.div`
  align-items: center;
  display: flex;
  height: ${HEADER_HEIGHT}px;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 24px;
  width: 100%;

  @media (max-width: 600px) {
    justify-content: center;
    position: relative;
  }
`

export const Logo = styled.img`
  display: block;
  height: 92px;
  width: auto;
`

export const MobileMenuSlot = styled.div`
  display: none;

  @media (max-width: 600px) {
    display: block;
    position: absolute;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
  }
`

export const ActionsGroup = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  min-width: 260px;

  &:first-of-type {
    justify-content: flex-start;
  }

  &:last-of-type {
    justify-content: flex-end;
  }

  @media (max-width: 600px) {
    display: none;
  }
`

const baseButtonStyles = css`
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: 9999px;
  color: ${colorVariables.white};
  display: inline-flex;
  font-size: 0.95rem;
  font-weight: 600;
  gap: 8px;
  justify-content: center;
  min-width: 110px;
  padding: 9px 14px;
  text-decoration: none;
  transition: color 0.18s ease;

  &:hover {
    color: ${colorVariables.secondary};
  }

  svg {
    flex-shrink: 0;
  }
`

export const NavButton = styled(Link)`
  ${baseButtonStyles}
`

export const NavExternalButton = styled.a`
  ${baseButtonStyles}
`
