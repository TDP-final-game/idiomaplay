import * as React from 'react';
import { colors } from '../config/colors';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles } from '../config/styles';
import { TouchableOpacity } from 'react-native';
import { Text, StyleSheet, View } from 'react-native';
import { states } from '../config/states';
import { Badge } from './Badge';

export const ExamCard = ({ text, state, onPress, disabled }) => {
    const badgeInfo = {
        [states.inProgress]: { color: colors.SECONDARY_LIGHT, text: 'En progreso' },
        [states.passed]: { color: 'lightgreen', text: 'Completa' },
        [states.pending]: { color: 'lightblue', text: 'Pendiente' },
        [states.failed]: { color: 'tomato', text: 'Fallida' },
    };

    return (
        <TouchableOpacity style={[styles.button, commonStyles.shadow]} activeOpacity={disabled ? 1 : 0.7} onPress={onPress}>
            <View
                style={{
                    flexDirection: 'row',
                    paddingVertical: '8%',
                }}
            >
                <View
                    style={{
                        width: '33.3%',
                        justifyContent: 'center',
                    }}
                >
                    <Text style={{ ...styles.text, marginLeft: '15%' }}>
                        <Ionicons name="md-book" size={35} color={colors.PRIMARY_DARK} />
                    </Text>
                </View>

                <View
                    style={{
                        width: '33.3%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={styles.text}>{text}</Text>
                </View>

                <View
                    style={{
                        width: '33.3%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Badge
                        text={badgeInfo[state].text}
                        color={badgeInfo[state].color}
                        textColor={colors.PRIMARY_DARK}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderWidth: 2,
        borderRadius: 8,
        marginHorizontal: '5%',
        backgroundColor: 'white',
        borderColor: colors.PRIMARY_DARK,
    },

    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.PRIMARY_DARK,
    },
});
