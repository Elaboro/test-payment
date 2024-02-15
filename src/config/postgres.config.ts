import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";

export const getPostgresConfig = (): TypeOrmModuleAsyncOptions => {
  return {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
      type: "postgres",
      host: configService.get("APP_POSTGRES_HOST"),
      port: Number(configService.get("APP_POSTGRES_PORT")),
      username: configService.get("APP_POSTGRES_USERNAME"),
      password: configService.get("APP_POSTGRES_PASSWORD"),
      database: configService.get("APP_POSTGRES_DATABASE"),
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
      entities: [__dirname + "**/*.entity.{.ts,.js}"],
    }),
  }
};
