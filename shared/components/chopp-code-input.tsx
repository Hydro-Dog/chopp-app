import React, { useRef, Dispatch, SetStateAction } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { TextInput as PaperInput } from "react-native-paper";

type Props = {
  code: string[];
  setCode: Dispatch<SetStateAction<string[]>>;
};

export const ChoppCodeInput = ({ code, setCode }: Props) => {
  const inputRefs = useRef<TextInput[]>([]);

  const handleBackspace = (index: number) => {
    if (inputRefs.current[index - 1]) {
      setTimeout(() => {
        inputRefs.current[index - 1].focus();
      });
    }
  };

  const handleTextChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    if (text && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {code.map((value, index) => (
        <PaperInput
          contentStyle={{ minWidth: "auto" }}
          key={index}
          value={value}
          keyboardType="number-pad"
          mode="outlined"
          onChangeText={(text) => handleTextChange(text, index)}
          style={styles.input}
          maxLength={1}
          ref={(el: TextInput) => (inputRefs.current[index] = el)}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === "Backspace") {
              handleBackspace(index);
            }
          }}
          autoFocus={index === 0}
          returnKeyType="done"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 24,
  },
  input: {
    width: 45,
    height: 45,
    textAlign: "center",
    fontSize: 24,
  },
});
