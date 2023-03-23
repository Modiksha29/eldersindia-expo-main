import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageProps } from 'react-native';
import { Avatar, Button, Layout, Popover, Text, useTheme, IconProps, IconElement, Icon } from '@ui-kitten/components';
import { MotiView } from 'moti';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const HeartIcon = (props: IconProps): IconElement<ImageProps> =>
    <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]}
        name='heart-outline' width={32} heigth={32} />

const HeartIconFilled = (props: IconProps): IconElement<ImageProps> =>
    <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]}
        name='heart' width={32} heigth={32} />

export const Reaction = (props) => {

    const theme = useTheme();
    const { id } = props;

    return (
        <Layout style={{flexDirection:'row',backgroundColor:"transparent"}}>
            <Button
                onPress={() => {
                    props.onReactionClick(id)}}
                    
                status="primary"
                appearance="ghost"
                style={{ width: 4, marginTop: 4, }}
                accessoryLeft={
                    props.liked ? (
                        <HeartIconFilled color={theme['color-danger-600']} />
                    ) : (

                        <HeartIcon color={theme['color-danger-700']} />
                    )
                }
            />
            <Text style={{ marginTop: 20 }}>{props.count} Likes  </Text>
        </Layout>
    );
};
