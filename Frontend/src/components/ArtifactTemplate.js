import React from "react";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Alert, AlertTitle } from '@material-ui/lab';
import { FormControl } from '@material-ui/core';

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        minWidth: 90,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(0.5),
        },
    },
    form: {
        border: 1,
        width: '30ch',
        margin: theme.spacing(1),
    },
    label: {
        margin: theme.spacing(1),
        display: 'flex',
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

function isNumeric(str) {
    if (typeof str !== "string") return false
    return !isNaN(str) &&
        !isNaN(parseFloat(str))
}

function Template(props) {

    const templateType = props.type;
    const possibleStatList = ["atk_percent", "atk_flat", "cri_rate", "cri_dmg", "energy_recharge",
        "elemental_mastery", "def_flat", "def_percent", "hp_flat", "hp_percent"];
    const [primaryStat, setPrimaryStat] = React.useState(localStorage.getItem("primaryStat" + templateType) || "");
    const [secondaryStat1, setSecondaryStat1] = React.useState(localStorage.getItem("secondaryStat1" + templateType) || "");
    const [secondaryStat2, setSecondaryStat2] = React.useState(localStorage.getItem("secondaryStat2" + templateType) || "");
    const [secondaryStat3, setSecondaryStat3] = React.useState(localStorage.getItem("secondaryStat3" + templateType) || "");
    const [secondaryStat4, setSecondaryStat4] = React.useState(localStorage.getItem("secondaryStat4" + templateType) || "");
    const [primaryStatValue, setPrimaryStatValue] = React.useState(localStorage.getItem("primaryStatValue" + templateType) || 0);
    const [secondaryStatValue1, setSecondaryStatValue1] = React.useState(localStorage.getItem("secondaryStatValue1" + templateType) || 0);
    const [secondaryStatValue2, setSecondaryStatValue2] = React.useState(localStorage.getItem("secondaryStatValue2" + templateType) || 0);
    const [secondaryStatValue3, setSecondaryStatValue3] = React.useState(localStorage.getItem("secondaryStatValue3" + templateType) || 0);
    const [secondaryStatValue4, setSecondaryStatValue4] = React.useState(localStorage.getItem("secondaryStatValue4" + templateType) || 0);
    const [artifactSet, setArtifactSet] = React.useState(localStorage.getItem("artifactSet" + templateType) || "");
    const [payload, setPayload] = React.useState(JSON.stringify(localStorage.getItem("payload" + templateType) || "{}"));
    props.getValue(payload);

    const [isError, setIsError] = React.useState(false);

    const classes = useStyles();

    const translator = {
        atk_percent: "ATK%",
        atk_flat: "ATK",
        cri_rate: "CRIT Rate%",
        cri_dmg: "CRIT DMG%",
        energy_recharge: "Energy Recharge%",
        elemental_mastery: "Elemental Mastery",
        def_flat: "DEF",
        def_percent: "DEF%",
        hp_flat: "HP",
        hp_percent: "HP%",
    }

    const onChangePrimaryStat = (e) => {
        setPrimaryStat(e.target.value);
        localStorage.setItem("primaryStat" + templateType, e.target.value);
        const _payload = {
            atk_percent: 0,
            atk_flat: 0,
            cri_rate: 0,
            cri_dmg: 0,
            energy_recharge: 0,
            elemental_mastery: 0,
            def_flat: 0,
            def_percent: 0,
            hp_flat: 0,
            hp_percent: 0,
            dmg_bonus: 0,
            healing_bonus: 0,
            artifact_set: artifactSet,
        };

        if (primaryStat !== "") {
            _payload[e.target.value] = primaryStatValue;
        }
        if (secondaryStat1 !== "") {
            _payload[secondaryStat1] = _payload[secondaryStat1] + secondaryStatValue1;
        }
        if (secondaryStat2 !== "") {
            _payload[secondaryStat2] = _payload[secondaryStat2] + secondaryStatValue2;
        }
        if (secondaryStat3 !== "") {
            _payload[secondaryStat3] = _payload[secondaryStat3] + secondaryStatValue3;
        }
        if (secondaryStat4 !== "") {
            _payload[secondaryStat4] = _payload[secondaryStat4] + secondaryStatValue4;
        }
        setPayload(_payload);
        localStorage.setItem("payload" + templateType, JSON.stringify(_payload));
    };

    const handleChange = (e) => {
        if (!isNumeric(e.target.value) || e.target.value < 0) {
            return
        }
        if (e.target.id === 'secondary1_value') {
            localStorage.setItem("secondaryStatValue1" + templateType, e.target.value);
            setSecondaryStatValue1(e.target.value);
            const _payload = {
                atk_percent: 0,
                atk_flat: 0,
                cri_rate: 0,
                cri_dmg: 0,
                energy_recharge: 0,
                elemental_mastery: 0,
                def_flat: 0,
                def_percent: 0,
                hp_flat: 0,
                hp_percent: 0,
                dmg_bonus: 0,
                healing_bonus: 0,
                artifact_set: artifactSet,
            };

            if (primaryStat !== "") {
                _payload[primaryStat] = primaryStatValue;
            }
            if (secondaryStat1 !== "") {
                _payload[secondaryStat1] = _payload[secondaryStat1] + e.target.value;
            }
            if (secondaryStat2 !== "") {
                _payload[secondaryStat2] = _payload[secondaryStat2] + secondaryStatValue2;
            }
            if (secondaryStat3 !== "") {
                _payload[secondaryStat3] = _payload[secondaryStat3] + secondaryStatValue3;
            }
            if (secondaryStat4 !== "") {
                _payload[secondaryStat4] = _payload[secondaryStat4] + secondaryStatValue4;
            }
            setPayload(_payload);
            localStorage.setItem("payload" + templateType, JSON.stringify(_payload));
        }
        else if (e.target.id === 'secondary2_value') {
            localStorage.setItem("secondaryStatValue2" + templateType, e.target.value);
            setSecondaryStatValue2(e.target.value);
            const _payload = {
                atk_percent: 0,
                atk_flat: 0,
                cri_rate: 0,
                cri_dmg: 0,
                energy_recharge: 0,
                elemental_mastery: 0,
                def_flat: 0,
                def_percent: 0,
                hp_flat: 0,
                hp_percent: 0,
                dmg_bonus: 0,
                healing_bonus: 0,
                artifact_set: artifactSet,
            };

            if (primaryStat !== "") {
                _payload[primaryStat] = primaryStatValue;
            }
            if (secondaryStat1 !== "") {
                _payload[secondaryStat1] = _payload[secondaryStat1] + secondaryStatValue1;
            }
            if (secondaryStat2 !== "") {
                _payload[secondaryStat2] = _payload[secondaryStat2] + e.target.value;
            }
            if (secondaryStat3 !== "") {
                _payload[secondaryStat3] = _payload[secondaryStat3] + secondaryStatValue3;
            }
            if (secondaryStat4 !== "") {
                _payload[secondaryStat4] = _payload[secondaryStat4] + secondaryStatValue4;
            }
            setPayload(_payload);
            localStorage.setItem("payload" + templateType, JSON.stringify(_payload));
        }
        else if (e.target.id === 'secondary3_value') {
            localStorage.setItem("secondaryStatValue3" + templateType, e.target.value);
            setSecondaryStatValue3(e.target.value);
            const _payload = {
                atk_percent: 0,
                atk_flat: 0,
                cri_rate: 0,
                cri_dmg: 0,
                energy_recharge: 0,
                elemental_mastery: 0,
                def_flat: 0,
                def_percent: 0,
                hp_flat: 0,
                hp_percent: 0,
                dmg_bonus: 0,
                healing_bonus: 0,
                artifact_set: artifactSet,
            };

            if (primaryStat !== "") {
                _payload[primaryStat] = primaryStatValue;
            }
            if (secondaryStat1 !== "") {
                _payload[secondaryStat1] = _payload[secondaryStat1] + secondaryStatValue1;
            }
            if (secondaryStat2 !== "") {
                _payload[secondaryStat2] = _payload[secondaryStat2] + secondaryStatValue2;
            }
            if (secondaryStat3 !== "") {
                _payload[secondaryStat3] = _payload[secondaryStat3] + e.target.value;
            }
            if (secondaryStat4 !== "") {
                _payload[secondaryStat4] = _payload[secondaryStat4] + secondaryStatValue4;
            }
            setPayload(_payload);
            localStorage.setItem("payload" + templateType, JSON.stringify(_payload));
        }
        else if (e.target.id === 'secondary4_value') {
            localStorage.setItem("secondaryStatValue4" + templateType, e.target.value);
            setSecondaryStatValue4(e.target.value);
            const _payload = {
                atk_percent: 0,
                atk_flat: 0,
                cri_rate: 0,
                cri_dmg: 0,
                energy_recharge: 0,
                elemental_mastery: 0,
                def_flat: 0,
                def_percent: 0,
                hp_flat: 0,
                hp_percent: 0,
                dmg_bonus: 0,
                healing_bonus: 0,
                artifact_set: artifactSet,
            };

            if (primaryStat !== "") {
                _payload[primaryStat] = primaryStatValue;
            }
            if (secondaryStat1 !== "") {
                _payload[secondaryStat1] = _payload[secondaryStat1] + secondaryStatValue1;
            }
            if (secondaryStat2 !== "") {
                _payload[secondaryStat2] = _payload[secondaryStat2] + secondaryStatValue2;
            }
            if (secondaryStat3 !== "") {
                _payload[secondaryStat3] = _payload[secondaryStat3] + secondaryStatValue3;
            }
            if (secondaryStat4 !== "") {
                _payload[secondaryStat4] = _payload[secondaryStat4] + e.target.value;
            }
            setPayload(_payload);
            localStorage.setItem("payload" + templateType, JSON.stringify(_payload));
        }
        else if (e.target.id === 'primary_value') {
            localStorage.setItem("primaryStatValue" + templateType, e.target.value);
            setPrimaryStatValue(e.target.value);
            const _payload = {
                atk_percent: 0,
                atk_flat: 0,
                cri_rate: 0,
                cri_dmg: 0,
                energy_recharge: 0,
                elemental_mastery: 0,
                def_flat: 0,
                def_percent: 0,
                hp_flat: 0,
                hp_percent: 0,
                dmg_bonus: 0,
                healing_bonus: 0,
                artifact_set: artifactSet,
            };

            if (primaryStat !== "") {
                _payload[primaryStat] = e.target.value;
            }
            if (secondaryStat1 !== "") {
                _payload[secondaryStat1] = _payload[secondaryStat1] + secondaryStatValue1;
            }
            if (secondaryStat2 !== "") {
                _payload[secondaryStat2] = _payload[secondaryStat2] + secondaryStatValue2;
            }
            if (secondaryStat3 !== "") {
                _payload[secondaryStat3] = _payload[secondaryStat3] + secondaryStatValue3;
            }
            if (secondaryStat4 !== "") {
                _payload[secondaryStat4] = _payload[secondaryStat4] + secondaryStatValue4;
            }
            setPayload(_payload);
            localStorage.setItem("payload" + templateType, JSON.stringify(_payload));
        }
    }

    const onChangeSecondaryStat = (e) => {
        if (e.target.name === 'secondary1') {
            localStorage.setItem("secondaryStat1" + templateType, e.target.value);
            setSecondaryStat1(e.target.value);
            const _payload = {
                atk_percent: 0,
                atk_flat: 0,
                cri_rate: 0,
                cri_dmg: 0,
                energy_recharge: 0,
                elemental_mastery: 0,
                def_flat: 0,
                def_percent: 0,
                hp_flat: 0,
                hp_percent: 0,
                dmg_bonus: 0,
                healing_bonus: 0,
                artifact_set: artifactSet,
            };

            if (primaryStat !== "") {
                _payload[primaryStat] = primaryStatValue;
            }
            if (secondaryStat1 !== "") {
                _payload[e.target.value] = _payload[secondaryStat1] + secondaryStatValue1;
            }
            if (secondaryStat2 !== "") {
                _payload[secondaryStat2] = _payload[secondaryStat2] + secondaryStatValue2;
            }
            if (secondaryStat3 !== "") {
                _payload[secondaryStat3] = _payload[secondaryStat3] + secondaryStatValue3;
            }
            if (secondaryStat4 !== "") {
                _payload[secondaryStat4] = _payload[secondaryStat4] + secondaryStatValue4;
            }
            setPayload(_payload);
            localStorage.setItem("payload" + templateType, JSON.stringify(_payload));
        }
        else if (e.target.name === 'secondary2') {
            localStorage.setItem("secondaryStat2" + templateType, e.target.value);
            setSecondaryStat2(e.target.value);
            const _payload = {
                atk_percent: 0,
                atk_flat: 0,
                cri_rate: 0,
                cri_dmg: 0,
                energy_recharge: 0,
                elemental_mastery: 0,
                def_flat: 0,
                def_percent: 0,
                hp_flat: 0,
                hp_percent: 0,
                dmg_bonus: 0,
                healing_bonus: 0,
                artifact_set: artifactSet,
            };

            if (primaryStat !== "") {
                _payload[primaryStat] = primaryStatValue;
            }
            if (secondaryStat1 !== "") {
                _payload[secondaryStat1] = _payload[secondaryStat1] + secondaryStatValue1;
            }
            if (secondaryStat2 !== "") {
                _payload[e.target.value] = _payload[secondaryStat2] + secondaryStatValue2;
            }
            if (secondaryStat3 !== "") {
                _payload[secondaryStat3] = _payload[secondaryStat3] + secondaryStatValue3;
            }
            if (secondaryStat4 !== "") {
                _payload[secondaryStat4] = _payload[secondaryStat4] + secondaryStatValue4;
            }
            setPayload(_payload);
            localStorage.setItem("payload" + templateType, JSON.stringify(_payload));
        }
        else if (e.target.name === 'secondary3') {
            localStorage.setItem("secondaryStat3" + templateType, e.target.value);
            setSecondaryStat3(e.target.value);
            const _payload = {
                atk_percent: 0,
                atk_flat: 0,
                cri_rate: 0,
                cri_dmg: 0,
                energy_recharge: 0,
                elemental_mastery: 0,
                def_flat: 0,
                def_percent: 0,
                hp_flat: 0,
                hp_percent: 0,
                dmg_bonus: 0,
                healing_bonus: 0,
                artifact_set: artifactSet,
            };

            if (primaryStat !== "") {
                _payload[primaryStat] = primaryStatValue;
            }
            if (secondaryStat1 !== "") {
                _payload[secondaryStat1] = _payload[secondaryStat1] + secondaryStatValue1;
            }
            if (secondaryStat2 !== "") {
                _payload[secondaryStat2] = _payload[secondaryStat2] + secondaryStatValue2;
            }
            if (secondaryStat3 !== "") {
                _payload[e.target.value] = _payload[secondaryStat3] + secondaryStatValue3;
            }
            if (secondaryStat4 !== "") {
                _payload[secondaryStat4] = _payload[secondaryStat4] + secondaryStatValue4;
            }
            setPayload(_payload);
            localStorage.setItem("payload" + templateType, JSON.stringify(_payload));
        }
        else if (e.target.name === 'secondary4') {
            localStorage.setItem("secondaryStat4" + templateType, e.target.value);
            setSecondaryStat4(e.target.value);
            const _payload = {
                atk_percent: 0,
                atk_flat: 0,
                cri_rate: 0,
                cri_dmg: 0,
                energy_recharge: 0,
                elemental_mastery: 0,
                def_flat: 0,
                def_percent: 0,
                hp_flat: 0,
                hp_percent: 0,
                dmg_bonus: 0,
                healing_bonus: 0,
                artifact_set: artifactSet,
            };

            if (primaryStat !== "") {
                _payload[primaryStat] = primaryStatValue;
            }
            if (secondaryStat1 !== "") {
                _payload[secondaryStat1] = _payload[secondaryStat1] + secondaryStatValue1;
            }
            if (secondaryStat2 !== "") {
                _payload[secondaryStat2] = _payload[secondaryStat2] + secondaryStatValue2;
            }
            if (secondaryStat3 !== "") {
                _payload[secondaryStat3] = _payload[secondaryStat3] + secondaryStatValue3;
            }
            if (secondaryStat4 !== "") {
                _payload[e.target.value] = _payload[secondaryStat4] + secondaryStatValue4;
            }
            setPayload(_payload);
            localStorage.setItem("payload" + templateType, JSON.stringify(_payload));
        }
    }

    const onChangeArtifactSet = (e) => {
        localStorage.setItem("artifactSet" + templateType, e.target.value);
        setArtifactSet(e.target.value);
        const _payload = {
            atk_percent: 0,
            atk_flat: 0,
            cri_rate: 0,
            cri_dmg: 0,
            energy_recharge: 0,
            elemental_mastery: 0,
            def_flat: 0,
            def_percent: 0,
            hp_flat: 0,
            hp_percent: 0,
            dmg_bonus: 0,
            healing_bonus: 0,
            artifact_set: e.target.value,
        };

        if (primaryStat !== "") {
            _payload[primaryStat] = primaryStatValue;
        }
        if (secondaryStat1 !== "") {
            _payload[secondaryStat1] = _payload[secondaryStat1] + secondaryStatValue1;
        }
        if (secondaryStat2 !== "") {
            _payload[secondaryStat2] = _payload[secondaryStat2] + secondaryStatValue2;
        }
        if (secondaryStat3 !== "") {
            _payload[secondaryStat3] = _payload[secondaryStat3] + secondaryStatValue3;
        }
        if (secondaryStat4 !== "") {
            _payload[secondaryStat4] = _payload[secondaryStat4] + secondaryStatValue4;
        }
        setPayload(_payload);
        localStorage.setItem("payload" + templateType, JSON.stringify(_payload));
    }
    React.useEffect(() => {
        const _payload = {
            atk_percent: 0,
            atk_flat: 0,
            cri_rate: 0,
            cri_dmg: 0,
            energy_recharge: 0,
            elemental_mastery: 0,
            def_flat: 0,
            def_percent: 0,
            hp_flat: 0,
            hp_percent: 0,
            dmg_bonus: 0,
            healing_bonus: 0,
            artifact_set: localStorage.getItem("artifactSet" + templateType) || "",
        };
        if (localStorage.getItem("primaryStat" + templateType) !== "") {
            _payload[localStorage.getItem("primaryStat" + templateType)] = 
            parseFloat(localStorage.getItem("primaryStatValue" + templateType)) || 0;
        }
        if (localStorage.getItem("secondaryStat1" + templateType) !== "") {
            _payload[localStorage.getItem("secondaryStat1" + templateType)] = 
            parseFloat(_payload[localStorage.getItem("secondaryStat1" + templateType)]) + 
            parseFloat(localStorage.getItem("secondaryStatValue1" + templateType) || 0);
        }
        if (localStorage.getItem("secondaryStat2" + templateType) !== "") {
            _payload[localStorage.getItem("secondaryStat2" + templateType)] = 
            parseFloat(_payload[localStorage.getItem("secondaryStat2" + templateType)]) + 
            parseFloat(localStorage.getItem("secondaryStatValue2" + templateType) || 0);
        }
        if (localStorage.getItem("secondaryStat3" + templateType) !== "") {
            _payload[localStorage.getItem("secondaryStat3" + templateType)] = 
            parseFloat(_payload[localStorage.getItem("secondaryStat3" + templateType)]) + 
            parseFloat(localStorage.getItem("secondaryStatValue3" + templateType) || 0);
        }
        if (localStorage.getItem("secondaryStat4" + templateType) !== "") {
            _payload[localStorage.getItem("secondaryStat4" + templateType)] = 
            parseFloat(_payload[localStorage.getItem("secondaryStat4" + templateType)]) + 
            parseFloat(localStorage.getItem("secondaryStatValue4" + templateType) || 0);
        }
        setPayload(_payload);
        setPrimaryStat(localStorage.getItem("primaryStat" + templateType) || "");
        setSecondaryStat1(localStorage.getItem("secondaryStat1" + templateType) || "");
        setSecondaryStat2(localStorage.getItem("secondaryStat2" + templateType) || "");
        setSecondaryStat3(localStorage.getItem("secondaryStat3" + templateType) || "");
        setSecondaryStat4(localStorage.getItem("secondaryStat4" + templateType) || "");
        setPrimaryStatValue(localStorage.getItem("primaryStatValue" + templateType) || 0);
        setSecondaryStatValue1(localStorage.getItem("secondaryStatValue1" + templateType) || 0);
        setSecondaryStatValue2(localStorage.getItem("secondaryStatValue2" + templateType) || 0);
        setSecondaryStatValue3(localStorage.getItem("secondaryStatValue3" + templateType) || 0);
        setSecondaryStatValue4(localStorage.getItem("secondaryStatValue4" + templateType) || 0);
        setArtifactSet(localStorage.getItem("artifactSet" + templateType) || "");
    }, [])

    return (
        <div className={classes.root}>
            <FormControl className={classes.margin}>
                <InputLabel id="artifactSet">Artifact Set</InputLabel>
                <Select
                    name="artifactSet"
                    labelId="artifactSet-label"
                    id="artifactSet-select"
                    value={artifactSet}
                    onChange={onChangeArtifactSet}
                    input={<BootstrapInput />}
                >
                    <MenuItem value={'viridescent_venerer'}>Viridescent Venerer</MenuItem>
                    <MenuItem value={'thundering_fury'}>Thundering Fury</MenuItem>
                    <MenuItem value={'thundersoother'}>Thundersoother</MenuItem>
                    <MenuItem value={'crimson_witch_of_flames'}>Crimson Witch of Flames</MenuItem>
                    <MenuItem value={'lavawalker'}>Lavawalker</MenuItem>
                    <MenuItem value={'archaic_petra'}>Archaic Petra</MenuItem>
                    <MenuItem value={'retracing_bolide'}>Retracing Bolide</MenuItem>
                    <MenuItem value={'maiden_beloved'}>Maiden Beloved</MenuItem>
                    <MenuItem value={'noblesse_oblige'}>Noblesse Oblige</MenuItem>
                    <MenuItem value={'bloodstained_chivalry'}>Bloodstained Chivalry</MenuItem>
                </Select>
            </FormControl><br />
            <FormControl className={classes.margin}>
                <InputLabel id="primary">Primary Stat</InputLabel>
                {
                    templateType === "Flower of Life" ?
                        <Select
                            name="primary"
                            labelId="primary-label"
                            id="primary-select"
                            value={primaryStat}
                            onChange={onChangePrimaryStat}
                            input={<BootstrapInput />}
                        >
                            <MenuItem value={'hp_flat'}>HP</MenuItem>
                        </Select> : templateType === "Plume of Death" ?
                            <Select
                                name="primary"
                                labelId="primary-label"
                                id="primary-select"
                                value={primaryStat}
                                onChange={onChangePrimaryStat}
                                input={<BootstrapInput />}
                            >
                                <MenuItem value={'atk_falt'}>Attack</MenuItem>
                            </Select> : templateType === "Sands of Eon" ?
                                <Select
                                    name="primary"
                                    labelId="primary-label"
                                    id="primary-select"
                                    value={primaryStat}
                                    onChange={onChangePrimaryStat}
                                    input={<BootstrapInput />}
                                >
                                    <MenuItem value={'hp_percent'}>HP%</MenuItem>
                                    <MenuItem value={'def_percent'}>DEF%</MenuItem>
                                    <MenuItem value={'atk_percent'}>ATK%</MenuItem>
                                    <MenuItem value={'elemental_mastery'}>Elemental Mastery</MenuItem>
                                    <MenuItem value={'energy_recharge'}>Energy Recharge%</MenuItem>
                                </Select> : templateType === "Goblet of Eonothem" ?
                                    <Select
                                        name="primary"
                                        labelId="primary-label"
                                        id="primary-select"
                                        value={primaryStat}
                                        onChange={onChangePrimaryStat}
                                        input={<BootstrapInput />}
                                    >
                                        <MenuItem value={'hp_percent'}>HP%</MenuItem>
                                        <MenuItem value={'def_percent'}>DEF%</MenuItem>
                                        <MenuItem value={'atk_percent'}>ATK%</MenuItem>
                                        <MenuItem value={'elemental_mastery'}>Elemental Mastery</MenuItem>
                                        <MenuItem value={'dmg_bonus'}>Bonus Damage%</MenuItem>
                                    </Select> : templateType === "Circlet of Logos" ?
                                        <Select
                                            name="primary"
                                            labelId="primary-label"
                                            id="primary-select"
                                            value={primaryStat}
                                            onChange={onChangePrimaryStat}
                                            input={<BootstrapInput />}
                                        >
                                            <MenuItem value={'hp_percent'}>HP%</MenuItem>
                                            <MenuItem value={'def_percent'}>DEF%</MenuItem>
                                            <MenuItem value={'atk_percent'}>ATK%</MenuItem>
                                            <MenuItem value={'elemental_mastery'}>Elemental Mastery</MenuItem>
                                            <MenuItem value={'cri_rate'}>CRIT Rate%</MenuItem>
                                            <MenuItem value={'cri_dmg'}>CRIT DMG%</MenuItem>
                                            <MenuItem value={'healing_bonus'}>Healing Bonus%</MenuItem>
                                        </Select>
                                        : null
                }

            </FormControl>
            <FormControl className={classes.margin}>
                <InputLabel id="primary_valye">Value</InputLabel>
                <BootstrapInput id="primary_value" defaultValue={primaryStatValue} onChange={handleChange} />
            </FormControl><br />
            <FormControl className={classes.margin}>
                <InputLabel id="secondary1">Secondary Stat</InputLabel>
                <Select
                    name="secondary1"
                    labelId="secondary1-label"
                    id="secondary1-select"
                    value={secondaryStat1}
                    onChange={onChangeSecondaryStat}
                    input={<BootstrapInput />}
                >
                    {possibleStatList.filter(x => ![primaryStat, secondaryStat2, secondaryStat3,
                        secondaryStat4].includes(x)).map((selectable) =>
                            <MenuItem value={selectable}>{translator[selectable]}</MenuItem>
                        )}
                </Select>
            </FormControl>
            <FormControl className={classes.margin}>
                <InputLabel id="secondary1_value">Value</InputLabel>
                <BootstrapInput id="secondary1_value" defaultValue={secondaryStatValue1} onChange={handleChange} />
            </FormControl><br />
            <FormControl className={classes.margin}>
                <InputLabel id="secondary2">Secondary Stat</InputLabel>
                <Select
                    name="secondary2"
                    labelId="secondary2-label"
                    id="secondary2-select"
                    value={secondaryStat2}
                    onChange={onChangeSecondaryStat}
                    input={<BootstrapInput />}
                >
                    {possibleStatList.filter(x => ![primaryStat,
                        secondaryStat1, secondaryStat3, secondaryStat4].includes(x)).map((selectable) =>
                            <MenuItem value={selectable}>{translator[selectable]}</MenuItem>
                        )}
                </Select>
            </FormControl>
            <FormControl className={classes.margin}>
                <InputLabel id="secondary2_value">Value</InputLabel>
                <BootstrapInput id="secondary2_value" defaultValue={secondaryStatValue2} onChange={handleChange} />
            </FormControl><br />
            <FormControl className={classes.margin}>
                <InputLabel id="secondary3">Secondary Stat</InputLabel>
                <Select
                    name="secondary3"
                    labelId="secondary3-label"
                    id="secondary3-select"
                    value={secondaryStat3}
                    onChange={onChangeSecondaryStat}
                    input={<BootstrapInput />}
                >
                    {possibleStatList.filter(x => ![primaryStat,
                        secondaryStat1, secondaryStat2, secondaryStat4].includes(x)).map((selectable) =>
                            <MenuItem value={selectable}>{translator[selectable]}</MenuItem>
                        )}
                </Select>
            </FormControl>
            <FormControl className={classes.margin}>
                <InputLabel id="secondary3_value">Value</InputLabel>
                <BootstrapInput id="secondary3_value" defaultValue={secondaryStatValue3} onChange={handleChange} />
            </FormControl><br />
            <FormControl className={classes.margin}>
                <InputLabel id="secondary4">Secondary Stat</InputLabel>
                <Select
                    name="secondary4"
                    labelId="secondary4-label"
                    id="secondary4-select"
                    value={secondaryStat4}
                    onChange={onChangeSecondaryStat}
                    input={<BootstrapInput />}
                >
                    {possibleStatList.filter(x => ![primaryStat,
                        secondaryStat1, secondaryStat2, secondaryStat3].includes(x)).map((selectable) =>
                            <MenuItem value={selectable}>{translator[selectable]}</MenuItem>
                        )}
                </Select>
            </FormControl>
            <FormControl className={classes.margin}>
                <InputLabel id="secondary4_value">Value</InputLabel>
                <BootstrapInput id="secondary4_value" defaultValue={secondaryStatValue4} onChange={handleChange} />
            </FormControl><br />
            {isError ?
                <Grid item xs={12}>
                    <Alert severity="error" >
                        <AlertTitle>Error</AlertTitle>
                                Please check your input.
                            </Alert>
                </Grid>
                :
                null
            }
        </div>
    );
}

export default Template;