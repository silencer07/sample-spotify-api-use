import * as React from "react"
import { Avatar, ListItem, Spinner, Text } from "@ui-kitten/components"
import { StyleSheet } from "react-native"
import { Playlist } from "../../models/playlist"

const styles = StyleSheet.create({
  name: { marginLeft: 5 },
  trackCount: { backgroundColor: "lightgray" }
})

export interface PlaylistItemProps {
  item: Playlist
  onPress?: () => void
  showSpinner?: boolean
}

export const PlaylistItem: React.FC<PlaylistItemProps> = ({ item, onPress, showSpinner }) => {
  return (
    <ListItem
      title={() => <Text category="label" style={styles.name}>
        {item.name}{' '}<Text category="label" style={styles.trackCount}>{' '}{item.trackCount}{' songs '}</Text>
      </Text>}
      description={item.description}
      accessoryLeft={() => <Avatar size='giant' source={{ uri: item.imageUrl }}/>}
      onPress={onPress}
      accessoryRight={() => showSpinner ? <Spinner /> : null}
    />
  )
}
