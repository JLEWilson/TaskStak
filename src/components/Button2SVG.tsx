import React from "react"
import { SvgXml } from "react-native-svg"
import { View, TouchableOpacity } from "react-native"
import type { SVGButtonProps } from "../utils"

const Button2SVG = (props: SVGButtonProps) => {
  const xml = `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${props.width}"
      height="${props.height}"
      version="1.1"
      viewBox="0 0 82.524 36.204"
    >
      <g transform="translate(-63.996 -99.823)">
        <path
          fill="${props.fill}"
          fillOpacity="${props.opacity}"
          strokeWidth="${props.strokeWidth}"
          d="M71.677 106.097c9.613-8.95 61.127-8.084 69.194 1.064 8.067 9.149 6.641 16.013 1.064 23.42-5.576 7.406-64.45 6.758-72.387 1.064-7.936-5.694-7.483-16.598 2.13-25.548z"
          paintOrder="stroke fill markers"
        ></path>
      </g>
    </svg>
          `

  return (
    <TouchableOpacity onPress={() => props.onPress(props.task)}>
      <View
        style={{
          height: props.height,
          width: props.width,
          zIndex: -1,
          ...props.margin,
          ...props.position,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SvgXml xml={xml} />
        {props.children}
      </View>
    </TouchableOpacity>
  )
}

export default Button2SVG
