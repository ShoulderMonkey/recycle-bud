export const configuration = () => ({
    db: {
      type: process.env.DATABASE_TYPE,
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      schema: process.env.DATABASE_SCHEMA,
      dropSchema: false,
      logging: false,
      synchronize: true,
      migrationsRun:false
    },
    auth: {
      secret: process.env.JWT_SECRET
    }
})