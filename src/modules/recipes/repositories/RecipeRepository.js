class RecipeRepository {
  constructor() {
    this.daoStrategy = null;
  }

  set strategy(strategy) {
    this.daoStrategy = strategy;
  }

  get strategy() {
    return this.daoStrategy;
  }

  generateId() {
    return this.strategy.generateId();
  }

  save(recipe) {
    return this.strategy.save(recipe);
  }

  findById(id) {
    return this.strategy.findById(id);
  }

  findAll() {
    return this.strategy.findAll();
  }

  delete(id) {
    this.strategy.delete(id);
  }
}

module.exports = RecipeRepository;
