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
    const url = this.props.actionUrl;
    fetch(url)
      .then(res =>
        res.json()
      ).then(result => {
        console.log('fetch data:')
        console.log(result) //更新children的defaultValue
        /*
        React.Children.map(children, child => {
          const fieldName = child.props.name;
          return React.cloneElement(child, {
            defaultValue: result[name]
          })
        })
        */
      }
    )
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