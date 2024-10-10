import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Typography, Button, Grid } from '@mui/material';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const PendingInvoices = () => {
  const [pendingInvoices, setPendingInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetchPendingInvoices();
  }, []);

  const fetchPendingInvoices = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/pending_invoices`);
      setPendingInvoices(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pending invoices:', error);
      setLoading(false);
    }
  };

  // Export as Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(pendingInvoices);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'PendingInvoices');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'pending_invoices.xlsx');
  };

  // Export as CSV
  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(pendingInvoices);
    const csvBuffer = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvBuffer], { type: 'text/csv' });
    saveAs(blob, 'pending_invoices.csv');
  };

  // Export as PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Pending Invoices', 20, 10);

    const tableColumn = ['Tenant Name', 'House Name', 'Invoice Type', 'Amount Due', 'Period'];
    const tableRows = pendingInvoices.map((invoice) => [
      invoice.tenant_name,
      invoice.house_name,
      invoice.invoiceTypeName,
      invoice.amountDue,
      `${invoice.month} ${invoice.year}`,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save('pending_invoices.pdf');
  };

  const columns = [
    { field: 'tenant_name', headerName: 'Tenant Name', width: 200 },
    { field: 'house_name', headerName: 'House Name', width: 200 },
    { field: 'invoiceTypeName', headerName: 'Invoice Type', width: 150 },
    { field: 'amountDue', headerName: 'Amount Due', width: 150 },
    { field: 'period', headerName: 'Period', width: 150, valueGetter: (params) => `${params.row.month} ${params.row.year}` },
  ];

  return (
    <Box sx={{ marginTop: '50px', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Pending Invoices
      </Typography>

      {/* Export buttons */}
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

      {/* DataGrid for Pending Invoices */}
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={pendingInvoices}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          checkboxSelection
          components={{ Toolbar: GridToolbar }}
          loading={loading}
          getRowId={(row) => row.invoiceID}
        />
      </Box>
    </Box>
  );
};

export default PendingInvoices;
