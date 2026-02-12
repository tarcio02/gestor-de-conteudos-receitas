import styled, { keyframes } from 'styled-components'
import { colorVariables } from '../../../styles/variables'

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

export const Wrapper = styled.section`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 24px;
`

export const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const Spinner = styled.div`
  animation: ${spin} 0.9s linear infinite;
  border: 3px solid rgba(168, 7, 7, 0.22);
  border-radius: 50%;
  border-top-color: ${colorVariables.primary};
  height: 36px;
  width: 36px;
`

export const Text = styled.p`
  color: ${colorVariables.text};
  margin: 0;
`
