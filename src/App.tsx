import React from 'react';
import TextEditor from "./components/TextEditor";
import {Block} from "@/Block";

function App() {
    return (
        <div className="root">
            <Block className={"container"}>
                <Block className={"root-left-section"}>
                    <div>Navbar</div>
                </Block>
                <Block className={"root-right-section"}>
                    <TextEditor/>
                </Block>
            </Block>
        </div>
    );
}

export default App;
