import React from 'react'
import {
  Pressable,
  Text,
  type ViewStyle,
  StyleSheet,
  type TextStyle,
  type Insets,
  type StyleProp,
} from 'react-native'

type ContentProps = {
  text: string
  textStyle?: StyleProp<TextStyle>
}
type Props = ContentProps & {
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  inactive?: boolean
  accessibilityLabel?: string
  hitSlop?: Insets
}
type ComponentProps = Props & {}

const Component: React.FC<ComponentProps> = ({
  text,
  onPress,
  style,
  textStyle,
  inactive,
  accessibilityLabel,
  hitSlop,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        style,
        !!onPress && pressed && styles.pressed,
        inactive && styles.inactive,
      ]}
      onPress={() => !inactive && onPress?.()}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      hitSlop={hitSlop}
    >
      {!!text && <Text style={[styles.text, textStyle]}>{text}</Text>}
    </Pressable>
  )
}

const Container: React.FC<Props> = (props) => {
  return <Component {...props} />
}

export { Container as Button }

const styles = StyleSheet.create({
  container: {
    opacity: 1.0,
  },
  pressed: {
    opacity: 0.7,
  },
  inactive: {
    opacity: 0.3,
  },
  text: {
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
  },
})
