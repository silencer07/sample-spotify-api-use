import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { Avatar, Layout, List, ListItem, Spinner, Text } from "@ui-kitten/components"
import { Alert, SafeAreaView, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  full: { flex: 1, width: "100%" },
  name: { marginLeft: 5 },
  root: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  trackCount: { backgroundColor: "lightgray" }
})

export const PlaylistScreen = observer(function PlaylistScreen() {
  const { playlist, getPlaylist, user } = useStores()
  const { refreshAuthorization } = user

  useEffect(() => {
    (async () => {
      const success = await getPlaylist()
      if (!success) {
        Alert.alert("Retrieving of playlist failed", "Please check your internet connection")
      }
    })()
  }, [getPlaylist])
  const [trackLoadingId, setTrackLoadingId] = useState(null)

  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.full}>
      <Layout style={styles.root}>
        <List
          style={styles.full}
          data={playlist}
          extraData={trackLoadingId}
          renderItem={({ item }) => (
            <ListItem
              title={() => <Text category="label" style={styles.name}>
                {item.name}{' '}<Text category="label" style={styles.trackCount}>{' '}{item.trackCount}{' songs '}</Text>
              </Text>}
              description={item.description}
              accessoryLeft={() => <Avatar size='giant' source={{ uri: item.imageUrl }}/>}
              onPress={async () => {
                if (item.tracks.length === 0) {
                  setTrackLoadingId(item.id)
                  const refreshTokenSuccess = await refreshAuthorization()
                  if (refreshTokenSuccess) {
                    const success = await item.getTracks()
                    if (success) {
                      navigation.navigate("tracklist", { id: item.id })
                    } else {
                      Alert.alert("Track retrieval failed", "Please check your internet connection.")
                    }
                  } else {
                    Alert.alert("Refresh token failed", "Please check your internet connection.")
                  }
                  setTrackLoadingId(null)
                } else {
                  navigation.navigate("tracklist", { id: item.id })
                }
              }}
              accessoryRight={() => trackLoadingId === item.id ? <Spinner /> : null}
            />
          )}
        />
      </Layout>
    </SafeAreaView>
  )
})
