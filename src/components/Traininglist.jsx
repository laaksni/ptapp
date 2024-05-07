import { useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    const gridRef = useRef();

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        { field: "date", sortable: true, filter: true },
        { field: "duration", sortable: true, filter: true },
        { field: "activity", sortable: true, filter: true },
        { 
            field: "customer",
            headerName: "Customer",
            sortable: true,
            filter: true,
            valueGetter: params => params.data.customerInfo ? `${params.data.customerInfo.firstname} ${params.data.customerInfo.lastname}` : ''
        }
    ];

    const fetchData = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings')
            .then((response) => response.json())
            .then((data) => {
                Promise.all(data._embedded.trainings.map(training => {
                    return fetch(training._links.customer.href)
                        .then(response => response.json());
                })).then(customerData => {
                    const modifiedTrainings = data._embedded.trainings.map((training, index) => {
                        training.customerInfo = customerData[index];
                        return training;
                    });
                    setTrainings(modifiedTrainings);
                });
            })
            .catch(error => console.error('Error fetching trainings:', error));
    };

    const handleChangeDate = (date) => {
        setTrainings({ ...trainings, date });
    };

    return (
        <>
            <div>
                <Stack mt={2} direction="row" spacing={2} justifyContent="center" alignItems="center">
                    <DatePicker
                        label="Date"
                        onChange={handleChangeDate}
                        value={trainings.date || null}
                        TextField={(params) => <TextField {...params} />} />
                    <TextField
                        placeholder="Duration"
                        onChange={e => setTrainings({ ...trainings, duration: e.target.value })}
                        value={trainings.duration} />
                    <TextField
                        placeholder="Activity"
                        onChange={e => setTrainings({ ...trainings, activity: e.target.value })}
                        value={trainings.activity} />
                    <TextField
                        placeholder="Customer"
                        onChange={e => setTrainings({ ...trainings, customer: e.target.value })}
                        value={trainings.customer} />
                </Stack>
                <div className="ag-theme-material" style={{ width: '100%', height: 500 }}>
                    <AgGridReact
                        ref={gridRef}
                        onGridReady={params => gridRef.current = params.api}
                        rowData={trainings}
                        columnDefs={columns}
                        rowSelection="single"
                    />
                </div>
            </div>
        </>
    );
}  
