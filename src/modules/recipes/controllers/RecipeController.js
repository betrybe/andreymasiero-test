const path = require('path');
const fs = require('fs');
const CreateRecipeService = require('../services/CreateRecipeService');

class RecipeController {
  constructor(repository, authService) {
    this.repository = repository;
    this.authService = authService;
    this.service = new CreateRecipeService(repository);
  }

  async create(request, response) {
    const token = request.get('Authorization') || request.headers.authorization;
    const { id: userId } = this.authService.extract(token);
    const { name, ingredients, preparation } = request.body;

    const newId = this.repository.generateId();

    const newRecipe = await this.service.create(newId, {
      name,
      ingredients,
      preparation,
      userId,
    });
    const recipe = newRecipe.toJson();

    return response.status(201).json({ recipe });
  }

  async update(request, response) {
    const token = request.get('Authorization') || request.headers.authorization;
    this.authService.extract(token);

    const { id: recipeId } = request.params;
    const { name, ingredients, preparation } = request.body;

    const recipeRetrived = await this.repository.findById(recipeId);

    recipeRetrived.name = name;
    recipeRetrived.ingredients = ingredients;
    recipeRetrived.preparation = preparation;

    const recipe = recipeRetrived.toJson();
    await this.repository.save(recipe);

    return response.status(200).json(recipe);
  }

  async delete(request, response) {
    const token = request.get('Authorization') || request.headers.authorization;
    this.authService.extract(token);

    const { id: recipeId } = request.params;
    await this.repository.delete(recipeId);

    return response.sendStatus(204);
  }

  async uploadImage(request, response) {
    const token = request.get('Authorization') || request.headers.authorization;
    this.authService.extract(token);
    const { id } = request.params;
    const recipeRetrived = await this.repository.findById(id);

    const { file } = request;
    if (!file) {
      throw new Error('Please select a file to upload');
    }
    const [, ext] = file.mimetype.split('/');

    const tempPath = request.file.path;
    const targetPath = path.join(__dirname, `../../../uploads/${id}.${ext}`);

    fs.rename(tempPath, targetPath, (err) => {
      if (err) console.log(err);
    });
    recipeRetrived.image = `localhost:3000/src/uploads/${id}.${ext}`;
    await this.repository.save(recipeRetrived.toJson());
    return response.status(200).json(recipeRetrived.toJson());
  }

  async getRecipe(request, response) {
    const { id } = request.params;
    const recipeRetrived = await this.repository.findById(id);
    return response.status(200).json(recipeRetrived.toJson());
  }

  async list(request, response) {
    const recipes = await this.repository.findAll();
    return response.json(recipes);
  }
}

module.exports = RecipeController;
