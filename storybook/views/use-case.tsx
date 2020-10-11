import * as React from "react"
import * as eva from "@eva-design/eva"
import { ApplicationProvider, Text } from "@ui-kitten/components"

export interface UseCaseProps {
  /** The title. */
  text: string
  /** When should we be using this? */
  usage: string
  /** The component use case. */
  children: React.ReactNode
}

export function UseCase(props: UseCaseProps) {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Text category="h3">Use Case: {props.text}</Text>
      <Text>Usage: {props.usage}</Text>
      {props.children}
    </ApplicationProvider>
  )
}
