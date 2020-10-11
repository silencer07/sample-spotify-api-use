import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ArtistModel } from "../artist"

/**
 * Model description here for TypeScript hints.
 */
export const TrackModel = types
  .model("Track")
  .props({
    id: types.identifier,
    name: types.string,
    imageUrl: types.string,
    popularity: types.number,
    album: types.string,
    durationMs: types.number,
    artists: types.array(ArtistModel)
  })
  .views(self => ({
    get artistsNames() {
      return self.artists.map(i => i.name).join(", ")
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type TrackType = Instance<typeof TrackModel>
export interface Track extends TrackType {}
type TrackSnapshotType = SnapshotOut<typeof TrackModel>
export interface TrackSnapshot extends TrackSnapshotType {}
