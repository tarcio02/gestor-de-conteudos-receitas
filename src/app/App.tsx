import styled from 'styled-components'
import { Footer } from '../components/layout'
import { Header } from '../features/header'
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
