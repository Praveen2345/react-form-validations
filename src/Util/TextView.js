import React from 'react';
import OptionallyDisplayed from './OptionallyDisplayed.js';
import PropTypes from 'prop-types';

export default class TextField extends React.Component {

  constructor(props) {
    super(props);
    // this.shouldDisplayError = this.shouldDisplayError.bind(this);
  }

  // shouldDisplayError() {
  //   return this.props.showError && this.props.errorText !== "";
  // }

  render() {
    return (
      <div className="">
          <p className="form-field-text">{this.props.name} <p className="password_descptn">{this.props.optionalLabels}</p>
          </p>
        <input type={this.props.type || "text"}
               className="field_input"
               placeholder={this.props.placeholder}
               value={this.props.text}
               onBlur={this.props.onFieldChanged}  />
        <OptionallyDisplayed display={this.props.showError}>
          <div className="validation-error">
            <span className="text">{this.props.errorText}</span>
          </div>
        </OptionallyDisplayed>
      </div>
    );
  }
}

TextField.propTypes = {
  showError: PropTypes.bool.isRequired,
  onFieldChanged: PropTypes.func.isRequired
};

