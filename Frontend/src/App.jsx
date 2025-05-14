import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientRouter from "./Components/routes/client/ClientRouter";
import AdminRouter from "./Components/routes/admin/AdminRouter";
import ReduxToaster from "./Components/comman/ReduxToaster";
import Model from "./Components/comman/Model";

function App() {
  return (
    <BrowserRouter>
      <ReduxToaster />
      <Routes>
        <Route path="/*" element={<ClientRouter />} />
        <Route path="/admin/*" element={<AdminRouter />} />
      </Routes>
      <Model />
    </BrowserRouter>
  );
}

export default App;
