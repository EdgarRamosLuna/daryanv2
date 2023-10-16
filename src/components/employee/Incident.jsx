import { FormControl, Grid } from '@mui/material'
import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useReports from '../../hooks/useReports';
const IncidentForm = () => {
    const { t } = useTranslation();
    const { control, handleSubmit, formState: { errors } } = useForm();
    const { onSubmit } = useReports();
    return (
        <>
            <FormControl
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                variant="outlined"
                fullWidth
            >
                <Grid sx={{ width: '100%', my: '5px' }}>
                    <Controller
                        name="code"
                        control={control}
                        defaultValue=""
                        rules={{ required: t('incidents.requiredInfo') }}

                        render={({ field }) =>
                            <TextField
                                label={t("incidents.code_incident")}
                                variant="filled"
                                {...field}
                                fullWidth
                                error={Boolean(errors.code)}
                                helperText={errors.code ? errors.code.message : null}
                                color={errors.code ? "error" : "primary"}
                            />}
                    />
                </Grid>
                <Grid sx={{ width: '100%', my: '5px' }}>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        rules={{ required: t('incidents.requiredInfo') }}

                        render={({ field }) =>
                            <TextField
                                label={t("incidents.name_incident")}
                                variant="filled"
                                {...field}
                                fullWidth
                                error={Boolean(errors.name)}
                                helperText={errors.name ? errors.name.message : null}
                                color={errors.name ? "error" : "primary"}
                            />}
                    />
                </Grid>

                <Button type="submit" variant="contained" color="primary" sx={{ mt: '10px' }}>
                    {t("save")}
                </Button>
            </FormControl>

        </>
    )
}

export default IncidentForm
