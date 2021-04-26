import React from 'react';

export default function SearchBar({ onSubmit, onChange }) {
    return (
        <div className="row">
            <div className="col col-md-6">
                <form onSubmit={onSubmit}>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search job posts"
                            name="search"
                            onChange={onChange}
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="submit">
                                Search
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
