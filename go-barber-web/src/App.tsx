import { AppProvider } from './hooks';
import GlobalStyle from './styles/global';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Dashboard } from './pages/Dashboards';
import {Route} from './routes/Route';


function App() {
  return (
    <div className="App">
        <>
            <Router>
                <AppProvider>
                <Switch>
                    <Route path="/" exact component={SignIn}/>
                    <Route path="/signup" exact component={SignUp}/>
                    <Route path="/dashboard" exact component={Dashboard} isPrivate />
                </Switch>
                </AppProvider>
                <GlobalStyle />
            </Router>
        </>
    </div>
  );
}

export default App;
