import React from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const SearchBar = ({ search, onSearchChange, onClear }) => {
  return (
    <TextField
      label="Buscar libro"
      variant="outlined"
      value={search}
      onChange={onSearchChange}
      fullWidth
      sx={{ mb: 3 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="limpiar"
              onClick={onClear}
              edge="end"
              size="small"
              disabled={!search}
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
