import { Box } from '@mui/material';
import { GridToolbarQuickFilter } from '@mui/x-data-grid';

function SearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
        my: 2,
      }}
    >
      <GridToolbarQuickFilter
        quickFilterParser={(searchInput) => {
          searchInput
            .split(',')
            .map((value) => value.trim())
            .filter((value) => value !== '');
        }}
      />
    </Box>
  );
}

export default SearchToolbar;
