import * as React from 'react';
import { colors } from '../config/colors';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { LifeAndCoins } from './LifeAndCoins';
import { commonStyles } from '../config/styles';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

export const TopBar = () => {
  const imageScale = 0.17;

  const user = useSelector((state) => state.user);

  const borderRadius = () => {
    return Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2;
  };

  const ProfileImage = () => {
    return (
      <Image
        style={[
          {
            borderRadius: borderRadius(),
            backgroundColor: colors.LIGHT_GRAY,
            borderColor: colors.PRIMARY_DARK,
            borderWidth: 3,
            width: Dimensions.get('window').width * imageScale,
            height: Dimensions.get('window').width * imageScale,
            justifyContent: 'center',
            alignItems: 'center',
          },
          commonStyles.shadow,
        ]}
        source={{ uri: user.imageUrl }}
      />
    );
  };

  return (
    <View style={styles.headerContainer}>
      <View style={{ marginLeft: '3%' }}>
        <ProfileImage />
      </View>

      <View>
        <Text style={styles.primaryText}>IdiomaPlay</Text>
        <LifeAndCoins coins={user.coins} lifes={user.lifes} />
      </View>

      <View style={{ marginRight: '3%' }}>
        <TouchableOpacity onPress={() => console.log('cart')}>
          <Ionicons name="cart" size={50} color={colors.PRIMARY_DARK} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.PRIMARY,
    borderBottomColor: colors.PRIMARY_DARK,
    flexDirection: 'row',
    overflow: 'hidden',
    borderBottomWidth: 3,
  },

  primaryText: {
    textAlign: 'center',
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },

  secondaryText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
