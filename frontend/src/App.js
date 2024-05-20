import React, { useState } from 'react';
import { Container, Grid, Paper, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box } from '@mui/material';
import CreateTableDialog from './components/CreateTableDialog';
import Header from './components/Header';
import Footer from './components/Footer';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddColumnDialog from './components/AddColumnDialog';
import Login from './components/Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openCreateTableDialog, setOpenCreateTableDialog] = useState(false);
  const [openAddColumnDialog, setOpenAddColumnDialog] = useState(false);
  const [openTableListDialog, setOpenTableListDialog] = useState(false);
  const [tables, setTables] = useState([]);
  const [selectedTableIndex, setSelectedTableIndex] = useState(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleOpenCreateTableDialog = () => {
    setOpenCreateTableDialog(true);
  };

  const handleCloseCreateTableDialog = () => {
    setOpenCreateTableDialog(false);
    setSelectedTableIndex(null);
  };

  const handleSubmitCreateTableDialog = (tableData) => {
    if (selectedTableIndex !== null) {
      const updatedTables = [...tables];
      updatedTables[selectedTableIndex] = tableData;
      setTables(updatedTables);
    } else {
      setTables([...tables, tableData]);
    }
    handleCloseCreateTableDialog();
  };

  const handleOpenEditTableDialog = (tableIndex) => {
    setSelectedTableIndex(tableIndex);
    setOpenCreateTableDialog(true);
  };

  const handleOpenAddColumnDialog = (tableIndex) => {
    setSelectedTableIndex(tableIndex);
    setOpenAddColumnDialog(true);
  };

  const handleCloseAddColumnDialog = () => {
    setOpenAddColumnDialog(false);
  };

  const handleSubmitAddColumnDialog = (columnData) => {
    const updatedTables = [...tables];
    updatedTables[selectedTableIndex].columns.push(columnData);
    setTables(updatedTables);
    handleCloseAddColumnDialog();
  };

  const handleOpenTableListDialog = () => {
    setOpenTableListDialog(true);
  };

  const handleCloseTableListDialog = () => {
    setOpenTableListDialog(false);
  };

  const handleDeleteTable = (tableIndex) => {
    const updatedTables = tables.filter((_, index) => index !== tableIndex);
    setTables(updatedTables);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header onOpenCreateTable={handleOpenCreateTableDialog} onOpenTableList={handleOpenTableListDialog} />
      <Container component="main" sx={{ mt: 8, mb: 2, flexGrow: 1 }}>
        <Grid container spacing={3}>
          {tables.map((table, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead style={{ backgroundColor: getTableHeaderColor(index) }}>
                    <TableRow>
                      <TableCell colSpan={3}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span>{table.tableName}</span>
                          <div>
                            <IconButton color="white" onClick={() => handleOpenEditTableDialog(index)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton color="white" onClick={() => handleOpenAddColumnDialog(index)}>
                              <AddIcon />
                            </IconButton>
                            <IconButton color="white" onClick={() => handleDeleteTable(index)}>
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {table.columns.map((column, colIndex) => (
                      <TableRow key={colIndex}>
                        <TableCell>{column.name}</TableCell>
                        <TableCell>{column.type}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          ))}
        </Grid>
      </Container>
      <CreateTableDialog open={openCreateTableDialog} onClose={handleCloseCreateTableDialog} onSubmit={handleSubmitCreateTableDialog} tableData={selectedTableIndex !== null ? tables[selectedTableIndex] : null} />
      <AddColumnDialog open={openAddColumnDialog} onClose={handleCloseAddColumnDialog} onSubmit={handleSubmitAddColumnDialog} />
      <Dialog open={openTableListDialog} onClose={handleCloseTableListDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ backgroundColor: '#1976D2', color: 'white' }}>Table List</DialogTitle>
        <DialogContent>
          {tables.length === 0 ? (
            <Typography variant="h6" align="center" sx={{ padding: '40px 0 0 0' }}>Empty List 😢</Typography>
          ) : (
            tables.map((table, index) => (
              <div key={index}>
                <Typography variant="h6">{table.tableName}</Typography>
                <ul>
                  {table.columns.map((column, colIndex) => (
                    <li key={colIndex}>{column.name} - {column.type}</li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTableListDialog} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </Box>
  );
};

const getTableHeaderColor = (index) => {
  const colors = ['#FFC0CB', '#87CEEB', '#98FB98', '#FFA07A', '#20B2AA', '#FFD700']; // Define your colors here
  return colors[index % colors.length];
};

export default App;
