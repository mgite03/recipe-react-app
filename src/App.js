import Home from "./Home";
import Search from "./Search";
import Profile from "./Profile";
import Login from "./Login";
import Signup from "./Signup";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import SearchResults from "./Search/SearchResults";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Home /> */}
        {/* {<Search />} */}
        {/* <Profile /> */}
        {/* <Signup /> */}
        {/* <Login /> */}
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search/>}/>
          <Route path="/search/:searchQuery" element={<SearchResults/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
