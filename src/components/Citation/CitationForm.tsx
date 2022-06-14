import React from 'react'
import {FieldValues, useForm} from 'react-hook-form'
import {ICitation} from '@/types/interfaces/ICitation'
import Button from '@mui/material/Button'
import {useUserState} from '@/Providers/User/UserProvider'
import classes from './CitationForm.module.scss'

interface CitationFormProps {
  existCitationData?: ICitation
  closeModal: () => void
}

interface CitationFormData extends FieldValues {
  symbol: string
  name: string
  shortName: string
  volume: string
  reporter: string
  startPage: string
  pincite: string
  dateDecided: string
  court: string
  parenthetical: string
}

const CitationForm = ({existCitationData, closeModal}: CitationFormProps) => {
  const {addCitationNameBySymbol} = useUserState()
  const {
    register: registerCitation,
    handleSubmit,
    formState: {errors},
  } = useForm<CitationFormData>({
    defaultValues: {
      symbol: '@',
      name: '',
      shortName: '',
      volume: '',
      reporter: '',
      startPage: '',
      pincite: '',
      dateDecided: '',
      court: '',
      parenthetical: '',
    },
  })

  const onSubmit = handleSubmit(async (formData: CitationFormData) => {
    const citationText = `(${formData.name}, ${formData.volume}, ${formData.reporter}, ${
      formData.startPage
    } ${formData.pincite}, ${formData.dateDecided}, ${formData.court}, ${
      formData?.parenthetical ? `[${formData.parenthetical}]` : ''
    })`
    const userCitation: {citation: string; symbol: string} = {
      citation: String(citationText),
      symbol: formData.symbol,
    }
    addCitationNameBySymbol(userCitation)
    closeModal()
  })

  return (
    <form onSubmit={onSubmit} className={classes.form}>
      <div className={classes.field}>
        <input
          placeholder="symbol"
          type="text"
          id="symbol"
          disabled
          {...registerCitation('symbol', {required: 'This Field is required.'})}
        />
        {!!errors?.symbol && <p>{errors.symbol?.message}</p>}
      </div>
      <div className={classes.field}>
        *
        <input
          placeholder="Case name"
          type="text"
          id="name"
          {...registerCitation('name', {required: 'This Field is required.'})}
        />
        {!!errors?.name && <p>{errors.name?.message}</p>}
      </div>
      <div className={classes.field}>
        <input
          placeholder="Shot case title"
          type="text"
          id="shortName"
          {...registerCitation('shortName', {required: 'This Field is required.'})}
        />
        {!!errors?.shortName && <p>{errors.shortName?.message}</p>}
      </div>
      <div className={classes.field}>
        *
        <input
          placeholder="Volume"
          type="text"
          id="volume"
          {...registerCitation('volume', {required: 'This Field is required.'})}
        />
        {!!errors?.volume && <p>{errors.volume?.message}</p>}
      </div>
      <div className={classes.field}>
        *
        <input
          placeholder="Reporter"
          type="text"
          id="reporter"
          {...registerCitation('reporter', {required: 'This Field is required.'})}
        />
        {!!errors?.reporter && <p>{errors.reporter?.message}</p>}
      </div>
      <div className={classes.field}>
        *
        <input
          placeholder="Start page"
          type="text"
          id="startPage"
          {...registerCitation('startPage', {required: 'This Field is required.'})}
        />
        {!!errors?.startPage && <p>{errors.startPage?.message}</p>}
      </div>
      <div className={classes.field}>
        *
        <input
          placeholder="Pincite"
          type="text"
          id="pincite"
          {...registerCitation('pincite', {required: 'This Field is required.'})}
        />
        {!!errors?.pincite && <p>{errors.pincite?.message}</p>}
      </div>
      <div className={classes.field}>
        *
        <input
          placeholder="Date decided"
          type="text"
          id="dateDecided"
          {...registerCitation('dateDecided', {required: 'This Field is required.'})}
        />
        {!!errors?.dateDecided && <p>{errors.dateDecided?.message}</p>}
      </div>
      <div className={classes.field}>
        *
        <input
          placeholder="Court"
          type="text"
          id="court"
          {...registerCitation('court', {required: 'This Field is required.'})}
        />
        {!!errors?.court && <p>{errors.court?.message}</p>}
      </div>

      <div className={classes.field}>
        <input
          placeholder="Parenthetical"
          type="text"
          id="parenthetical"
          {...registerCitation('parenthetical')}
        />
        {!!errors?.parenthetical && <p>{errors.parenthetical?.message}</p>}
      </div>
      <Button type="button" onClick={onSubmit}>
        add
      </Button>
    </form>
  )
}

export default CitationForm
