import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Detail from "./pages/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />}></Route>
        <Route path="/detail/:id" element={<Detail/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
