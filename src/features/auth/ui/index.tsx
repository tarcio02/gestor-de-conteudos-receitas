import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Container, ErrorText, FormCard, Input, Label, SubmitButton, Title } from './styles'

export function LoginForm() {
  const { login, loading, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    await login({ email, password })
    // Redirecionamento por router sera adicionado no fluxo de auth.
    alert('Logado! Token salvo no localStorage.')
  }

  return (
    <Container>
      <FormCard onSubmit={onSubmit}>
        <Title>Login</Title>

        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          autoComplete="email"
        />

        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        {error && <ErrorText>{error}</ErrorText>}

        <SubmitButton disabled={loading} type="submit">
          {loading ? 'Entrando...' : 'Entrar'}
        </SubmitButton>
      </FormCard>
    </Container>
  )
}
