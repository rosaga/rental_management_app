import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container, Button, Grid } from '@mui/material';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const TenantBalances = () => {
  const [tenantBalances, setTenantBalances] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTenantBalances = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/tenant_balances`);
        setTenantBalances(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.error : 'Failed to fetch tenant balances');
      }
    };

    fetchTenantBalances();
  }, []);

  // Export as Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tenantBalances);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'TenantBalances');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'tenant_balances.xlsx');
  };

  // Export as CSV
  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(tenantBalances);
    const csvBuffer = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvBuffer], { type: 'text/csv' });
    saveAs(blob, 'tenant_balances.csv');
  };

  // Export as PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Tenant Balances', 20, 10);

    const tableColumn = ['Tenant Name', 'House Number', 'Invoice Type', 'Amount Due', 'Period'];
    const tableRows = tenantBalances.map(balance => [
      balance.tenant_name,
      balance.house_name,
      balance.invoiceTypeName,
      balance.amountDue,
      `${balance.month} ${balance.year}`
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save('tenant_balances.pdf');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Tenant Balances
      </Typography>
      {error && <Typography color="error">{error}</Typography>}

      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        <Grid item>
          <Button onClick={exportToExcel}>
            Export to Excel
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={exportToCSV}>
            Export to CSV
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={exportToPDF}>
            Export to PDF
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tenant Name</TableCell>
              <TableCell>House Number</TableCell>
              <TableCell>Invoice Type</TableCell>
              <TableCell>Amount Due</TableCell>
              <TableCell>Period</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tenantBalances.map((balance, index) => (
              <TableRow key={index}>
                <TableCell>{balance.tenant_name}</TableCell>
                <TableCell>{balance.house_name}</TableCell>
                <TableCell>{balance.invoiceTypeName}</TableCell>
                <TableCell>{balance.amountDue}</TableCell>
                <TableCell>{balance.month} {balance.year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TenantBalances;
