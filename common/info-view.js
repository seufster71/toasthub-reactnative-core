import React from 'react';
import PropTypes from 'prop-types';
import {Text, View } from 'react-native';

export default function InfoView({message}) {


    return (
        <View><Text> {message} </Text></View>
    );
}


InfoView.propTypes = {
  message: PropTypes.string
};
