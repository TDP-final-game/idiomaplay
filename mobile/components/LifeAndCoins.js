import * as React from 'react';
import { colors } from '../config/colors';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const LifeAndCoins = ({ coins, lifes, vertical, earned, fontSize, iconSize }) => {
  const defaultIconSize = 25;
  const defaultFontSize = 18;

  const LifeAndCoinsHorizontal = () => (
    <View
      style={{
        flexDirection: 'row',
        paddingTop: '3%',
        justifyContent: 'space-around',
      }}
    >
      <View flexDirection="row">
        <MaterialIcons name="stars" size={iconSize ?? defaultIconSize} color="yellow" />
        <Text
          style={{
            fontSize: fontSize ?? defaultFontSize,
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          {' '}
          {earned ? '+' : ''}
          {coins}
        </Text>
      </View>

      <View flexDirection="row">
        <Ionicons name="heart" size={iconSize ?? defaultIconSize} color={colors.INCORRECT_COLOR} />
        <Text
          style={{
            fontSize: fontSize ?? defaultFontSize,
            fontWeight: 'bold',
            color: '#555555',
          }}
        >
          {' '}
          {earned ? '+' : ''}
          {lifes}
        </Text>
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
        <MaterialIcons name="stars" size={iconSize ?? defaultIconSize} color="yellow" />
        <Text
          style={{
            fontSize: fontSize ?? defaultFontSize,
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          {' '}
          {earned ? '+' : ''}
          {coins}
        </Text>
      </View>

      <View flexDirection="row">
        <Ionicons name="heart" size={iconSize ?? defaultIconSize} color={colors.INCORRECT_COLOR} />
        <Text
          style={{
            fontSize: fontSize ?? defaultFontSize,
            fontWeight: 'bold',
            color: '#555555',
          }}
        >
          {' '}
          {earned ? '+' : ''}
          {lifes}
        </Text>
      </View>
    </View>
  );

  return vertical ? <LifeAndCoinsVertical /> : <LifeAndCoinsHorizontal />;
};
