import { TrackModel, Track } from "./track"

test("can be created", () => {
  const instance: Track = TrackModel.create({})

  expect(instance).toBeTruthy()
})
