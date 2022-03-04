import { AppProvider } from './hooks';
import GlobalStyle from './styles/global';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Dashboard } from './pages/Dashboards';
import {Route} from './routes/Route';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';


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
                    <Route path="/forgot-password" exact component={ForgotPassword} />
                    <Route path="/reset-password" exact component={ResetPassword} />
                </Switch>
                </AppProvider>
                <GlobalStyle />
            </Router>
        </>
    </div>
  );
}

export default App;
