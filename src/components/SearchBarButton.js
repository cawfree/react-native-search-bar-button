import React, {
  useRef,
  useState,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import {
  Animated,
  View,
  StyleSheet,
  Platform,
  TextInput,
} from "react-native";

const styles = StyleSheet.create({
  absolute: { position: "absolute" },
  background: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  button: { position: "absolute" },
  container: {},
  hidden: { overflow: "hidden" },
});

function SearchBarButton({
  style,
  width,
  height,
  open,
  value,
  onChangeText,
  textInputProps,
  renderButton,
  animationProps,
}) {
  const ref = useRef();
  const { backgroundColor, ...extraStyles } = StyleSheet.flatten(style);
  const [progress] = useState(() => new Animated.Value(0));
  useEffect(
    () => {
      !open && ref.current.blur();

      Animated.timing(
        progress,
        {
          ...animationProps,
          useNativeDriver: Platform.OS !== "web",
          toValue: open ? 1 : 0,
        },
      ).start(() => open && ref.current.focus());
    },
    [width, progress, open, ref, animationProps],
  );
  const borderRadius = height * 0.5;
  const dx = width - height;
  const { style: textInputExtraStyles, ...extraTextInputProps } = textInputProps;
  const delegatedProps = { open, progress, onChangeText, value };
  return (
    <View
      pointerEvents="box-none"
      key={width}
      style={[
        styles.container,
        extraStyles,
        styles.hidden,
        {
          width,
          height,
          borderRadius,
        },
      ]}
    >
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View
          style={[
            styles.background,
            styles.hidden,
            {
              width: height,
              height,
              borderRadius,
              backgroundColor,
            },
          ]}
        />
      </View>
      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.absolute,
          {
            width: dx,
            height,
            transform: [{ translateX: Animated.add(((height * 0.5) - dx), Animated.multiply(progress, dx)) }],
            backgroundColor,
          },
        ]}
      >
        <TextInput
          editable={open}
          {...extraTextInputProps}
          pointerEvents={open ? "auto": "none"}
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          style={[
            StyleSheet.flatten(textInputExtraStyles),
            { width: dx, height },
          ]}
          multiline={false}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.button,
          styles.hidden,
          {
            transform: [{ translateX: Animated.multiply(progress, dx) }],
            backgroundColor,
            borderRadius,
            width: height,
            height,
          },
        ]}
      >
        {renderButton({ ...delegatedProps })}
      </Animated.View>
    </View>
  );
}

SearchBarButton.propTypes = {
  style: PropTypes.any,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  open: PropTypes.bool,
  textInputProps: PropTypes.shape({}),
  renderButton: PropTypes.func,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  animationProps: PropTypes.shape({}),
};

SearchBarButton.defaultProps = {
  style: {
    backgroundColor: "white",
  },
  open: false,
  textInputProps: {},
  renderButton: ({ open, progress, onChangeText, value }) => <React.Fragment />,
  value: "",
  onChangeText: () => undefined,
  animationProps: {},
};

export default SearchBarButton;
