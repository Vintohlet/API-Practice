import express from "express";
import "dotenv/config";
import axios from "axios";

const app = express();
app.use(express.json());
const PORT = 4040;
const API_KEY = process.env.API_KEY;

app.get("/recipe/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const recipeResponse = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=${API_KEY}`

    );
    if(!recipeResponse.length){
        throw new Error("Recipe not found");
    }
    res.json(recipeResponse.data);
  } catch (error) {
    res.json({error:"Error: "+ error.message})

  }
});

app.listen(PORT, () => {
  console.log(`Сервак запущен на порту http://localhost:${PORT}`);
});
