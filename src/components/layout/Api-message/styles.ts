import styled from 'styled-components'
import { colorVariables } from '../../../styles/variables'

export const Wrapper = styled.section`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 24px;
`

export const Card = styled.div`
  background: ${colorVariables.white};
  border: 1px solid ${colorVariables.border};
  border-radius: 12px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
  max-width: 560px;
  padding: 20px;
  text-align: center;
  width: 100%;
`

export const Title = styled.h2`
  color: ${colorVariables.primary};
  font-size: 1.2rem;
  margin: 0;
`

export const Message = styled.p`
  color: ${colorVariables.text};
  margin: 10px 0 16px;
`

export const RetryButton = styled.button`
  background: ${colorVariables.secondary};
  border: 0;
  border-radius: 9999px;
  color: ${colorVariables.white};
  cursor: pointer;
  font-weight: 700;
  padding: 10px 16px;
`
