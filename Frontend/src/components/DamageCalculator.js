import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import { Alert, AlertTitle } from '@material-ui/lab';
import { FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DamageService from '../api/damage';

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
}));

function isNumeric(str) {
  if (typeof str !== "string") return false
  return !isNaN(str) &&
    !isNaN(parseFloat(str))
}

function DamageCalculator(props) {
  const id = props.id;
  const [BaseATK, setBaseATK] = useState(localStorage.getItem("base_atk" + id) || 100);
  const [PercentATK, setPercentATK] = useState(localStorage.getItem("atk_percent" + id) || 25);
  const [FlatATK, setFlatATK] = useState(localStorage.getItem("flat_atk" + id) || 20);
  const [BonusDMG, setBonusDMG] = useState(localStorage.getItem("bonus_dmg" + id) || 0);
  const [MultiDMG, setMultiDMG] = useState(localStorage.getItem("total_dmg_multi" + id) || 0);
  const [TalentDMG, setTalentDMG] = useState(localStorage.getItem("talent_dmg" + id) || 100);
  const [CriRate, setCriRate] = useState(localStorage.getItem("cri_rate" + id) || 5);
  const [CriDMG, setCriDMG] = useState(localStorage.getItem("cri_dmg" + id) || 50);
  const [EnemyLVL, setEnemyLVL] = useState(localStorage.getItem("enemy_lvl" + id) || 100);
  const [CharacterLVL, setCharacterLVL] = useState(localStorage.getItem("character_lvl" + id) || 90);
  const [DecreaseDEF, setDecreaseDEF] = useState(localStorage.getItem("decrease_def" + id) || 0);
  const [EnemyResist, setEnemyResist] = useState(localStorage.getItem("enemy_resist" + id) || 10);
  const [helperBaseATK, sethelperBaseATK] = useState("");
  const [helperPercentATK, sethelperPercentATK] = useState("");
  const [helperFlatATK, sethelperFlatATK] = useState("");
  const [helperBonusDMG, sethelperBonusDMG] = useState("");
  const [helperMultiDMG, sethelperMultiDMG] = useState("");
  const [helperTalentDMG, sethelperTalentDMG] = useState("");
  const [helperCriRate, sethelperCriRate] = useState("");
  const [helperCriDMG, sethelperCriDMG] = useState("");
  const [helperEnemyLVL, sethelperEnemyLVL] = useState("");
  const [helperCharacterLVL, sethelperCharacterLVL] = useState("");
  const [helperDecreaseDEF, sethelperDecreaseDEF] = useState("");
  const [helperEnemyResist, sethelperEnemyResist] = useState("");
  const [AvgDMG, setAvgDMG] = useState(0);
  const [CalCriDMG, setCalCriDMG] = useState(0);
  const [CalNonCriDMG, setCalNonCriDMG] = useState(0);
  const [isError, setIsError] = useState(false);
  const [analyst, setAnalyst] = useState("");

  const onChangeBaseATK = (e) => {
    if (isNumeric(e.target.value)) {
      localStorage.setItem("base_atk" + id, e.target.value);
      setBaseATK(e.target.value);
      sethelperBaseATK("");
    }
    else {
      sethelperBaseATK("Base Attack must be numeric.")
    }
  };

  const onChangePercentATK = (e) => {
    if (isNumeric(e.target.value)) {
      localStorage.setItem("atk_percent" + id, e.target.value);
      setPercentATK(e.target.value);
      sethelperPercentATK("");
    }
    else {
      sethelperPercentATK("% Attack must be numeric.")
    }
  };

  const onChangeFlatATK = (e) => {
    if (isNumeric(e.target.value)) {
      localStorage.setItem("flat_atk" + id, e.target.value);
      setFlatATK(e.target.value);
      sethelperFlatATK("");
    }
    else {
      sethelperFlatATK("Flat Attack must be numeric.")
    }
  };

  const onChangeBonusDMG = (e) => {
    if (isNumeric(e.target.value)) {
      localStorage.setItem("bonus_dmg" + id, e.target.value);
      setBonusDMG(e.target.value);
      sethelperBonusDMG("");
    }
    else {
      sethelperBonusDMG("Bonus Damage must be numeric.")
    }
  };

  const onChangeMultiDMG = (e) => {
    if (isNumeric(e.target.value)) {
      localStorage.setItem("total_dmg_multi" + id, e.target.value);
      setMultiDMG(e.target.value);
      sethelperMultiDMG("");
    }
    else {
      sethelperMultiDMG("Increase Total Damage must be numeric.")
    }
  };

  const onChangeTalentDMG = (e) => {
    if (isNumeric(e.target.value)) {
      localStorage.setItem("talent_dmg" + id, e.target.value);
      setTalentDMG(e.target.value);
      sethelperTalentDMG("");
    }
    else {
      sethelperTalentDMG("Talent Damage must be numeric.")
    }
  };

  const onChangeCriRate = (e) => {
    if (isNumeric(e.target.value)) {
      localStorage.setItem("cri_rate" + id, e.target.value);
      setCriRate(e.target.value);
      sethelperCriRate("");
    }
    else {
      sethelperCriRate("Critical Rate must be numeric.")
    }
  };

  const onChangeCriDMG = (e) => {
    if (isNumeric(e.target.value)) {
      localStorage.setItem("cri_dmg" + id, e.target.value);
      setCriDMG(e.target.value);
      sethelperCriDMG("");
    }
    else {
      sethelperCriDMG("Critical Damage must be numeric.")
    }
  };

  const onChangeEnemyLVL = (e) => {
    if (isNumeric(e.target.value)) {
      localStorage.setItem("enemy_lvl" + id, e.target.value);
      setEnemyLVL(e.target.value);
      sethelperEnemyLVL("");
    }
    else {
      sethelperEnemyLVL("Level must be numeric.")
    }
  };

  const onChangeCharacterLVL = (e) => {
    if (isNumeric(e.target.value)) {
      localStorage.setItem("character_lvl" + id, e.target.value);
      setCharacterLVL(e.target.value);
      sethelperCharacterLVL("");
    }
    else {
      sethelperCharacterLVL("Level must be numeric.")
    }
  };

  const onChangeDecreaseDEF = (e) => {
    if (isNumeric(e.target.value)) {
      localStorage.setItem("decrease_def" + id, e.target.value);
      setDecreaseDEF(e.target.value);
      sethelperDecreaseDEF("");
    }
    else {
      sethelperDecreaseDEF("Decrease DEF must be numeric.")
    }
  };

  const onChangeEnemyResist = (e) => {
    if (isNumeric(e.target.value)) {
      localStorage.setItem("enemy_resist" + id, e.target.value);
      setEnemyResist(e.target.value);
      sethelperEnemyResist("");
    }
    else {
      sethelperEnemyResist("Resistance must be numeric.")
    }
  };

  const onChange = () => {
    const payload = {
      base_atk: BaseATK,
      atk_percent: PercentATK,
      flat_atk: FlatATK,
      bonus_dmg: BonusDMG,
      total_dmg_multi: MultiDMG,
      talent_dmg: TalentDMG,
      cri_rate: CriRate,
      cri_dmg: CriDMG,
      character_lvl: CharacterLVL,
      enemy_lvl: EnemyLVL,
      decrease_def: DecreaseDEF,
      enemy_resist: EnemyResist
    };
    DamageService.averageDamage(payload).then((response) => {
      if (response.data.status === "OK") {
        setAvgDMG((Math.round(response.data.result.avg_dmg * 100) / 100).toFixed(2));
        setCalNonCriDMG((Math.round(response.data.result.non_cri_dmg * 100) / 100).toFixed(2));
        setCalCriDMG((Math.round(response.data.result.cri_dmg * 100) / 100).toFixed(2));
        setAnalyst(response.data.result.analyst);
        setIsError(false);
      }
      else {
        setIsError(true);
      }
    })
  };

  const classes = useStyles();

  useEffect(() => {
    const payload = {
      base_atk: BaseATK,
      atk_percent: PercentATK,
      flat_atk: FlatATK,
      bonus_dmg: BonusDMG,
      total_dmg_multi: MultiDMG,
      talent_dmg: TalentDMG,
      cri_rate: CriRate,
      cri_dmg: CriDMG,
      character_lvl: CharacterLVL,
      enemy_lvl: EnemyLVL,
      decrease_def: DecreaseDEF,
      enemy_resist: EnemyResist
    };
    DamageService.averageDamage(payload).then((response) => {
      if (response.data.status === "OK") {
        setAvgDMG((Math.round(response.data.result.avg_dmg * 100) / 100).toFixed(2));
        setCalNonCriDMG((Math.round(response.data.result.non_cri_dmg * 100) / 100).toFixed(2));
        setCalCriDMG((Math.round(response.data.result.cri_dmg * 100) / 100).toFixed(2));
        setAnalyst(response.data.result.analyst);
        setIsError(false);
      }
      else {
        setIsError(true);
      }
    })
  })

  return (<div className={classes.form}>
    <FormControl className={classes.root} onChange={onChange}>
      <Grid
        container
        justify="flex-start"
        alignItems="baseline"
        xs={12}
      >
        <Grid item xs={6}>
          <TextField
            required
            id="base_atk"
            label="Base Attack"
            defaultValue={BaseATK}
            variant="filled"
            onChange={onChangeBaseATK}
            helperText={helperBaseATK}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="atk_percent"
            label="% Attack"
            defaultValue={PercentATK}
            variant="filled"
            onChange={onChangePercentATK}
            helperText={helperPercentATK}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="flat_atk"
            label="Flat Attack"
            defaultValue={FlatATK}
            variant="filled"
            onChange={onChangeFlatATK}
            helperText={helperFlatATK}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="bonus_dmg"
            label="Bonus(Phys/Ele)"
            defaultValue={BonusDMG}
            variant="filled"
            onChange={onChangeBonusDMG}
            helperText={helperBonusDMG}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="total_dmg_multi"
            label="More DMG(%)"
            defaultValue={MultiDMG}
            variant="filled"
            onChange={onChangeMultiDMG}
            helperText={helperMultiDMG}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="talent_dmg"
            label="Talent DMG(%)"
            defaultValue={TalentDMG}
            variant="filled"
            onChange={onChangeTalentDMG}
            helperText={helperTalentDMG}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="cri_rate"
            label="Critical Rate"
            defaultValue={CriRate}
            variant="filled"
            onChange={onChangeCriRate}
            helperText={helperCriRate}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="cri_dmg"
            label="Critical Damage"
            defaultValue={CriDMG}
            variant="filled"
            onChange={onChangeCriDMG}
            helperText={helperCriDMG}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="character_lvl"
            label="Character Level"
            defaultValue={CharacterLVL}
            variant="filled"
            onChange={onChangeCharacterLVL}
            helperText={helperCharacterLVL}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="enemy_lvl"
            label="Enemy Level"
            defaultValue={EnemyLVL}
            variant="filled"
            onChange={onChangeEnemyLVL}
            helperText={helperEnemyLVL}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="decrease_def"
            label="Decrease DEF"
            defaultValue={DecreaseDEF}
            variant="filled"
            onChange={onChangeDecreaseDEF}
            helperText={helperDecreaseDEF}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="enemy_resist"
            label="DMG Resist(%)"
            defaultValue={EnemyResist}
            variant="filled"
            onChange={onChangeEnemyResist}
            helperText={helperEnemyResist}
          />
        </Grid>
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
        <Grid item xs={6}>
          <label className={classes.label} style={{ fontFamily: 'cursive', fontWeight: 'bold', fontSize: 12 }}>Non-Critical Damage<br />{CalNonCriDMG}</label>
        </Grid>
        <Grid item xs={6}>
          <label className={classes.label} style={{ fontFamily: 'cursive', fontWeight: 'bold', fontSize: 12 }}>Critical Damage<br />{CalCriDMG}</label>
        </Grid>
        <Grid item xs={12}>
          <label className={classes.label} style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Average Damage : {AvgDMG}</label>
        </Grid>
        <Grid item xs={12}>
          <label className={classes.label} style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Artifact sub-stat suggestion</label>
          <label className={classes.label} style={{ fontFamily: 'cursive', textAlign: 'left' }}>
            {analyst === "flat_atk" ? "Increasing Flat ATK is the most effective way to increase your average damage." :
              analyst === "atk_percent" ? "Increasing %ATK is the most effective way to increase your average damage." :
                analyst === "cri_rate" ? "Increasing Critical Rate is the most effective way to increase your average damage." :
                  analyst === "cri_dmg" ? "Increasing Critical Damage is the most effective way to increase your average damage." :
                    "-"}</label>
        </Grid>
      </Grid>
    </FormControl>
  </div>);
}

export default DamageCalculator;