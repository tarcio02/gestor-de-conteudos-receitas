import { useMemo, useState } from 'react'
import { Hero } from '../../components/layout'
import { RecipeCard } from '../../components/ui'
import { usePublicRecipes } from '../../features/recipes/hooks/usePublicRecipes'
import { buildHomeSections } from '../../features/recipes/model/buildHomeSections'
import { getFavoriteIds, toggleFavorite } from '../../features/recipes/model/favorites.storage'
import * as S from './styles'

export default function Home() {
  const { data, loading, error } = usePublicRecipes()

  // ✅ Favoritos reais + re-render quando mudar
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => getFavoriteIds())

  const sections = useMemo(() => {
    return buildHomeSections(data, { favoriteIds })
  }, [data, favoriteIds])

  if (loading) {
    return (
      <S.Main>
        <Hero />
        <S.FeedbackText>Carregando receitas...</S.FeedbackText>
      </S.Main>
    )
  }

  if (error) {
    return (
      <S.Main>
        <Hero />
        <S.FeedbackText>Erro: {String(error)}</S.FeedbackText>
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
        {sections.map((section) => (
          <section key={`${section.kind}-${section.title}`}>
            <S.SectionTitle>{section.title}</S.SectionTitle>

            <S.CardsGrid>
              {section.recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  title={recipe.title}
                  imageUrl={recipe.image_url}
                  // ✅ Se seu RecipeCard suportar favoritos, isso ativa a seção "Favoritas"
                  isFavorite={favoriteIds.includes(recipe.id)}
                  onFavorite={() => setFavoriteIds(toggleFavorite(recipe.id))}
                  onClick={() => {
                    // Depois: navegar para /recipe/:slug
                    console.log('open recipe', recipe.slug)
                  }}
                />
              ))}
            </S.CardsGrid>
          </section>
        ))}
      </S.SectionsContainer>
    </S.Main>
  )
}
