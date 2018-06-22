import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import CSSModules from 'react-css-modules';

import form from '../../scss/components/form.scss';

function TextInput({name, label, info, placeholder, defaultValue}) {
  return (
    <div styleName="onefield">
      <label htmlFor={name} styleName="textinput-label">{label}</label>
      <p styleName="textinput-info">{info}</p>
      <input type="text" styleName="text-input" id={name} name={name} placeholder={placeholder} value={defaultValue}/>
    </div>
  )
}

export default CSSModules(TextInput, form, {allowMultiple: true});