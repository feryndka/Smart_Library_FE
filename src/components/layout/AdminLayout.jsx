"use client";
import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRouter, usePathname } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";
import BookIcon from "@mui/icons-material/Book";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const drawerWidth = 240;

function UserLayout(props) {
  const { window } = props;
  const { children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  // Dark Mode
  const darkColor = "bg-[#0C2340] text-gray-50";
  const lightColor = "bg-[#FFFFFF] text-gray-900";
  const [darkMode, setDarkMode] = useState(lightColor);
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (checked) {
      setDarkMode(darkColor);
    } else {
      setDarkMode(lightColor);
    }
  };

  const drawer = (
    <>
      <Toolbar className={`${darkMode}`}>
        <LocalLibraryIcon className="-ml-2 mr-3" fontSize="large" />
        <Typography variant="h6" noWrap component="div">
          Smart Library
        </Typography>
      </Toolbar>
      <Divider />
      <div className={`flex flex-col justify-between h-full ${darkMode}`}>
        <div>
          <List>
            {[
              "Dashboard",
              "Analytics",
              "Users",
              "Books",
              "Peminjaman",
              "Pengembalian",
              "Location",
            ].map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                className={
                  pathname.startsWith("/" + item.toLocaleLowerCase())
                    ? "text-sky-600 bg-slate-100"
                    : "text-slate-500"
                }
                onClick={() => {
                  router.push("/" + item.toLocaleLowerCase());
                }}
              >
                <ListItemButton
                  className={
                    pathname.startsWith("/" + item.toLocaleLowerCase())
                      ? "text-sky-600 hover:bg-slate-100"
                      : "text-slate-500"
                  }
                >
                  <ListItemIcon
                    className={
                      pathname.startsWith("/" + item.toLocaleLowerCase())
                        ? "text-sky-600 bg-slate-100"
                        : "text-slate-500"
                    }
                  >
                    {index === 0 && <SpaceDashboardIcon />}
                    {index === 1 && <QueryStatsIcon />}
                    {index === 2 && <PeopleAltIcon />}
                    {index === 3 && <BookIcon />}
                    {index === 4 && <BookmarkBorderIcon />}
                    {index === 5 && <ImportContactsOutlinedIcon />}
                    {index === 6 && <LocationOnIcon />}
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
        <div>
          <List>
            {[
              {
                title: "Settings",
                href: "/settings",
              },
              {
                title: "Logout",
                href: "/logout",
              },
            ].map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                className={
                  pathname === item.href
                    ? "text-sky-600 bg-slate-100"
                    : "text-slate-500"
                }
                onClick={() => {
                  router.push(item.href);
                }}
              >
                <ListItemButton
                  className={
                    pathname === item.href
                      ? "text-sky-600 hover:bg-slate-100"
                      : "text-slate-500"
                  }
                >
                  <ListItemIcon
                    className={
                      pathname === item.href
                        ? "text-sky-600 bg-slate-100"
                        : "text-slate-500"
                    }
                  >
                    {index === 0 && <SettingsIcon />}
                    {index === 1 && <LogoutIcon />}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
      width: 32,
      height: 32,
      "&::before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  }));

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        className={`${darkMode}`}
      >
        <div className="flex justify-between">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" noWrap component="div">
              Dashboard
            </Typography>
          </Toolbar>
          <div className="mt-3 mr-3">
            <Typography noWrap component="div">
              <MaterialUISwitch
                sx={{ m: 1 }}
                checked={checked}
                onChange={handleChange}
              />
            </Typography>
          </div>
        </div>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginTop: "64px",
        }}
      >
        <main>{children}</main>
      </Box>
      <Box
        className="!h-[40px] !bg-[#0C2340] !fixed !bottom-0 !right-0 sm:!flex !hidden !justify-center !items-center !overflow-hidden"
        sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: 14,
            fontWeight: "400",
            lineHeight: 24,
            textAlign: "center",
          }}
        >
          Copyright © 2024 Sistem Informasi Perpustakaan. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
}

UserLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
  children: PropTypes.element,
};

export default UserLayout;
