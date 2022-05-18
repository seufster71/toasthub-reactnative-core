import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './text-input';

const Form = (props) => {
  let items = [];
  let fields = props.fields;
  for (var i = 0; i < fields.length; i++) {
    if (fields[i].fieldType === "TXT") {
      items.push(<TextInput name={fields[i].name} placeHolder={fields[i].label}/>);
    }
  }

  return (
    <div id="login-form" >
      {items}
    </div>
  );
};

Form.propTypes = {
  fields: PropTypes.array.isRequired
};

export default Form;
