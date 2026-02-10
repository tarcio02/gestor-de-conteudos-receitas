import * as S from './styles'

type Props = {
  title: string
  imageUrl: string
  onClick?: () => void
}

export function RecipeCard({ title, imageUrl, onClick }: Props) {
  const isClickable = Boolean(onClick)

  return (
    <S.CardRoot
      $clickable={isClickable}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={(event) => {
        if (!isClickable) return
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onClick?.()
        }
      }}
    >
      <S.CardImage src={imageUrl} alt={title} loading="lazy" />
      <S.CardBody>
        <S.CardTitle>{title}</S.CardTitle>
      </S.CardBody>
    </S.CardRoot>
  )
}
