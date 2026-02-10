import * as S from './styles'

type Props = {
  title: string
  imageUrl: string
  isFavorite?: boolean
  onFavorite?: () => void
  onClick?: () => void
}

export function RecipeCard({ title, imageUrl, isFavorite, onFavorite, onClick }: Props) {
  const isClickable = Boolean(onClick)

  return (
    <S.CardRoot $clickable={isClickable}>
      <S.FavoriteButton
        type="button"
        onClick={onFavorite}
        aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        {isFavorite ? '⭐' : '☆'}
      </S.FavoriteButton>

      <S.CardContent
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
      </S.CardContent>
    </S.CardRoot>
  )
}
