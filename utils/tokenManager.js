class TokenManager {
  static instance = null;
  token = null;

  static getInstance() {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  setToken(token) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  initializeFromStore(token) {
    this.token = token;
  }
}

export default TokenManager.getInstance();
