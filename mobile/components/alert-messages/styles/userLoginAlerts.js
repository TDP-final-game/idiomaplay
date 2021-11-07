import {colors} from '../../../config/colors';

export const UserLoginAlertStyles = {
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: colors.BACKGROUND,
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 20,
      elevation: 2,
    },
    buttonClose: {
      backgroundColor: colors.PRIMARY_BUTTON_COLOR,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalTitle: {
        marginBottom: 15,
        fontSize: 20,
        fontWeight: "bold",
        color: colors.SECONDARY,
        textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      fontSize: 18,
      color: colors.PRIMARY,
      textAlign: "center"
    }
  }