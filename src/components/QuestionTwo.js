import React, { Component } from "react";

export default class QuestionTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "Hello world",
      outputText: "",
    };
  }

  // this will handle the input text changes
  handleInputTextChange = (e) => {
    this.setState({
      inputText: e.target.value,
    });
  };

  // this will check current char is Alphabet or not
  checkIsAlphabet = (val) => (val>="A" && val<="Z") || (val>="a" && val<="z");

  // this will find out length of given string
  findLengthOfString = (str) => {
    let length = 0;
    while(str[length] !== undefined)
      length += 1;
    return length;
  };

  reverseStartAndLastIndexChar = (inputText, startIndex, lastIndex) => {
    let resultString = "",
        lengthOfString = this.findLengthOfString(inputText);

    for(let i = 0; i < lengthOfString; i++) {
      if(i === startIndex)
        resultString += inputText[lastIndex];
      else if(i === lastIndex)
        resultString += inputText[startIndex];
      else
        resultString += inputText[i];
    }
    return resultString;
  };

  // this will reverse the given string
  stringReverse = () => {
    let inputLength = this.findLengthOfString(this.state.inputText);
    if (inputLength > 0) {
      // self logic 1
      /*
      let alphabetStr = "",
          alphaCounter = 0,
          ansStr = "";

      // in the below for loop i am taking last to first char of string
      // and checking current char is alphabet or not
      // if alphabet then i am storing those char into the "alphabetStr"
      for(let i = inputLength-1; i > -1; i -= 1) {
          if(this.checkIsAlphabet(this.state.inputText[i])) {
              alphabetStr += this.state.inputText[i];
          }
      }
      
      // in the below for loop i am taking first to last char of string
      // and checking current char is alphabet then i will read one by one char from alphastr and storing that char into the ansStr 
      // and if current char is not string then storing that char into the ansStr varible.
      for(let i = 0; i < inputLength; i += 1) {
          if(this.checkIsAlphabet(this.state.inputText[i])) {
              ansStr += alphabetStr[alphaCounter];
              alphaCounter += 1;
          } else {
              ansStr += this.state.inputText[i];
          }
      }

      this.setState({
          outputText: ansStr
      });
      */

      // self logic 2
      let inputText = this.state.inputText,
          lastIndex = inputLength - 1,
          startIndex = 0;

      while(lastIndex > startIndex) {
        if(!this.checkIsAlphabet(inputText[startIndex])) {
          // this condition check startIndex character is alphabet or not
          startIndex += 1;
        } else if(!this.checkIsAlphabet(inputText[lastIndex])) {
          // this condition check lastIndex character is alphabet or not
          lastIndex -= 1;
        } else {
          // if above two conditions are false then that means current
          // start and end index char are alphabets so that 
          // now i am reveresing start and last index char
          inputText = this.reverseStartAndLastIndexChar(inputText, startIndex, lastIndex);
          startIndex += 1;
          lastIndex -= 1;
        }
      }
      this.setState({
        outputText: inputText
      });
    } else {
      alert("Please Enter Some Text...");
    }
  };

  render() {
    return (
      <div className="container my-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={this.state.inputText}
            onChange={this.handleInputTextChange}
            placeholder="Enter text here"
            id="inputText"
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-primary" onClick={this.stringReverse}>
            Reverse String
          </button>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={this.state.outputText}
            id="outputText"
            readOnly="readOnly"
          />
        </div>
      </div>
    );
  }
}
