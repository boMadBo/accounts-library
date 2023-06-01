import { Route, Routes } from 'react-router-dom';
import Account from './components/Account';
import Header from './components/Header';
import HelloPage from './components/HelloPage';
import Login from './components/Login';
import Registration from './components/Registration';
import Users from './components/Users';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HelloPage />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
