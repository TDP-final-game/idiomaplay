import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { colors } from '../config/colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { commonStyles } from '../config/styles';
import UserService from '../services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { updateStats } from '../redux/user';

const Market = ({ navigation }) => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      returnButtonFunction: () => navigation.goBack(),
    });
  });

  const buyLives = () => {
    UserService.buyLives().then((stats) => {
      console.log(stats);
      dispatch(updateStats({ stats }));
    });
  };

  const ButLivesButton = () => (
    <TouchableOpacity style={[styles.buyLivesButton, commonStyles.shadow]} onPress={buyLives}>
      <View style={{ flexDirection: 'row' }}>
        <View>
          <Ionicons name="heart" size={150} color={colors.INCORRECT_COLOR} />
        </View>
        <View style={{ marginTop: '5%', marginLeft: '5%' }}>
          <Text style={styles.buyLivesText}>
            Obtener{'\n'}una nueva{'\n'}vida
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-end',
          marginBottom: '5%',
          marginRight: '5%',
        }}
      >
        <Text style={styles.priceText}>Valor:</Text>
        <Text style={styles.priceText}>100</Text>
        <MaterialIcons name="stars" size={30} color="yellow" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.lifesAndCoinsContainer}>
        <View style={{ flexGrow: 0.5, marginLeft: '3%', justifyContent: 'space-around' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 18 }}>Tus vidas: </Text>
            <Ionicons name="heart" size={28} color={colors.INCORRECT_COLOR} />
            <Text style={{ fontSize: 18 }}>{user.lives}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 18 }}>Tus monedas: </Text>
            <MaterialIcons name="stars" size={28} color="yellow" />
            <Text style={{ fontSize: 18 }}>{user.coins}</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <ButLivesButton />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: colors.BACKGROUND,
  },

  buyLivesButton: {
    borderRadius: 15,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.PRIMARY,
    borderColor: colors.PRIMARY_DARK,
  },

  buyLivesText: {
    fontSize: 30,
    color: colors.BACKGROUND,
    fontWeight: 'bold',
  },

  priceText: {
    fontSize: 20,
    marginRight: '2%',
    fontWeight: 'bold',
    color: colors.BACKGROUND,
  },

  buttonContainer: {
    flex: 0.4,
    justifyContent: 'center',
    marginHorizontal: '5%',
  },

  lifesAndCoinsContainer: {
    flex: 0.15,
    borderTopWidth: 2,
    flexDirection: 'row',
    borderBottomWidth: 2,
    alignItems: 'center',
    borderColor: colors.DARK_GRAY,
    backgroundColor: colors.LIGHT_GRAY,
  },
});

export default Market;
