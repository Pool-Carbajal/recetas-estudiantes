/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Recipe } from '../types/Recipe';
import recetasData from '../data/recetas.json';


interface RecipeContextType {
  recipes: any;
  recetas: Recipe[];
  favoritos: number[];
  addToFavoritos: (id: number) => void;
  removeFromFavoritos: (id: number) => void;
  isFavorito: (id: number) => boolean;
  addReceta: (receta: Omit<Recipe, 'id'>) => void;
}

export const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

interface RecipeProviderProps {
  children: ReactNode;
  
}

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
  const [recetas, setRecetas] = useState<Recipe[]>(recetasData.recetas as Recipe[]);
  const [favoritos, setFavoritos] = useState<number[]>([]);

  // useEffect para cargar favoritos del localStorage
  useEffect(() => {
    const favoritosGuardados = localStorage.getItem('favoritos');
    if (favoritosGuardados) {
      setFavoritos(JSON.parse(favoritosGuardados));
    }
  }, []);

  // useEffect para guardar favoritos en localStorage
  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  const addToFavoritos = (id: number) => {
    setFavoritos(prev => [...prev, id]);
  };

  const removeFromFavoritos = (id: number) => {
    setFavoritos(prev => prev.filter(favId => favId !== id));
  };

  const isFavorito = (id: number) => {
    return favoritos.includes(id);
  };

  const addReceta = (nuevaReceta: Omit<Recipe, 'id'>) => {
    const newId = Math.max(...recetas.map(r => r.id)) + 1;
    const receta: Recipe = {
      ...nuevaReceta,
      id: newId
    };
    setRecetas(prev => [...prev, receta]);
  };

  const value = {
    recipes: recetas, // Added to satisfy RecipeContextType
    recetas,
    favoritos,
    addToFavoritos,
    removeFromFavoritos,
    isFavorito,
    addReceta,
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};

