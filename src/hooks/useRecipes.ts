import { useContext, useState } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import type { Recipe } from '../types/Recipe';

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes debe ser usado dentro de un RecipeProvider');
  }

  const [difficultyFilter, setDifficultyFilter] = useState<"Fácil" | "Intermedio" | "Difícil" | "">("");

  
  const filterByDifficulty = (level: "Fácil" | "Intermedio" | "Difícil" | ""): Recipe[] => {
    setDifficultyFilter(level);
    if (!level) return context.recipes;
    
    const levelMap: Record<"Fácil" | "Intermedio" | "Difícil", "fácil" | "medio" | "difícil"> = {
      "Fácil": "fácil",
      "Intermedio": "medio",
      "Difícil": "difícil"
    };
    return context.recipes.filter((recipe: Recipe) => recipe.dificultad === levelMap[level as "Fácil" | "Intermedio" | "Difícil"]);
  };

  return {
    ...context,
    difficultyFilter,
    setDifficultyFilter,
    filterByDifficulty,
  };
};