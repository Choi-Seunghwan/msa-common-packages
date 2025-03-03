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
          useFactory: async (configService: ConfigService) => {
            const secret = configService.get<string>(
              "JWT_SECRET",
              "default-secret"
            );
            console.log("✅ JwtModule Initialized with Secret:", secret);
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
