# react-native-search-bar-button
🕊️ Is it a bird? ✈️ Is it a plane? No, it's a search-bar-button! ⚛️

## 🚀 Getting Started

Using [**Yarn**](https://yarnpkg.com):

```
yarn add react-native-search-bar-button
```

Using [**NPM**](https://npmjs.com):

```
npm i -s react-native-search-bar-button
```

## ✍️ Example

In the example below, we demonstrate all of the configurable properties of the [`<SearchBarButton />`](https://github.com/cawfree/react-native-search-bar-button/blob/main/src/components/SearchBarButton.js). Most notably, you can render a custom button component using [`renderButton`](https://github.com/cawfree/react-native-search-bar-button/blob/d50dccb4907ce3736bdc6932c8cd0d63bf8da8d8/src/components/SearchBarButton.js#L128) and declare complete control over the behaviour of the [`<TextInput />`](https://reactnative.dev/docs/textinput) using `textInputProps`.

```javascript
import React, { useCallback, useState } from "react";
import { SafeAreaView, StyleSheet, Easing, TouchableOpacity, View, Animated } from "react-native";
import { useWindowDimensions } from "react-native-use-dimensions";

import { SearchBarButton } from "react-native-search-bar-button";

export default function App() {
  const [value, onChangeText] = useState("");
  const [open, setOpen] = useState(false);
  const { width } = useWindowDimensions();
  const padding = 15;
  const height = 55;
  const renderButton = useCallback(
    ({ open, onChangeText, value, progress }) => (
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "red",
        }}
        onPress={() => setOpen(!open)}
      >
        <Animated.Image
          style={{
            transform: [
              { rotate: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "360deg"],
              })},
            ],
            width: height,
            height,
          }}
          source={{ uri: "https://is3-ssl.mzstatic.com/image/thumb/Purple123/v4/97/74/dd/9774ddab-bfac-f412-9992-6715178c5b67/source/256x256bb.jpg" }}
        />
      </TouchableOpacity>
    ),
    [setOpen, height],
  );
  const onSubmitEditing = useCallback(
    ({ nativeEvent: { text } }) => {
      console.warn({ text });
      onChangeText("");
      setOpen(false);
    },
    [onChangeText, setOpen],
  );
  return (
    <>
      <SafeAreaView />
      <SearchBarButton
        style={{
          marginHorizontal: padding,
          backgroundColor: "#355BCF",
        }}
        width={width - 2 * padding}
        height={height}
        open={open}
        value={value}
        onChangeText={onChangeText}
        renderButton={renderButton}
        textInputProps={{
          placeholderTextColor: "#FFFFFF99",
          placeholder: "What are you looking for?",
          onSubmitEditing,
          style: {
            fontSize: 20,
            color: "#FFFFFF",
          },
        }}
        animationProps={{
          easing: Easing.ease,
          duration: 400,
        }}
      />
    </>
  );
}
```

## ✌️ License
[**MIT**](./LICENSE)
