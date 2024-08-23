"use client"
import React, { useState } from 'react'

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

import { Clipboard } from "flowbite-react"
import Link from 'next/link'

const CopyPassword = (props) => {
    return (
        <Clipboard
            className='mt-1 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
            valueToCopy={props.value}
            label="Copy Password"
            // label={`Copy ${props.value.slice(0,3)}•••••••`}
        />
    );
};

const CopyUsername = (props) => {
    return (
        <Clipboard
            className='mt-1 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            valueToCopy={props.value}
            label={`Copy '${props.value}'`}
        />
    );
};

const RedirectButton = (props) => {
    return (
        <Link href={`/${props.value}`}>
            <button type="button" className="mt-1 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">View</button>
        </Link>
    );
};

export default function Table({ rowData }) {
    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
        { headerName: 'Site', field: "name", flex: 1 },
        { headerName: 'URL', field: "site", flex: 1 },
        { headerName: 'Username', field: "username", cellRenderer: CopyUsername, flex:1 },
        { headerName: 'Password', field: "password", cellRenderer: CopyPassword },
        { headerName: 'More Info', field: "id", cellRenderer: RedirectButton },
    ]);

    return (
        // wrapping container with theme & size
        <div
            className="ag-theme-quartz" // applying the Data Grid theme
            style={{ height: 500 }} // the Data Grid will fill the size of the parent container
        >
            <AgGridReact
                rowHeight={50}
                rowData={rowData}
                columnDefs={colDefs}
            />
        </div>
    )
}
