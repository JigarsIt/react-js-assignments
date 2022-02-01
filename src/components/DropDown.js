import React, { Component } from 'react';

export default class DropDown extends Component {
    render() {
        return (
            <div>
                <select className="h-100 me-2" value={this.props.selectDefault} onChange={this.props.handleDropDownChange} id="dropDownUser">
                <option key={0} value={0}>--- Select User ---</option>
                    {this.props.users.length === 0 ? <>Record Not Found</> :this.props.users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)
                    }
                </select>
            </div>
        );
    }
}
