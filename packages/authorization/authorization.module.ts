import { Module, DynamicModule } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthorizationService } from "./authorization.service";

@Module({})
export class AuthorizationModule {
  static register(jwtSecret: string): DynamicModule {
    return {
      module: AuthorizationModule,
      imports: [
        JwtModule.register({
          secret: jwtSecret,
        }),
      ],
      providers: [AuthorizationService],
      exports: [AuthorizationService],
    };
  }
}
