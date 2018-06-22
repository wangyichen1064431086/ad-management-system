import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import CSSModules from 'react-css-modules';

import form from '../../scss/components/form.scss';

function FormSection({sectionName, children}) {
  return (
    <fieldset styleName="section">
      <legend>{sectionName}</legend>
      {children}
    </fieldset>
  )
}

export default CSSModules(FormSection, form, {allowMultiple: true});