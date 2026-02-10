import styled from 'styled-components'
import { Footer, HEADER_HEIGHT, Header } from '../components/layout'
import { AppRouter } from './router'

const AppShell = styled.main`
  padding-top: ${HEADER_HEIGHT}px;
  min-height: 100vh;
`

export default function App() {
  return (
    <>
      <Header />
      <AppShell>
        <AppRouter />
      </AppShell>
      <Footer />
    </>
  )
}
