import * as React from 'react';
import { colors } from '../config/colors';
import { commonStyles } from '../config/styles';
import { TouchableOpacity } from 'react-native';
import { Text, StyleSheet, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export const GoogleButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={[styles.button, commonStyles.shadow]} onPress={onPress}>
      <View style={styles.textContainer}>
        <View style={{ width: '15%' }}>
          <AntDesign name="google" size={30} color={colors.PRIMARY_DARK} />
        </View>
        <View style={{ width: '70%' }}>
          <Text style={styles.text}>{'registrarse con Google'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexGrow: 1,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: '5%',
    justifyContent: 'center',
    backgroundColor: colors.LIGHT_GRAY,
  },

  textContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.PRIMARY_DARK,
  },
});
