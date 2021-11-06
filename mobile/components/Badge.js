import * as React from 'react';
import { Text, StyleSheet } from 'react-native';

export const Badge = ({ text, color, textColor, fontSize }) => {
  return (
    <Text
      style={{
        ...styles.badge,
        backgroundColor: color,
        color: textColor,
        fontSize: fontSize,
      }}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 30,
    textAlign: 'center',
    paddingHorizontal: '15%',
    paddingVertical: '5%',
    fontWeight: 'bold',
  },
});
