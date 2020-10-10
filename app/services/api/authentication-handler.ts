import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import { authorize, AuthorizeResult, refresh } from "react-native-app-auth"

export class AuthenticationHandler {
  config: ApiConfig
  spotifyAuthConfig: any

  async setup() {
    this.spotifyAuthConfig = {
      clientId: this.config.clientId,
      clientSecret: this.config.secret,
      redirectUrl: 'com.knowledgebrewery.samplespotifyapiuse:/oauth',
      scopes: [], // no scope because we are reading generic recommendations per country
      serviceConfiguration: {
        authorizationEndpoint: this.config.authUrl,
        tokenEndpoint: this.config.tokenUrl,
      },
    }
  }

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  async onLogin(): Promise<AuthorizeResult> {
    const result = await authorize(this.spotifyAuthConfig)
    __DEV__ && console.tron.logImportant(result)
    return result
  }

  async refreshLogin(refreshToken) {
    return await refresh(this.spotifyAuthConfig, {
      refreshToken: refreshToken,
    })
  }
}
