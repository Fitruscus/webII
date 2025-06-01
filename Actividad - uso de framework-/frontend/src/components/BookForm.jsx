import { TextField ,Button,Box} from "@mui/material"
import React from "react";
import { useState } from "react";

const BookForm = ({ libro, onchange, onsubmit }) => {
  return (
    <>
      <Box
        component="form"
        sx={{ mb: 4, display: 'flex', gap: 2 }}
        onSubmit={onsubmit}
      >
        <TextField
  label="Título"
  name="Titulo"
  value={libro.Titulo || ''}
  onChange={onchange}
  required
  fullWidth
  sx={{ flex: 1 }}
  placeholder="Título del libro"
/>
<TextField
  label="Autor"
  name="Autor"
  value={libro.Autor || ''}
  onChange={onchange}
  required
  fullWidth
  sx={{ flex: 1 }}
  placeholder="Autor"
/>
<TextField
  label="Año"
  name="Anio"
  type="number"
  value={libro.Anio || ''}
  onChange={onchange}
  required
  fullWidth
  sx={{ flex: 1 }}
  placeholder="Año de publicación"
/>
<Button
  type="submit"
  variant="contained"
  color="primary"
  sx={{ minWidth: 120 }}
>
  {libro.id ? 'Actualizar' : 'Agregar'}
</Button>
      </Box>
    </>
  );
};

export default BookForm;
