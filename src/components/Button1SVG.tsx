import React from "react"
import { SvgXml } from "react-native-svg"
import { View, TouchableOpacity } from "react-native"
import type { SVGButtonProps } from "../utils"

const Button1SVG = (props: SVGButtonProps) => {
  const xml = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="${props.width}"
    height="${props.height}"
    version="1.1"
    viewBox="0 0 85.031 36.64"
    >
      <g transform="translate(-63.633 -100.192)">
      <path
      fill="${props.fill}"
      fillOpacity="${props.opacity}"
      strokeWidth="${props.strokeWidth}"
      d="M71.677 106.097c11.387-8.95 57.578-7.02 69.194 1.064 11.615 8.084 8.77 15.303 1.064 23.42-7.706 8.116-65.16 8.177-72.387 1.064-7.227-7.113-9.257-16.598 2.13-25.548z"
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

export default Button1SVG
