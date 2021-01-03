import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CharacterAndWeapon from '../components/CharacterAndWeapon';
import Template from '../components/ArtifactTemplate';
import BuilderResult from '../components/BuilderResult';

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
    width: 1200,
  },
}));

function Builder() {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [characterWeapon, setCharacterWeapon] = React.useState(JSON.parse(localStorage.getItem("BuilderCharacterWeapon") || "{}"));
  const [artifact1, setArtifact1] = React.useState(JSON.parse(localStorage.getItem("BuilderArtifact1") || "{}"));
  const [artifact2, setArtifact2] = React.useState(JSON.parse(localStorage.getItem("BuilderArtifact2") || "{}"));
  const [artifact3, setArtifact3] = React.useState(JSON.parse(localStorage.getItem("BuilderArtifact3") || "{}"));
  const [artifact4, setArtifact4] = React.useState(JSON.parse(localStorage.getItem("BuilderArtifact4") || "{}"));
  const [artifact5, setArtifact5] = React.useState(JSON.parse(localStorage.getItem("BuilderArtifact5") || "{}"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onCharacterWeaponUpdate = (event) => {
    setCharacterWeapon(event);
    localStorage.setItem("BuilderCharacterWeapon", JSON.stringify(event));
  }

  const onArtifact1Update = (event) => {
    setArtifact1(event);
    localStorage.setItem("BuilderArtifact1", JSON.stringify(event));
  }

  const onArtifact2Update = (event) => {
    setArtifact2(event);
    localStorage.setItem("BuilderArtifact2", JSON.stringify(event));
  }
  
  const onArtifact3Update = (event) => {
    setArtifact3(event);
    localStorage.setItem("BuilderArtifact3", JSON.stringify(event));
  }

  const onArtifact4Update = (event) => {
    setArtifact4(event);
    localStorage.setItem("BuilderArtifact4", JSON.stringify(event));
  }

  const onArtifact5Update = (event) => {
    setArtifact5(event);
    localStorage.setItem("BuilderArtifact5", JSON.stringify(event));
  }

  return (<div className={classes.root}>
    <AppBar position="static">
      <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
        <Tab label="Result" icon={<img src={`${process.env.PUBLIC_URL}/assets/result.png`} />} {...a11yProps(0)} />
        <Tab label="Character & Weapon" icon={<img src={`${process.env.PUBLIC_URL}/assets/character.png`} />} {...a11yProps(1)} />
        <Tab label="Flower of Life" icon={<img src={`${process.env.PUBLIC_URL}/assets/flower_of_life.png`} />} {...a11yProps(2)} />
        <Tab label="Plume of Death" icon={<img src={`${process.env.PUBLIC_URL}/assets/plume_of_death.png`} />} {...a11yProps(3)} />
        <Tab label="Sands of Eon" icon={<img src={`${process.env.PUBLIC_URL}/assets/sands_of_eon.png`} />} {...a11yProps(4)} />
        <Tab label="Goblet of Eonothem" icon={<img src={`${process.env.PUBLIC_URL}/assets/goblet_of_eonothem.png`} />} {...a11yProps(5)} />
        <Tab label="Circlet of Logos" icon={<img src={`${process.env.PUBLIC_URL}/assets/circlet_of_logos.png`} />} {...a11yProps(6)} />
      </Tabs>
    </AppBar>
    <TabPanel value={value} index={0}>
      <BuilderResult
        characterWeapon={characterWeapon}
        artifact1={artifact1}
        artifact2={artifact2}
        artifact3={artifact3}
        artifact4={artifact4}
        artifact5={artifact5} />
    </TabPanel>
    <TabPanel value={value} index={1}>
      <CharacterAndWeapon getValue={onCharacterWeaponUpdate} />
    </TabPanel>
    <TabPanel value={value} index={2}>
      <Template type={'Flower of Life'} getValue={onArtifact1Update} />
    </TabPanel>
    <TabPanel value={value} index={3}>
      <Template type={'Plume of Death'} getValue={onArtifact2Update} />
    </TabPanel>
    <TabPanel value={value} index={4}>
      <Template type={'Sands of Eon'} getValue={onArtifact3Update} />
    </TabPanel>
    <TabPanel value={value} index={5}>
      <Template type={'Goblet of Eonothem'} getValue={onArtifact4Update} />
    </TabPanel>
    <TabPanel value={value} index={6}>
      <Template type={'Circlet of Logos'} getValue={onArtifact5Update} />
    </TabPanel>
  </div>);
}

export default Builder;