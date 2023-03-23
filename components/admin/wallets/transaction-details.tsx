import React, { useState, useEffect } from 'react'
import { useRouter } from expo-router'
import { MotiView } from 'moti'
import { SheetManager } from 'react-native-actions-sheet'
import { Layout, Button, Icon, Text, Spinner, List, ListItem, Card, Divider, useTheme, IconProps, IconElement, Input, Popover, Avatar, RangeDatepicker, Toggle } from '@ui-kitten/components'
import { ImageProps, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'

export function ManageTransactionDetailScreen({props}) {
  const { push, replace, back } = useRouter()
  const theme = useTheme();


  return (
    <Layout level='1' style={{ flex: 1}}>
      <ScrollView>
          <MotiView>
            <MotiView>
              <Text>Paid to</Text>
              <MotiView style={{flexDirection:'row', justifyContent:'space-between', marginTop:8}}>
                 <Text category='h6'>Lance Reilly</Text>
                 <Text category='h6'>600</Text>
              </MotiView>
              <Text category='s1' style={{marginTop:8}}>Banking Name : Lance Reilly</Text>
            </MotiView>
            <MotiView style={{flexDirection:'row', marginTop:12}}>
            <Icon
                  style={{ width: 18, height: 18, marginRight: 16, tintColor: theme['color-warning-500'] }}
                  fill={theme['color-warning-500']}
                  name={'ios-calendar-outline'}
                  pack={'ionicons'}
                />
              <Text> Transfer Details</Text>
            </MotiView>
            <MotiView style={{ flexDirection: 'row', padding: 4, borderWidth: 1, borderColor: theme['color-success-500'], borderRadius: 4, borderStyle: 'solid', marginTop: 4 }}>
              <MotiView style={{ padding: 8 }}>
                <Text category='s1'>Payment id</Text>
                <Text category='s1'>Entity</Text>
                <Text category='s1'>Status</Text>
                <Text category='s1'>Method</Text>
                <Text category='s1'>Description</Text>
                <Text category='s1'>Upi</Text>
              </MotiView>
              <MotiView style={{ marginLeft: 4, padding: 8 }}>
                <Text>pay_LFsY0VVq5xZ3Ii</Text>
                <Text>payment</Text>
                <Text>authorized</Text>
                <Text>upi</Text>
                <Text>Health Care Transaction</Text>
                <Text>mani@ybl</Text>
              </MotiView>
            </MotiView>
          </MotiView>
        </ScrollView>

    </Layout>
  )
}
