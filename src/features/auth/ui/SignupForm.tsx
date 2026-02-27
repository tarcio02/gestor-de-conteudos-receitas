import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'
import { useSignup } from '../hooks/useSignup'
import { Container, ErrorText, FormCard, FormLink, Input, Label, SubmitButton, Title } from './styles'

export function SignupForm() {
  const { signup, loading, error } = useSignup()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    await signup({ email, password })
    navigate(ROUTES.login)
  }

  return (
    <Container>
      <FormCard onSubmit={onSubmit}>
        <Title>Cadastro</Title>

        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          autoComplete="email"
        />

        <Label htmlFor="signup-password">Senha</Label>
        <Input
          id="signup-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />

        {error && <ErrorText>{error}</ErrorText>}

        <SubmitButton disabled={loading} type="submit">
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </SubmitButton>
        <FormLink to={ROUTES.login}>Ja tenho conta</FormLink>
      </FormCard>
    </Container>
  )
}
