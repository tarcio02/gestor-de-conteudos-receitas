import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { colorVariables } from '../../../styles/variables'

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const fadeBg = keyframes`
  from {
    opacity: 0;
    transform: scale(1.03);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

export const StylesHero = styled.section`
  height: min(97vh, 860px);
  overflow: hidden;
  position: relative;
`

export const BackgroundImage = styled.div<{ $bgImage: string }>`
  animation: ${fadeBg} 0.7s ease-out;
  background-image: url(${({ $bgImage }) => $bgImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  inset: 0;
  position: absolute;
  z-index: 0;

  @media (max-width: 601px) {
    background-position: top;
  }
`

export const GradientOverlay = styled.div`
  background: linear-gradient(
    to top,
    rgba(168, 7, 7, 1) 20%,
    rgba(168, 7, 7, 0.2) 75%,
    rgba(168, 7, 7, 0) 100%
  );
  inset: 0;
  pointer-events: none;
  position: absolute;
  z-index: 1;

  @media (min-width: 601px) {
    background: linear-gradient(
      to right,
      rgba(168, 7, 7, 0.95) 20%,
      rgba(168, 7, 7, 0.2) 75%,
      rgba(168, 7, 7, 0) 100%
    );
  }
`

export const MainContent = styled.div`
  align-items: flex-end;
  display: flex;
  inset: 0;
  margin: 0 auto;
  max-width: 80rem;
  padding: 40px;
  position: absolute;
  width: 100%;
  z-index: 10;
`

export const ContentWrapper = styled.div`
  animation: ${fadeUp} 0.6s ease-out;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  max-width: 36rem;
`

export const TextContent = styled.div`
  color: ${colorVariables.white};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Title = styled.h1`
  animation: ${fadeUp} 0.8s ease-out forwards;
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  @media (min-width: 768px) {
    font-size: 3rem;
  }

  @media (min-width: 1024px) {
    font-size: 3.75rem;
  }
`

export const HighlightText = styled.span`
  color: ${colorVariables.secondary};
`

export const Description = styled.p<{ $delay?: string }>`
  animation: ${fadeUp} 0.8s ease-out forwards;
  animation-delay: ${({ $delay }) => $delay || '0s'};
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.125rem;
  margin: 0;
  max-width: 28rem;
  opacity: 0;

  @media (min-width: 768px) {
    font-size: 1.25rem;
    min-height: 80px;
  }
`

export const ButtonsWrapper = styled(Link)<{ $delay?: string }>`
  align-items: center;
  animation: ${fadeUp} 0.8s ease-out forwards;
  animation-delay: ${({ $delay }) => $delay || '0s'};
  background-color: ${colorVariables.secondary};
  border-radius: 24px;
  color: ${colorVariables.white};
  display: inline-flex;
  font-size: 16px;
  font-weight: 700;
  gap: 1rem;
  justify-content: center;
  opacity: 0;
  padding: 14px 20px;
  text-decoration: none;
  width: fit-content;
`

export const CarouselControls = styled.div<{ $delay?: string }>`
  align-items: center;
  animation: ${fadeUp} 0.6s ease-out forwards;
  animation-delay: ${({ $delay }) => $delay || '0s'};
  display: flex;
  gap: 1rem;
  opacity: 0;
  padding-top: 1rem;
`

export const CarouselButton = styled.button`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  color: ${colorVariables.white};
  display: inline-flex;
  height: 32px;
  justify-content: center;
  line-height: 0;
  padding: 0;
  width: 32px;

  svg {
    display: block;
    flex-shrink: 0;
  }
`

export const DotsContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
`

export const Dot = styled.button<{ $active?: boolean }>`
  background-color: ${({ $active }) =>
    $active ? colorVariables.white : 'rgba(255, 255, 255, 0.3)'};
  border: 0;
  border-radius: 9999px;
  height: 0.5rem;
  padding: 0;
  width: 0.5rem;
`
