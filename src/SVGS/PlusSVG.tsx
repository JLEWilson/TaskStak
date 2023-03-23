import * as React from "react"
import Svg, { SvgProps, Mask, Path } from "react-native-svg"

const PlusSVG = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" {...props}>
    <Mask id="a" fill="#fff">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.607 10.107a7.5 7.5 0 0 0 0 15h2.5v2.5a7.5 7.5 0 0 0 15 0v-2.5h2.5a7.5 7.5 0 0 0 0-15h-2.5v-2.5a7.5 7.5 0 0 0-15 0v2.5h-2.5Z"
      />
    </Mask>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.607 10.107a7.5 7.5 0 0 0 0 15h2.5v2.5a7.5 7.5 0 0 0 15 0v-2.5h2.5a7.5 7.5 0 0 0 0-15h-2.5v-2.5a7.5 7.5 0 0 0-15 0v2.5h-2.5Z"
      fill={props.fill}
    />
    <Path
      d="M.107 17.607h-1 1Zm7.5-7.5v-1 1Zm0 15v-1 1Zm2.5 0h1v-1h-1v1Zm0 2.5h-1 1Zm7.5 7.5v1-1Zm7.5-10v-1h-1v1h1Zm0-15h-1v1h1v-1Zm-15-2.5h1-1Zm0 2.5v1h1v-1h-1Zm-9 7.5a6.5 6.5 0 0 1 6.5-6.5v-2a8.5 8.5 0 0 0-8.5 8.5h2Zm6.5 6.5a6.5 6.5 0 0 1-6.5-6.5h-2a8.5 8.5 0 0 0 8.5 8.5v-2Zm2.5 0h-2.5v2h2.5v-2Zm1 3.5v-2.5h-2v2.5h2Zm6.5 6.5a6.5 6.5 0 0 1-6.5-6.5h-2a8.5 8.5 0 0 0 8.5 8.5v-2Zm6.5-6.5a6.5 6.5 0 0 1-6.5 6.5v2a8.5 8.5 0 0 0 8.5-8.5h-2Zm0-2.5v2.5h2v-2.5h-2Zm3.5-1h-2.5v2h2.5v-2Zm6.5-6.5a6.5 6.5 0 0 1-6.5 6.5v2a8.5 8.5 0 0 0 8.5-8.5h-2Zm-6.5-6.5a6.5 6.5 0 0 1 6.5 6.5h2a8.5 8.5 0 0 0-8.5-8.5v2Zm-2.5 0h2.5v-2h-2.5v2Zm-1-3.5v2.5h2v-2.5h-2Zm-6.5-6.5a6.5 6.5 0 0 1 6.5 6.5h2a8.5 8.5 0 0 0-8.5-8.5v2Zm-6.5 6.5a6.5 6.5 0 0 1 6.5-6.5v-2a8.5 8.5 0 0 0-8.5 8.5h2Zm0 2.5v-2.5h-2v2.5h2Zm-3.5 1h2.5v-2h-2.5v2Z"
      fill="#000"
    />
  </Svg>
)

export default PlusSVG
