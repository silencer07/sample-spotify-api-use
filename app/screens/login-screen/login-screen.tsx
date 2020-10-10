import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { CommonActions, useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { Layout, Button } from "@ui-kitten/components"
import { Alert, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  root: { alignItems: 'center', flex: 1, justifyContent: 'center' }
})

export const LoginScreen = observer(function LoginScreen() {
  // Pull in one of our MST stores
  const { user, login } = useStores()
  const navigation = useNavigation()

  useEffect(() => {
    if (user) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'playlist' }],
        })
      )
    }
  }, [navigation, user])

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <Layout style={styles.root}>
      <Button onPress={async () => {
        const success = await login()
        if (success) {
          navigation.navigate("playlist")
        } else {
          Alert.alert("Login failed", "Please make sure that your username and password is correct.")
        }
      }}>
        LOGIN
      </Button>
    </Layout>
  )
})
