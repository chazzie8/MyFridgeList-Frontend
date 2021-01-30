export interface RequestError {
  code?: number;
  message: string;
}

export interface ValidationError {
  field: string;
  messages: string[];
}
