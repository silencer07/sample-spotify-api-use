import { applySnapshot, flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserModel } from "../user"
import { PlaylistModel } from "../playlist"
import { withEnvironment } from ".."

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  user: types.maybeNull(UserModel),
  playlist: types.array(PlaylistModel)
}).extend(withEnvironment)
  .views(self => ({
    findPlaylistById: function(id: string) {
      return self.playlist.find(i => i.id === id)
    }
  })).actions(self => ({
    login: flow(function * () {
      try {
        const result = yield self.environment.authHandler.onLogin()
        self.user = UserModel.create({
          accessToken: result.accessToken,
          refreshToken: result.refreshToken
        })
        return true
      } catch (e) {
        __DEV__ && console.tron.error(`error while trying to authorize the app`, JSON.stringify(e))
      }
      return false
    }),
    getPlaylist: flow(function * () {
      try {
        const refreshTokenSuccess = self.user.refreshAuthorization()
        if (refreshTokenSuccess) {
          const result = yield self.environment.api.getPlaylist(self.user.accessToken)
          // console.log("result", result)
          applySnapshot(self.playlist, result)
          return true
        }
      } catch (e) {
        // console.log(`error while trying to get playlists`, JSON.stringify(e))
      }
      return false
    })
  }))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
