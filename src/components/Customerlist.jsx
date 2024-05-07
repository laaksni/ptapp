import { useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function Customerlistlist() {
    const [customers, setCustomers] = useState([]);
    const gridRef = useRef();

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        { field: "firstname", sortable: true, filter: true },
        { field: "lastname", sortable: true, filter: true },
        { field: "streetaddress", sortable: true, filter: true },
        { field: "postcode", sortable: true, filter: true },
        { field: "city", sortable: true, filter: true },
        { field: "email", sortable: true, filter: true },
        { field: "phone", sortable: true, filter: true }
    ];

    const fetchData = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers')
            .then((response) => response.json())
            .then((data) => setCustomers(data._embedded.customers))
            .catch(error => console.error('Error fetching customers:', error));
    };

    return (
        <>
            <div>
                <Stack mt={2} direction="row" spacing={2} justifyContent="center" alignItems="center">
                    <TextField
                        placeholder="Firstname"
                        onChange={e => setCustomers({ ...customers, firstname: e.target.value })}
                        value={customers.firstname} />
                    <TextField
                        placeholder="Lastname"
                        onChange={e => setCustomers({ ...customers, lastname: e.target.value })}
                        value={customers.lastname} />
                    <TextField
                        placeholder="Adress"
                        onChange={e => setCustomers({ ...customers, streetaddress: e.target.value })}
                        value={customers.streetaddress} />
                    <TextField
                        placeholder="Postcode"
                        onChange={e => setCustomers({ ...customers, postcode: e.target.value })}
                        value={customers.postcode} />
                    <TextField
                        placeholder="City"
                        onChange={e => setCustomers({ ...customers, city: e.target.value })}
                        value={customers.city} />
                    <TextField
                        placeholder="Email"
                        onChange={e => setCustomers({ ...customers, email: e.target.value })}
                        value={customers.email} />
                    <TextField
                        placeholder="Phone"
                        onChange={e => setCustomers({ ...customers, phone: e.target.value })}
                        value={customers.phone} />
                </Stack>
                <div className="ag-theme-material" style={{ width: '100%', height: 500 }}>
                    <AgGridReact
                        ref={gridRef}
                        onGridReady={params => gridRef.current = params.api}
                        rowData={customers}
                        columnDefs={columns}
                        rowSelection="single"
                    />
                </div>
            </div>
        </>
    );
}
