import styled, { css } from 'styled-components'

interface HeaderRootProps {
  $isVisible: boolean
}

export const HEADER_HEIGHT = 76

export const HeaderRoot = styled.header<HeaderRootProps>`
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  background-color: rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(217, 226, 236, 0.8);
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  transform: translateY(0);
  transition: transform 180ms ease-in-out;
  z-index: 999;

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
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 24px;
`

export const Logo = styled.img`
  display: block;
  height: 42px;
  width: auto;
`
