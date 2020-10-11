import { UserModel, User } from "./"

test("can be created", () => {
  const instance: User = UserModel.create({
    accessToken: "accessToken",
    refreshToken: "refreshToken"
  })

  expect(instance).toBeTruthy()
})
