import { ChefHat, Clock3, Heart } from 'lucide-react'
import * as S from './styles'

type Props = {
  title: string
  imageUrl: string
  description?: string
  timeInMinutes?: number
  isFavorite?: boolean
  onFavorite?: () => void
  onClick?: () => void
}

const DEFAULT_DESCRIPTION = 'Receita especial da SDF. Toque para ver o preparo completo.'

export function RecipeCard({
  title,
  imageUrl,
  description,
  timeInMinutes,
  isFavorite,
  onFavorite,
  onClick,
}: Props) {
  const isClickable = Boolean(onClick)
  const cardDescription = description?.trim() ? description.trim() : DEFAULT_DESCRIPTION
  const formattedTime = formatPrepTime(timeInMinutes)

  return (
    <S.CardRoot $clickable={isClickable}>
      <S.FavoriteButton
        type="button"
        $active={Boolean(isFavorite)}
        onClick={onFavorite}
        aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
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
          <S.BadgesRow>
            <S.TimeBadge>
              <Clock3 size={14} />
              {formattedTime}
            </S.TimeBadge>
          </S.BadgesRow>
          <S.CardTitle>{title}</S.CardTitle>

          <S.CardDescription>{cardDescription}</S.CardDescription>
          {isClickable ? (
            <S.ViewRecipeButton
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                onClick?.()
              }}
            >
              <ChefHat size={16} />
              Ver receita completa
            </S.ViewRecipeButton>
          ) : null}
        </S.CardBody>
      </S.CardContent>
    </S.CardRoot>
  )
}

function formatPrepTime(timeInMinutes?: number) {
  if (!Number.isFinite(timeInMinutes) || Number(timeInMinutes) <= 0) return 'Tempo não informado'

  const totalMinutes = Math.round(Number(timeInMinutes))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours === 0) return `${minutes}min`
  if (minutes === 0) return `${hours}h`
  return `${hours}h ${minutes}min`
}
