import { readRecipes, writeRecipes } from "../model/recipeModel.js";
import isInValid from "../utils/isInValid.js";
import crypto from "crypto";

const data = readRecipes();
// console.log(data)
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

export const createRecipe = (req, res) => {
  // 1-) isteğin body bölümünde gelen veriye eriş
  console.log("BURADAYIM");
  let newRecipe = req.body;
  // 2-) veri bütünlüğünü kontrol et

  if (isInValid(newRecipe)) {
    return res.status(404).json({
      message: "Lütfen bütün değerleri tanımlayın",
    });
  }
  // 3-) veriye id ve foto ekle
  newRecipe = {
    ...newRecipe,
    id: crypto.randomUUID(),
    image: `https://picsum.photos/seed/${crypto.randomUUID()}/500/500`,
  };

  // 4-) tarif verisini diziye ekle
  data.push(newRecipe);

  // 5-) json dosyasını güncelle
  writeRecipes(data);

  // 6-) cevap gönder
  res.status(201).json({
    message: "Yeni tarif oluşturuldu",
    recipe: newRecipe,
  });
};

export const getRecipe = (req, res) => {
  res.status(200).json({
    message: "Aradığınız tarif bulundu",
    found: req.foundRecipe,
  });
};

export const deleteRecipe = (req, res) => {
  // silinecek elemanın sırasını bul
  const index = data.findIndex((i) => i.id === req.params.id);

  // elemanı diziden kaldır
  data.splice(index, 1);

  // json dosyasını güncelle
  writeRecipes(data);

  //cevap gönder
  res.status(204).json({});
};

export const updateRecipe = (req, res) => {
  // eski tarif nesnesini güncelle
  const updated = { ...req.foundRecipe, ...req.body };
  // güncellenecek elemanın sırasını bul
  const index = data.findIndex((i) => i.id === req.params.id);

  // diziyi güncelle
  data.splice(index, 1, updated);

  // json dosyasını güncelle
  writeRecipes(data);

  // cevap gönder
  res.status(200).json({
    message: "Tarif başarıyla güncellendi",
    recipe: updated,
  });
};
