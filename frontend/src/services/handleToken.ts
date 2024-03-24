const TokenKey = import.meta.env.VITE_QUIZIFY_KEY;

export class TokenManager {
  static isToken() {
    const isToken = localStorage.getItem(TokenKey);

    return !!isToken;
  }

  static getToken() {
    return localStorage.getItem(TokenKey);
  }

  static setToken(token: string) {
    localStorage.setItem(TokenKey, token);
  }

  static removeToken() {
    localStorage.removeItem(TokenKey);
  }
}
