import React, { Component } from 'react';
import '../css/questionThree.css';
import DropDown from './DropDown';
import Pagination from './Pagination';
import TableRow from './TableRow';

export default class QuestionThree extends Component {

  constructor() {
    super();
    this.state = {
      users: [{
        id: 1,
        name: "mark",
        age: 30,
        salary: 20000
      }, {
        id: 2,
        name: "jason",
        age: 32,
        salary: 40000
      }, {
        id: 3,
        name: "philip",
        age: 35,
        salary: 50000,
        address: "sksksksk"
      },
      {
        id: 4,
        name: "quolam",
        age: 27,
        salary: 60000,
        address: "sksksksk philip"
      },
      {
        id: 5,
        name: "quolam1",
        age: 27,
        salary: 60000
      },
      {
        id: 6,
        name: "quolam 2",
        age: 27,
        salary: 70000
      },
      {
        id: 7,
        name: "quolam 3",
        age: 27,
        salary: 80000
      },
      {
        id: 8,
        name: "quolam 4",
        age: 27,
        salary: 90000
      }],
      tableData: [],
      searchData: [],
      searchState: false,
      paginationStatus: [false, 1],
      dropDownValue: "0",
      addressValue: "",
      searchValue: "",
      addressState: {}
    };
  }

  // this will return the currentPage of table's data
  initialTableData = (currentPage, users, addStatus = true) => {
    let tableData = [];
    if (users.length > 0) {
      let status = users.slice((currentPage - 1) * 3, currentPage * 3).every((user) => user.address === undefined);
      if (addStatus !== false) {
        if (status)
          this.setState({
            addressState: { display: "none" }
          });
        else
          this.setState({
            addressState: {}
          });
      }
      tableData = users.slice((currentPage - 1) * 3, currentPage * 3).map((user) => (
        <TableRow key={user.id} deleteTableRow={this.deleteTableRow} addressStatus={status} user={user} />
      ));
    }
    return tableData;
  };

  // this will handle table data by means of pagination
  handleTableData = (currentPage) => {
    let tableData = this.initialTableData(currentPage, this.state.searchData.length === 0 ? this.state.users : this.state.searchData);
    this.setState({
      tableData: tableData,
      paginationStatus: [false, 1]
    });
  };

  // this will handle the address input box value changes
  handleAddressValue = (value) => {
    this.setState({
      addressValue: value
    });
  };

  // this will delete table row
  // in this function first i have to make sure that delete perform in which page then
  // after i will delete that record and then i will open that page on which delete operation performed so that i don't need to traverse to the pages to see delete is performed or not.
  deleteTableRow = (delId) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      let pageNumber = 1,
        currentIndex = 0,
        value = "",
        data = null,
        users = null,
        tableData = null;

      if (this.state.searchState !== false) {
        value = document.getElementById("search").value;
        data = this.getSearchData(this.state.users, value);
        currentIndex = data.findIndex((user) => user.id === parseInt(delId.target.id));
      } else {
        currentIndex = this.state.users.findIndex((user) => user.id === parseInt(delId.target.id));
      }
      for (let i = 3; i <= currentIndex; i += 3)
        pageNumber += 1;

      users = this.state.users.filter((user) => user.id !== parseInt(delId.target.id));

      if (this.state.searchState !== false) {
        data = this.getSearchData(users, value);

        if ((currentIndex + 1) % 3 === 1)
          pageNumber = pageNumber !== 1 ? pageNumber - 1 : pageNumber;

        tableData = this.initialTableData(pageNumber, data);
      } else {
        if ((currentIndex + 1) % 3 === 1)
          pageNumber = pageNumber !== 1 ? pageNumber - 1 : pageNumber;

        tableData = this.initialTableData(pageNumber, users);
      }

