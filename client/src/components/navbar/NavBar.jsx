import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext, ColorModeContext } from "../../contexts";
import { Button, styled, useTheme } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import "./navbar.css";
import { Switch } from '@material-ui/core';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const NavItem = styled(Link)(({ theme }) => ({
  '&.navbarItem':{
    fontSize: '16px',
    color: theme.palette.mode === 'light' ? 'black' : '#eff1f6bf',
    cursor: 'pointer',
    padding: '5px',
    marginLeft: '10px',
    textDecoration: 'none',
  },
  '&.navbarItem.active, &.navbarItem:hover': {
      color: theme.palette.mode === 'light' ? 'grey' : 'rgb(245, 245, 245)',
  },
}));

export default function NavBar(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const theme = useTheme();
  const options = ["", "View Profile", "Logout"];
  const colorMode = useContext(ColorModeContext);
  const appContext = useContext(AuthContext);
  const { login, setLogin } = appContext;
  const { mode , setMode } = colorMode;

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    if (options[index] === "View Profile") window.location = "/dashboard";
    else {
      localStorage.removeItem("login");
      localStorage.removeItem("access-token");
      localStorage.removeItem("username");
      setLogin(false);
      window.location = "/";
    }
  };

  const handleThemeChange = () => {
    setMode(mode === "dark" ? "light" : "dark");
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="navbar" style={{backgroundColor: theme.palette.mode === 'dark' ? 'rgb(40 40 40/1)' : 'white'}}>
      <div className="navbarWrapper">
        <div className="navLeft">
          <Link to="/" className="logo" style={{color: theme.palette.mode === 'dark' ? 'white' : 'rgb(15, 5, 54)'}}>
            NT-OJ
          </Link>
          <div className="navbarList">
            <NavItem to="/problemset" className="navbarItem">
              Problemset
            </NavItem>
            {login ? (
              <>
                <NavItem to="/addproblem" className="navbarItem">
                  Add Problem
                </NavItem>
                <NavItem to="/usersubmission" className="navbarItem">
                  My Submissions
                </NavItem>
              </>
            ) : null}
            <NavItem to="/rankings" className="navbarItem">
              Ranks
            </NavItem>
          </div>
        </div>
        <div className="navRight">
          {login ? (
            <>
              <div className="theme-switch-wrapper">
                <label className="theme-switch">
                    <MaterialUISwitch checked={mode === 'dark'} onChange={() => {handleThemeChange()}}/>
                </label>
              </div>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClickListItem}
              >
                <img
                  src="https://images.freeimages.com/images/large-previews/7e8/man-avatar-1632965.jpg"
                  alt="avatar"
                  className="navbarAvatar"
                />
              </Button>
              <Menu
                id="simple-menu"
                keepMounted
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {options.map((option, index) => (
                  <MenuItem
                    key={option}
                    disabled={index === 0}
                    selected={index === selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, index)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Link to="/signin" style={{ textDecoration: "none" }}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                className="signin-btn"
                fullWidth
              >
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
