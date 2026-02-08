import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";

import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
