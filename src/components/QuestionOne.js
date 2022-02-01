import React, { Component } from "react";

export default class QuestionOne extends Component {
  constructor() {
    super();
    this.state = {
      inputText: " hello there , how are you ",
      outputText: "",
    };
  }

  // this will handle input box changes
  handleInputTextChange = (e) => {
    this.setState({
      inputText: e.target.value,
    });
  }

  // this will check whether input box is empty or not and 
  // if empty then it will alert
  checkInputBox = () => {
    if (this.findLengthOfString(this.state.inputText) > 0) {
      return true;
    } else {
      alert("Please Enter Some Text...");
      return false;
    }
  };

  // this will shows the output of every operation
  evaluationOfInputBox = (output) => {
    this.setState({
      outputText: output,
    });
  };

  // this will check whether string contains space or not
  isSpace = (charater) => (!(charater === " "));

  // this will remove white space from the given string
  removeWhiteSpace = () => {
    if (this.checkInputBox()) {
      // using function
      //this.evaluationOfInputBox(this.state.inputText.replace(/\s/g, ""));

      // self logic
      let tempStr = "",
          lenOfInput = this.findLengthOfString(this.state.inputText);
      
      for (let i = 0; i < lenOfInput; i++) {
        // checking whether current char is space or not.
        if (this.isSpace(this.state.inputText[i]))
          tempStr += this.state.inputText[i];
      }
      this.evaluationOfInputBox(tempStr);
    }
  };

  // this will find out length of given string
  findLengthOfString = (str) => {
    let length = 0;
    while(str[length] !== undefined) 
      length += 1;
    return length;
  };

  // this will findout the substring based on given start and end Index
  getSubString = (str, startIndex, endIndex) => {
    let subStr = "";
    for(let i = startIndex;i<endIndex;i++)
      subStr += str[i];
    return subStr;
  };

  // this will replace the there word with the jigar
  replaceThereWithJigar = () => {
    if (this.checkInputBox()) {
      // using function
      // this.evaluationOfInputBox(this.state.inputText.replace(/there/i, "jigar"));

      // self logic
      let lenOfSearch = this.findLengthOfString("there"),
          lenOfInput = this.findLengthOfString(this.state.inputText),
          conditionValue = lenOfInput - (lenOfSearch - 1),
          outputString = "";
      for (let i = 0; i < conditionValue; i++) {
        if (this.getSubString(this.state.inputText,i, i + lenOfSearch) === "there") {
          outputString = this.getSubString(this.state.inputText,0, i) + "jigar" +
            this.getSubString(this.state.inputText,i + lenOfSearch, lenOfInput);
          break;
        } else {
          outputString = "There is no 'there' word in string";
        }
      }
      this.evaluationOfInputBox(outputString);
    }
  };

  // this will finds the index of are word
  findAreIndex = () => {
    if (this.checkInputBox()) {
      // using method
      // this.evaluationOfInputBox(this.state.inputText.indexOf("are"));

      // self logic
      let lenOfSearch = this.findLengthOfString("are"), 
          lenOfInput = this.findLengthOfString(this.state.inputText),
          conditionValue = lenOfInput - (lenOfSearch - 1),
          flag = false;
      for (let i = 0; i < conditionValue; i++) {
        if (this.getSubString(this.state.inputText,i, i + lenOfSearch) === "are") {
            this.evaluationOfInputBox(i);
            flag = true;
            break;
        }
      }
      if(!flag)
        this.evaluationOfInputBox("There is no 'are' word in string");
    }
  };

  // this will concat the abc word at the end of given string
  concatAbcAtTheEnd = () => {
    if (this.checkInputBox()) {
        // using method
        // this.evaluationOfInputBox(this.state.inputText.concat("abc"));

        // self logic
        this.evaluationOfInputBox(this.state.inputText+"abc");
    }
  }

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
          <button
            className="btn btn-primary me-2"
            onClick={this.removeWhiteSpace}
          >
            Remove White Space
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={this.replaceThereWithJigar}
          >
            Replace There with jigar
          </button>
          <button className="btn btn-primary me-2" onClick={this.findAreIndex}>
            Find "are" Index
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={this.concatAbcAtTheEnd}
          >
            Concat "abc" at the end of the string
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
