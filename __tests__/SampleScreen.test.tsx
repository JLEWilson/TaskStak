import React from "react"
import renderer from "react-test-renderer"
import SampleScreen from "../src/screens/SampleScreen"

test("renders correctly", () => {
  const tree = renderer.create(<SampleScreen />).toJSON()
  expect(tree).toMatchSnapshot()
})
