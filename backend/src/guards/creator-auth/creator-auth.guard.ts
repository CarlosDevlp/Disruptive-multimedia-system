import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '../auth.guard';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CreatorAuthGuard extends AuthGuard implements CanActivate {
  
  constructor(jwtService: JwtService) {
    super(jwtService);
  }
  
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const payload = await this.checkToken(context);
    if(payload.role=='ADMIN' || payload.role=='CREATOR'){
      return true;
    }
    return false;
  }
}
