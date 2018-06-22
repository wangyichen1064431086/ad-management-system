import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import CSSModules from 'react-css-modules';

import form from '../../scss/components/form.scss'

import SubmitBtn from './SubmitBtn';


@CSSModules(form, {allowMultiple: true})
class Form extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.node
        /*
        PropTypes.oneOfType([
          PropTypes.instanceOf(TextInput),
          PropTypes.instanceOf(Select),
          //PropTypes.instanceOf(RadioInput) //待研究：这样写instanceOf为何不可以?
        ])
        */
      ),
      PropTypes.node
    ]),
    actionUrl: PropTypes.string.isRequired,
    textOnSubmitBtn: PropTypes.string.isRequired
  };

  static defaultProps = {
    textOnSubmitBtn:'Submit'
  }

  componentDidMount() {
    
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