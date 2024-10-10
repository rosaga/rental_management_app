import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Typography, Container, Button, Grid, Box } from '@mui/material';
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

  const columns = [
    { field: 'tenant_name', headerName: 'Tenant Name', width: 200 },
    { field: 'house_name', headerName: 'House Number', width: 150 },
    { field: 'invoiceTypeName', headerName: 'Invoice Type', width: 200 },
    { field: 'amountDue', headerName: 'Amount Due', width: 150 },
    { field: 'month', headerName: 'Month', width: 100 },
    { field: 'year', headerName: 'Year', width: 100 },
  ];

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

      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={tenantBalances}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          checkboxSelection
          getRowId={(row) => `${row.tenant_name}-${row.house_name}-${row.invoiceTypeName}`}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Container>
  );
};

export default TenantBalances;
