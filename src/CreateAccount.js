import React, { Component } from 'react';
import TextView from './Util/TextView.js';
import update from 'immutability-helper';
import { run, ruleRunner } from './Validation/ruleRunner.js'
import { required, mustMatch, minLength, validateEmail, validateUpperLowerNumeric } from './Validation/rules.js';
import $ from 'jquery';

const fieldValidations = [
  ruleRunner("bussinessName", "Bussiness Name", required),
  ruleRunner("bussinessEmail", "Email Address", required, validateEmail),
  ruleRunner("userName", "User Name", required),
  ruleRunner("password", "Password", required, minLength(6), validateUpperLowerNumeric),
  ruleRunner("website", "Website Adderss"),
  ruleRunner("typeOfBussiness", "Bussiness Type", required)
];

class App extends Component {
    noErrors = false;
    initializationOfForm = true;
    constructor(props) {
      super(props);
      this.handleFieldChanged = this.handleFieldChanged.bind(this);
      this.handleSubmitClicked = this.handleSubmitClicked.bind(this);
      this.noFormErrors = this.noFormErrors.bind(this);
      this.onFormSubmit = this.onFormSubmit.bind(this);
      this.errorFor = this.errorFor.bind(this);
        this.noErrors = false;
      this.state = {
        showErrors: false,
        showError: {
            bussinessName: false,
            bussinessEmail: false,
            userName: false,
            password: false,
            website: false,
            typeOfBussiness: false
        },
        validationErrors: { },
      }
    }

  componentWillMount() {
      //life cycle method
    // Run validations on initial state
    this.setState({validationErrors: run(this.state, fieldValidations)});
  }

  errorFor(field) {
    return this.state.validationErrors[field] || "";
  }

  isEmpty(obj) {
    for(var prop in obj) {
      console.log("prop", prop);
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
  }

  handleFieldChanged(field) {
      this.initializationOfForm = false;
    return (e) => {
      // update() is provided by React Immutability Helpers
      // https://facebook.github.io/react/docs/update.html

    console.log("field", e.target.value, e.target);
      let newState = update(this.state, {
        [field]: {$set: e.target.value}
      });

        console.log("newState",newState);
      newState.validationErrors = run(newState, fieldValidations);

      this.noErrors = this.isEmpty(newState.validationErrors);
      console.log("erroslenght", this.errorsLength, Object.keys(newState).length );
        if(newState.validationErrors.hasOwnProperty(field)) {
            this.setState({showErrors: true});
          this.state.showError[field] = true;
        }
        this.setState(newState);
    };
  }

  handleSubmitClicked() {
    this.setState({showErrors: true});
    if($.isEmptyObject(this.state.validationErrors) === false) return null;
      console.log("form submitted:s", this.state);
      console.log("form submitted:p", this.props);
    return this.props.onCreateAccount(this.state);
  }

    noFormErrors() {
    if(document.getElementById("terms")) {
        console.log("terms,", document.getElementById("terms").checked);
        console.log("privacy,", document.getElementById("privacy").checked);
    }

        if(this.noErrors && document.getElementById("terms").checked && document.getElementById("privacy").checked) {
            return true;
        } else {
          return false;
        }
    }

    onFormSubmit() {
    console.log("form submitted on form");
    }


  render() {
    return (
      <div className="CreateAccount">



        <div className="row">
          <div className="col-sm-3 logoStyle" >

            <img src="vectorSmartObject.png"  alt="Logo View"
            ></img>
          </div>

        </div>
        <div className="row">
          <div className="col-sm-3">

          </div>
          <div className="col-sm-6">
            <h1 className="headingTitle">LET'S GET STARTED</h1>
            <form onSubmit={this.onFormSubmit}>
              <TextView     placeholder='Bussiness Name'
                            showError={this.state.showError.bussinessName}
                            text={this.props.bussinessName}
                            name='Business Name'
                            onFieldChanged={this.handleFieldChanged("bussinessName")}
                            errorText={this.errorFor("bussinessName")}

              />    <br />
              <TextView     placeholder='Email'
                            showError={this.state.showError.bussinessEmail}
                            text={this.props.bussinessEmail}
                            name='Business Email'
                            onFieldChanged={this.handleFieldChanged("bussinessEmail")}
                            errorText={this.errorFor("bussinessEmail")}


                        />    <br />
              <TextView     placeholder='Username'
                            showError={this.state.showError.userName}
                            text={this.props.userName}
                            name='Create a Username'
                            onFieldChanged={this.handleFieldChanged("userName")}
                            errorText={this.errorFor("userName")}

                        />    <br />
              <TextView     placeholder='Password'
                            showError={this.state.showError.password}
                            text={this.props.password}
                            optionalLabels = '6 characters | 1 uppercase | 1 lowercase | 1 digit'
                            name='Password'
                            onFieldChanged={this.handleFieldChanged("password")}
                            errorText={this.errorFor("password")}

                            type="password"
                         />    <br />
              <TextView     placeholder=''
                            showError={this.state.showError.website}
                            text={this.props.website}
                            name='Website'
                            onFieldChanged={this.handleFieldChanged("website")}
                            errorText={this.errorFor("website")}

                         />    <br />
              <TextView     placeholder='Select your business'
                            showError={this.state.showError.typeOfBussiness}
                            text={this.props.typeOfBussiness}
                            name='Type of Business'
                            onFieldChanged={this.handleFieldChanged("typeOfBussiness")}
                            errorText={this.errorFor("typeOfBussiness")}

                        />    <br />
              <div className="">
                <p className="terms_of_Service">Terms of service</p>
                <input type="checkbox" id="terms" onClick={this.handleFieldChanged('terms')} name="terms" value="true"/><p className="terms">I have read and I do accept
                <a href="#" className="underlined"> terms of service</a> </p>
              </div>
              <div className="">
                <p className="terms_of_Service">Privacy Policy</p>
                <input type="checkbox" id="privacy" name="privacy" onClick={this.handleFieldChanged('privacy')} value="true"/><p className="terms">I have read and I do accept
                <a href="#" className="underlined"> privacy policy</a> </p>
              </div>
              <div className="submitBtnWrapper">
                <button type='submit' className="submitBtn" id="CreateAccountButton" disabled={!this.noFormErrors() || this.initializationOfForm} onClick={this.handleSubmitClicked}  >
                  <img src="BUT.png" alt="SUBMIT BTN"></img>
                </button>
              </div>
            </form>
          </div>
          <div className="col-sm-3"></div>
        </div>


      </div>
    );
  }
}

export default App;
