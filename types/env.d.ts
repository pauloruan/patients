declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string
    DIRECT_URL: string
    AUTH_SECRET: string
    AUTH_GOOGLE_ID: string
    AUTH_GOOGLE_SECRET: string
    URL: string
    API_URL: string
  }
}
