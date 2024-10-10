import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Typography, Button, Grid } from '@mui/material';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const RentableUnits = () => {
  const [rentableUnits, setRentableUnits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetchRentableUnits();
  }, []);

  const fetchRentableUnits = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/rentable_units`);
      setRentableUnits(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Failed to fetch rentable units');
      setLoading(false);
    }
  };

  // Export as Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rentableUnits);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'RentableUnits');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'rentable_units.xlsx');
  };

  // Export as CSV
  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(rentableUnits);
    const csvBuffer = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvBuffer], { type: 'text/csv' });
    saveAs(blob, 'rentable_units.csv');
  };

  // Export as PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Rentable Units', 20, 10);

    const tableColumn = ['House Name', 'Apartment', 'Rent Amount', 'KIWASKO Meter No', 'KIWASKO Account No'];
    const tableRows = rentableUnits.map(unit => [
      unit.house_name,
      unit.apartmentName,
      unit.rent_amount,
      unit.kiwasco_meter_no,
      unit.kiwasco_account_no
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save('rentable_units.pdf');
  };

  const columns = [
    { field: 'house_name', headerName: 'House Name', width: 200 },
    { field: 'apartmentName', headerName: 'Apartment', width: 200 },
    { field: 'rent_amount', headerName: 'Rent Amount', width: 150 },
    { field: 'kiwasco_meter_no', headerName: 'KIWASKO Meter No', width: 200 },
    { field: 'kiwasco_account_no', headerName: 'KIWASKO Account No', width: 200 },
  ];

  return (
    <Box sx={{ padding: '20px', marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Rentable Units
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      {/* Export Buttons */}
      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        <Grid item>
          <Button onClick={exportToExcel} sx={{ backgroundColor: 'transparent', border: '1px solid gray' }}>
            Export to Excel
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={exportToCSV} sx={{ backgroundColor: 'transparent', border: '1px solid gray' }}>
            Export to CSV
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={exportToPDF} sx={{ backgroundColor: 'transparent', border: '1px solid gray' }}>
            Export to PDF
          </Button>
        </Grid>
      </Grid>

      {/* DataGrid for Rentable Units */}
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rentableUnits}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          checkboxSelection
          components={{ Toolbar: GridToolbar }}
          loading={loading}
          getRowId={(row) => row.house_name} 
        />
      </Box>
    </Box>
  );
};

export default RentableUnits;
