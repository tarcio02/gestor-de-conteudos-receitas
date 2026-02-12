import styled from 'styled-components'
import { colorVariables } from '../../../styles/variables'

export const Container = styled.section`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 80px);
  padding: 24px;
`

export const FormCard = styled.form`
  background: ${colorVariables.white};
  border: 1px solid ${colorVariables.border};
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  display: grid;
  gap: 12px;
  max-width: 360px;
  padding: 24px;
  width: 100%;
`

export const Title = styled.h1`
  color: ${colorVariables.primary};
  font-size: 1.6rem;
  margin: 0 0 8px;
`

export const Label = styled.label`
  color: ${colorVariables.text};
  font-size: 0.9rem;
  font-weight: 600;
`

export const Input = styled.input`
  border: 1px solid ${colorVariables.border};
  border-radius: 8px;
  color: ${colorVariables.text};
  font-size: 1rem;
  outline: none;
  padding: 10px 12px;

  &:focus {
    border-color: ${colorVariables.primary};
    box-shadow: 0 0 0 3px rgba(168, 7, 7, 0.14);
  }
`

export const ErrorText = styled.p`
  color: ${colorVariables.primary};
  font-size: 0.9rem;
  margin: 4px 0 0;
`

export const SubmitButton = styled.button`
  background: ${colorVariables.secondary};
  border: 0;
  border-radius: 8px;
  color: ${colorVariables.white};
  font-weight: 700;
  margin-top: 4px;
  min-height: 40px;
  padding: 10px 12px;
  transition: filter 0.15s ease-in-out;

  &:hover:not(:disabled) {
    filter: brightness(0.96);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.72;
  }
`
