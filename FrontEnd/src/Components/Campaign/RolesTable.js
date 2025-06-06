import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Toolbar from '@mui/material/Toolbar';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Service from '../../Machine/Service';
import apiClient from '../../Service/Service';

const RolesTable = () => {
  const {Servidor} = Service();
  const [roles, setRoles] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await apiClient.get(`http://${Servidor}/roles`);
      const data = await response.data;
      if (Array.isArray(data)) {
        setRoles(data);
      } else {
        console.error("Unexpected response data:", data);
        setRoles([]);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
      setRoles([]);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const estadoStyles = {
    padding: '4px 8px',
    borderRadius: '12px',
    color: 'white',
    display: 'inline-block',
  };
  
  const estadoActiva = {
    ...estadoStyles,
    backgroundColor: 'green',
  };
  
  const estadoInactiva = {
    ...estadoStyles,
    backgroundColor: 'red',
  };

  const router = useNavigate();

  const handleNewRol = () => {
    router.push("/CreateRol");
  };

  const handleEdit = (id) => {
    router.push(`/EditRol/${id}`);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // const filteredAreas = roles.filter(
  //   (rol) =>
  //     (rol.nombre_rol || "")
  //       .toLowerCase()
  //       .includes(searchTerm.toLowerCase())
  // );
  const filteredAreas = Array.isArray(roles) ? roles.filter((rol) =>
    (rol.nombre_rol || "").toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = filteredAreas.slice(startIndex, endIndex);

  
  return (
    <Paper>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            variant="outlined"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearchChange}
            size="small"
            sx={{ marginRight: 2 }}
          />
        </Box>
        <Button variant="outlined" startIcon={<AddCircleOutlineIcon />} onClick={handleNewRol} color="success">
          Nuevo Rol
        </Button>
      </Toolbar>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre del Rol</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acción</TableCell>
            </TableRow>
          </TableHead>
          {roles.length > 0 ? (
            <TableBody>
              {currentRows.map((roles) => (
                <TableRow key={roles.id_rol}>
                  <TableCell>{roles.id_rol}</TableCell>
                  <TableCell>{roles.nombre_rol}</TableCell>
                  <TableCell>
                    <Box sx={roles.estado_rol === 1 ? estadoActiva : estadoInactiva}>
                      {roles.estado_rol === 1 ? 'Activa' : 'Inactiva'}
                    </Box>
                  </TableCell>
                  <TableCell>
                      <IconButton aria-label="edit" onClick={() => handleEdit(roles.id_rol)}>
                        <EditRoundedIcon color="primary"/>
                      </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Cargando roles...
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={roles.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
      />
    </Paper>
  );
};

export default RolesTable;
