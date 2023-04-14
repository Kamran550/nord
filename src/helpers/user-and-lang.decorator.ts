import { createParamDecorator } from '@nestjs/common';

const UserAndLang = createParamDecorator((data, ctx) => {
  const request = ctx.switchToHttp().getRequest();

  return {
    user: request.user,
    lang: request.headers['accept-language']
  };
});

export default UserAndLang;
