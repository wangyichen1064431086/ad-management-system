import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import CSSModules from 'react-css-modules';

import form from '../../scss/components/form.scss';

//@CSSModules(form, {allowMultiple: true})// Leading decorators must be attached to a class declaration
function SubmitBtn({text, isDisable}) {
  const textOnBtn = text && 'Submit';
  const disable = (typeof isDisable === 'boolean') ? isDisable : false;
 
  const disabledAttr = disable ? 'disabled' : '';
  return <button styleName='sub-btn' disabled={disable}>{textOnBtn}</button>
}

export default CSSModules(SubmitBtn, form, {allowMultiple: true}) ;
//export default SubmitBtn;