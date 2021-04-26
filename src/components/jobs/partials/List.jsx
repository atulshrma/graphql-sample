import React, { Component } from 'react';
import Table from './Table.jsx';
import { gql } from '@apollo/client';
import getClient from '../../../helpers/apolloClient';

export default class JobsList extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            loading: false,
            pageCount: 0,
        };
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData({ pageIndex: 0, pageSize: 10 });
    }

    fetchData({ pageIndex, pageSize }) {
        this.setState({ loading: true });
        getClient()
            .query({
                query: gql`
                    query GetJobs {
                        jobs(page: ${pageIndex + 1}, size: ${pageSize}) {
                            count
                            jobs {
                                name
                                description
                                image
                                dateLastEdited
                            }
                        }
                    }
                `,
            })
            .then((res) => {
                const { jobs, count } =
                    (res && res.data && res.data.jobs) || {};
                this.setState({ data: jobs, pageCount: count, loading: false });
            });
    }

    render() {
        const { data, loading, pageCount } = this.state;

        const columns = [
            { Header: 'Name', accessor: 'name' },
            { Header: 'Description', accessor: 'description' },
            { Header: 'Image', accessor: 'image' },
            {
                Header: 'Last Edit On',
                accessor: (row) => {
                    const date = new Date(0);
                    date.setUTCMilliseconds(row.dateLastEdited);
                    return date.toLocaleString();
                },
            },
        ];
        return (
            <div
                id="row"
                className="row h-100 justify-content-center align-items-center">
                <div id="col" className="col-md-10">
                    <h3 className="text-left text-info">Feed</h3>
                    <Table
                        columns={columns}
                        data={data}
                        fetchData={this.fetchData}
                        loading={loading}
                        pageCount={pageCount}
                    />
                </div>
            </div>
        );
    }
}
