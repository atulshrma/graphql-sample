import React, { useEffect } from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import cx from 'classnames';

export default function Table({
    columns,
    data,
    fetchData,
    pageCount,
    onSortToggle,
}) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            manualPagination: true,
            autoResetPage: false,
            pageCount,
            manualSortBy: true,
        },
        useSortBy,
        usePagination,
    );

    useEffect(() => {
        fetchData({ pageIndex, pageSize });
    }, [fetchData, pageIndex, pageSize]);

    const renderColumnHeader = function (column) {
        const props = column.getHeaderProps(column.getSortByToggleProps());

        let onClick;
        const classNames = cx({
            'fa fa-sort-up': column.isSorted && !column.isSortedDesc,
            'fa fa-sort-down': column.isSorted && column.isSortedDesc,
        });
        if (column.canSort) {
            onClick = function (event) {
                const isAsc =
                    column.isSorted === false &&
                    column.isSortedDesc === undefined;
                const isDesc =
                    column.isSorted === true && column.isSortedDesc === false;
                props.onClick(event);
                if (onSortToggle) {
                    onSortToggle(column.id, isAsc || isDesc, isAsc);
                }
            };
        }
        return (
            <th {...props} onClick={onClick}>
                {column.render('Header')}
                <i className={classNames}></i>
            </th>
        );
    };

    // Render the UI for your table
    return (
        <React.Fragment>
            {/* <div className="row">
                <div className="col-md-4 input-group mb-3">
                    <div className="input-group-prepend">
                        <label
                            className="input-group-text"
                            htmlFor="goToPageInput">
                            Go to page:{' '}
                        </label>
                    </div>
                    <input
                        id="goToPageInput"
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            gotoPage(page);
                        }}
                        style={{ width: '100px' }}
                    />
                </div>
                <span className="col-md-4 text-center">
                    <select
                        className="custom-select"
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                        }}>
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </span>
            </div> */}
            <table {...getTableProps()} className="table">
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(renderColumnHeader)}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="row">
                <div className="col-md-4 input-group mb-3">
                    <div className="input-group-prepend">
                        <label
                            className="input-group-text"
                            htmlFor="goToPageInput">
                            Go to page:{' '}
                        </label>
                    </div>
                    <input
                        id="goToPageInput"
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            gotoPage(page);
                        }}
                        style={{ width: '100px' }}
                    />
                </div>
                <span className="col-md-4 text-center">
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <ul className="pagination col-md-4 justify-content-end">
                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={() => gotoPage(0)}
                            disabled={!canPreviousPage}
                            aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </button>
                    </li>
                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}>
                            Previous
                        </button>
                    </li>
                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={() => nextPage()}>
                            Next
                        </button>
                    </li>
                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={() => gotoPage(pageCount - 1)}
                            disabled={!canNextPage}
                            aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </button>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    );
}
