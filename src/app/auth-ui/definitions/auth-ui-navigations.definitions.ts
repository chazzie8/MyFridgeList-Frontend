export const AUTH_UI_PATH_ELEMENTS = {
  rootElement: 'auth',
  root: {
    loginElement: 'login',
    signUpElement: 'signup',
  }
};

export const AUTH_UI_PATHS = {
  root: {
    login: `/${AUTH_UI_PATH_ELEMENTS.rootElement}/${AUTH_UI_PATH_ELEMENTS.root.loginElement}`,
    signUp: `/${AUTH_UI_PATH_ELEMENTS.rootElement}/${AUTH_UI_PATH_ELEMENTS.root.signUpElement}`,
  }
}