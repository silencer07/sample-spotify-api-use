import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import { PlaylistSnapshot } from "../../models/playlist"
import { TrackSnapshot } from "../../models/track"
import { ArtistSnapshot } from "../../models/artist"

export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout
    })
  }

  async getPlaylist(accessToken: string): Promise<PlaylistSnapshot[]> {
    this.apisauce.setHeader("Authorization", `Bearer ${accessToken}`)
    const result = await this.apisauce.get("/browse/featured-playlists")
    // console.log("result", JSON.stringify(result))
    const data = result.data as any
    return data.playlists.items.map(i => {
      return {
        id: i.id,
        name: i.name,
        description: i.description,
        imageUrl: i.images[0].url,
        trackCount: i.tracks.total || 0
      } as PlaylistSnapshot
    })
  }

  async getPlaylistTracks(accessToken: string, playlistId: string): Promise<TrackSnapshot[]> {
    const result = await this.apisauce.get(`/playlists/${playlistId}/tracks`)
    // console.log("result", JSON.stringify(result))
    const data = result.data as any
    return data.items.map(i => {
      const artists = i.track.album.artists.map(i => {
        return {
          id: i.id,
          name: i.name
        } as ArtistSnapshot
      })
      const track: TrackSnapshot = {
        id: i.track.album.id,
        name: i.track.name,
        imageUrl: i.track.album.images[0].url,
        album: i.track.album.name,
        durationMs: i.track.duration_ms,
        popularity: i.track.popularity,
        artists: artists
      }
      return track
    })
  }

  /**
   * Gets a list of users.
   */
  async getUsers(): Promise<Types.GetUsersResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertUser = (raw) => {
      return {
        id: raw.id,
        name: raw.name,
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawUsers = response.data
      const resultUsers: Types.User[] = rawUsers.map(convertUser)
      return { kind: "ok", users: resultUsers }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Gets a single user by ID
   */

  async getUser(id: string): Promise<Types.GetUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultUser: Types.User = {
        id: response.data.id,
        name: response.data.name,
      }
      return { kind: "ok", user: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
