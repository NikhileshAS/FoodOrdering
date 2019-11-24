import React from 'react';
import { createMuiTheme, MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import Layout from './components/Layout';
import { BrowserRouter, withRouter, Route } from 'react-router-dom';

const themeColorMajor = '#6c7a89';
const themeColorPrimary = '#2e3131';
const themeColorSecondary = '#dadfe1';

const theme = createMuiTheme({
	palette: {
		primary: { main: themeColorMajor },
		text: { main: themeColorPrimary }
	},
	typography: {
		fontFamily: '"Comic Sans',
		text: 12
	},
	overrides: {
		MuiButton: {
			contained: {
				backgroundColor: themeColorMajor
			}
		},
		MuiTypography: {
			root: {
				color: themeColorPrimary
			},
			body1: {
				fontWeight: 'bold',
				fontSize: 20
			}
		},
		MuiPaper: {
			root: {
				backgroundColor: themeColorSecondary
			}
		},
		MuiTableCell: {
			head: { textAlign: 'center' },
			body: { textAlign: 'center' }
		}
	}
});
function App() {
	return (
		<BrowserRouter>
			<React.Fragment>
				<MuiThemeProvider theme={theme}>
					<StylesProvider>
						<Route path="/">{withRouter((props) => <Layout {...props} />)}</Route>
					</StylesProvider>
				</MuiThemeProvider>
			</React.Fragment>
		</BrowserRouter>
	);
}

export default App;
