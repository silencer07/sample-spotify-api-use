import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const PlaylistModel = types
  .model("Playlist")
  .props({
    id: types.string,
    name: types.string,
    description: types.string,
    imageUrl: types.string
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

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
