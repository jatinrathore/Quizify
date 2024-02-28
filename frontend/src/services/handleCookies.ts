import { useCookies } from "react-cookie";

const COOKIE_KEY = import.meta.env.VITE_QUIZIFY_KEY;

export class CookieManager {
  static isCookieSet() {
    const [cookies] = useCookies([COOKIE_KEY]);

    // Check if the cookie exists
    return cookies[COOKIE_KEY] !== undefined;
  }

  static removeCookie() {
    const [, , removeCookie] = useCookies([COOKIE_KEY]);

    return function () {
      removeCookie(COOKIE_KEY);
    };
  }

  static getCookie() {
    const [cookies] = useCookies([COOKIE_KEY]);

    // Check if the cookie exists
    return cookies[COOKIE_KEY];
  }
}
