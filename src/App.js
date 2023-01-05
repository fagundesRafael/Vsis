import "./App.css";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

// hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

// context
import { AuthProvider } from "./contexts/AuthContext";

// pages
import Login from "./pages/Login/Login";
import AccountCreate from "./pages/AccountCreate/AccountCreate";
import Início from "./components/bars/Início/Início";
import Parte from "./pages/Parte/Parte";
import ParteSearch from "./pages/Parte/ParteSearch";
import Partes from "./pages/Parte/Partes";
import PartesEdit from "./pages/Parte/PartesEdit";
import Inqueritos from "./pages/IPLs/Inqueritos";
import NovoInquerito from "./pages/IPLs/NovoInquerito";
import IPLSearch from "./pages/IPLs/IPLSearch";
import IPLEdit from "./pages/IPLs/IPLEdit";

// components
import Navbar from "./components/bars/Navbar";

// sidebar
import Inserir from "./components/bars/Inserir/Inserir";
import Acompanhar from "./components/bars/Acompanhar/Acompanhar";
import Estatística from "./components/bars/Estatística/Estatística";
import Notificações from "./components/bars/Notificações/Notificações";
import Informações from "./components/bars/Informações/Informações";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <Router>
          <Navbar />
          <Routes>
            {/* login and create account */}
            <Route path="/login" element={!user ? <Login /> : <Navigate to='/accountcreate'/>} />
            <Route path="/accountcreate" element={user ? <Navigate to='/'/> : <AccountCreate />} />
            {/* sidebar */}
            <Route path="/" element={user ? <Início /> : <Navigate to='/login'/>} />
            <Route path="/inserir" element={user ? <Inserir /> : <Navigate to='/login'/>} />
            <Route path="/inserir/parte" element={user ? <Parte /> : <Navigate to='/login'/>} />
            <Route path="/acompanhar" element={user ? <Acompanhar /> : <Navigate to='/login'/>} />
            <Route path="/estatistica" element={user ? <Estatística /> : <Navigate to='/login'/>} />
            <Route path="/notificacoes" element={user ? <Notificações /> : <Navigate to='/login'/>} />
            <Route path="/info" element={<Informações />} />
            {/* common pages */}
            <Route path="/partes" element={user ? <Partes /> : <Navigate to='/login'/>} />
            <Route path="/partes/search" element={<ParteSearch/>} />
            <Route path="/partes/:id" element={user ? <PartesEdit/> : <Navigate to='/login'/>} />
            <Route path="/inqueritos" element={user ? <Inqueritos/> : <Navigate to='/login'/>} />
            <Route path="/novoinquerito" element={user ? <NovoInquerito/> : <Navigate to='/login'/>} />
            <Route path="/inqueritos/search" element={ <IPLSearch/>} />
            <Route path="/inqueritos/:id" element={ user ? <IPLEdit/> : <Navigate to='/login'/>} />
            <Route path="/" element={<Início />} />
            <Route path="/" element={<Início />} />
            <Route path="/" element={<Início />} />
            <Route path="/" element={<Início />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
