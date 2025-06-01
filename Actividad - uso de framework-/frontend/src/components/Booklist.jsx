import React from 'react';
import { Grid, Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const BookList = ({ libros, onDelete, onEdit }) => {
  if (!libros.length) {
    return (
      <Typography variant="body1" color="text.secondary" sx={{ mt: 4 }}>
        No hay libros para mostrar.
      </Typography>
    );
  }
  return (
    <Grid container spacing={2}>
      {libros.map((libro) => (
        <Grid item xs={12} sm={6} md={4} key={libro.id}>
          <Card variant="outlined" sx={{ position: 'relative' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>{libro.Titulo}</Typography>
              <Typography variant="body2" color="text.secondary">
                {libro.Autor} ({libro.Anio})
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <IconButton color="primary" onClick={() => onEdit(libro)}>
                  <span className="material-icons">edit</span>
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(libro)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
export default BookList;