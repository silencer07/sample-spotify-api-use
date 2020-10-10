import React from "react"
import { observer } from "mobx-react-lite"
import { SafeAreaView, StyleSheet, View } from "react-native"
import { Avatar, Layout, List, ListItem, Text } from "@ui-kitten/components"
import { useRoute } from "@react-navigation/native"
import { useStores } from "../../models"
import { Rating } from "react-native-ratings"

const styles = StyleSheet.create({
  full: { flex: 1, width: "100%" },
  fullWidth: { width: "100%" },
  rating: { width: 50 },
  root: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  trackItem: { marginLeft: 10, width: "100%" }
})

export const TracklistScreen = observer(function TracklistScreen() {
  // Pull in one of our MST stores
  const { findPlaylistById } = useStores()
  const route = useRoute() as any

  const playlist = findPlaylistById(route.params.id)
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.full}>
      <Layout style={styles.root}>
        <List
          style={styles.full}
          data={playlist.tracks}
          extraData={playlist.tracks.length}
          renderItem={({ item }) => (
            <ListItem
              title={item.name}
              description={() => (
                <View style={styles.trackItem}>
                  <Text style={styles.fullWidth}>{item.artistsNames}</Text>
                  <Rating
                    style={styles.rating}
                    startingValue={item.popularity / 20}
                    showRating={false}
                    readonly={true}
                    imageSize={10}
                  />
                </View>
              )}
              accessoryLeft={() => <Avatar size='giant' source={{ uri: item.imageUrl }}/>}
            />
          )}
        />
      </Layout>
    </SafeAreaView>
  )
})
