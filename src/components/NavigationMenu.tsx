import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  MenuItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Flex } from "@radix-ui/themes";
import { UserButton, useClerk } from "@clerk/clerk-react";
import Leaderboard from "../components/Leaderboard"; // Import the Leaderboard component

interface NavigationMenuProps {
  pages: { label: string; path: string }[];
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ pages }) => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const { signOut } = useClerk();
  const userProfileUrl = "/profile";

  const [openLeaderboard, setOpenLeaderboard] = React.useState(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenLeaderboard = () => setOpenLeaderboard(true);
  const handleCloseLeaderboard = () => setOpenLeaderboard(false);

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, alignItems: "center", flexDirection: "row-reverse" }}>
        <IconButton size="large" aria-label="open navigation menu" onClick={handleOpenNavMenu} color="inherit">
          <MenuIcon />
        </IconButton>
        <Drawer anchor="right" open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
          <Box sx={{ padding: "1em", display: "flex", justifyContent: "center" }}>
            <UserButton showName userProfileUrl={userProfileUrl} />
          </Box>
          <MenuItem onClick={() => (window.location.href = userProfileUrl)}>
            <Typography variant="body2">Manage Account</Typography>
          </MenuItem>
          <MenuItem onClick={() => signOut()}>
            <Typography variant="body2">Sign Out</Typography>
          </MenuItem>
          <Divider />
          {pages.map(({ label, path }) => (
            <MenuItem key={label} onClick={() => navigate(path)}>
              <Typography variant="h6">{label}</Typography>
            </MenuItem>
          ))}
          <Divider />
          {/* Leaderboard button */}
          <MenuItem onClick={handleOpenLeaderboard}>
            <Typography variant="h6">Leaderboard</Typography>
          </MenuItem>
        </Drawer>
      </Box>

      {/* Desktop Navigation */}
      <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" }, margin: "0 1.5em" }}>
        <Flex>
          {pages.map(({ label, path }) => (
            <Button sx={{ textTransform: "none" }} size="small" variant="text" key={label}>
              <Link to={path} style={{ textDecoration: "none" }}>
                <Typography variant="body1">{label}</Typography>
              </Link>
            </Button>
          ))}
        </Flex>
      </Box>

      {/* Leaderboard Dialog */}
      <Dialog open={openLeaderboard} onClose={handleCloseLeaderboard} fullWidth maxWidth="sm">
        <DialogTitle>Leaderboard</DialogTitle>
        <DialogContent>
          <Leaderboard />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLeaderboard} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NavigationMenu;
