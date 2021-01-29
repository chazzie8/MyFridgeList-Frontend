import { Validators } from '@angular/forms';

const LETTER_PATTERN = new RegExp('^[a-zA-Z_äÄöÖüÜß_ ]+$');
const NUMERIC_PATTERN = new RegExp('^[0-9]+$');

export const letterPatternValidator = Validators.pattern(LETTER_PATTERN);
export const numericPatternValidator = Validators.pattern(NUMERIC_PATTERN);
