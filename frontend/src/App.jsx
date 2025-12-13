import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/login';
import Pengguna from './pages/admin/Pengguna';

function App() {
  return (
    <Routes  class="flex flex-col h-full w-full items-center justify-center bg-gray-100">
      <Route path="/login" element={<Login />} />
      <Route path="/admin/pengguna" element={<Pengguna/>}/>
      <Route path="/logout" element={<Login/>}/>
    </Routes>
  );
}

export default App;