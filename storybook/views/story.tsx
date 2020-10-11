import * as React from "react"
import { ScrollView, ViewStyle } from "react-native"
import * as eva from "@eva-design/eva"
import { ApplicationProvider, Layout } from "@ui-kitten/components"

export interface StoryProps {
  children?: React.ReactNode
}

const ROOT: ViewStyle = { flex: 1 }

export function Story(props: StoryProps) {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Layout style={ROOT}>
        <ScrollView>{props.children}</ScrollView>
      </Layout>
    </ApplicationProvider>
  )
}
