import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Landing from "./pages/Landing/Landing";
import Profiles from "./pages/Profiles/Profiles";
import * as authService from "./services/authService";
import BookDetail from "./pages/BookDetail/BookDetail";
import ProfileDetail from "./pages/ProfileDetail/ProfileDetail";
import * as profileService from "./services/profileService";

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    profileService.getAllProfiles().then((profiles) => setProfiles(profiles));
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate("/");
  };

  const handleSignupOrLogin = () => {
    setUser(authService.getUser());
  };

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/profiles"
          element={
            user ? (
              <Profiles profiles={profiles} user={user} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/book-detail/:bookId"
          element={user ? <BookDetail user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/profileDetail/:profileId"
          element={
            user ? <ProfileDetail user={user} /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </>
  );
};

export default App;