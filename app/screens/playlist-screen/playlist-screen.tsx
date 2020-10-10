import React from "react"
import { observer } from "mobx-react-lite"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { Layout, Text } from "@ui-kitten/components"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  root: { alignItems: 'center', flex: 1, justifyContent: 'center' }
})

export const PlaylistScreen = observer(function PlaylistScreen() {
  const { user } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <Layout style={styles.root}>
      <Text category='h1'>PLAYLIST</Text>
      <Text>access token: {user.accessToken}</Text>
      <Text>refresh token: {user.refreshToken}</Text>
    </Layout>
  )
})
