import { PlaylistModel, Playlist } from "./playlist"

test("can be created", () => {
  const instance: Playlist = PlaylistModel.create({})

  expect(instance).toBeTruthy()
})