import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { useRecipes } from "../hooks/useRecipes";

const HomePage: React.FC = () => {
  const { recetas } = useRecipes(); // Aquí obtienes tus recetas
  const [filteredRecipes, setFilteredRecipes] = useState(recetas);

  useEffect(() => {
    setFilteredRecipes(recetas);
  }, [recetas]);

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredRecipes(recetas);
    } else {
      setFilteredRecipes(
        recetas.filter(recipe =>
          recipe.nombre.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="container">
      <h1 className="mb-4">Recetas</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="row">
        {filteredRecipes.map(recipe => (
          <div className="col-md-4 mb-3" key={recipe.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{recipe.nombre}</h5>
                {/* Otros datos de la receta */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;