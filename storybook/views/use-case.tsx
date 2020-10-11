import * as React from "react"
import { Divider, ListItem } from "@ui-kitten/components"
import { StyleSheet, View } from "react-native"

export interface UseCaseProps {
  /** The title. */
  text: string
  /** When should we be using this? */
  usage: string
  /** The component use case. */
  children: React.ReactNode
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  listItem: { paddingBottom: 0 }
})

export function UseCase(props: UseCaseProps) {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={styles.container}>
      <Divider/>
      <ListItem title={`Use Case: ${props.text}`} description={props.usage} style={styles.listItem} />
      {props.children}
      <Divider/>
    </View>
  )
}
