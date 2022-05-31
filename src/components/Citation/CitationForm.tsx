import React from 'react';
import {FieldValues, useForm} from "react-hook-form";
import {ICitation} from "@/types/interfaces/ICitation";
import Button from "@mui/material/Button";
import classes from "./CitationForm.module.scss"
import {useUserState} from "@/Providers/User";

interface CitationFormProps {
    existCitationData?: ICitation;
    closeModal: () => void;
}

interface CitationFormData extends FieldValues {
    symbol: string,
    name: string
}

const CitationForm = ({existCitationData, closeModal}: CitationFormProps) => {
    const {addCitationNameBySymbol} = useUserState()
    const {register: registerCitation, handleSubmit, formState: {errors},} = useForm<CitationFormData>({
        defaultValues: {
            symbol: "@",
            name: "",
        }
    })

    const onSubmit = handleSubmit(
        async (formData: CitationFormData) => {
            addCitationNameBySymbol(formData)
            closeModal()
        }
    );

    return (
        <form onSubmit={onSubmit} className={classes.form}>
            <div className={classes.field}>
                <input
                    placeholder={'symbol'} type="text"
                    id="symbol"
                    disabled={true}
                    {...registerCitation("symbol", {required: "This Field is required."})}
                />
                {!!errors?.symbol && (<p>{errors.symbol?.message}</p>)}
            </div>
            <div className={classes.field}>
                <input
                    placeholder={'Citation'}
                    type="text"
                    id="name"
                    {...registerCitation("name", {required: "This Field is required."})} />
                {!!errors?.name && (<p>{errors.name?.message}</p>)}
            </div>

            <Button type={"button"} onClick={onSubmit}>
                add
            </Button>
        </form>
    );
};

export default CitationForm;