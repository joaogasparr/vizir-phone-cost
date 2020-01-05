import React from 'react';
import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

import PropTypes from 'prop-types';

import { Container } from './styles';

export default function PickerSelect({ style, placeholder, icon, ...rest }) {
  return (
    <Container style={style}>
      {icon && <Icon name={icon} size={20} color="rgba(255, 255, 255, 0.6)" />}
      <RNPickerSelect
        style={pickerSelectStyles}
        placeholder={{
          label: placeholder,
        }}
        useNativeAndroidPickerStyle={false}
        {...rest}
      />
    </Container>
  );
}

PickerSelect.propTypes = {
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

PickerSelect.defaultProps = {
  icon: null,
  placeholder: null,
  style: {},
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: 'white',
    marginTop: 2,
  },
  inputAndroid: {
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: 'white',
    marginTop: 2,
  },
});
