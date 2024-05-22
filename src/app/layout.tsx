import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import NavBar from '@/components/NavBar';

export default function RootLayout(props: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />

                {/* Navigation bar from @/components/NavBar */}
                <NavBar></NavBar>

                {props.children}
            </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    );
}
