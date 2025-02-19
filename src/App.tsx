import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import { GeneralProvider } from './contexts/GeneralProvider';
import { PrivateRoute } from './components/PrivateRoute';
import { Chat } from './components/Chat';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <GeneralProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/chat"
              element={
                <PrivateRoute>
                  <Chat />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/chat" replace />} />
          </Routes>
        </Router>
      </GeneralProvider>
      <Toaster position='top-center' />
    </AuthProvider>
  );
}

export default App;