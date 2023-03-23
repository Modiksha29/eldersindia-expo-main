import { useTheme, Text, Avatar } from '@ui-kitten/components'
import {LinearGradient} from "expo-linear-gradient";
import favicon from 'assets/images/favicon.png';
import ewFavicon from 'assets/images/EW-favicon.png';
import { MotiView } from 'moti';

export const DrawerHeader = () => {
    const theme = useTheme();
    return (
        <LinearGradient
            colors={[theme['color-primary-400'], theme['color-primary-700']]}
            style={{paddingTop: 64, padding: 16, marginBottom: 16, flexDirection: "row", alignItems: 'center', justifyContent: 'flex-start' }}
        >
            <Avatar source={favicon} shape='square' style={{marginHorizontal: 4}}/>
            <Avatar source={ewFavicon} shape='square' style={{marginHorizontal: 4,}}/>
            <MotiView style={{flex: 1, marginHorizontal: 8}}>
            <Text category='c1' appearance="alternative">{`Welcome,`}</Text>
            <Text category='h6' appearance="alternative">{`Krishna`}</Text>
            </MotiView>
        </LinearGradient>
    )
}