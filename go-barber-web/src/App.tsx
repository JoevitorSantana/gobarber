import { AuthContext, AuthProvider } from './hooks/AuthContext';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import GlobalStyle from './styles/global';

function App() {
  return (
    <div className="App">
        <>
            <AuthProvider>
                <SignIn />
            </AuthProvider>
            <GlobalStyle />
        </>
    </div>
  );
}

export default App;
