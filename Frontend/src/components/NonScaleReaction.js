import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
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

function validate(type, characterLevel, elementalMastery, increaseEffect) {
    if (type !== "" && characterLevel !== "" && elementalMastery !== "" && increaseEffect !== "") {
        return true;
    }
    return false;
}

function NonScaleReaction(probs) {

    const type = probs.type;
    const classes = useStyles();
    const [characterLevel, setCharacterLevel] = React.useState(localStorage.getItem("characterLevel") || 90);
    const [elementalMastery, setElementalMastery] = React.useState(localStorage.getItem("elementalMastery") || 50);
    const [increaseEffect, setIncreaseEffect] = React.useState(localStorage.getItem("increaseEffect") || 0)
    const [resultValue, setResultValue] = React.useState();
    const [isError, setIsError] = React.useState();

    const handleChange = (event) => {
        if (event.target.id === "characterLevel") {
            setCharacterLevel(event.target.value);
            localStorage.setItem("characterLevel", event.target.value);
            if (validate(type, event.target.value, elementalMastery, increaseEffect)) {
                const payload = {
                    type: type,
                    lvl: event.target.value,
                    em: elementalMastery,
                    increase: increaseEffect,
                }
                DamageService.reactionDamage(payload).then((response) => {
                    if (response.data.status === "OK") {
                        setIsError(false);
                        setResultValue((Math.round(response.data.result * 100) / 100).toFixed(2));
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
            if (validate(type, characterLevel, event.target.value, increaseEffect)) {
                const payload = {
                    type: type,
                    lvl: characterLevel,
                    em: event.target.value,
                    increase: increaseEffect,
                }
                DamageService.reactionDamage(payload).then((response) => {
                    if (response.data.status === "OK") {
                        setIsError(false);
                        setResultValue((Math.round(response.data.result * 100) / 100).toFixed(2));
                    }
                    else {
                        setIsError(true);
                    }
                })
            }
        }
        else if (event.target.id === "increaseEffect") {
            setIncreaseEffect(event.target.value);
            localStorage.setItem("increaseEffect", event.target.value);
            if (validate(type, characterLevel, elementalMastery, event.target.value)) {
                const payload = {
                    type: type,
                    lvl: characterLevel,
                    em: elementalMastery,
                    increase: event.target.value,
                }
                DamageService.reactionDamage(payload).then((response) => {
                    if (response.data.status === "OK") {
                        setIsError(false);
                        setResultValue((Math.round(response.data.result * 100) / 100).toFixed(2));
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
    }

    React.useEffect(() => {
        if (validate(type, characterLevel, elementalMastery, increaseEffect)) {
            const payload = {
                type: type,
                lvl: characterLevel,
                em: elementalMastery,
                increase: increaseEffect,
            }
            DamageService.reactionDamage(payload).then((response) => {
                if (response.data.status === "OK") {
                    setIsError(false);
                    setResultValue((Math.round(response.data.result * 100) / 100).toFixed(2));
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
                <InputLabel>Character Level</InputLabel>
                <BootstrapInput id="characterLevel" defaultValue={characterLevel} onChange={handleChange} />
            </FormControl>
            <FormControl className={classes.margin}>
                <InputLabel>Elemental Mastery</InputLabel>
                <BootstrapInput id="elementalMastery" defaultValue={elementalMastery} onChange={handleChange} />
            </FormControl>
            <FormControl className={classes.margin}>
                <InputLabel>{type === "crystallize" ?
                    "Increase Shield Health" :
                    "Increase Damage"}</InputLabel>
                <BootstrapInput id="increaseEffect" defaultValue={increaseEffect} onChange={handleChange} />
            </FormControl><br />
            <label className={classes.label} style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>{type === "crystallize" ?
                "Shield Health" : "Damage"} : {resultValue}</label><br />
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

export default NonScaleReaction;