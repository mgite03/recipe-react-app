import { Provider } from "react-redux";
import store from "./store";
import CurrentUser from "./users/currentUser";
import NavigationBar from "./NavigationBar";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import Profile from "./Profile";
import Search from "./Search";
import SearchResults from "./Search/SearchResults";
import Recipe from "./Recipe";
import UserPage from "./UserPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedAdminRoute from "./users/protectedAdminRoute";
import ProtectedContent from "./users/protectedContent";

function Project() {
  return (
    <Provider store={store}>
      <CurrentUser>
        <NavigationBar />
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Navigate to="home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={
                <ProtectedContent>
                  <Profile />
                </ProtectedContent>
              } />
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="/search" element={<Search />} />
              <Route path="/search/:searchQuery" element={<SearchResults />} />
              <Route path="/details/:recipeId" element={<Recipe />} />
              <Route path="/users" 
                element={
                <ProtectedAdminRoute>
                  <UserPage />
                </ProtectedAdminRoute>} 
              />
            </Routes>
          </div>
        </BrowserRouter>
      </CurrentUser>
    </Provider>
  );
}

export default Project;
