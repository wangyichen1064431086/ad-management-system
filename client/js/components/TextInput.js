import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import CSSModules from 'react-css-modules';

import form from '../../scss/components/form.scss';

function TextInput() {
  return (
    <input type="text" />
  )
}

export default CSSModules(TextInput, form, {allowMultiple: true});