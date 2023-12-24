import { DataSource } from 'typeorm'

export const config = new DataSource({
    migrationsTableName: 'migrations',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'recycle-bud',
    password: 'password',
    database: 'recycle-bud',
    logging: false,
    synchronize: true,
    dropSchema: false,
    name: 'default',
    schema: 'public',
    entities: ['src/database/entities/**/*.{ts,js}'],
    migrations: ['src/database/migrations/**/*.{ts,js}'],
    //subscribers: ['src/subscriber/**/*{.ts,.js}'],
});