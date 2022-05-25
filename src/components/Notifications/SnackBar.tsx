import * as React from 'react';
import {Snackbar as BaseSnackBar} from '@mui/material';
import {SnackbarOrigin} from '@mui/material/Snackbar';
import {useEffect} from "react";

export interface State extends SnackbarOrigin {
    open: boolean;
    setClickFunctionsToParent?: ({onOpen, onClose}: {
        onOpen: (state: SnackbarOrigin) => void,
        onClose: () => void
    }) =>
        {
            onOpen: (state: SnackbarOrigin) => void;
            onClose: () => void;
        };
}

export const Snackbar = (props: State) => {
    const {setClickFunctionsToParent} = props
    const [state, setState] = React.useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        setClickFunctionsToParent,
    });
    const {vertical, horizontal, open} = state;

    useEffect(() => {
        if (setClickFunctionsToParent) {
            setClickFunctionsToParent({
                onOpen: handleClick,
                onClose: handleClose,
            })
        }
    }, [setClickFunctionsToParent])


    const handleClick = (newState: SnackbarOrigin) => () => {
        setState({open: true, ...newState});
    };

    const handleClose = () => {
        setState({...state, open: false});
    };

    return <BaseSnackBar
        anchorOrigin={{vertical, horizontal}}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
    />
}

export default Snackbar