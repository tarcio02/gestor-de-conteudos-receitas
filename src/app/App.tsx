import styled from 'styled-components'
import { Footer, Header } from '../components/layout'
import { AppRouter } from './router'

const AppShell = styled.main`
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
