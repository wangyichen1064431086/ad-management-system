import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import CSSModules from 'react-css-modules';

import form from '../../scss/components/form.scss'

import SubmitBtn from './SubmitBtn';
import TextInput from './TextInput';
import Select from './Select';

@CSSModules(form, {allowMultiple: true})
class Form extends React.Component {
  static propTypes = {
    children: PropTypes.arrayOf(
      PropTypes.oneOf([
        PropTypes.instanceOf(TextInput),
        PropTypes.instanceOf(Select),
        //PropTypes.instanceOf(RadioInput)
      ])
    ),
    actionUrl: PropTypes.string.isRequired,
    textOnSubmitBtn: PropTypes.string.isRequired
  };

  static defaultProps = {
    textOnSubmitBtn:'Submit'
  }


  render() {
    const {children, actionUrl, textOnSubmitBtn} = this.props;
    return (
      <form method="post" styleName="form" action={actionUrl}>
        {children}
        <div styleName="subbtn-line">
          <SubmitBtn text={textOnSubmitBtn} />
        </div>
      </form>
    )
  }
}

export default Form;