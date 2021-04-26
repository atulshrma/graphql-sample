import React, { Component } from 'react';
import { gql } from '@apollo/client';
import getClient from '../../../helpers/apolloClient';
import Table from './Table';
import SearchBar from './SearchBar';

export default class JobsList extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            loading: false,
            count: 0,
            pageSize: 0,
            search: '',
            sort: {},
        };
        this.fetchData = this.fetchData.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
        this.searchChangeHandler = this.searchChangeHandler.bind(this);
        this.onSortToggle = this.onSortToggle.bind(this);
    }

    componentDidMount() {
        this.fetchData({ pageIndex: 0, pageSize: 10 });
    }

    fetchData({ pageIndex, pageSize, search, sort }) {
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
                        jobs(page: ${page}, size: ${size}, search: "${searchString}"${
                    sort && Object.keys(sort).length
                        ? ', orderBy:' + JSON.stringify(sort).replace(/"/g, '')
                        : ''
                }) {
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

    onSortToggle(id, isSorted, isAsc) {
        const { pageIndex, pageSize, search, sort } = this.state;
        if (!isSorted) {
            delete sort[id];
        } else {
            sort[id] = isAsc ? 'asc' : 'desc';
        }
        this.setState(
            Object.assign({}, this.state, {
                sort,
            }),
        );
        this.fetchData({ pageIndex, pageSize, search, sort });
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
            {
                Header: 'Description',
                accessor: 'description',
                disableSortBy: true,
            },
            { Header: 'Image', accessor: 'image', disableSortBy: true },
            {
                Header: 'Last Edited',
                id: 'dateLastEdited',
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
                        onSortToggle={this.onSortToggle}
                    />
                </div>
            </div>
        );
    }
}
