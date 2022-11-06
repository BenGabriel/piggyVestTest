import {StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, {FC} from 'react';
import color from '../utils/color';

interface ButtonProps {
  bordered?: boolean;
  click?: () => void;
  text: string;
  disabled?: boolean
}

const Button: FC<ButtonProps> = props => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: props.bordered ? 'transparent' : '#0b60d5',
          borderWidth: props.bordered ? 1 : 0,
        },
      ]}
      onPress={props.click} disabled={props.disabled}>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: color.white,
    height: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  text: {
    color: color.white,
    fontWeight: '600',
  },
});
