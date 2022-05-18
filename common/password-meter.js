import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const PasswordMeter = ({name, alphaCheckCss, alphaCheckValue,
  capitalCheckCss, capitalCheckValue, numberCheckCss, numberCheckValue, specialCheckCss, specialCheckValue,
  countCheckCss, countCheckValue }) => {

  let alphaCheckTxt = '';
  if (alphaCheckValue != null ) {
    alphaCheckTxt = <View>{alphaCheckValue} </View>;
  }
  let capitalCheckTxt = '';
  if (capitalCheckValue != null) {
    capitalCheckTxt = <View>{capitalCheckValue} </View>;
  }
  let numberCheckTxt = '';
  if (numberCheckValue != null) {
    numberCheckTxt = <View>{numberCheckValue} </View>;
  }
  let specialCheckTxt = '';
  if (specialCheckValue != null) {
    specialCheckTxt = <View>{specialCheckValue} </View>;
  }
  let countCheckTxt = '';
  if (countCheckValue != null) {
    countCheckTxt = <View>{countCheckValue} </View>;
  }

  return (
    <View>
      <View>
        {alphaCheckTxt}
        {capitalCheckTxt}
        {numberCheckTxt}
        {specialCheckTxt}
        {countCheckTxt}
      </View>
    </View>
  );
};

PasswordMeter.propTypes = {
  name: PropTypes.string.isRequired,
  alphaCheckCss: PropTypes.string,
  alphaCheckValue: PropTypes.string,
  capitalCheckCss: PropTypes.string,
  capitalCheckValue: PropTypes.string,
  numberCheckCss: PropTypes.string,
  numberCheckValue: PropTypes.string,
  specialCheckCss: PropTypes.string,
  specialCheckValue: PropTypes.string,
  countCheckCss: PropTypes.string,
  countCheckValue: PropTypes.string
};

export default PasswordMeter;
