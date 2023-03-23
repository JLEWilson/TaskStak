import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const Button2SVG = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="M30.03 24.713C66.36-9.115 261.06-5.84 291.55 28.738c30.49 34.577 25.102 60.52 4.023 88.514-21.078 27.994-243.592 25.544-273.589 4.023-29.997-21.52-28.283-62.732 8.047-96.56Z"
      fill={props.fill}
      stroke={props.stroke}
    />
  </Svg>
)

export default Button2SVG