      this.setState({
        users: users,
        searchData: data !== null ? data : [],
        tableData: tableData,
        paginationStatus: [true, pageNumber]
      });
    }
  };

  // this will return the search user data
  getSearchData = (users, value) => users.filter((user) => {
    return user.name.match(value) || user.age.toString().match(value) || user.salary.toString().match(value) || (user.address === undefined ? false : user.address.match(value))
  });

  // this will search given string in table data and fetching matching rows
  searchBy = (e) => {
    let value = e.target.value;
    this.setState({
      searchValue: value
    });

    if (value.length !== 0 && !value.match(/^\s+$/)) {
      let data = this.getSearchData(this.state.users, value),
          tableData = this.initialTableData(1, data);

      this.setState({
        searchData: data,
        tableData: tableData,
        paginationStatus: [true, 1],
        searchState: true
      });
    } else if (value.length === 0) {
      this.setState({
        searchState: false,
        searchData: [],
        tableData: this.initialTableData(1, this.state.users),
        paginationStatus: [true, 1]
      });
    }
  };

  // this will sort the table data ascending or descending order based on particular column
  sortBy = (e) => {
    let tempData = this.state.users,
        tableData = [],
        status = false;

    if (e.target.classList.contains("asc")) {
      tempData.sort((a, b) => (a[e.target.id] === b[e.target.id]) ? 0 : (a[e.target.id] > b[e.target.id]) ? 1 : -1);
      e.target.classList.remove('asc');
      e.target.classList.add('desc');
    } else {
      tempData.sort((a, b) => (a[e.target.id] === b[e.target.id]) ? 0 : (a[e.target.id] < b[e.target.id]) ? 1 : -1);
      e.target.classList.remove('desc');
      e.target.classList.add('asc');
    }

    status = tempData.slice(0, 3).every((user) => user.address === undefined);
    if (status)
      this.setState({
        addressState: { display: "none" }
      });
    else
      this.setState({
        addressState: {}
      });

    tableData = tempData.slice(0, 3).map((user) => (
      <TableRow key={user.id} deleteTableRow={this.deleteTableRow} addressStatus={status} user={user} />
    ));

    this.setState({
      users: tempData,
      tableData: tableData,
      paginationStatus: [true, 1]
    });
  };

  // this will change the dropDownValue state based on selection from the drop down
  handleDropDownChange = (e) => {
    this.setState({
      dropDownValue: e.target.value
    });
  }

  // this will add or update the address of selected user
  updateAddress = () => {
    if (this.state.dropDownValue === "0") {
      alert("Please Select User");
    } else if (this.state.addressValue.length === 0) {
      alert("Please Enter Address");
    } else {
      let users = this.state.users.map((user) => {
        if (user.id === parseInt(this.state.dropDownValue)) {
          user.address = this.state.addressValue;
          return user;
        }
        return user;
      });

      let currentIndex = users.findIndex((user) => user.id === parseInt(this.state.dropDownValue)),
          pageNumber = 1;
      
      for (let i = 3; i <= currentIndex; i += 3)
        pageNumber += 1;

      this.setState({
        users: users,
        tableData: this.initialTableData(pageNumber, users),
        paginationStatus: [true, pageNumber],
        addressValue: "",
        dropDownValue: "0"
      });

      if (this.state.searchState !== false) {
        this.setState({
          searchValue: "",
          searchState: false,
          searchData: []
        });
      }
    }
  }

  render() {
    return (<div className="container my-4">
      <div className="d-flex">
        <DropDown users={this.state.users} selectDefault={this.state.dropDownValue} handleDropDownChange={this.handleDropDownChange} />
        <input
          className="form-control me-2"
          type="text"
          placeholder="Enter Address"
          id="addressValue"
          value={this.state.addressValue}
          onChange={(e) => this.handleAddressValue(e.target.value)}
        />
        <button className="btn btn-success" onClick={this.updateAddress}>
          Update
        </button>
      </div>
      <div className="table-responsive">
        <table className="table caption-top">
          <caption>
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
              id="search"
              value={this.state.searchValue}
              onChange={this.searchBy}
            /></caption>
          <thead>
            <tr>
              <th scope="col" width="25%"><button id="name" onClick={this.sortBy} className="asc">Name</button></th>
              <th scope="col" width="25%"><button id="age" onClick={this.sortBy} className="asc">Age</button></th>
              <th scope="col" width="25%"><button id="salary" onClick={this.sortBy} className="asc">Salary</button></th>
              {this.state.tableData.length === 0 && this.state.searchState !== true ? this.state.users.slice(0, 3).every((user) => user.address === undefined) ? <th scope="col" width="25%" style={this.state.addressState.length === 0 ? { display: "none" } : this.state.addressState} id="address">Address</th> : <th scope="col" style={this.state.addressState.length === 0 ? {} : this.state.addressState} width="25%" id="address">Address</th> : <th scope="col" style={this.state.addressState} width="25%" id="address">Address</th>}
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.length === 0 ? <tr><th colSpan={5}>Record Not Found...</th></tr> : this.state.searchState === true && this.state.searchData.length === 0 ? <tr><th colSpan={5}>No matching Record Found...</th></tr> : this.state.tableData.length === 0 ? this.initialTableData(1, this.state.users, false) : this.state.tableData}
          </tbody>
          <tfoot>
            <Pagination pageLength={this.state.searchData.length !== 0 || this.state.searchState === true ? this.state.searchData.length : this.state.users.length} currentStatus={this.state.paginationStatus} handleTableData={this.handleTableData} />
          </tfoot>
        </table>
      </div>
    </div>);
  }
}
