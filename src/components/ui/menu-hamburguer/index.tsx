import { Menu } from 'lucide-react'
import { MenuButton } from './styles'

type Props = {
  onClick?: () => void
}

export function MenuHamburguer({ onClick }: Props) {
  return (
    <MenuButton type="button" aria-label="Abrir menu" onClick={onClick}>
      <Menu size={22} aria-hidden />
    </MenuButton>
  )
}
