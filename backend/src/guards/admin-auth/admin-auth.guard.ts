import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthGuard } from '../auth.guard';

@Injectable()
export class AdminAuthGuard extends AuthGuard implements CanActivate {
  
  constructor(jwtService: JwtService) {
    super(jwtService);
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {
    const payload = await this.checkToken(context);
    if(payload.role=='ADMIN'){
      return true;
    }
    return false;
  }

}
