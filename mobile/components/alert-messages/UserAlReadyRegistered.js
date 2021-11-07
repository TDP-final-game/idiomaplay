import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { UserLoginAlertStyles } from './styles/userLoginAlerts';

export const UserAlreadyRegistered = (props) => {
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
            <Text style={styles.modalTitle}>Usuario ya registrado!</Text>
            <Text style={styles.modalText}>Utilice otra cuenta de google o inicie sesión</Text>
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
