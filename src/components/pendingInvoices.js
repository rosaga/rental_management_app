import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid } from '@mui/material';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const PendingInvoices = () => {
  const [pendingInvoices, setPendingInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.REACT_APP_API_BASE_URL;

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

  useEffect(() => {
    fetchPendingInvoices();
  }, []);

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

  return (
    <Container>
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

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6">Tenant Name</Typography></TableCell>
                <TableCell><Typography variant="h6">House Name</Typography></TableCell>
                <TableCell><Typography variant="h6">Invoice Type</Typography></TableCell>
                <TableCell><Typography variant="h6">Amount Due</Typography></TableCell>
                <TableCell><Typography variant="h6">Period</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingInvoices.length > 0 ? (
                pendingInvoices.map((invoice) => (
                  <TableRow key={invoice.invoiceID}>
                    <TableCell>{invoice.tenant_name}</TableCell>
                    <TableCell>{invoice.house_name}</TableCell>
                    <TableCell>{invoice.invoiceTypeName}</TableCell>
                    <TableCell>{invoice.amountDue}</TableCell>
                    <TableCell>{invoice.month} {invoice.year}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5}><Typography>No pending invoices found.</Typography></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default PendingInvoices;
