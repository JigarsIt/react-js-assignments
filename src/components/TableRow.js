import React, { Component } from 'react';
import delImg from '../images/delete-img.svg';
import '../css/questionThree.css';

export default class TableRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.user.name}</td>
                <td>{this.props.user.age}</td>
                <td>{this.props.user.salary}</td>
                { this.props.user.address?
                <td>{this.props.user.address}</td>:this.props.addressStatus?<></>:<td></td>
                }
                <td><button><img src={delImg} id={this.props.user.id} onClick={this.props.deleteTableRow} alt="delete" /></button></td>
            </tr>
        );
    }
}
