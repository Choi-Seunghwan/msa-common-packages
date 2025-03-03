import { Module, DynamicModule, Global } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthorizationService } from "./authorization.service";

@Global()
@Module({})
export class AuthorizationModule {
  static register(): DynamicModule {
    return {
      module: AuthorizationModule,
      imports: [
        ConfigModule,
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => {
            const secret = configService.getOrThrow<string>("JWT_SECRET");

            console.log("@@@", configService.get("JWT_SECRET"));

            return {
              secret,
            };
          },
          inject: [ConfigService],
        }),
      ],
      providers: [AuthorizationService],
      exports: [AuthorizationService],
    };
  }
}
