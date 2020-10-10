import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from ".."

/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
  .model("User")
  .props({
    accessToken: types.optional(types.string, ""),
    refreshToken: types.optional(types.string, "")
  })
  .extend(withEnvironment)
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    refreshAuthorization: flow(function * () {
      try {
        const result = yield self.environment.authHandler.refreshLogin(self.refreshToken)
        self.accessToken = result.accessToken
        self.refreshToken = result.refreshToken
        return true
      } catch (e) {
        __DEV__ && console.tron.error(`error while trying to refresh the auth`, JSON.stringify(e))
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

type UserType = Instance<typeof UserModel>
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>
export interface UserSnapshot extends UserSnapshotType {}
