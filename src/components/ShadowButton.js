import React from 'react';
import DropShadow from 'react-native-drop-shadow';

const ShadowButton = ({children}) => {
  return (
    <DropShadow
      style={{
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.35,
        shadowRadius: 5,
        elevation: 1,
      }}>
      {children}
    </DropShadow>
  );
};

export default ShadowButton;
