import * as React from 'react';
import { colors } from '../config/colors';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { commonStyles } from '../config/styles';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const TopBar = ({ homeScreenMode, returnButtonFunction }) => {
  const imageScale = 0.17;
  const lifeAndCoinsSize = 25;

  const user = useSelector((state) => state.user);

  homeScreenMode = true;

  const borderRadius = () => {
    return Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2;
  };

  const LifeAndCoins = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingTop: '3%',
          justifyContent: 'space-around',
        }}
      >
        <View flexDirection="row">
          <MaterialIcons name="stars" size={lifeAndCoinsSize} color="yellow" />
          <Text style={{ fontSize: 18 }}> {user.lifes}</Text>
        </View>

        <View flexDirection="row">
          <Ionicons name="heart" size={lifeAndCoinsSize} color={colors.INCORRECT_COLOR} />
          <Text style={{ fontSize: 18 }}> {user.coins}</Text>
        </View>
      </View>
    );
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
      {homeScreenMode && (
        <View style={{ marginLeft: '3%' }}>
          <ProfileImage />
        </View>
      )}

      {homeScreenMode ? (
        <View>
          <Text style={styles.primaryText}>IdiomaPlay</Text>
          <LifeAndCoins />
        </View>
      ) : (
        <View>
          <Text style={styles.primaryText}>Unidad {1}</Text>
          <Text style={styles.secondaryText}>Leccion {2}</Text>
        </View>
      )}

      <View style={{ marginRight: '3%' }}>
        <TouchableOpacity onPress={returnButtonFunction}>
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
