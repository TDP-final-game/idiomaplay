import * as React from 'react';
import { colors } from '../config/colors';
import { commonStyles } from '../config/styles';
import { TouchableOpacity } from 'react-native';
import { Text, StyleSheet } from 'react-native';

export const PrimaryButton = ({ text, onPress, disabled = false }) => {
  const bgcolor = disabled ? 'grey' : colors.PRIMARY_BUTTON_COLOR;

  return (
    <TouchableOpacity
      style={[styles.button, commonStyles.shadow, { backgroundColor: bgcolor }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexGrow: 1,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: '5%',
    justifyContent: 'center',
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.SECONDARY_LIGHT,
  },
});
