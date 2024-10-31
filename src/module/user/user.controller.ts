import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
