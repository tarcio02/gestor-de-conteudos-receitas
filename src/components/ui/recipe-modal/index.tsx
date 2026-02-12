import { Carrot, ChefHat, Clock3, ListChecks, X } from 'lucide-react'
import { useEffect } from 'react'
import type { Recipe } from '../../../features/recipes/model/recipe.types'
import { CardCupom } from '../card-cupom'
import * as S from './styles'

type Props = {
  isOpen: boolean
  recipe: Recipe | null
  onClose: () => void
}

export function RecipeModal({ isOpen, recipe, onClose }: Props) {
  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen || !recipe) return null

  const ingredients = parseTextList(recipe.ingredients)
  const steps = parseTextList(recipe.steps)
  const description = recipe.description?.trim() || 'Descrição não informada.'
  const hasCoupon = recipe.coupon === true && String(recipe.code_coupon ?? '').trim().length > 0

  return (
    <S.Overlay role="presentation" onClick={onClose}>
      <S.Dialog
        role="dialog"
        aria-modal="true"
        aria-labelledby="recipe-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <S.CloseButton type="button" onClick={onClose} aria-label="Fechar modal da receita">
          <X size={18} />
        </S.CloseButton>

        <S.HeroImage src={recipe.image_url} alt={recipe.title} loading="lazy" />

        <S.Content>
          <S.Title id="recipe-modal-title">
            <S.TitleIcon>
              <ChefHat size={16} />
            </S.TitleIcon>
            {recipe.title}
          </S.Title>

          <S.BadgesRow>
            <S.Badge>
              <Clock3 size={14} />
              {formatPrepTime(recipe.time)}
            </S.Badge>
          </S.BadgesRow>

          <S.Description>{description}</S.Description>
          {hasCoupon ? <CardCupom code={recipe.code_coupon} /> : null}

          <S.SectionTitle>
            <Carrot size={16} />
            Ingredientes
          </S.SectionTitle>
          <S.List>
            {ingredients.map((item, index) => (
              <S.ListItem key={`${index}-${item}`}>{item}</S.ListItem>
            ))}
          </S.List>

          <S.SectionTitle>
            <ListChecks size={16} />
            Modo de preparo
          </S.SectionTitle>
          <S.Steps>
            {steps.map((step, index) => (
              <S.StepItem key={`${index}-${step}`}>
                <S.StepIndex>{index + 1}</S.StepIndex>
                <S.StepText>{step}</S.StepText>
              </S.StepItem>
            ))}
          </S.Steps>
        </S.Content>
      </S.Dialog>
    </S.Overlay>
  )
}

function formatPrepTime(timeInMinutes: number) {
  if (!Number.isFinite(timeInMinutes) || timeInMinutes <= 0) return 'Tempo não informado'

  const totalMinutes = Math.round(timeInMinutes)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours === 0) return `${minutes}min`
  if (minutes === 0) return `${hours}h`
  return `${hours}h ${minutes}min`
}

function parseTextList(text: string) {
  const raw = String(text ?? '').trim()
  if (!raw) return ['Não informado.']

  try {
    const parsedJson = JSON.parse(raw)
    if (Array.isArray(parsedJson)) {
      const normalized = parsedJson.map((item) => String(item).trim()).filter(Boolean)
      if (normalized.length) return normalized
    }
  } catch {
    // ignora parse de JSON inválido e continua fluxo normal
  }

  const normalized = raw
    .split(/\r?\n|;|,/)
    .map((item) => item.trim())
    .filter(Boolean)

  return normalized.length ? normalized : ['Não informado.']
}
