import React, { Component } from 'react';

export default class Pagination extends Component {

    constructor(props) {
        super(props);
        this.state = {
            links: this.getPages(1)
        };
    }

    // this will change the state of links state and this will also call handleTableData so that table data also change based on current page.
    callGetPages = (currentPage) => {
        this.setState({
            links: this.getPages(currentPage)
        });
        this.props.handleTableData(currentPage);
    }

    // this will return the pagination links  with some modification based on current page
    // like active the current page link and disable previous and next button based on condition.
    getPages = (currentPage) => {
        let arrOfPages = [],
            conditionValue = Math.ceil(this.props.pageLength/3),
            linkClassName = "page-item",
            activeName = " active",
            disabledName = " disabled";
        
        arrOfPages.push(<li key="previous" className={currentPage === 1 || this.props.pageLength === 0 ? linkClassName+disabledName : linkClassName}><button className="page-link" onClick={() => this.callGetPages(currentPage-1)}>Previous</button></li>);
        for(let i = 1; i <= conditionValue; i++) {
            arrOfPages.push(<li key={i} className={currentPage === i ? linkClassName+activeName : linkClassName} ><button type='button' className="page-link" onClick={() => this.callGetPages(i)}>{i}</button></li>);
        }
        arrOfPages.push(<li key="next" className={currentPage === conditionValue  || this.props.pageLength === 0 ? linkClassName+disabledName : linkClassName}><button onClick={() => this.callGetPages(currentPage+1)} className="page-link">Next</button></li>);
        return arrOfPages;
    }

    render() {
        return (
            <tr>
                <th colSpan={5}>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end">
                        {
                            this.props.currentStatus[0] !== false ? this.getPages(this.props.currentStatus[1]):this.state.links
                        }
                        </ul>
                    </nav>
                </th>
            </tr>
        );
    }
}
