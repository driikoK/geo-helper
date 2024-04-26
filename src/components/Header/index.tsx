'use client';

import { FunctionComponent, useState } from 'react';
import {
  HeaderContainer,
  LogoWrapper,
  Paragraph,
} from './styles';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { useRouter } from 'next/navigation';

const Header: FunctionComponent = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const router = useRouter();

  const handleLink = (link: string) => {
    router.push(link);
    handleCloseMenu();
  };

  return (
    <HeaderContainer>
      <LogoWrapper onClick={() => handleLink('/')}>
        <TravelExploreIcon color="secondary" fontSize="large" />
        <Paragraph>Geo-Helper</Paragraph>
      </LogoWrapper>

      <IconButton onClick={handleClickMenu}>
        <MenuIcon color="secondary" fontSize='medium' />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => handleLink('/convert')}>Конвертор координат</MenuItem>
        <MenuItem onClick={() => handleLink('/')}>
          Відстань між двома координатами
        </MenuItem>
        <MenuItem onClick={() => handleLink('/')}>
          Азимут між двома координатами
        </MenuItem>
        <MenuItem onClick={() => handleLink('/elevation')}>Визначення висоти</MenuItem>
      </Menu>
    </HeaderContainer>
  );
};

export default Header;
