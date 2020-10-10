import { applySnapshot, flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { TrackModel } from "../track"
import { withEnvironment, withStatus } from ".."

/**
 * Model description here for TypeScript hints.
 */
export const PlaylistModel = types
  .model("Playlist")
  .props({
    id: types.identifier,
    name: types.string,
    description: types.string,
    imageUrl: types.string,
    trackCount: types.number,
    tracks: types.array(TrackModel)
  })
  .extend(withEnvironment)
  .extend(withStatus)
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    getTracks: flow(function * (accessToken: string) {
      self.status = "pending"
      try {
        const result = yield self.environment.api.getPlaylistTracks(accessToken, self.id)
        console.log("result", result)
        applySnapshot(self.tracks, result)
        self.status = "done"
        return true
      } catch (e) {
        self.status = "error"
        console.log(`error while trying to get playlist tracks`, JSON.stringify(e))
      }
      return false
    })
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type PlaylistType = Instance<typeof PlaylistModel>
export interface Playlist extends PlaylistType {}
type PlaylistSnapshotType = SnapshotOut<typeof PlaylistModel>
export interface PlaylistSnapshot extends PlaylistSnapshotType {}
