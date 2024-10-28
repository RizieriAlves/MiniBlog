import { BrowserRouter, Routes, Route } from "react-router-dom";

//CSS
import "./App.css";

//Pages
import Home from "./pages/Home/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Login from "./pages/Home/User/Login/Login";
import Register from "./pages/Home/User/Register/Register";
import User from "./pages/Home/User/User";
import { AuthProvider } from "./context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

import { useAuthentication } from "./hooks/useAuthentication";
import Account from "./pages/Account/Account";
import NewPost from "./pages/NewPost/NewPost";
import Timeline from "./pages/Timeline/Timeline";
import Search from "./pages/Search/Search";

//Components

function App() {
  const [user, setUser] = useState(undefined);

  const { auth } = useAuthentication();
  //loadinguser é o usuário ou undefined (sem usuário ou obtendo usuário)
  const [loadingUser, setLoadingUser] = useState(false);

  //Define o usuário.
  useEffect(() => {
    setLoadingUser(true);
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    setLoadingUser(false);
  }, [auth]);

  if (loadingUser) {
    return (
      <>
        <div className="carregando">
          <p>Carregando...</p>
        </div>
      </>
    );
  }

  return (
    <div className="App">
      <AuthProvider value={{ user, loadingUser, setLoadingUser }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={user ? <Timeline /> : <Home />} />
              <Route path="/login" element={user ? <Login /> : <Home />} />
              <Route path="/account" element={user ? <Account /> : <Home />} />
              <Route path="/newpost" element={user ? <NewPost /> : <Home />} />
              <Route
                path="/register"
                element={user ? <Register /> : <Home />}
              />
              <Route path="/user" element={user ? <User /> : <Home />} />
              <Route
                path="/timeline"
                element={user ? <Timeline /> : <Home />}
              />
              <Route path="/search" element={user ? <Search /> : <Home />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
