import styled from 'styled-components'
import { colorVariables } from '../../../styles/variables'

export const Overlay = styled.div`
  align-items: center;
  background: rgba(15, 23, 42, 0.6);
  display: flex;
  inset: 0;
  justify-content: center;
  padding: 20px;
  position: fixed;
  z-index: 1200;
`

export const Dialog = styled.article`
  background: ${colorVariables.white};
  border: 1px solid ${colorVariables.border};
  border-radius: 18px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  max-height: min(92vh, 860px);
  max-width: 760px;
  overflow: hidden auto;
  position: relative;
  width: min(100%, 760px);
`

export const CloseButton = styled.button`
  align-items: center;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid ${colorVariables.border};
  border-radius: 9999px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.16);
  color: ${colorVariables.primary};
  display: inline-flex;
  height: 36px;
  justify-content: center;
  position: absolute;
  right: 14px;
  top: 14px;
  width: 36px;
  z-index: 3;
`

export const HeroImage = styled.img`
  aspect-ratio: 16 / 8;
  background: #f8fafc;
  display: block;
  object-fit: cover;
  width: 100%;
`

export const Content = styled.div`
  display: grid;
  gap: 14px;
  padding: 18px 18px 22px;
`

export const Title = styled.h2`
  align-items: center;
  color: ${colorVariables.text};
  display: flex;
  font-size: 1.45rem;
  gap: 8px;
  line-height: 1.25;
  margin: 0;
  padding-right: 44px;
`

export const TitleIcon = styled.span`
  align-items: center;
  background: rgba(168, 7, 7, 0.12);
  border: 1px solid rgba(168, 7, 7, 0.35);
  border-radius: 9999px;
  color: ${colorVariables.primary};
  display: inline-flex;
  height: 30px;
  justify-content: center;
  width: 30px;
`

export const BadgesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export const Badge = styled.span`
  align-items: center;
  background: rgba(255, 168, 1, 0.14);
  border: 1px solid rgba(255, 168, 1, 0.5);
  border-radius: 9999px;
  color: ${colorVariables.text};
  display: inline-flex;
  font-size: 0.82rem;
  font-weight: 600;
  gap: 6px;
  line-height: 1;
  padding: 6px 10px;
`

export const Description = styled.p`
  color: ${colorVariables.textMuted};
  font-size: 0.95rem;
  line-height: 1.45;
  margin: 0;
`

export const SectionTitle = styled.h3<{ $tone?: 'primary' | 'secondary' }>`
  align-items: center;
  color: ${({ $tone }) => ($tone === 'secondary' ? colorVariables.secondary : colorVariables.primary)};
  display: inline-flex;
  font-size: 1rem;
  gap: 7px;
  margin: 4px 0 0;
`

export const List = styled.ul`
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0 0 0 18px;
`

export const ListItem = styled.li`
  color: ${colorVariables.text};
  font-size: 0.94rem;
  line-height: 1.4;
`

export const Steps = styled.div`
  display: grid;
  gap: 10px;
`

export const StepItem = styled.article`
  align-items: flex-start;
  background: rgba(255, 168, 1, 0.12);
  border: 1px solid rgba(255, 168, 1, 0.5);
  border-radius: 12px;
  display: grid;
  gap: 10px;
  grid-template-columns: auto 1fr;
  padding: 10px 12px;
`

export const StepIndex = styled.span`
  align-items: center;
  background: ${colorVariables.secondary};
  border-radius: 9999px;
  color: ${colorVariables.text};
  display: inline-flex;
  font-size: 0.76rem;
  font-weight: 700;
  height: 22px;
  justify-content: center;
  width: 22px;
`

export const StepText = styled.p`
  color: ${colorVariables.text};
  font-size: 0.92rem;
  line-height: 1.4;
  margin: 0;
`
