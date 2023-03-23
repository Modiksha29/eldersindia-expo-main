import { View, StyleSheet } from "react-native";
import React,{useState} from "react";
import { Text, Input, Toggle, Button, Spinner, Select, SelectItem, IndexPath, Layout, useTheme, Icon } from '@ui-kitten/components'
import { MotiView, ScrollView, Image } from 'moti'


export default function MessageComponent({ item, user }) {
    const status = item.user !== user;
    const theme = useTheme();
    const [chatMessages, setChatMessages] = useState([]);

    return (
        <MotiView>
            <MotiView
                style={
                    status
                        ? styles.mmessageWrapper
                        : [styles.mmessageWrapper, { alignItems: "flex-end" }]
                }
            >
                <MotiView style={{ flexDirection: "row", alignItems: "center" }}>

                    <Icon
                        style={{ width: 24, height: 24, marginRight: 4, tintColor: theme['color-basic-1000'] }}
                        fill={theme['color-basic-1000']}
                        name={'person-outline'}
                        pack={'ionicons'}
                    />
                    <MotiView
                        style={
                            status
                                ? [styles.mmessage, { backgroundColor: theme['color-danger-100'] }]
                                : [styles.mmessage, { backgroundColor: theme['color-info-transparent-200'] }]
                        }
                    >
                        <Text category="c2" style={{ marginBottom: 4 }}>
                            {item.user}</Text>
                        <Text>{item.text}</Text>
                    </MotiView>
                </MotiView>
                <Text style={{ marginLeft: 40 }}>{item.time}</Text>
            </MotiView>
            <MotiView
                // style={
                //     status
                //         ? styles.mmessageWrapper
                //         : [styles.mmessageWrapper, { alignItems: "flex-end",  }]
                // }
            >
                <MotiView style={{ flexDirection: "row", alignItems: "center", }}>

                    <Icon
                        style={{ width: 24, height: 24, marginRight: 4, tintColor: theme['color-basic-1000'] }}
                        fill={theme['color-basic-1000']}
                        name={'person-outline'}
                        pack={'ionicons'}
                    />
                    <MotiView
                        style={
                            status
                                ? [styles.mmessage, { backgroundColor: theme['color-info-transparent-200'] }]
                                : [styles.mmessage, { backgroundColor: theme['color-idanger-100'] }]
                        }
                    >
                        <Text category="c2" style={{ marginBottom: 4 }}>
                        David</Text>
                        <Text>Hi Tomer, thank you! 😇</Text>
                    </MotiView>
                </MotiView>
                <Text style={{ marginLeft: 40 }}>08:50 am</Text>
            </MotiView>
            <MotiView
                style={
                    status
                        ? styles.mmessageWrapper
                        : [styles.mmessageWrapper, { alignItems: "flex-end" }]
                }
            >
                <MotiView style={{ flexDirection: "row", alignItems: "center" }}>

                    <Icon
                        style={{ width: 24, height: 24, marginRight: 4, tintColor: theme['color-basic-1000'] }}
                        fill={theme['color-basic-1000']}
                        name={'person-outline'}
                        pack={'ionicons'}
                    />
                    <MotiView
                        style={
                            status
                                ? [styles.mmessage, { backgroundColor: theme['color-danger-100'] }]
                                : [styles.mmessage, { backgroundColor: theme['color-info-transparent-200'] }]
                        }
                    >
                        <Text category="c2" style={{ marginBottom: 4 }}>
                            Tomer</Text>
                        <Text>How can I assist you today?</Text>
                    </MotiView>
                </MotiView>
                <Text style={{ marginLeft: 40 }}>08:51 am</Text>
            </MotiView>
            <MotiView
                // style={
                //     status
                //         ? styles.mmessageWrapper
                //         : [styles.mmessageWrapper, { alignItems: "flex-end",  }]
                // }
            >
                <MotiView style={{ flexDirection: "row", alignItems: "center", }}>

                    <Icon
                        style={{ width: 24, height: 24, marginRight: 4, tintColor: theme['color-basic-1000'] }}
                        fill={theme['color-basic-1000']}
                        name={'person-outline'}
                        pack={'ionicons'}
                    />
                    <MotiView
                        style={
                            status
                                ? [styles.mmessage, { backgroundColor: theme['color-info-transparent-200'] }]
                                : [styles.mmessage, { backgroundColor: theme['color-idanger-100'] }]
                        }
                    >
                        <Text category="c2" style={{ marginBottom: 4 }}>
                        David</Text>
                        <Text>I would like to book a day care service for my mother. Can you help me with that? 😇</Text>
                    </MotiView>
                </MotiView>
                <Text style={{ marginLeft: 40 }}>08:54 am</Text>
            </MotiView>
        </MotiView>
    );
}
const styles = StyleSheet.create({
    mmessageWrapper: {
        width: "100%",
        alignItems: "flex-start",
        marginBottom: 15,
        
    },
    mmessage: {
        maxWidth: "80%",
        padding: 15,
        borderRadius: 10,
        marginBottom: 2,
    },

});