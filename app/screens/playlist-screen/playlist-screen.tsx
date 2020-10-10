import React from "react"
import { observer } from "mobx-react-lite"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { Layout, Text } from "@ui-kitten/components"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  root: { alignItems: 'center', flex: 1, justifyContent: 'center' }
})

export const PlaylistScreen = observer(function PlaylistScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <Layout style={styles.root}>
      <Text category='h1'>HOME</Text>
    </Layout>
  )
})
