import React, { Component } from 'react';
import { gql } from '@apollo/client';
import getClient from '../../../helpers/apolloClient';
import Table from './Table.js';
import SearchBar from './SearchBar.js';

export default class JobsList extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            loading: false,
            count: 0,
            pageSize: 0,
            search: '',
        };
        this.fetchData = this.fetchData.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
        this.searchChangeHandler = this.searchChangeHandler.bind(this);
    }

    componentDidMount() {
        this.fetchData({ pageIndex: 0, pageSize: 10 });
    }

    fetchData({ pageIndex, pageSize, search }) {
        this.setState({ loading: true });
        const page = pageIndex || 0 + 1;
        const size = pageSize || 10;
        const text = search || '';
        const shouldEscape = text.includes('"');
        const searchString = shouldEscape ? text.replaceAll('"', '\\"') : text;
        getClient()
            .query({
                query: gql`
                    query GetJobs {
                        jobs(page: ${page}, size: ${size}, search: "${searchString}") {
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
                console.log(jobs, count);
                this.setState({
                    data: jobs,
                    count: count,
                    loading: false,
                    pageSize,
                    search,
                });
            });
    }

    searchHandler(event) {
        event.preventDefault();
        const { pageSize, search } = this.state;
        this.fetchData({ pageSize, search });
    }

    searchChangeHandler(event) {
        this.setState(
            Object.assign({}, this.state, {
                search: event.target.value.trim(),
            }),
        );
    }

    render() {
        const { data, loading, count, pageSize } = this.state;

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
                    <SearchBar
                        onSubmit={this.searchHandler}
                        onChange={this.searchChangeHandler}
                    />
                    <Table
                        columns={columns}
                        data={data}
                        fetchData={this.fetchData}
                        loading={loading}
                        pageCount={Math.ceil(count / pageSize)}
                    />
                </div>
            </div>
        );
    }
}
