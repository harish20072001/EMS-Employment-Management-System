import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import EmployeeComponent from "./Components/EmployeeComponent";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import ListEmployeeComponent from "./Components/ListEmployeeComponent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
        {/* //http://localhost:3000 */}
          <Route path="/" element ={<ListEmployeeComponent />}></Route>
          {/* //http://localhost:3000/employees */}
          <Route path="/employees" element = { <ListEmployeeComponent/>}></Route>
          {/* //http://localhost:3000/add-employee */}
          <Route path="/add-employee" element = {<EmployeeComponent/>}></Route>
          {/* //http://localhost:3000/add-employee/edit-employee/1 */}
          <Route path="/edit-employee/:id" element={<EmployeeComponent/>}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
