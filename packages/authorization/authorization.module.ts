import { DynamicModule, Global, Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthorizationService } from "./authorization.service";

@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [AuthorizationService],
  exports: [AuthorizationService, JwtModule],
})
export class AuthorizationModule {
  static forRoot(param: { jwtSecret: string }): DynamicModule {
    return {
      module: AuthorizationModule,
      global: true,
      // imports: [
      //   JwtModule.register({
      //     secret: param.jwtSecret,
      //   }),
      // ],
      providers: [AuthorizationService, JwtService],
      exports: [AuthorizationService, JwtModule],
    };
  }
}
