import React from 'react';
import { SolitoImage } from 'solito/image'

const IconProvider = (source) => ({
  toReactElement: ({ animation, ...props }) => (
    // <Image {...props} source={source}/>
    <SolitoImage
    src={source}
    {...props}
  />
  ),
});

export const AssetIconsPack = {
  name: 'assets',
  icons: {
    'favicon': IconProvider(require('./../../assets/images/favicon.png')),
  },
};