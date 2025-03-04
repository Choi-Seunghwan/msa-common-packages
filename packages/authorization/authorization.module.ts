import { Module, DynamicModule } from "@nestjs/common";
import { AuthorizationService } from "./authorization.service";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({})
export class AuthorizationModule {
  static forRoot({ jwtSecret }: { jwtSecret: string }): DynamicModule {
    return {
      imports: [JwtModule.register({ secret: jwtSecret })],
      module: AuthorizationModule,
      global: true,
      providers: [
        // {
        //   provide: "JWT_SECRET",
        //   useFactory: () => jwtSecret,
        // },
        AuthorizationService,
      ],
      exports: [AuthorizationService],
    };
  }
}
