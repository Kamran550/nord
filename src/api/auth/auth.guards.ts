import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ROLE_LEVELS } from '../../constants';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class JwtSuperAdminAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user) {
    if (user.role.level <= ROLE_LEVELS.SUPERADMIN) return user;

    throw new ForbiddenException();
  }
}

@Injectable()
export class JwtLeaderAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user) {
    if (user.role.level <= ROLE_LEVELS.LEADER) return user;

    throw new ForbiddenException();
  }
}

@Injectable()
export class JwtManagerAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user) {
    if (user.role.level <= ROLE_LEVELS.MANAGER) return user;

    throw new ForbiddenException();
  }
}
