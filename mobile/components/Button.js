import * as React from 'react';
import { colors } from '../config/colors';
import { commonStyles } from '../config/styles';
import { TouchableOpacity } from 'react-native';
import { Text, StyleSheet } from 'react-native';

export const PrimaryButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={[styles.button, commonStyles.shadow]} onPress={onPress}>
      <Text style={{ fontSize: 15 }}>{text}</Text>
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
    backgroundColor: colors.PRIMARY_BUTTON_COLOR,
  },
});
