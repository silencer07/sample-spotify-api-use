import { PlaylistModel, Playlist } from "./"

test("can be created", () => {
  const instance: Playlist = PlaylistModel.create({
    id: "12345",
    description: "Test playlist description",
    name: "Test playlist",
    imageUrl: "https://picsum.photos/200/300",
    trackCount: 20,
  })

  expect(instance).toBeTruthy()
})
