import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import ListItemButton from '@mui/material/ListItemButton';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';


const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme, isSelected }) => ({
    '&.MuiAccordion-root.Mui-expanded': {
        borderBottom: 'none',
    },
    '&:before': {
        content: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary expandIcon={<KeyboardArrowUpRoundedIcon fontSize='small'/>} {...props} />
))(({ theme, isSelected }) => ({
    border: '1px solid white',
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(180deg)'
    },
    '&:before': {
        content: 'none',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(0),
    },
}));


const AccordionDetails = styled(MuiAccordionDetails)(({ theme, isSelected }) => ({
    marginLeft: theme.spacing(0),
}));

const StyledListItemButton = styled(ListItemButton)(({ theme, isSelected }) => ({
    marginTop: '0px',
    position: 'relative',
    borderRadius: '8px',
    backgroundColor: isSelected ? '#F2F7FF' : 'transparent'
}));






export {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    StyledListItemButton,
};
