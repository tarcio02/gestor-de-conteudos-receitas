import styled from 'styled-components'
import { colorVariables } from '../../../styles/variables'

export const FooterRoot = styled.footer`
  background-color: ${colorVariables.primary};
  color: ${colorVariables.white};
`

export const FooterContent = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 18px 24px;
  text-align: center;
`

export const CopyText = styled.p`
  margin: 0;
`
