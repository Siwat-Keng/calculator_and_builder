import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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
        <Box p={12}>
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
}));

function Description() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (<div className={classes.root}>
    <AppBar position="static">
      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" variant="scrollable" scrollButtons="auto">
        <Tab label="Base Attack" style={{ color: '#d0efff', fontWeight: 'bold' }} {...a11yProps(0)} />
        <Tab label="%ATTACK" style={{ color: '#d0efff', fontWeight: 'bold' }} {...a11yProps(1)} />
        <Tab label="FLAT ATTACK" style={{ color: '#d0efff', fontWeight: 'bold' }} {...a11yProps(2)} />
        <Tab label="Bonus Damage" style={{ color: '#d0efff', fontWeight: 'bold' }} {...a11yProps(3)} />
        <Tab label="More Damage" style={{ color: '#d0efff', fontWeight: 'bold' }} {...a11yProps(4)} />
        <Tab label="Talent Damage" style={{ color: '#d0efff', fontWeight: 'bold' }} {...a11yProps(5)} />
        <Tab label="Critical Rate" style={{ color: '#d0efff', fontWeight: 'bold' }} {...a11yProps(6)} />
        <Tab label="Critical Damage" style={{ color: '#d0efff', fontWeight: 'bold' }} {...a11yProps(7)} />
        <Tab label="Character Level" style={{ color: '#d0efff', fontWeight: 'bold' }} {...a11yProps(8)} />
        <Tab label="Enemy Level" style={{ color: '#d0efff', fontWeight: 'bold' }} {...a11yProps(9)} />
        <Tab label="Decrease Enemy DEF" style={{ color: '#d0efff', fontWeight: 'bold' }} {...a11yProps(10)} />
        <Tab label="Enemy Resist" style={{ color: '#d0efff', fontWeight: 'bold' }} {...a11yProps(11)} />
      </Tabs>
    </AppBar>
    <TabPanel value={value} index={0}>
      <svg width="800" height="800"
        xmlns="http://www.w3.org/2000/svg">
        <image
          href='https://cdn.discordapp.com/attachments/468032916270743564/787225977868386304/unknown.png'
          height="800" width="800" />
      </svg>
    </TabPanel>
    <TabPanel value={value} index={1}>
      <svg width="800" height="800"
        xmlns="http://www.w3.org/2000/svg">
        <image
          href='https://cdn.discordapp.com/attachments/468032916270743564/787228238304772096/unknown.png'
          height="800" width="800" />
      </svg>
    </TabPanel>
    <TabPanel value={value} index={2}>
      <svg width="800" height="800"
        xmlns="http://www.w3.org/2000/svg">
        <image
          href='https://cdn.discordapp.com/attachments/468032916270743564/787229592560861214/unknown.png'
          height="800" width="800" />
      </svg>
    </TabPanel>
    <TabPanel value={value} index={3}>
      <svg width="800" height="800"
        xmlns="http://www.w3.org/2000/svg">
        <image
          href='https://cdn.discordapp.com/attachments/468032916270743564/787230545033429052/unknown.png'
          height="800" width="800" />
      </svg>
    </TabPanel>
    <TabPanel value={value} index={4}>
      <svg width="800" height="800"
        xmlns="http://www.w3.org/2000/svg">
        <image
          href='https://cdn.discordapp.com/attachments/468032916270743564/787232317730717716/unknown.png'
          height="800" width="800" />
      </svg>
    </TabPanel>
    <TabPanel value={value} index={5}>
      <svg width="800" height="800"
        xmlns="http://www.w3.org/2000/svg">
        <image
          href='https://cdn.discordapp.com/attachments/468032916270743564/787232857168281600/unknown.png'
          height="800" width="800" />
      </svg>
    </TabPanel>
    <TabPanel value={value} index={6}>
      <svg width="800" height="800"
        xmlns="http://www.w3.org/2000/svg">
        <image
          href='https://cdn.discordapp.com/attachments/468032916270743564/787233276048703538/unknown.png'
          height="800" width="800" />
      </svg>
    </TabPanel>
    <TabPanel value={value} index={7}>
      <svg width="800" height="800"
        xmlns="http://www.w3.org/2000/svg">
        <image
          href='https://cdn.discordapp.com/attachments/468032916270743564/787233357657931796/unknown.png'
          height="800" width="800" />
      </svg>
    </TabPanel>
    <TabPanel value={value} index={8}>
      <svg width="800" height="800"
        xmlns="http://www.w3.org/2000/svg">
        <image
          href='https://cdn.discordapp.com/attachments/468032916270743564/787234203728740372/unknown.png'
          height="800" width="800" />
      </svg>
    </TabPanel>
    <TabPanel value={value} index={9}>
      <svg width="800" height="800"
        xmlns="http://www.w3.org/2000/svg">
        <image
          href='https://cdn.discordapp.com/attachments/468032916270743564/787234969088819210/unknown.png'
          height="800" width="800" />
      </svg>
    </TabPanel>
    <TabPanel value={value} index={10}>
      <svg width="800" height="800"
        xmlns="http://www.w3.org/2000/svg">
        <image
          href='https://cdn.discordapp.com/attachments/468032916270743564/787234580436090880/unknown.png'
          height="800" width="800" />
      </svg>
    </TabPanel>
    <TabPanel value={value} index={11}>
      <svg width="800" height="800"
        xmlns="http://www.w3.org/2000/svg">
        <image
          href='https://i.redd.it/evlbyqzrdlv51.jpg'
          height="800" width="800" />
      </svg>
      {'From : https://www.reddit.com/r/Genshin_Impact/comments/jiwvpn/i_made_a_resistance_table_for_all_of_the_monsters/?utm_source=share&utm_medium=web2x&context=3'}
    </TabPanel>
  </div>);
}

export default Description;