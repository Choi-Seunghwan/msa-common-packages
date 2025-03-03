import { Module, DynamicModule } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthorizationService } from "./authorization.service";

@Module({})
export class AuthorizationModule {
  static register(): DynamicModule {
    return {
      module: AuthorizationModule,
      imports: [
        ConfigModule,
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.getOrThrow<string>("JWT_SECRET"),
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [AuthorizationService],
      exports: [AuthorizationService],
    };
  }
}
