import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { Avatar, Layout, ListItem } from "@ui-kitten/components"
import { Alert, FlatList, SafeAreaView, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  full: { flex: 1, width: "100%" },
  root: { alignItems: 'center', flex: 1, justifyContent: 'center' }
})

export const PlaylistScreen = observer(function PlaylistScreen() {
  const { playlist, getPlaylist } = useStores()

  useEffect(() => {
    (async () => {
      const success = await getPlaylist()
      if (!success) {
        Alert.alert("Retrieving of playlist failed", "Please check your internet connection")
      }
    })()
  }, [getPlaylist])

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.full}>
      <Layout style={styles.root}>
        <FlatList
          style={styles.full}
          data={playlist}
          extraData={playlist.length}
          renderItem={({ item }) => (
            <ListItem
              title={item.name}
              description={item.description}
              accessoryLeft={() => <Avatar size='giant' source={{ uri: item.imageUrl }}/>}
            />
          )}
        />
      </Layout>
    </SafeAreaView>
  )
})
