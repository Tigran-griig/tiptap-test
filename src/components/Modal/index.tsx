import * as React from 'react';
import Box from '@mui/material/Box';
import {Modal as BaseModal} from '@mui/material';
import {ReactNode} from "react";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    textAlign:'center',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export default function Modal({
                                  children,
                                  setOpen,
                                  open
                              }: { children: ReactNode, setOpen: (value: boolean) => void; open: boolean }) {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <BaseModal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{...style, width: 400}}>
                    {children}
                </Box>
            </BaseModal>
        </div>
    );
}