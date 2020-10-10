// Use this import if you want to use "env.js" file
const { API_URL, AUTH_URL, TOKEN_URL, API_CLIENT_ID, API_SECRET } = require("../../config/env")

/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string
  authUrl: string
  tokenUrl: string
  clientId: string
  secret: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: API_URL,
  authUrl: AUTH_URL,
  tokenUrl: TOKEN_URL,
  clientId: API_CLIENT_ID,
  secret: API_SECRET,
  timeout: 10000,
}
