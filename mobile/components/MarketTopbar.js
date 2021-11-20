import * as React from 'react';
import { useEffect } from 'react';
import { colors } from '../config/colors';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { LifeAndCoins } from './LifeAndCoins';
import { commonStyles } from '../config/styles';
import { updateStats } from '../redux/user';
import UserService from '../services/userService';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

export const MarketTopbar = ({ returnButtonFunction }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    UserService.updateStats(/*va el access token*/).then((data) => {
      dispatch(updateStats({ stats: data }));
    });
  });

  return (
    <View style={styles.headerContainer}>
      <View style={{ marginLeft: '5%' }}>
        <TouchableOpacity onPress={returnButtonFunction}>
          <Ionicons name="arrow-undo" size={50} color={colors.PRIMARY_DARK} />
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.primaryText}>Tienda</Text>
      </View>

      <View style={{ marginRight: '3%' }}>
        <Ionicons name="cart" size={50} color={colors.PRIMARY_LIGHT} />
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
    paddingHorizontal: '8%',
    color: 'white',
    fontWeight: 'bold',
  },

  secondaryText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
