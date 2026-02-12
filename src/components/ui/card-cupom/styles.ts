import styled from 'styled-components'
import { colorVariables } from '../../../styles/variables'

export const CardRoot = styled.article`
  background: linear-gradient(135deg, rgba(255, 168, 1, 0.14), rgba(168, 7, 7, 0.06));
  border: 1px solid rgba(255, 168, 1, 0.48);
  border-radius: 14px;
  display: grid;
  gap: 10px;
  padding: 14px;
`

export const Title = styled.h4`
  align-items: center;
  color: ${colorVariables.text};
  display: inline-flex;
  font-size: 0.98rem;
  gap: 8px;
  margin: 0;
`

export const CouponCode = styled.strong`
  background: ${colorVariables.white};
  border: 1px dashed ${colorVariables.primary};
  border-radius: 10px;
  color: ${colorVariables.primary};
  display: inline-flex;
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 8px 10px;
  text-transform: uppercase;
  width: fit-content;
`

export const WarningText = styled.p`
  color: ${colorVariables.textMuted};
  font-size: 0.85rem;
  line-height: 1.4;
  margin: 0;
`

export const UseCouponButton = styled.button`
  align-items: center;
  background: ${colorVariables.primary};
  border: 1px solid ${colorVariables.primary};
  border-radius: 10px;
  color: ${colorVariables.white};
  display: inline-flex;
  font-size: 0.9rem;
  font-weight: 600;
  justify-content: center;
  padding: 9px 12px;
  width: fit-content;
`
