import * as React from 'react';
import { colors } from '../config/colors';
import { Text, StyleSheet, View } from 'react-native';
import { Image } from 'react-native';
import { Dimensions } from 'react-native';
import { commonStyles } from '../config/styles';

export const TutorialCard = ({ text, image }) => {
  return (
    <View style={styles.card}>
      <View
        style={{
          backgroundColor: colors.PRIMARY,
          borderTopRightRadius: 8,
          borderTopLeftRadius: 8,
          width: '100%',
          paddingLeft: '5%',
        }}
      >
        <Text style={styles.title}>{text}</Text>
      </View>
      <Image
        source={image}
        style={[
          {
            borderWidth: 3,
            marginTop: '10%',
            width: Dimensions.get('window').width * 0.8,
            height: Dimensions.get('window').height * 0.6,
          },
          commonStyles.shadow,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    borderWidth: 2,
    borderRadius: 8,
    alignItems: 'center',

    borderColor: colors.PRIMARY_DARK,
    backgroundColor: colors.BACKGROUND,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.PRIMARY_LIGHT,
  },
});
