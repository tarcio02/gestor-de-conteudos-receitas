import styled from 'styled-components'
import { colorVariables } from '../../../styles/variables'

export const MenuButton = styled.button`
  align-items: center;
  background: transparent;
  border: 0;
  color: ${colorVariables.white};
  cursor: pointer;
  display: none;
  height: 40px;
  justify-content: center;
  padding: 0;
  width: 40px;

  &:hover {
    color: ${colorVariables.secondary};
  }

  @media (max-width: 600px) {
    display: inline-flex;
  }
`
