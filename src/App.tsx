import React from 'react';
import TextEditor from "./components/TextEditor";
import {Block} from "@/Block";
import {SnackbarProvider} from 'notistack';

function App() {
    return (
        <div className="root">
            <SnackbarProvider maxSnack={6}>
                <Block className={"container"}>
                    <Block className={"root-left-section"}>
                        <div>Navbar</div>
                    </Block>
                    <Block className={"root-right-section"}>
                        <TextEditor/>
                    </Block>
                </Block>
            </SnackbarProvider>
        </div>
    );
}

export default App;
