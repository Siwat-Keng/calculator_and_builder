import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import MainTabs from './pages/MainTabs';
import './App.css';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'cursive'
    ].join(','),
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <MainTabs />
      </div>
    </ThemeProvider>

  );
}

export default App;
