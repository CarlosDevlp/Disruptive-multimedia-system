import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';


export abstract class AuthGuard  {
  constructor(protected jwtService: JwtService) {}

  protected async checkToken(
    context: ExecutionContext,
  ): Promise<any>  {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: '41d39961310cd8597ae7207177eb08b526e834dd84fa505bc9d2dc2ff0291c92'
        }
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
      console.log('Rol de usuario actual: ', payload);
      return payload;
    } catch {
      throw new UnauthorizedException();
    }
  }

   protected extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}