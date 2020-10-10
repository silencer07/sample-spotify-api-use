import React from "react"
import { observer } from "mobx-react-lite"
import { SafeAreaView, StyleSheet } from "react-native"
import { Avatar, Layout, ListItem, Text } from "@ui-kitten/components"
import { useRoute } from "@react-navigation/native"
import { useStores } from "../../models"
import { Rating } from "react-native-ratings"
import { DateTime } from "luxon"

const styles = StyleSheet.create({
  full: { flex: 1, width: "100%" },
  fullWidth: { width: "100%" },
  root: { alignItems: 'center', flex: 1, padding: 10 },
})

export const TrackDetailsScreen = observer(function TracklistScreen() {
  // Pull in one of our MST stores
  const { findPlaylistById } = useStores()
  const route = useRoute() as any

  const playlist = findPlaylistById(route.params.playlistId)
  const track = playlist.findTrackById(route.params.trackId)
  return (
    <SafeAreaView style={styles.full}>
      <Layout style={styles.root}>
        <Text category="h4" style={{ textAlign: "center" }}>{track.name}</Text>
        <ListItem
          title={track.album}
          description={DateTime.fromMillis(track.durationMs).toFormat("mm:ss")}
          accessoryLeft={() => <Avatar size='giant' source={{ uri: track.imageUrl }}/>}
          accessoryRight={() => <Rating
            startingValue={track.popularity / 20}
            showRating={false}
            readonly={true}
            imageSize={13}
          />}
        />
        <Text style={styles.fullWidth}>Artists: {track.artistsNames}</Text>
      </Layout>
    </SafeAreaView>
  )
})
