import { HttpException, Inject, Injectable } from "@nestjs/common";
import { JsonWebTokenError, JwtService, TokenExpiredError } from "@nestjs/jwt";
import { JwtPayload } from "./types/authorization.type";
import { TOKEN_EXPIRES_IN } from "./constants/authorization.constant";

@Injectable()
export class AuthorizationService {
  constructor(
    private readonly jwtService: JwtService
    // @Inject("JWT_SECRET") private readonly jwtSecret: string
  ) {}

  async generateToken(payload: Omit<JwtPayload, "iat">): Promise<string> {
    const expiresIn = payload.exp || TOKEN_EXPIRES_IN;
    const issuedAt = Math.floor(Date.now() / 1000);
    const expirationTime = issuedAt + expiresIn;

    const fullPayload: JwtPayload = {
      ...payload,
      iat: issuedAt,
      exp: expirationTime,
    };

    const token = await this.jwtService.signAsync(fullPayload);

    return token;
  }

  async validateToken(token: string): Promise<JwtPayload> {
    try {
      const payload = await this.jwtService.verifyAsync(token);

      return payload;
    } catch (e) {
      if (e instanceof TokenExpiredError)
        throw new HttpException("TOKEN_EXPIRED", 401);
      else if (e instanceof JsonWebTokenError)
        throw new HttpException("REQUIRED_TOKEN", 401);
      else throw e;
    }
  }

  async refreshToken(token: string, exp: number): Promise<string> {
    const payload = await this.validateToken(token);

    payload.exp = exp;

    return this.generateToken(payload);
  }
}
