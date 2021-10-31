import * as React from 'react';
import { colors } from '../config/colors';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const LifeAndCoins = ({ user, vertical }) => {
  const lifeAndCoinsSize = 25;

  const LifeAndCoinsHorizontal = () => (
    <View
      style={{
        flexDirection: 'row',
        paddingTop: '3%',
        justifyContent: 'space-around',
      }}
    >
      <View flexDirection="row">
        <MaterialIcons name="stars" size={lifeAndCoinsSize} color="yellow" />
        <Text style={{ fontSize: 18 }}> {user.coins}</Text>
      </View>

      <View flexDirection="row">
        <Ionicons name="heart" size={lifeAndCoinsSize} color={colors.INCORRECT_COLOR} />
        <Text style={{ fontSize: 18 }}> {user.lifes}</Text>
      </View>
    </View>
  );

  const LifeAndCoinsVertical = () => (
    <View
      style={{
        paddingTop: '3%',
        justifyContent: 'space-around',
      }}
    >
      <View flexDirection="row">
        <MaterialIcons name="stars" size={lifeAndCoinsSize} color="yellow" />
        <Text style={{ fontSize: 18 }}> {user.coins}</Text>
      </View>

      <View flexDirection="row">
        <Ionicons name="heart" size={lifeAndCoinsSize} color={colors.INCORRECT_COLOR} />
        <Text style={{ fontSize: 18 }}> {user.lifes}</Text>
      </View>
    </View>
  );

  return vertical ? <LifeAndCoinsVertical /> : <LifeAndCoinsHorizontal />;
};
