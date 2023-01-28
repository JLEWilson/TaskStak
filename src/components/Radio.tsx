import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useTheme } from "@react-navigation/native"
import Icon from "react-native-vector-icons/MaterialIcons"

type RadioProps = {
  category: string
  options: string[]
  checked: number
  setChecked: Function
  setRadioInput: Function
}
const Radio = ({
  category,
  options,
  checked,
  setChecked,
  setRadioInput,
}: RadioProps) => {
  const { colors } = useTheme()

  return (
    <View>
      <Text style={[styles.header, { color: colors.notification }]}>
        {category}
      </Text>
      <View style={styles.radio}>
        {options.map((options, key) => {
          return (
            <View key={options}>
              {checked == key ? (
                <TouchableOpacity style={styles.btn}>
                  <Icon name="radio-button-on" color={colors.text} size={20} />
                  <Text style={[styles.text, { color: colors.text }]}>
                    {options}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setChecked(key)
                    setRadioInput(options[key])
                  }}
                  style={styles.btn}
                >
                  <Icon name="radio-button-off" color={colors.text} size={20} />
                  <Text style={[styles.text, { color: colors.text }]}>
                    {options}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  radio: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  btn: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    width: 90,
  },
  header: {
    fontSize: 17,
    marginLeft: 4,
  },
  text: {
    fontSize: 15,
  },
})

export default Radio
