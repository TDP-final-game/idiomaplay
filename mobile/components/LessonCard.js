import * as React from 'react';
import { colors } from '../config/colors';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles } from '../config/styles';
import { TouchableOpacity } from 'react-native';
import { Text, StyleSheet, View } from 'react-native';
import { states } from '../config/states';
import { Badge } from './Badge';
import { LinearGradient } from 'expo-linear-gradient';

export const LessonCard = ({ text, state, onPress, disabled }) => {
  const badgeInfo = {
    [states.inProgress]: { color: colors.SECONDARY_LIGHT, text: 'En progreso' },
    [states.passed]: { color: 'lightgreen', text: 'Completa' },
    [states.pending]: { color: 'lightblue', text: 'Pendiente' },
    [states.failed]: { color: 'tomato', text: 'Fallida' },
  };
  return (
    <TouchableOpacity style={styles.button} onPress={disabled ? () => {} : onPress}>
      <LinearGradient colors={[colors.PRIMARY, colors.PRIMARY_DARK]}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: '8%',
            marginHorizontal: '5%',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ width: '50%', justifyContent: 'center' }}>
            <Text>
              <Ionicons name="md-book" size={50} color={colors.PRIMARY_LIGHT} />
            </Text>
          </View>

          <View style={{ width: '50%', justifyContent: 'center' }}>
            <Badge
              fontSize={18}
              text={badgeInfo[state].text}
              color={badgeInfo[state].color}
              textColor={colors.PRIMARY_DARK}
            />
          </View>
        </View>
      </LinearGradient>

      <View style={{ marginHorizontal: '5%', marginTop: '5%' }}>
        <Text style={styles.lessonTitle}>{text}</Text>

        <Text style={styles.lessonDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexGrow: 1,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.PRIMARY_DARK,
  },

  lessonTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.PRIMARY_DARK,
  },

  lessonDescription: {
    fontSize: 15,
    textAlign: 'justify',
  },
});
