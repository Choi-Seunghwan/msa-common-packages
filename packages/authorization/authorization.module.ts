import { DynamicModule, Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthorizationService } from "./authorization.service";

@Global()
@Module({})
export class AuthorizationModule {
  static forRoot(param: { jwtSecret: string }): DynamicModule {
    return {
      module: AuthorizationModule,
      global: true,
      imports: [
        JwtModule.register({
          secret: param.jwtSecret,
        }),
      ],
      providers: [AuthorizationService],
      exports: [AuthorizationService],
    };
  }
}
