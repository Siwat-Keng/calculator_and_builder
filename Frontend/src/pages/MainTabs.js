import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DamageCalculator from '../components/DamageCalculator';
import Description from '../components/Description';
import Grid from '@material-ui/core/Grid';
import ElementalMastery from './ElementalMastery';
import Builder from './Builder';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    backgroundColor: "#03254c",
  }
}));

export default function MainTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.tab} position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Genshin Builder" style={{ color: '#d0efff', fontFamily: 'cursive', fontWeight: 'bold' }} {...a11yProps(0)} />
          <Tab label="Elemental Mastery" style={{ color: '#d0efff', fontFamily: 'cursive', fontWeight: 'bold' }} {...a11yProps(1)} />
          <Tab label="Compare Damage" style={{ color: '#d0efff', fontFamily: 'cursive', fontWeight: 'bold' }} {...a11yProps(2)} />
          <Tab label="Description" style={{ color: '#d0efff', fontFamily: 'cursive', fontWeight: 'bold' }} {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Builder />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ElementalMastery />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid
          container
          direction="row"
          justify="center"
          spacing={5}
        >
          <Grid item>
            <label style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Slot 1</label>
            <DamageCalculator id={1} />
          </Grid>
          <Grid item>
            <label style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Slot 2</label>
            <DamageCalculator id={2} />
          </Grid>
          <Grid item>
            <label style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Slot 3</label>
            <DamageCalculator id={3} />
          </Grid>
          <Grid item>
            <label style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Slot 4</label>
            <DamageCalculator id={4} />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Description />
      </TabPanel>
    </div>
  );
}