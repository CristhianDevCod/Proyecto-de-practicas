import { Paper } from "@mui/material";
import { styled } from "@mui/material";

const ItemContent = styled(Paper)(({ theme }) => ({
    // display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: '15px',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',

}));

export {ItemContent}