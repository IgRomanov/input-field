import { FormControl, Box, InputAdornment, Button } from "@mui/material";
import { ChangeEvent, KeyboardEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IFormData } from "../../interfaces/FormInterfaces";
import { ThemeProvider } from '@mui/material/styles'
import { CustomTextField } from "./styled";
import { theme } from "../../theme/theme"
import { validateEmail, validatePassword } from "../../utils/validate";

const Form = () => {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<IFormData>();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value.replace(/,/g, ''));
        if (!isNaN(value)) {
            const formattedValue = value.toLocaleString('en-US');
            setValue('pay', formattedValue);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
        if (Number.isNaN(Number(e.key)) && e.key !== 'Backspace' && e.key !== 'Enter') {
            e.preventDefault();
        }
    };

    const onSubmit: SubmitHandler<IFormData> = () => alert(`Data submitted`);

    return (
        <Box m={"70px"} display={'flex'} justifyContent={'center'} alignItems={'center'} gap={'5px'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl onSubmit={handleSubmit(onSubmit)}>
                    <ThemeProvider theme={theme}>
                        <CustomTextField
                            label="Treatment Cost *"
                            variant="outlined"
                            size="small"
                            style={{ marginBottom: 10 }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">$</InputAdornment>,
                            }}
                            {...register("pay")}
                            onKeyDown={handleKeyDown}
                            onChange={handleChange}
                        />
                        <CustomTextField
                            label="Email"
                            variant="outlined"
                            size="small"
                            style={{ marginBottom: 10 }}
                            {...register("email", {
                                required: 'Email is required!',
                                validate: (value: string) => validateEmail(value)
                            })}
                        />
                        <CustomTextField
                            label="Password"
                            variant="outlined"
                            size="small"
                            type="password"
                            style={{ marginBottom: 10 }}
                            {...register("password", {
                                required: 'Password is required!',
                            })}
                        />
                        <CustomTextField
                            label="Confirm password"
                            variant="outlined"
                            size="small"
                            type="password"
                            {...register("confirmPassword", {
                                required: 'Confirm the password!',
                                validate: (value: string) => validatePassword(value, watch('password'))
                            })}
                        />
                    </ThemeProvider>
                    <Button
                        type="submit"
                        variant="outlined"
                        sx={{
                            marginTop: '20px',
                            height: '30px',
                        }}
                    >
                        Submit
                    </Button>
                </FormControl>
            </form>
            <Box width={'120px'}>
                {errors && <div>{errors.email?.message || errors.password?.message || errors.confirmPassword?.message}</div>}
            </Box>
        </Box>
    );
}

export default Form;