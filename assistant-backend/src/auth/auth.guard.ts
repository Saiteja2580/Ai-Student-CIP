import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'util';
import * as jwt from 'express-jwt';
import { auth } from 'express-oauth2-jwt-bearer';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthGuard implements CanActivate {
  private readonly auth0_audience: string;
  private readonly auth0_domain: string;

  constructor(private readonly config: ConfigService) {
    this.auth0_audience = config.get<string>('AUTH0_AUDIENCE') || '';
    this.auth0_domain = config.get<string>('AUTH0_DOMAIN') || '';

    // Ensure domain format
    if (!this.auth0_domain.startsWith('https://')) {
      this.auth0_domain = `https://${this.auth0_domain}`;
    }

    // console.log(`Auth0 Audience: ${this.auth0_audience}`);
    // console.log(`Auth0 Domain: ${this.auth0_domain}`);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const jwtCheck = auth({
      audience: this.auth0_audience,
      issuerBaseURL: this.auth0_domain,
      tokenSigningAlg: 'RS256',
    });

    try {
      await jwtCheck(req, res, (err) => {
        if (err) {
          throw err;
        }
      });
      return true;
    } catch (error) {
     // console.error('Auth0 Guard Error:', error);
      throw new UnauthorizedException('Invalid token or authentication failed');
    }
  }
}
