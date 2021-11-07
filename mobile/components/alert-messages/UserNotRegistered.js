import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { UserLoginAlertStyles } from './styles/userLoginAlerts';

export const UserNotRegistered = (props) => {
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          props.setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Usuario no esta registrado!</Text>
            <Text style={styles.modalText}>Registrese para poder acceder a IdiomaPlay!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => props.setModalVisible(!props.modalVisible)}
            >
              <Text style={styles.textStyle}>Continuar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
  )
};

const styles = StyleSheet.create(UserLoginAlertStyles);
