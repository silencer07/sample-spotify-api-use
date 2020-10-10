import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserModel } from "../user"
import { withEnvironment } from ".."

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  user: types.maybeNull(UserModel)
}).extend(withEnvironment)
  .actions(self => ({
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
