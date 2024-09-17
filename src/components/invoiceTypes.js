import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const InvoiceTypes = () => {
  const [invoiceTypes, setInvoiceTypes] = useState([]);

  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchInvoiceTypes = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/invoice_types`);
        setInvoiceTypes(response.data);
      } catch (error) {
        console.error('Error fetching Invoice Types:', error);
      }
    };

    fetchInvoiceTypes();
  }, [apiUrl]);

  const columns = [
    { field: 'invoiceTypeID', headerName: 'Invoice Type ID', width: 100 },
    { field: 'invoiceType', headerName: 'Invoice Type', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            component={Link}
            to={`/edit-invoice-type/${params.row.invoiceTypeID}`}
            color="primary"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleDelete(params.row.invoiceTypeID)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const handleDelete = async (invoiceTypeID) => {
    try {
      await axios.delete(`${apiUrl}/api/invoice_type/${invoiceTypeID}`);
      setInvoiceTypes(invoiceTypes.filter((invoiceTypes) => invoiceTypes.invoiceTypeID !== invoiceTypeID));
    } catch (error) {
      console.error('Error deleting invoice type:', error);
    }
  };

  return (
    <div style={{ height: 600, width: '100%', marginTop: '-100px' }}>
      <h2>Invoice Types</h2>
      <DataGrid
        rows={invoiceTypes}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        getRowId={(row) => row.invoiceTypeID}
      />
    </div>
  );
};

export default InvoiceTypes;
