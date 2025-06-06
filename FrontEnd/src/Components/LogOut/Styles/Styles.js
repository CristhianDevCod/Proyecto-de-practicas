import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Tabs, Tab, Typography, Box } from '@mui/material';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const StylesTabs = styled((props) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan' /> }}
    />
))({
    width: '250px',
    '& .MuiTabs-indicator': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        width: '100%',
        height: '100%',
        borderRadius: '20px',
        backgroundColor: '#6587F4',
    },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(0),
        marginRight: theme.spacing(0),
        color: '#5F758C',
        '&.Mui-selected': {
            borderRadius: 10,
            color: '#6587F4',
            backgroundColor: '#F2F7FF',
        },
    })
);

/*LIST IMGS*/
const imagenAll1 = require.context('../../../Assets/Pines1', false, /\.(png|jpg|svg)$/);
const imagesFile1 = imagenAll1.keys().map(imagenAll1);

const imagenAll2 = require.context('../../../Assets/Pines2', false, /\.(png|jpg|svg)$/);
const imagesFile2 = imagenAll2.keys().map(imagenAll2);

const imagenAll3 = require.context('../../../Assets/Pines3', false, /\.(png|jpg|svg)$/);
const imagesFile3 = imagenAll3.keys().map(imagenAll3);

export { TabPanel, StyledTab, StylesTabs, a11yProps, imagesFile1, imagesFile2, imagesFile3 }
