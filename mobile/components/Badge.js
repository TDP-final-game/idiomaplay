import * as React from 'react';
import { Text, StyleSheet } from 'react-native';

export const Badge = ({ text, color, textColor }) => {
  return <Text style={{ ...styles.badge, backgroundColor: color, color: textColor }}>{text}</Text>;
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 30,
    paddingHorizontal: '15%',
    paddingVertical: '5%',
    fontWeight: 'bold',
  },
});
