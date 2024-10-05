import { readRecipes } from "../model/recipeModel.js";

const data = readRecipes();

export const getAllRecipes = (req, res) => {
  // tarif verisinin kopyası
  let recipes = [...data];

  // aratılan kelime
  const search = req.query?.search?.toLowerCase();

  // eğer search parametresi geldiyse filtreleme yap
  if (search) {
    recipes = data.filter((recipe) =>
      recipe.recipeName.toLowerCase().includes(search)
    );
  }

  //eğer sort parametresi geldiyse sıralama yap
  if (req.query.order) {
    recipes.sort((a, b) =>
      req.query.order === "asc"
        ? a.recipeTime - b.recipeTime
        : b.recipeTime - a.recipeTime
    );
  }

  //client'a cevap ver
  res.status(200).json({
    status: "success",
    results: recipes.length,
    recipes: recipes,
  });
};

export const createRecipe = (req, res) => {};
export const getRecipe = (req, res) => {};
export const deleteRecipe = (req, res) => {};
export const updateRecipe = (req, res) => {};
