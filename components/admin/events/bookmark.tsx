import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageProps } from 'react-native';
import { Avatar, Button, Layout, Popover, Text, useTheme, IconProps, IconElement, Icon } from '@ui-kitten/components';
import { MotiView } from 'moti';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const BookmarkIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='bookmark-outline' width={32} heigth={32} />

const BookmarkIconFilled = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='bookmark' width={32} heigth={32} />

export const Bookmark = (props) => {

    const theme = useTheme();
    const { id } = props;

    return (
        <Layout style={{flexDirection:'row', backgroundColor:"transparent"}}>
            <Button
                onPress={() => {
                    props.onBookmarkClick(id)
                    //handleReaction();
                }}
                status="primary"
                appearance="ghost"
                style={{ width: 4, marginTop: 4,}}
                accessoryLeft={
                    props.bookmark ? (
                        <BookmarkIconFilled color={theme['color-basic-900']} />
                    ) : (

                        <BookmarkIcon color={theme['color-basic-700']} />
                    )
                }
            />
            
        </Layout>
    );
};
