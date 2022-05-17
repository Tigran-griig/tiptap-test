import React from 'react';
import TextEditor from "./components/TextEditor";
import {Grid,Box} from "@mui/material";

function App() {
    return (
        <div className="App">
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                <Grid xs={3}>
                    <span>Navbar</span>
                </Grid>
                <Grid xs={6}>
                    <TextEditor/>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
