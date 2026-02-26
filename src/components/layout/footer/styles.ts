import { Link } from 'react-router-dom'
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
  gap: 8px;
  margin: 0 auto;
  max-width: 1200px;
  padding: 18px 24px 22px;
  text-align: center;
`

export const CopyText = styled.p`
  margin: 0;
`

export const LoginLink = styled(Link)`
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 9999px;
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.82rem;
  padding: 4px 10px;
  text-decoration: none;
  transition: color 0.18s ease, border-color 0.18s ease;

  &:hover {
    border-color: ${colorVariables.secondary};
    color: ${colorVariables.secondary};
  }
`
