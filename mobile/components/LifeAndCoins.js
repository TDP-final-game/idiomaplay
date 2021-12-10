import * as React from 'react';
import { colors } from '../config/colors';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const LifeAndCoins = ({ coins, lives, trophies, vertical, earned, fontSize, iconSize }) => {
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
      <View style={{ flexDirection: 'row', marginRight: '3%' }}>
        <MaterialIcons name="stars" size={iconSize ?? defaultIconSize} color="yellow" />
        <Text
          style={{
            fontSize: fontSize ?? defaultFontSize,
            fontWeight: 'bold',
            color: '#555555',
          }}
        >
          {' '}
          {earned ? '+' : ''}
          {coins}
        </Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Ionicons name="heart" size={iconSize ?? defaultIconSize} color={colors.INCORRECT_COLOR} />
        <Text
          style={{
            fontSize: fontSize ?? defaultFontSize,
            fontWeight: 'bold',
            color: '#555555',
          }}
        >
          {' '}
          {earned && lives > 0 ? '+' : ''}
          {lives}
        </Text>
      </View>

      {trophies != null && (
        <View style={{ flexDirection: 'row', marginLeft: '3%' }}>
          <Ionicons name="md-trophy-sharp" size={iconSize ?? defaultIconSize} color="gold" />
          <Text
            style={{
              fontSize: fontSize ?? defaultFontSize,
              fontWeight: 'bold',
              color: '#555555',
            }}
          >
            {' '}
            {trophies}
          </Text>
        </View>
      )}
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
          {lives}
        </Text>
      </View>
    </View>
  );

  return vertical ? <LifeAndCoinsVertical /> : <LifeAndCoinsHorizontal />;
};
