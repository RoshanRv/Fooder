declare namespace NodeJS {
    interface ProcessEnv {
      readonly SESSION_SECRET: string
      readonly COOKIE_SECRET: string
      readonly DB_HOST: string
      readonly DB_PORT: string
      readonly DB_USER: string
      readonly DB_PASS: string
      readonly DB_NAME: string
      readonly ADMIN_TOKEN: string
    }
  }