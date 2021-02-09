import { Validators } from '@angular/forms';

export const EMAIL_PATTERN = new RegExp('^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\\.[a-z]{2,4}$');

export const emailPatternValidator = Validators.pattern(EMAIL_PATTERN);
