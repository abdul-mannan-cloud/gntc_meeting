import React, {useState} from 'react';
import {Container} from "@mui/material";
import {Calendar} from "./pages/calendar";

function App() {
    return (
        <Container maxWidth="xl">
            <Calendar/>
        </Container>
    )
}

export default App;
