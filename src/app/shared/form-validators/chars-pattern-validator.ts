import { Validators } from '@angular/forms';

const LETTER_PATTERN = new RegExp('^[a-zA-Z_äÄöÖüÜß_ ]+$');
const NUMERIC_PATTERN = new RegExp('^[0-9]+$');
const LETTER_NUMERIC_PATTERN = new RegExp('^[0-9a-zA-Z]+$');

export const letterPatternValidator = Validators.pattern(LETTER_PATTERN);
export const numericPatternValidator = Validators.pattern(NUMERIC_PATTERN);
export const letterNumericPatternValidator = Validators.pattern(LETTER_NUMERIC_PATTERN);
