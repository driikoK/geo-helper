'use client';

import type { FunctionComponent, PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import theme from '@/theme';
import muiTheme from '@/mui-theme';
import Header from '@/components/Header';

const Providers: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={theme}>
        <Header />
        {children}
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

export default Providers;
