import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const DivSVG = (props: SvgProps) => (
  <Svg
    width={528}
    height={353}
    fill={props.fill}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M41.45 36.094c88.163-24.023 399.934-60.221 454.641-9.388 72.415 58.257-9.719 160.272 17.603 213.233 28.489 49.936 2.066 90.627-39.061 101.931-41.127 11.304-368.662 13.223-422.454 5.364-53.792-7.858-63.233-47.544-37.424-104.151 25.809-56.606 21.406-54.249-2.139-105.064-23.544-50.814-.502-93.931 28.834-101.925Z"
      fill={props.fill}
      stroke={props.stroke}
    />
  </Svg>
)

export default DivSVG
