import { useEffect, useMemo, useState } from 'react'
import { Heart, ScrollText, Star } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { ApiMessage, Hero, Loading } from '../../components/layout'
import { RecipeCard, RecipeModal } from '../../components/ui'
import { usePublicRecipes } from '../../features/recipes/hooks/usePublicRecipes'
import { buildHomeSections } from '../../features/recipes/model/buildHomeSections'
import { getFavoriteIds, toggleFavorite } from '../../features/recipes/model/favorites.storage'
import type { Recipe } from '../../features/recipes/model/recipe.types'
import * as S from './styles'

export default function Home() {
  const { data, loading, error } = usePublicRecipes()
  const location = useLocation()

  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => getFavoriteIds())
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)

  const sections = useMemo(() => {
    return buildHomeSections(data, { favoriteIds })
  }, [data, favoriteIds])

  useEffect(() => {
    if (location.hash !== '#receitas') return

    const timeoutId = window.setTimeout(() => {
      const recipesSection = document.getElementById('receitas')
      if (!recipesSection) return

      recipesSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [location.hash, sections.length])

  if (loading) {
    return (
      <S.Main>
        <Hero />
        <Loading message="Carregando receitas..." />
      </S.Main>
    )
  }

  if (error) {
    return (
      <S.Main>
        <Hero />
        <ApiMessage message={`Nao foi possivel carregar as receitas. ${String(error)}`} />
      </S.Main>
    )
  }

  if (sections.length === 0) {
    return (
      <S.Main>
        <Hero />
        <S.FeedbackText>Nenhuma receita publicada ainda.</S.FeedbackText>
      </S.Main>
    )
  }

  return (
    <S.Main>
      <Hero />

      <S.SectionsContainer>
        {sections.map((section, index) => (
          <S.SectionBlock
            key={`${section.kind}-${section.title}`}
            id={index === 0 ? 'receitas' : undefined}
          >
            <S.SectionTitle>
              {section.kind === 'featured' ? (
                <S.SectionTitleIcon $tone="primary">
                  <Star size={14} />
                </S.SectionTitleIcon>
              ) : section.kind === 'favorites' ? (
                <S.SectionTitleIcon $tone="primary">
                  <Heart size={14} fill="currentColor" />
                </S.SectionTitleIcon>
              ) : (
                <S.SectionTitleIcon $tone="primary">
                  <ScrollText size={14} />
                </S.SectionTitleIcon>
              )}
              {section.title}
            </S.SectionTitle>

            <S.CardsGrid>
              {section.recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  title={recipe.title}
                  imageUrl={recipe.image_url}
                  description={recipe.description}
                  timeInMinutes={recipe.time}
                  isFavorite={favoriteIds.includes(recipe.id)}
                  onFavorite={() => setFavoriteIds(toggleFavorite(recipe.id))}
                  onClick={() => {
                    setSelectedRecipe(recipe)
                  }}
                />
              ))}
            </S.CardsGrid>
          </S.SectionBlock>
        ))}
      </S.SectionsContainer>

      <RecipeModal isOpen={Boolean(selectedRecipe)} recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
    </S.Main>
  )
}
