import * as React from 'react';
import { colors } from '../config/colors';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const ChapterHeader = ({ returnButtonFunction, unit, lesson }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={{ marginLeft: '5%' }}>
        <TouchableOpacity onPress={returnButtonFunction}>
          <Ionicons name="arrow-undo" size={45} color={colors.PRIMARY_DARK} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.chapterText}>Unidad {unit}</Text>
        <Text style={styles.lessonText}>Leccion {lesson}</Text>
      </View>
      <View style={{ marginRight: '5%' }}>
        <Ionicons name="arrow-undo" size={45} color="transparent" />
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
