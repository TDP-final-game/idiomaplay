import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../config/colors';
import { FontAwesome } from '@expo/vector-icons';

// list of { true, false, null }
export const ChapterFooter = ({ questionResults }) => {
  const resultIcon = {
    correct: (key) => <FontAwesome name="times-circle" size={30} color="red" key={key} />,
    incorrect: (key) => <FontAwesome name="check-circle" size={30} color="green" key={key} />,
    current: (key) => (
      <FontAwesome name="circle-o" size={30} color={colors.SECONDARY_LIGHT} key={key} />
    ),
    [null]: (key) => (
      <FontAwesome name="circle-o" size={30} color={colors.PRIMARY_DARK} key={key} />
    ),
  };

  const printCurrentResults = () => {
    const icons = [];

    questionResults.forEach((result, i) => {
      icons.push(resultIcon[result](i));
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
