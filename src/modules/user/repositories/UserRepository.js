class UserRepository {
  constructor() {
    this.daoStrategy = null;
  }

  set strategy(strategy) {
    this.daoStrategy = strategy;
  }

  get strategy() {
    return this.daoStrategy;
  }

  save(user) {
    this.strategy.save(user);
  }

  findByEmail(email) {
    return this.strategy.findByEmail(email);
  }

  generateId() {
    return this.strategy.generateId();
  }
}

module.exports = UserRepository;
