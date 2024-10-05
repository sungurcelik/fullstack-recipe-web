import express from "express";
import cors from "cors";
import recipeRouter from "./routes/recipeRoutes.js";

// express kurulumu
const app = express();
const PORT = 4004;

// cors hatalarını önleyen mw (oto header ekler)
app.use(cors());

// tarifler için crud operasyonlarını gerçekleştireceğimiz endpointler...
app.use(recipeRouter);

// bodydeki json verilerini çeviren
app.use(express.json());

// dinelenecek port
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışmaya başladı...`);
});
