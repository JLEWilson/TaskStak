import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const EditSVG = (props: SvgProps) => (
  <Svg width={154} height={110} xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="m130.843 39.468-.003.002-99.97 66.315c-.452.299-.966.49-1.504.557l-24.783 3.083c-2.883.358-4.923-2.749-3.447-5.251l12.63-21.42a3.5 3.5 0 0 1 1.083-1.141l100.053-66.224 20.404-13.505a3.5 3.5 0 0 1 4.851.987l12.164 18.379a3.5 3.5 0 0 1-1.006 4.863l-20.472 13.355Z"
      fill={props.fill}
      stroke={props.stroke}
    />
  </Svg>
)

export default EditSVG
