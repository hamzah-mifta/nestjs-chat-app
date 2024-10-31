import { Injectable } from '@nestjs/common';
import { HttpResponse, SuccessResponse } from './common/utils/response.util';

@Injectable()
export class AppService {
  getHealth(): HttpResponse {
    return new SuccessResponse(new Date());
  }
}
