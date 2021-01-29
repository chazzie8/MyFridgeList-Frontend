import { Validators } from '@angular/forms';

const DATE_PATTERN = new RegExp('^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{​​4}​​|[0-9]{​​2}​​)$');

export const datePatternValidator = Validators.pattern(DATE_PATTERN);
