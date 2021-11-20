import * as React from 'react';
import { colors } from '../config/colors';
import { Ionicons } from '@expo/vector-icons';
import { LifeAndCoins } from './LifeAndCoins';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

export const ChapterHeader = ({ returnButtonFunction, unit, lesson, isExam }) => {
  const user = useSelector((state) => state.user);

  return (
    <View style={getStyles(isExam).headerContainer}>
      <View style={{ marginLeft: '5%' }}>
        <TouchableOpacity onPress={returnButtonFunction}>
          <Ionicons name="arrow-undo" size={45} color={colors.PRIMARY_DARK} />
        </TouchableOpacity>
      </View>

      <View>
        <Text style={getStyles(isExam).chapterText}>Unidad {unit}</Text>
        <Text style={getStyles(isExam).lessonText}>
          {lesson === -1 ? 'Examen' : `Lesson ${lesson}`}
        </Text>
      </View>

      <View style={{ marginRight: '5%' }}>
        <LifeAndCoins coins={user.coins} lives={user.lives} vertical={true} />
      </View>
    </View>
  );
};

export const UnitHeader = ({ returnButtonFunction, cartButtonFunction, unit, isExam }) => {
  const user = useSelector((state) => state.user);

  return (
    <View style={getStyles(isExam).headerContainer}>
      <View style={{ marginLeft: '3%' }}>
        <TouchableOpacity onPress={returnButtonFunction}>
          <Ionicons name="arrow-undo" size={45} color={colors.PRIMARY_DARK} />
        </TouchableOpacity>
      </View>

      <View style={{ minWidth: '35%' }}>
        <Text style={getStyles(isExam).chapterText}>Unidad {unit}</Text>
        <LifeAndCoins coins={user.coins} lives={user.lives} />
      </View>

      <View style={{ marginRight: '3%' }}>
        <TouchableOpacity onPress={cartButtonFunction}>
          <Ionicons name="cart" size={50} color={colors.PRIMARY_DARK} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = (isExam) =>
  StyleSheet.create({
    headerContainer: {
      flexGrow: 1,
      overflow: 'hidden',
      alignItems: 'center',
      flexDirection: 'row',
      borderBottomWidth: 3,
      backgroundColor: isExam ? colors.SECONDARY : colors.PRIMARY,
      justifyContent: 'space-between',
      borderBottomColor: isExam ? colors.SECONDARY_DARK : colors.PRIMARY_DARK,
    },

    chapterText: {
      textAlign: 'center',
      fontSize: 24,
      color: 'white',
      fontWeight: 'bold',
    },

    lessonText: {
      fontSize: 14,
      textAlign: 'center',
    },
  });
