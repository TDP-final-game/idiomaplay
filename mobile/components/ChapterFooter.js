import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../config/colors';
import { FontAwesome } from '@expo/vector-icons';

const respuestas = [
  <FontAwesome name="check-circle" size={30} color="green" key={1} />,
  <FontAwesome name="check-circle" size={30} color="green" key={3} />,
  <FontAwesome name="times-circle" size={30} color="red" key={4} />,
  <FontAwesome name="check-circle" size={30} color="green" key={5} />,
  <FontAwesome name="circle-o" size={30} color={colors.SECONDARY_LIGHT} key={6} />,
  <FontAwesome name="circle-o" size={30} color={colors.PRIMARY_DARK} key={8} />,
];

// list of { true, false, null }
export const ChapterFooter = ({ questionResults }) => {
  const resultIcon = {
    correct: <FontAwesome name="times-circle" size={30} color="red" />,
    incorrect: <FontAwesome name="check-circle" size={30} color="green" />,
    current: <FontAwesome name="circle-o" size={30} color={colors.SECONDARY_LIGHT} />,
    [null]: <FontAwesome name="circle-o" size={30} color={colors.PRIMARY_DARK} />,
  };

  const printCurrentResults = () => {
    const icons = [];

    questionResults.forEach((result, i) => {
      icons.push(resultIcon[result]);
    });

    return icons;
  };

  return <View style={styles.footerContainer}>{printCurrentResults()}</View>;
};

const styles = StyleSheet.create({
  footerContainer: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'pink',
    flexDirection: 'row',
    paddingHorizontal: '10%',
    borderTopWidth: 3,
    backgroundColor: colors.PRIMARY,
    borderTopColor: colors.PRIMARY_DARK,
  },
});
