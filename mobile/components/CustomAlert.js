import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';
import { colors } from '../config/colors';
import { commonStyles } from '../config/styles';

export const CustomAlert = ({
  visible,
  title,
  body,
  onRequestClose,

  primaryButtonText,
  onPrimaryButtonPress,

  secondaryButtonText,
  onSecondaryButtonPress,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.container}>
        <View style={[styles.modal, commonStyles.shadow]}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalText}>{body}</Text>

          {primaryButtonText && (
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={onPrimaryButtonPress}
            >
              <Text style={styles.textStyle}>{primaryButtonText}</Text>
            </TouchableOpacity>
          )}

          {secondaryButtonText && (
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={onSecondaryButtonPress}
            >
              <Text style={styles.textStyle}>{secondaryButtonText}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modal: {
    margin: '5%',
    borderWidth: 3,
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: '10%',
    borderColor: colors.LIGHT_GRAY,
    backgroundColor: colors.BACKGROUND,
  },

  button: {
    minWidth: '50%',
    borderRadius: 10,
    paddingVertical: '4%',
    marginTop: '3%',
    backgroundColor: colors.PRIMARY_BUTTON_COLOR,
  },

  primaryButton: {
    backgroundColor: colors.PRIMARY_BUTTON_COLOR,
  },

  secondaryButton: {
    backgroundColor: colors.SECONDARY_BUTTON_COLOR,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalTitle: {
    marginBottom: '5%',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.SECONDARY,
    textAlign: 'center',
  },

  modalText: {
    marginBottom: '5%',
    fontSize: 18,
    color: colors.PRIMARY,
    textAlign: 'center',
  },
});
