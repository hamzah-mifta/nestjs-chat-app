export interface IResponseDto<T> {
  success: boolean;
  message: string;
  data: T | null;
}

export class ResponseDto<T> implements IResponseDto<T> {
  success: boolean;
  message: string;
  data: T | null;

  constructor(success: boolean, message: string, data: T | null = null) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
