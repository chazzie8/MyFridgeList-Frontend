export const AUTH_UI_PATH_ELEMENTS = {
  rootElement: 'auth',
  root: {
    loginElement: 'login',
    signUpElement: 'signup',
    signUpConfirmation: 'signup-confirmation'
  }
};

export const AUTH_UI_PATHS = {
  root: {
    login: `/${AUTH_UI_PATH_ELEMENTS.rootElement}/${AUTH_UI_PATH_ELEMENTS.root.loginElement}`,
    signUp: `/${AUTH_UI_PATH_ELEMENTS.rootElement}/${AUTH_UI_PATH_ELEMENTS.root.signUpElement}`,
    signUpConfirmation: `/${AUTH_UI_PATH_ELEMENTS.rootElement}/${AUTH_UI_PATH_ELEMENTS.root.signUpConfirmation}`,
  }
};
