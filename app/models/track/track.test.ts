import { TrackModel, Track } from "./track"

test("can be created", () => {
  const instance: Track = TrackModel.create({
    id: "12345",
    name: "test name",
    imageUrl: "some/url",
    album: "some album",
    durationMs: 1000,
    popularity: 100
  })

  expect(instance).toBeTruthy()
})
