import Select from "react-select/creatable";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../api/index";

const Create = () => {
  const [ingredients, setIngredients] = useState([]);

  //api isteği
  useMutation({
    mutationFn: (newRecipe) => api.post("/api/v1/recipes", newRecipe),
  });

  // form gönderilince
  const handleSubmit = (e) => {
    e.preventDefault();

    // bütün inputlardaki verilere erişme
    const formData = new FormData(e.target);
    let newRecipe = Object.fromEntries(formData.entries());

    // adımları virgüle göre diziye çevirme
    newRecipe.instructions = newRecipe.instructions.split(",");

    //malzemeleri nesneye ekle
    newRecipe.ingredients = ingredients;

    //api'ye istek at
  };
  // console.log(ingredients);

  return (
    <div>
      <h1 className="text-red-400 text-3xl font-bold">Yeni Tarif oluştur</h1>
      <form
        onSubmit={handleSubmit}
        className="my-5 flex flex-col gap-7 max-w-2xl mx-auto"
      >
        <Field label={"Başlık"}>
          <input className="input" name="recipeName" />
        </Field>

        <Field label={"Kategori"}>
          <input className="input" name="category" />
        </Field>

        <Field label={"Süre"}>
          <input className="input" name="recipeTime" />
        </Field>
        <Field label={"Malzemeler"}>
          <Select
            isMulti
            onChange={(options) =>
              setIngredients(options.map((opt) => opt.value))
            }
          />
        </Field>
        <Field label={"Tarif Adımları (, ile ayırın)"}>
          <textarea
            name="instructions"
            className="input min-h-[80px] max-h-[200px]"
          ></textarea>
        </Field>
        <Field label={"Sunum Önerisi"}>
          <textarea
            name="servingSuggestion"
            className=" min-h-[80px] max-h-[200px]"
          ></textarea>
        </Field>
        <div className="flex justify-end gap-6">
          <Link to={"/"} className="btn">
            Geri
          </Link>
          <button type="submit" className="btn bg-red-400 hover:bg-red-500">
            Oluştur
          </button>
        </div>
      </form>
    </div>
  );
};

const Field = ({ children, label }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold">{label}</label>
      {children}
    </div>
  );
};

export default Create;
