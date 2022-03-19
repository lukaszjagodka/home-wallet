import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import SavingsIcon from '@mui/icons-material/Savings';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventIcon from '@mui/icons-material/Event';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';

export default function IconMenu() {
  return (
    <Paper sx={{
      top: 50, width: 220, height: '100vh', borderRadius: 0, position: 'fixed',
    }}
    >
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <AccountTreeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Transactions</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentCut fontSize="small" />
          </ListItemIcon>
          <ListItemText>Debs</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <TrendingUpIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Trends</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <CalendarViewWeekIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Categories</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <AttachMoneyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Budget</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SavingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Savings</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <EventIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Events</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <LocalGroceryStoreIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Store</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
