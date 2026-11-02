import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'
import React, { useState, useEffect } from "react";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';
import Slider from "@mui/material/Slider";

const formControl =
{
  margin: 1,
  minWidth: "90%",
  backgroundColor: "rgb(255, 255, 255)"
};

export default function FilterMoviesCard(props) {

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = data.genres;
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const languages = [
    { code: "all", name: "All" },
    { code: "en", name: "English" },
    { code: "fr", name: "French" },
    { code: "es", name: "Spanish" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
  ];




  return (
    <Card
      sx={{
        backgroundColor: "rgb(204, 204, 0)"
      }}
      variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
        </Typography>
        <TextField
          sx={{ ...formControl }}
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
        />

        <Typography sx={{ mt: 2, ml: 1 }}>Minimum rating: {props.ratingFilter}</Typography>
        <Slider
          value={props.ratingFilter}
          onChange={(e, value) => props.onUserInput("rating", value)}
          min={0}
          max={10}
          step={0.5}
          valueLabelDisplay="auto"
          sx={{ width: "90%", mx: 1 }}
        />

        <FormControl sx={{ ...formControl }}>
          <InputLabel id="language-label">Language</InputLabel>
          <Select
            labelId="language-label"
            label="Language"
            value={props.languageFilter}
            onChange={(e) => props.onUserInput("language", e.target.value)}
          >
            {languages.map((l) => (
              <MenuItem key={l.code} value={l.code}>{l.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ ...formControl }}>
          <InputLabel id="sort-label">Sort by</InputLabel>
          <Select
            labelId="sort-label"
            label="Sort by"
            value={props.sortBy}
            onChange={(e) => props.onUserInput("sort", e.target.value)}
          >
            <MenuItem value="none">Default</MenuItem>
            <MenuItem value="ratingDesc">Rating: high → low</MenuItem>
            <MenuItem value="ratingAsc">Rating: low → high</MenuItem>
            <MenuItem value="dateDesc">Newest first</MenuItem>
            <MenuItem value="dateAsc">Oldest first</MenuItem>
            <MenuItem value="titleAsc">Title A–Z</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
      <CardMedia
        sx={{ height: 300 }}
        image={img}
        title="Filter"
      />
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}
