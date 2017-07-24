import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CreateAccount from './CreateAccount.js';
import $ from 'jquery';

class App extends Component {

  onCreateAccount(postBody) {
    delete  postBody['showError'];
    delete  postBody['showErrors'];
    delete  postBody['validationErrors'];
    console.log("s value", postBody);
    alert("Sending data to server");

      $.ajax({
          url: 'https://www.endpoint/saveInfo',
          dataType: 'json',
          type: 'POST',
          data: postBody,
          success: function(data) {
              console.log("success");

              // re-route to main application
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
          }.bind(this)
      });
  }

  render() {
    return (
      <div className="App">
        <CreateAccount onCreateAccount={this.onCreateAccount}/>
      </div>
    );
  }
}

export default App;
