import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

export default function AccessDeniedView({currentState, fields, texts, labels}) {


    return (
      <View>AccessDenied Page </View>
    );
}


AccessDeniedView.propTypes = {
  currentState: PropTypes.object,
	fields: PropTypes.object,
  texts: PropTypes.object,
  labels: PropTypes.object
};
