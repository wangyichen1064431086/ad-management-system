import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import CSSModules from 'react-css-modules';


import form from '../../scss/components/form.scss';

import emitter from './events';

class TextInput extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    info: PropTypes.string,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    fieldSetName: PropTypes.string
  }
  static defaultProps = {
    fieldSetName: 'noFieldSet'
  }
  constructor(props) {
    super(props);
    this.state = {
      //fetchedValue: '',
      value: this.props.defaultValue || '' //初始值，初始值可能会改变
    }
    this.handleChange = this.handleChange.bind(this);
  }
  
  /*
  componentDidMount() {
    this.getDefaultValueListener = emitter.on('getDefaultData', data => {
      this.fetchedValue = data[this.props.name];
      console.log('fetchedValue:');
      console.log(this.fetchedValue);
      // this.setState({
      //   fetchedValue:thisFieldData
      // })
      const inputNode = ReactDOM.findDOMNode(this.refs.input);
      inputNode.dispatchEvent(new Event('change', {'bubbles': true}))
    })
  }
  
  componentWillUnmount() {
    emitter.removeListener(this.getDefaultValueListener);
  }
  */
  handleChange(e) {
    console.log('onchange');
    console.log('fetchedValue:');
    console.log(this.fetchedValue);
    this.setState({
      value: e.target.value || this.fetchedValue
    })
  }
  render() {
    const {name, label, info, placeholder} = this.props;

    return (
      <div styleName="onefield">
        <label htmlFor={name} styleName="textinput-label">{label}</label>
        <p styleName="textinput-info">{info}</p>
        <input type="text" styleName="text-input" id={name} name={name} placeholder={placeholder} value={this.state.value} onChange={this.handleChange} ref="input"/>
      </div>
    )
  }
}

export default CSSModules(TextInput, form, {allowMultiple: true});