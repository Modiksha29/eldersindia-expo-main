import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageProps } from 'react-native';
import { Avatar, Button, Layout, Popover, Text, useTheme, IconProps, IconElement, Icon } from '@ui-kitten/components';
import { MotiView } from 'moti';
import axios from 'axios';

const HeartIcon = (props: IconProps): IconElement<ImageProps> =>
    <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]}
        name='heart-outline' width={32} heigth={32} />

const HeartIconFilled = (props: IconProps): IconElement<ImageProps> =>
    <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]}
        name='heart' width={32} heigth={32} />

export const Reaction = (props) => {

    const theme = useTheme();
    const { id } = props;

    const [count, setCount] = useState(0);
    const [isClicked, setIsClicked] = useState(false);

    // const handleReaction = () => {
    //     setIsClicked(!isClicked);
    //     fetch("https://8c66-2406-7400-92-856a-5dc6-4a0-27c1-e848.in.ngrok.io/api/news/reaction/post", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             id,
    //         }),
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log("Success:", data);
    //         })
    //         .catch((error) => {
    //             console.error("Error:", error);
    //         });
    // }; need to fetch count from api 

    return (
        <Layout style={{flexDirection:'row'}}>
            <Button
                onPress={() => {
                    if (isClicked) {
                        setCount(count - 1);
                    } else {
                        setCount(count + 1);
                    }
                    //handleReaction();
                }}
                status="primary"
                appearance="ghost"
                style={{ width: 4, marginTop: 4 }}
                accessoryLeft={
                    isClicked ? (
                        <HeartIconFilled color={theme['color-danger-600']} />
                    ) : (

                        <HeartIcon color={theme['color-danger-700']} />
                    )
                }
            />
            <Text style={{ marginTop: 20 }}>{count} Likes</Text>
        </Layout>
    );
};
