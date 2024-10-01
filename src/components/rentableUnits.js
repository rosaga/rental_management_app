import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container, Button, Grid } from '@mui/material';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const RentableUnits = () => {
  const [rentableUnits, setRentableUnits] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRentableUnits = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/rentable_units`);
        setRentableUnits(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.error : 'Failed to fetch rentable units');
      }
    };

    fetchRentableUnits();
  }, []);

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

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Rentable Units
      </Typography>
      {error && <Typography color="error">{error}</Typography>}

      {/* Export Buttons */}
      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        <Grid item>
          <Button variant="contained" onClick={exportToExcel}>
            Export to Excel
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={exportToCSV}>
            Export to CSV
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={exportToPDF}>
            Export to PDF
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>House Name</TableCell>
              <TableCell>Apartment</TableCell>
              <TableCell>Rent Amount</TableCell>
              <TableCell>KIWASKO Meter No</TableCell>
              <TableCell>KIWASKO Account No</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rentableUnits.map((unit, index) => (
              <TableRow key={index}>
                <TableCell>{unit.house_name}</TableCell>
                <TableCell>{unit.apartmentName}</TableCell>
                <TableCell>{unit.rent_amount}</TableCell>
                <TableCell>{unit.kiwasco_meter_no}</TableCell>
                <TableCell>{unit.kiwasco_account_no}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default RentableUnits;
