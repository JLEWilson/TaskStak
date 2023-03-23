import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const Button1SVG = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="M31.405 23.317c43.036-33.828 217.618-26.53 261.519 4.023 43.901 30.555 33.148 57.838 4.023 88.514-29.125 30.677-246.274 30.908-273.589 4.024-27.315-26.885-34.989-62.733 8.047-96.561Z"
      fill={props.fill}
      stroke={props.stroke}
    />
  </Svg>
)

export default Button1SVG
