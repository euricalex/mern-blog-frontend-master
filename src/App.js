import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import { Header } from "./components";
import {  FullPost, Registration, AddPost, Login } from "./pages";
import { fetchAuthMe, selectIsAuth } from "./components/redux/slices/auth";
import { Home } from "./pages/Home";
import { Popular } from "./pages/Popular";

function App() {
  const dispatch = useDispatch();


  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/popular" element={<Popular />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
