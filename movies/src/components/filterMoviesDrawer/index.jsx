import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { languages, sortOptions } from "./options";

export default function FilterMoviesDrawer({
  open,
  onClose,
  filters,
  genres,
  onChange,
  onReset,
  resultCount,
}) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box
        sx={{
          width: { xs: "100vw", sm: 360 },
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", px: 3, py: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Filters
          </Typography>
          <IconButton aria-label="close filters" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />

        <Stack spacing={3} sx={{ p: 3, flexGrow: 1, overflowY: "auto" }}>
          <TextField
            label="Search by title"
            placeholder="e.g. Batman"
            value={filters.name}
            onChange={(e) => onChange("name", e.target.value)}
            fullWidth
            autoFocus
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            select
            label="Genre"
            value={filters.genre}
            onChange={(e) => onChange("genre", e.target.value)}
            fullWidth
          >
            <MenuItem value="0">All genres</MenuItem>
            {genres.map((g) => (
              <MenuItem key={g.id} value={g.id}>
                {g.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Original language"
            value={filters.language}
            onChange={(e) => onChange("language", e.target.value)}
            fullWidth
          >
            {languages.map((l) => (
              <MenuItem key={l.code} value={l.code}>
                {l.name}
              </MenuItem>
            ))}
          </TextField>

          <Box>
            <Typography gutterBottom>
              Minimum rating:{" "}
              <strong>{filters.rating > 0 ? `${filters.rating}+` : "Any"}</strong>
            </Typography>
            <Slider
              value={filters.rating}
              onChange={(e, value) => onChange("rating", value)}
              min={0}
              max={10}
              step={0.5}
              marks={[
                { value: 0, label: "0" },
                { value: 5, label: "5" },
                { value: 10, label: "10" },
              ]}
              valueLabelDisplay="auto"
              aria-label="Minimum rating"
            />
          </Box>

          <TextField
            select
            label="Sort by"
            value={filters.sort}
            onChange={(e) => onChange("sort", e.target.value)}
            fullWidth
          >
            {sortOptions.map((s) => (
              <MenuItem key={s.value} value={s.value}>
                {s.label}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <Divider />
        <Stack direction="row" spacing={2} sx={{ p: 2 }}>
          <Button variant="outlined" color="inherit" onClick={onReset} sx={{ flex: 1 }}>
            Reset
          </Button>
          <Button variant="contained" onClick={onClose} sx={{ flex: 2, whiteSpace: "nowrap" }}>
            Show {resultCount} {resultCount === 1 ? "movie" : "movies"}
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
}