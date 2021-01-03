import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import { Alert, AlertTitle } from '@material-ui/lab';
import DamageService from '../api/damage';

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
    margin: {
        margin: theme.spacing(1),
    },
}));

function validate(type, trigger, startDamage, elementalMastery, increaseDamage) {
    if (type !== "" && trigger !== "" && startDamage !== "" && elementalMastery !== "" && increaseDamage !== "" &&
        ((type === "vaporize" && ["hydro", "pyro"].includes(trigger)) || (type === "melt" && ["pyro", "cyro"].includes(trigger)))) {
        return true;
    }
    return false;
}

function ScaleReaction(probs) {

    const classes = useStyles();
    const type = probs.type;

    const [trigger, setTrigger] = React.useState(localStorage.getItem("trigger") || "");
    const [startDamage, setStartDamage] = React.useState(localStorage.getItem("startDamage") || 1000);
    const [elementalMastery, setElementalMastery] = React.useState(localStorage.getItem("elementalMastery") || 50);
    const [increaseDamage, setIncreaseDamage] = React.useState(localStorage.getItem("increaseDamage") || 0);
    const [estimatedDamage, setEstimatedDamage] = React.useState();
    const [isError, setIsError] = React.useState(false);

    const handleChange = (event) => {
        if (event.target.name === "trigger") {
            setTrigger(event.target.value);
            localStorage.setItem("trigger", event.target.value);
            if (validate(type, event.target.value, startDamage, elementalMastery, increaseDamage)) {
                const payload = {
                    type: type,
                    trigger: event.target.value,
                    damage: startDamage,
                    em: elementalMastery,
                    increase: increaseDamage,
                }
                DamageService.scaleReactionDamage(payload).then((response) => {
                    if (response.data.status === "OK") {
                        setIsError(false);
                        setEstimatedDamage((Math.round(response.data.damage * 100) / 100).toFixed(2));
                    }
                    else {
                        setIsError(true);
                    }
                })
            }
        }
        else if (event.target.id === "startDamage") {
            setStartDamage(event.target.value);
            localStorage.setItem("startDamage", event.target.value);
            if (validate(type, trigger, event.target.value, elementalMastery, increaseDamage)) {
                const payload = {
                    type: type,
                    trigger: trigger,
                    damage: event.target.value,
                    em: elementalMastery,
                    increase: increaseDamage,
                }
                DamageService.scaleReactionDamage(payload).then((response) => {
                    if (response.data.status === "OK") {
                        setIsError(false);
                        setEstimatedDamage((Math.round(response.data.damage * 100) / 100).toFixed(2));
                    }
                    else {
                        setIsError(true);
                    }
                })
            }
        }
        else if (event.target.id === "elementalMastery") {
            setElementalMastery(event.target.value);
            localStorage.setItem("elementalMastery", event.target.value);
            if (validate(type, trigger, startDamage, event.target.value, increaseDamage)) {
                const payload = {
                    type: type,
                    trigger: trigger,
                    damage: startDamage,
                    em: event.target.value,
                    increase: increaseDamage,
                }
                DamageService.scaleReactionDamage(payload).then((response) => {
                    if (response.data.status === "OK") {
                        setIsError(false);
                        setEstimatedDamage((Math.round(response.data.damage * 100) / 100).toFixed(2));
                    }
                    else {
                        setIsError(true);
                    }
                })
            }
        }
        else if (event.target.id === "increaseDamage") {
            setIncreaseDamage(event.target.value);
            localStorage.setItem("increaseDamage", event.target.value);
            if (validate(type, trigger, startDamage, elementalMastery, event.target.value)) {
                const payload = {
                    type: type,
                    trigger: trigger,
                    damage: startDamage,
                    em: elementalMastery,
                    increase: event.target.value,
                }
                DamageService.scaleReactionDamage(payload).then((response) => {
                    if (response.data.status === "OK") {
                        setIsError(false);
                        setEstimatedDamage((Math.round(response.data.damage * 100) / 100).toFixed(2));
                    }
                    else {
                        setIsError(true);
                    }
                })
            }
        }
        else {
            return
        }
    };

    React.useEffect(() => {
        if (validate(type, trigger, startDamage, elementalMastery, increaseDamage)) {
            const payload = {
                type: type,
                trigger: trigger,
                damage: startDamage,
                em: elementalMastery,
                increase: increaseDamage,
            }
            DamageService.scaleReactionDamage(payload).then((response) => {
                if (response.data.status === "OK") {
                    setIsError(false);
                    setEstimatedDamage((Math.round(response.data.damage * 100) / 100).toFixed(2));
                }
                else {
                    setIsError(true);
                }
            })
        }
    })

    return (
        <div>
            <FormControl className={classes.margin}>
                <InputLabel id="trigger">Trigger Element</InputLabel>
                <Select
                    name="trigger"
                    labelId="trigger-label"
                    id="trigger-select"
                    defaultValue={trigger}
                    disabled={type ? false : true}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                >
                    <MenuItem value={'pyro'}>Pyro</MenuItem>
                    {
                        type === "melt" ?
                            <MenuItem value={'cyro'}>Cyro</MenuItem>
                            : type === "vaporize" ?
                                <MenuItem value={'hydro'}>Hydro</MenuItem> : null
                    }
                </Select>
            </FormControl>
            <FormControl className={classes.margin}>
                <InputLabel>Increase Reaction DMG(%)</InputLabel>
                <BootstrapInput id="increaseDamage" defaultValue={increaseDamage} onChange={handleChange} />
            </FormControl><br />
            <FormControl className={classes.margin}>
                <InputLabel>Raw Damage</InputLabel>
                <BootstrapInput id="startDamage" defaultValue={startDamage} onChange={handleChange} />
            </FormControl>
            <FormControl className={classes.margin}>
                <InputLabel>Elemental Mastery</InputLabel>
                <BootstrapInput id="elementalMastery" defaultValue={elementalMastery} onChange={handleChange} />
            </FormControl><br /><br />
            <label className={classes.label} style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Damage : {estimatedDamage}</label><br />
            {isError ?
                <Alert severity="error" >
                    <AlertTitle>Error</AlertTitle>
                Please check your input.
            </Alert>
                :
                null
            }
        </div>
    );
}

export default ScaleReaction;