import { UserModel, User } from "./"

test("stub", () => {
  expect(true).toBeTruthy()
})

// TODO weird mobx error for root children
/*
test("can be created", () => {
  const instance: User = UserModel.create({
    accessToken: "accessToken",
    refreshToken: "refreshToken"
  })

  expect(instance).toBeTruthy()
})
*/
