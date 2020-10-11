import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { PlaylistItem } from "./playlist-item"
import { Playlist } from "../../models/playlist"

// @ts-ignore
const mockPlaylist: Playlist = {
  id: "12345",
  description: "Test playlist description",
  name: "Test playlist",
  imageUrl: "https://picsum.photos/200/300",
  trackCount: 20
}

storiesOf("PlaylistItem", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Simple playlist item", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <PlaylistItem item={mockPlaylist} />
      </UseCase>
    </Story>
  ))
