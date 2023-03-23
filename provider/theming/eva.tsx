import React from 'react';
import { useColorScheme } from 'react-native'
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { FeatherIconsPack } from './feather-icons'; // <-- Import Feather icons
import { MaterialIconsPack } from './material-icons'; // <-- Import Material icons
import { IoniconsIconsPack } from './ion-icons'; // <-- Import IONICONS icons
import { MaterialCommunityIconsPack } from './material-community-icons'; // <-- Import IONICONS icons
// import { AssetIconsPack } from './asset-icons';
import { default as theme } from './theme.json';
import { default as mapping } from './mapping.json';
import { default as orange } from './theme-orange.json';
import { default as green } from './theme-green.json';
import { default as defaultTheme } from './theme-default.json';


export default function Eva({ children }: { children: React.ReactNode }) {
    const colorMode = useColorScheme()
    return (
        <React.Fragment>
            <IconRegistry icons={[EvaIconsPack,FeatherIconsPack, IoniconsIconsPack, MaterialCommunityIconsPack, MaterialIconsPack]} />
            <ApplicationProvider {...eva} customMapping={{ ...eva.mapping, ...mapping }}  theme={{ ...(colorMode === 'dark' ? eva.dark : eva.light), ...theme }}>
                    {children}
            </ApplicationProvider>
        </React.Fragment>
    )
};