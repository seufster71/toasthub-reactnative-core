import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const Link = ({label, onClick}) => {
 

  return (
	<View>
          {label}
    </View>
  );
};

Link.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func
};

export default Link;
