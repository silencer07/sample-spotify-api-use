import { ArtistModel, Artist } from "./artist"

test("can be created", () => {
  const instance: Artist = ArtistModel.create({})

  expect(instance).toBeTruthy()
})