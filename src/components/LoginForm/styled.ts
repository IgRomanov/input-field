import { TextField, TextFieldProps, styled } from "@mui/material";

export const CustomTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
    color: theme.palette.primary.main,
    '.MuiInputBase-input': {
        fontWeight: '600',
        fontSize: '14px'
    },
    "& .MuiTypography-root": {
        color: "black",
    }
}));  