import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid } from '@mui/material';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const TotalCollections = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/payments`);
        setPayments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching payments:', error);
        setLoading(false);
      }
    };

    fetchPayments();
  }, [apiUrl]);

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(payments);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'TotalCollections');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'total_collections.xlsx');
  };

  // Export to CSV
  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(payments);
    const csvBuffer = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvBuffer], { type: 'text/csv' });
    saveAs(blob, 'total_collections.csv');
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Total Collections', 20, 10);

    const tableColumn = ['Tenant Name', 'House Number', 'Invoice', 'Period', 'Amount Paid'];
    const tableRows = payments.map(payment => [
      payment.tenant_name,
      payment.house_name,
      payment.invoiceID,
      `${payment.month} ${payment.year}`,
      payment.amountPaid,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save('total_collections.pdf');
  };

  return (
    <Container sx={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Total Collections
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
        <Typography>Loading payments...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Tenant Name</strong></TableCell>
                <TableCell><strong>House Number</strong></TableCell>
                <TableCell><strong>Invoice</strong></TableCell>
                <TableCell><strong>Period</strong></TableCell>
                <TableCell><strong>Amount Paid</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment, index) => (
                <TableRow key={index}>
                  <TableCell>{payment.tenant_name}</TableCell>
                  <TableCell>{payment.house_name}</TableCell>
                  <TableCell>{payment.invoiceID}</TableCell>
                  <TableCell>{`${payment.month} ${payment.year}`}</TableCell>
                  <TableCell>{payment.amountPaid}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default TotalCollections;
