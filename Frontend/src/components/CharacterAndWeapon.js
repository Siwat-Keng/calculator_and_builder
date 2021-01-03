import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { Alert, AlertTitle } from '@material-ui/lab';
import ExternalService from '../api/external';

const marks = [
    {
        value: 0,
        label: '1/20',
    },
    {
        value: 1,
        label: '20/20',
    },
    {
        value: 2,
        label: '20/40',
    },
    {
        value: 3,
        label: '40/40',
    },
    {
        value: 4,
        label: '40/50',
    },
    {
        value: 5,
        label: '50/50',
    },
    {
        value: 6,
        label: '50/60',
    },
    {
        value: 7,
        label: '60/60',
    },
    {
        value: 8,
        label: '60/70',
    },
    {
        value: 9,
        label: '70/70',
    },
    {
        value: 10,
        label: '70/80',
    },
    {
        value: 11,
        label: '80/80',
    },
    {
        value: 12,
        label: '80/90',
    },
    {
        value: 13,
        label: '90/90',
    },
];

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

function CharacterAndWeapon(props) {

    const classes = useStyles();
    const [selectableCharacters, setSelectableCharacters] = React.useState([]);
    const [character, setCharacter] = React.useState(localStorage.getItem("character") || "");
    const [selectableWeapons, setSelectableWeapons] = React.useState([]);
    const [weapon, setWeapon] = React.useState(localStorage.getItem("weapon") || "");
    const [characterLVL, setCharacterLVL] = React.useState(parseInt(localStorage.getItem("characterLVL") || 13));
    const [weaponLVL, setWeaponLVL] = React.useState(parseInt(localStorage.getItem("weaponLVL") || 13));
    const [payload, setPayload] = React.useState({
        character: localStorage.getItem("character") || "",
        weapon: localStorage.getItem("weapon") || "",
        character_lvl: parseInt(localStorage.getItem("characterLVL") || 13),
        weapon_lvl: parseInt(localStorage.getItem("weaponLVL") || 13),
    });
    const [isError, setIsError] = React.useState(false);

    props.getValue(payload);

    const onChangeCharacter = (event) => {
        const _payload = {
            character: event.target.value,
            weapon: weapon,
            character_lvl: characterLVL,
            weapon_lvl: weaponLVL,
        }
        setPayload(_payload);
        setCharacter(event.target.value);
        setWeapon("");
        localStorage.setItem("character", event.target.value);
        localStorage.setItem("weapon", "");
        ExternalService.getWeapon(event.target.value).then((response) => {
            setSelectableWeapons(response);
        })
    }

    const onChangeWeapon = (event) => {
        const _payload = {
            character: character,
            weapon: event.target.value,
            character_lvl: characterLVL,
            weapon_lvl: weaponLVL,
        }
        setPayload(_payload);
        setIsError(false);
        setWeapon(event.target.value);
        localStorage.setItem("weapon", event.target.value);
    }

    const onChangeCharacterLVL = (event, value) => {
        const _payload = {
            character: character,
            weapon: weapon,
            character_lvl: value,
            weapon_lvl: weaponLVL,
        }
        localStorage.setItem("characterLVL", value);
        setCharacterLVL(value);
        setPayload(_payload);
    }

    const onChangeWeaponLVL = (event, value) => {
        const _payload = {
            character: character,
            weapon: weapon,
            character_lvl: characterLVL,
            weapon_lvl: value,
        }
        localStorage.setItem("weaponLVL", value);
        setWeaponLVL(value);
        setPayload(_payload);
    }

    React.useEffect(() => {
        const _payload = {
            character: localStorage.getItem("character") || "",
            weapon: localStorage.getItem("weapon") || "",
            character_lvl: parseInt(localStorage.getItem("characterLVL") || 13),
            weapon_lvl: parseInt(localStorage.getItem("weaponLVL") || 13),
        }

        setPayload(_payload);

        ExternalService.getCharacters().then((response) => {
            setSelectableCharacters(response.data);
            if (character !== "") {
                ExternalService.getWeapon(character).then((res) => {
                    setSelectableWeapons(res);
                })
            }
        })
            .catch((error) => {
                setIsError(true);
            });
    }, [])

    return (
        <div>
            <FormControl className={classes.margin}>
                <InputLabel id="character">Character</InputLabel>
                <Select
                    name="character"
                    labelId="character-label"
                    defaultValue={character}
                    id="character-select"
                    onChange={onChangeCharacter}
                    input={<BootstrapInput />}
                >
                    {selectableCharacters.map((selectable) =>
                        <MenuItem value={selectable.name}>{selectable.name}</MenuItem>
                    )}
                </Select>
            </FormControl>
            <FormControl className={classes.margin}>
                <InputLabel id="weapon">Weapon</InputLabel>
                <Select
                    name="weapon"
                    labelId="weapon-label"
                    defaultValue={weapon}
                    id="weapon-select"
                    disabled={character === ""}
                    onChange={onChangeWeapon}
                    input={<BootstrapInput />}
                >
                    {selectableWeapons.map((selectable) =>
                        <MenuItem value={selectable.name}>{selectable.name}</MenuItem>
                    )}
                </Select>
            </FormControl><br />
            <Typography gutterBottom>
                Character Level
      </Typography>
            <Slider
                defaultValue={characterLVL}
                step={1}
                marks={marks}
                disabled={character === ""}
                max={13}
                min={0}
                valueLabelDisplay="off"
                onChangeCommitted={onChangeCharacterLVL}
            /><br />
            <Typography gutterBottom>
                Weapon Level
      </Typography>
            <Slider
                defaultValue={weaponLVL}
                step={1}
                marks={marks}
                disabled={weapon === ""}
                max={13}
                min={0}
                valueLabelDisplay="off"
                onChangeCommitted={onChangeWeaponLVL}
            /><br />
            {isError ?
                <Alert severity="error" >
                    <AlertTitle>Error</AlertTitle>
                                Something went wrong.
                            </Alert>
                :
                null
            }
        </div>
    );
}

export default CharacterAndWeapon;