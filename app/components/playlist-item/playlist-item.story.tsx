import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { PlaylistItem } from "./playlist-item"
import { PlaylistModel } from "../../models/playlist"

storiesOf("PlaylistItem", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Simple playlist item", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <PlaylistItem item={PlaylistModel.create({
          id: "12345",
          description: "Test playlist description",
          name: "Test playlist",
          imageUrl: "https://picsum.photos/200/300",
          trackCount: 20
        })} />
      </UseCase>
    </Story>
  ))
