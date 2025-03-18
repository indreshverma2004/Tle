
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Index from "./pages/Index.jsx";
import BookmarkedContests from "./pages/BookmarkedContests";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useState } from "react";
import AddYoutube from './pages/AddYoutube'

const App = () => {
  const [token, setToken] = useState("");
  const [contest, setContest]=useState([]);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contests" element={<Index setContest={setContest} token={token} contest={contest} />} />
        <Route path="/bookmarks" element={<BookmarkedContests token={token} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup setToken={setToken} />} />
        <Route path='/addyoutube' element={<AddYoutube contest={contest}></AddYoutube>}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
