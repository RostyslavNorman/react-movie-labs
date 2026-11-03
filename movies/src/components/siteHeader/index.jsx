import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../../contexts/colorModeContext";

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  // 9 пунктов меню не влезают в одну строку уже на ~1200px, ниже — бургер
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const navigate = useNavigate();

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Popular", path: "/movies/popular" },
    { label: "Top Rated", path: "/movies/top-rated" },
    { label: "Now Playing", path: "/movies/now-playing" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Must Watch", path: "/movies/must-watch" },
    { label: "Fav Actors", path: "/actors/favorites" },
    { label: "Search", path: "/search" },
  ];

  const { mode, toggle } = useContext(ColorModeContext);

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <AppBar position="sticky" color="secondary">
      <Toolbar>
        <Typography
          variant="h4"
          component={Link}
          to="/"
          noWrap
          sx={{ color: "inherit", textDecoration: "none", mr: 3 }}
        >
          TMDB Client
        </Typography>
        <Typography
          variant="h6"
          noWrap
          sx={{ display: { xs: "none", xl: "block" } }}
        >
          All you ever wanted to know about Movies!
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {isMobile ? (
          <>
            <IconButton
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={open}
              onClose={() => setAnchorEl(null)}
            >
              {menuOptions.map((opt) => (
                <MenuItem key={opt.label} onClick={() => handleMenuSelect(opt.path)}>
                  {opt.label}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          menuOptions.map((opt) => (
            <Button
              key={opt.label}
              color="inherit"
              onClick={() => handleMenuSelect(opt.path)}
              sx={{ whiteSpace: "nowrap" }}
            >
              {opt.label}
            </Button>
          ))
        )}
        <IconButton color="inherit" onClick={toggle} aria-label="toggle dark mode">
          {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default SiteHeader;