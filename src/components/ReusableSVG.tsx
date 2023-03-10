import React from "react"
import { SvgXml } from "react-native-svg"
import { View, ViewStyle } from "react-native"

export interface SVGProps {
  height: number
  width: number
  fill: string
  opacity: number
  viewBox: `${number} ${number} ${number} ${number}`
  offset: `${number} ${number}`
  d: string
  strokeWidth: number
  containerStyles: ViewStyle
  children?: React.ReactNode
}
const ReusableSVG = (props: SVGProps) => {
  const xml = `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${props.height}"
      height="${props.height}"
      version="1.1"
      viewBox="${props.viewBox.toString()}"
    >
      <g transform="translate(${props.offset})">
        <path
          fill="${props.fill}"
          fillOpacity="${props.opacity}"
          strokeWidth="${props.strokeWidth}"
          d="${props.d}"
        ></path>
      </g>
    </svg>`
  return (
    <View style={props.containerStyles}>
      <SvgXml xml={xml} />
      {props.children}
    </View>
  )
}

export default ReusableSVG
