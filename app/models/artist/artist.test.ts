import { ArtistModel, Artist } from "./artist"

test("can be created", () => {
  const instance: Artist = ArtistModel.create({
    name: "test name",
    id: "12456"
  })

  expect(instance).toBeTruthy()
})
