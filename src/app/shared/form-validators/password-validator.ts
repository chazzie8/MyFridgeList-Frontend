import { AbstractControlOptions, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

// checks for at least 1 lowercased char, 1 uppercased char, 1 digit, 1 special char
const PASSWORD_PATTERN = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*§/\\(\\)=\\?:;\\.\\,_\\-+´`\\[\\]\\{\\}\\"\\\\])';
const PASSWORD_REGEX = new RegExp(PASSWORD_PATTERN);
export const passwordPatternValidator = Validators.pattern(PASSWORD_REGEX);

export function matchingPasswordsValidator(group: FormGroup): ValidatorFn | ValidatorFn[] | AbstractControlOptions {
  const password = group.controls.password;
  const passwordConfirmation = group.controls.passwordConfirmation;

  // attach or remove errors directly to / from the passwordConfirmation control
  const arePasswordsMismatched = (password.value !== passwordConfirmation.value);
  const errors = getNextPasswordValidationErrors(passwordConfirmation.errors, arePasswordsMismatched);
  passwordConfirmation.setErrors(errors);

  // we never return an error for the form because we attach the error to the
  // password confirmation control instead
  return null;
}

function getNextPasswordValidationErrors(
  currentErrors: ValidationErrors | null,
  arePasswordsMismatched: boolean,
): ValidationErrors | null {
  let nextErrors: ValidationErrors | null = {
    ...(currentErrors || {}),
  };

  if (arePasswordsMismatched) {
    nextErrors.mismatchedPasswords = true;
  } else {
    delete nextErrors.mismatchedPasswords;
  }
  if (Object.keys(nextErrors).length === 0) {
    nextErrors = null;
  }

  return nextErrors;
}
