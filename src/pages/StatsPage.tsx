import React from "react";
import { useRecipes } from "../hooks/useRecipes";

const StatsPage: React.FC = () => {
  const { recipes } = useRecipes();

  
  const total = recipes.length;

  
  const categorias: { [key: string]: number } = {};
  recipes.forEach((r: { categoria: string | number; }) => {
    categorias[r.categoria] = (categorias[r.categoria] || 0) + 1;
  });

 
  const masPopular = recipes.reduce((max: { likes: any; }, r: { likes: any; }) =>
    (r.likes || 0) > (max.likes || 0) ? r : max,
    recipes[0] || {}
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Estadísticas de Recetas</h2>
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total de Recetas</h5>
              <p className="card-text display-6">{total}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Recetas por Categoría</h5>
              <ul className="list-group list-group-flush">
                {Object.entries(categorias).map(([cat, count]) => (
                  <li className="list-group-item" key={cat}>
                    {cat}: {count}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Receta Más Popular</h5>
              {masPopular && masPopular.nombre ? (
                <>
                  <p className="mb-1 fw-bold">{masPopular.nombre}</p>
                  <p className="mb-0">Likes: {masPopular.likes || 0}</p>
                </>
              ) : (
                <p>No hay recetas</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;