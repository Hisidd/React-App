import img_cars from "./sniper_rifle.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const App = () => {
  const useStyles = makeStyles((theme) => ({
    textField: {
      margin: "10px 0",
      width: "30%",
      height: "50px",
    },
    app: {
      background: "cyan",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    button: {
      margin: "10px 0",
    },
    heading: {
      textShadow: "1px 1px red",
    },
    table: {
      width: "200px",
    },
  }));

  const [cars, setCars] = useState([]);
  const [gun, setGun] = useState("");
  const [type, setType] = useState("");
  const [range, setRange] = useState("");
  const [recoil, setRecoil] = useState("");
  const [ammo, setAmmo] = useState("");
  const [isValid, setIsValid] = useState(false);
  const classes = useStyles();


  const addcarhandler = () => {
    const oldCars = [...cars];
    const newCar = {
      gun,
      type,
      range,
      recoil,
      ammo,
      id:Math.floor(Math.random()*1000),
    };

    const newCars = oldCars.concat(newCar);

    if(gun === ""||type === ""||range === ""||recoil === ""||ammo === ""){
      alert("Blanks are not considered!");
      setIsValid(true);
    }else{
      const newCars = oldCars.concat(newCar);
      setIsValid(false);
    }

    setCars(newCars);

    localStorage.setItem("cars",JSON.stringify(newCars));

    setGun("");
    setType("");
    setRange("");
    setRecoil("");
    setAmmo("");
  };

  const deleteCarHandler = (id) => {
    const oldCars = [...cars];
    const newCars = oldCars.filter((car)=> car.id !== id);
    setCars(newCars);

    localStorage.setItem("cars",JSON.stringify(newCars));
  };

  useEffect(()=>{
    const localStorageCars = JSON.parse(localStorage.getItem("cars"));
    setCars(localStorageCars);
  },[setCars]);

  return (
    <div className={classes.app}>
      <img src={img_cars} style={({ width: "300px" }, { height: "150px" })} alt="#" />
      <h1 className={classes.heading}>Weapon Registration App</h1>
      <TextField
        id="outlined-basic"
        label="Gun"
        variant="outlined"
        className={classes.textField}
        onChange={(e) => setGun(e.target.value)}
        value={gun}
        error={isValid}
      />
      <TextField
        id="outlined-basic"
        label="Type"
        variant="outlined"
        className={classes.textField}
        onChange={(e) => setType(e.target.value)}
        value={type}
        error={isValid}
      />
      <TextField
        id="outlined-basic"
        label="Range"
        variant="outlined"
        className={classes.textField}
        onChange={(e) => setRange(e.target.value)}
        value={range}
        error={isValid}
      />
      <TextField
        id="outlined-basic"
        label="Recoil"
        variant="outlined"
        className={classes.textField}
        onChange={(e) => setRecoil(e.target.value)}
        value={recoil}
        error={isValid}
      />
      <TextField
        id="outlined-basic"
        label="Ammo"
        variant="outlined"
        className={classes.textField}
        onChange={(e) => setAmmo(e.target.value)}
        value={ammo}
        error={isValid}
      />
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={addcarhandler}
      >
      Submit
      </Button>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Gun</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Range</TableCell>
            <TableCell align="center">Recoil</TableCell>
            <TableCell align="center">Ammo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cars.map((car,index)=>(
            <TableRow key={index} onClick={()=>deleteCarHandler(car.id)}>
              <TableCell align="center">{car.gun}</TableCell>
              <TableCell align="center">{car.type}</TableCell>
              <TableCell align="center">{car.range}</TableCell>
              <TableCell align="center">{car.recoil}</TableCell>
              <TableCell align="center">{car.ammo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default App;
