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
import { Collapse } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import RecommendIcon from "@mui/icons-material/Recommend";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import { useRouter, usePathname } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";
import BookIcon from "@mui/icons-material/Book";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import QueryStatsIcon from '@mui/icons-material/QueryStats';

const drawerWidth = 240;

function UserLayout(props) {
  const { window } = props;
  const { children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [isCollapse, setIsCollapse] = React.useState(false);
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

  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  const drawer = (
    <>
      <Toolbar>
        <LocalLibraryIcon className="-ml-2 mr-3" fontSize="large" />
        <Typography variant="h6" noWrap component="div">
          Smart Library
        </Typography>
      </Toolbar>
      <Divider />
      <div className="flex flex-col justify-between h-full">
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
                    : "text-slate-700"
                }
                onClick={() => {
                  router.push("/" + item.toLocaleLowerCase());
                }}
              >
                <ListItemButton
                  className={
                    pathname.startsWith("/" + item.toLocaleLowerCase())
                      ? "text-sky-600 hover:bg-slate-100"
                      : "text-slate-700"
                  }
                >
                  <ListItemIcon
                    className={
                      pathname.startsWith("/" + item.toLocaleLowerCase())
                        ? "text-sky-600 bg-slate-100"
                        : "text-slate-700"
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
            <Divider />
            <ListItem
              disablePadding
              onClick={handleCollapse}
              className={
                pathname.startsWith("/help")
                  ? "text-sky-600 bg-slate-100"
                  : "text-slate-700"
              }
            >
              <ListItemButton>
                <ListItemIcon
                  className={
                    pathname.startsWith("/help")
                      ? "text-sky-600 bg-slate-100"
                      : "text-slate-700"
                  }
                >
                  <HelpIcon />
                </ListItemIcon>
                <ListItemText primary="Help" />
                {isCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItemButton>
            </ListItem>
          </List>
          <Collapse in={isCollapse} timeout="auto" unmountOnExit>
            <List className="ml-4">
              {["Library", "Support", "FAQ"].map((text, index) => (
                <ListItem
                  key={text}
                  disablePadding
                  className={
                    pathname.startsWith("/help")
                      ? "text-sky-600 bg-slate-100"
                      : "text-slate-700"
                  }
                >
                  <ListItemButton>
                    <ListItemIcon
                      className={
                        pathname.startsWith("/help")
                          ? "text-sky-600 bg-slate-100"
                          : "text-slate-700"
                      }
                    >
                      {index === 0 && <LibraryBooksIcon />}
                      {index === 1 && <RecommendIcon />}
                      {index === 2 && <LiveHelpIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
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
                    : "text-slate-700"
                }
                onClick={() => {
                  router.push(item.href);
                }}
              >
                <ListItemButton
                  className={
                    pathname === item.href
                      ? "text-sky-600 hover:bg-slate-100"
                      : "text-slate-700"
                  }
                >
                  <ListItemIcon
                    className={
                      pathname === item.href
                        ? "text-sky-600 bg-slate-100"
                        : "text-slate-700"
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

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "#ffffff",
          color: "#2f2f2f",
        }}
      >
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
