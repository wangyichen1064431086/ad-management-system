import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import CSSModules from 'react-css-modules';


import SubmitBtn from './SubmitBtn';
//import emitter from './events';

import form from '../../scss/components/form.scss'

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
    textOnSubmitBtn: PropTypes.string.isRequired,
    reminderWord: PropTypes.string
  };

  static defaultProps = {
    textOnSubmitBtn:'Submit'
  };

  constructor(props) {
    super(props);
    this.state = {
      fields: this.getFields(this.props.children)
    }
  }
  
  
  componentDidMount() {
    const url = this.props.actionUrl;
    fetch(url)
      .then(res => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('response status is not 200 or 200+ or 304');
        }
      ).then(result => {
         console.log('fetch data:')
        console.log(result) //更新children的defaultValue
        console.log(typeof result);
        const newChildren = React.Children.map(this.props.children, child => {
          if(child.props.name) { //说明就是一个TextInput子组件
            const name = child.props.name;
            // console.log('name:');
            // console.log(name);

            ///TODO:将其整理为一个常用的发方法，即找出深层obj对应于'key1[key2][key3]'的属性值
            const nameLevelArr = [];
            const nameArr = name.split(/\[|\]\[?/).filter(item => item !== '');
             // const nameArr = name.match(/\[(\w+)\]/g); //str.match与reg.exect行为模式区分
            // console.log(nameArr);
            let newDefaultValue = result;
            while(nameArr.length) {
              const oneLevelKey = nameArr.shift();
              newDefaultValue = newDefaultValue[oneLevelKey];
            }

            return React.cloneElement(child, {
              defaultValue: newDefaultValue
            })
            
          } else {
            return child;
          }
        });

        this.setState({
          fields: this.getFields(newChildren)
        });

      }).catch(err => {
        console.error('Error:', err.message);
      });
  }
  

  
  getFields(myChidren) {
    //const {children} = this.props;
    const childrenArr = Array.from(myChidren);

    const fieldSetNameArr = ['noFieldSet']; //保证'noFieldSet'的字段在上面

    React.Children.forEach(myChidren, child => {
      const fieldSetName = child.props.fieldSetName;
      if(fieldSetName && !fieldSetNameArr.includes(fieldSetName)) {
        fieldSetNameArr.push(fieldSetName);
      }
    });

    return fieldSetNameArr.map( fieldSetName => {

      const childrenWithThisFieldSetName = childrenArr.filter(item => item.props.fieldSetName === fieldSetName);
      if (fieldSetName !== 'noFieldSet') {
        return (
          <fieldset styleName="section" key={fieldSetName}>
            <legend>{fieldSetName}</legend>
            {childrenWithThisFieldSetName}
          </fieldset>
        );
      } else {
        //return childrenWithThisFieldSetName;
        
        return React.Children.map(childrenWithThisFieldSetName, (child, index) => {
          return React.cloneElement(child, {
            key:`noFieldSet${index}`
          });
        });
        
      }
      
    });
  }
  
  render() {
    const {children, actionUrl, textOnSubmitBtn,reminderWord} = this.props;
    return (
      <div >
        {
          reminderWord && (
            <p styleName="reminder">{reminderWord}</p>
          )
        }

        <form method="post" styleName="form" action={actionUrl}>

          {this.state.fields}
          <div styleName="subbtn-line">
            <SubmitBtn text={textOnSubmitBtn} />
          </div>
        </form>
      </div>
    )
  }
}

export default Form;