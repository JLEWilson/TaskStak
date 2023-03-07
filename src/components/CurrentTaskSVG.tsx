import React from "react"
import { SvgXml } from "react-native-svg"
import { View } from "react-native"
import type { SVGProps } from "../utils"

const CurrentTaskSVG = (props: SVGProps) => {
  const xml = `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${props.height}"
      height="${props.height}"
      version="1.1"
      viewBox="0 0 139.114 92.868"
    >
      <g transform="translate(-29.04 -37.553)">
        <path
          fill="${props.fill}"
          fillOpacity="${props.opacity}"
          strokeWidth="${props.strokeWidth}"
          d="M39.742 46.839c23.326-6.356 105.816-15.934 120.29-2.484 19.16 15.414-2.571 42.405 4.658 56.418 7.538 13.212.546 23.978-10.335 26.969-10.882 2.99-97.542 3.499-111.774 1.42-14.233-2.08-16.73-12.58-9.902-27.557 6.828-14.978 5.663-14.354-.566-27.799-6.23-13.444-.133-24.852 7.629-26.967z"
          paintOrder="stroke fill markers"
        ></path>
      </g>
    </svg>`
  return (
    <View
      style={{
        position: "absolute",
        zIndex: -1,
        ...props.position,
      }}
    >
      <SvgXml xml={xml} />
    </View>
  )
}

export default CurrentTaskSVG
