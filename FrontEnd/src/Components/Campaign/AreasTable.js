import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Toolbar from "@mui/material/Toolbar";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Service from "../../Machine/Service";
import apiClient from "../../Service/Service";

const AreasTable = () => {
  const {Servidor} = Service();
  const [areas, setAreas] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAreas();
  }, []);

  const fetchAreas = async () => {
    try {
      const response = await apiClient.get(`http:${Servidor}/areas`);
      const data = await response.data;
      if (Array.isArray(data)) {
        setAreas(data);
      } else {
        console.error("Unexpected response data:", data);
        setAreas([]);
      }
    } catch (error) {
      console.error("Error fetching areas:", error);
      setAreas([]);
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
    padding: "4px 8px",
    borderRadius: "12px",
    color: "white",
    display: "inline-block",
  };

  const estadoActiva = {
    ...estadoStyles,
    backgroundColor: "green",
  };

  const estadoInactiva = {
    ...estadoStyles,
    backgroundColor: "red",
  };

  const router = useNavigate();

  const handleEdit = (id) => {
    router.push(`/EditArea/${id}`);
  };

  const handleNewArea = () => {
    router.push("/CreateArea");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAreas = Array.isArray(areas) ? areas.filter((area) =>
    (area.nombre_area || "").toLowerCase().includes(searchTerm.toLowerCase())
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
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleNewArea}
          color="success"
        >
          Nueva Área
        </Button>
      </Toolbar>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre del Área</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acción</TableCell>
            </TableRow>
          </TableHead>
          {areas.length > 0 ? (
            <TableBody>
              {currentRows.map((area) => (
                <TableRow key={area.id_area}>
                  <TableCell>{area.id_area}</TableCell>
                  <TableCell>{area.nombre_area}</TableCell>
                  <TableCell>
                    <Box
                      sx={
                        area.estado_area === 1 ? estadoActiva : estadoInactiva
                      }
                    >
                      {area.estado_area === 1 ? "Activa" : "Inactiva"}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEdit(area.id_area)}
                    >
                      <EditRoundedIcon color="primary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Cargando áreas...
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {areas.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={filteredAreas.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count}`
          }
        />
      )}
    </Paper>
  );
};

export default AreasTable;
