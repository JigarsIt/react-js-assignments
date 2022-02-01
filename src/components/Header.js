import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class Header extends Component {

  constructor() {
    super();
    this.state = {
      active: window.location.pathname
    };
  }

  // this will update the state of active based on current selection of menu item
  handleMenuChange(currentMenuItem) {
    this.setState({
      active: currentMenuItem
    })
  }

  render() {
    const menuList = [{name:"Q-1",to:"/"},
    {name:"Q-2",to:"/q2"},
    {name:"Q-3",to:"/q3"}],
          activeStyle = {fontWeight: "bold", color: "black"};
    
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={()=> this.setState({active: "/"})}>
            {this.props.title}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {
                menuList.map((menuItem)=>
                  <li className="nav-item" key={menuItem.name}>
                    <Link className="nav-link" aria-current="page" style={this.state.active === menuItem.to ? activeStyle : {}} to={menuItem.to} onClick={()=> this.handleMenuChange(menuItem.to)}>
                      {menuItem.name}
                    </Link>
                  </li>
                )
              }
            </ul>
            {
              this.props.showSearchBox?(<form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
              </form>):""
            }
            
          </div>
        </div>
      </nav>
    );
  }
}
