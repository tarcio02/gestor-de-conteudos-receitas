import styled from 'styled-components'
import { colorVariables } from '../../../styles/variables'

export const FooterRoot = styled.footer`
  background-color: ${colorVariables.primary};
  color: ${colorVariables.white};
`

export const FooterContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 auto;
  max-width: 1200px;
  padding: 18px 24px 22px;
  text-align: center;
`

export const CopyText = styled.p`
  margin: 0;
`

export const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
`

export const SocialButton = styled.a`
  align-items: center;
  border: 0;
  color: ${colorVariables.white};
  display: inline-flex;
  justify-content: center;
  text-decoration: none;

  &:hover {
    color: ${colorVariables.secondary};
  }
`

export const LocationText = styled.p`
  align-items: center;
  display: inline-flex;
  gap: 6px;
  margin: 0;
`
