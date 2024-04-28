'use client';

import type { FunctionComponent, PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import theme from '@/theme';
import muiTheme from '@/mui-theme';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React from 'react';

const Providers: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={theme}>
        <Header />
        <div style={{minHeight: 'calc(100vh - 72px - 56px)'}}>
          {children}
        </div>
        <Footer />
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

export default Providers;
