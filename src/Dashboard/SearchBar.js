import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { rows } from './indData';
import { doc, setDoc, updateDoc,addDoc,collection, arrayUnion } from "firebase/firestore";
import { auth, db } from '../Firebase';
import { useAuth } from '../contexts/AuthContext';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags() {
  const {currentUser} = useAuth();
  async function onAdd(props){
    // await addDoc(collection(db, "Users"), {
    //   email: currentUser.email,
    //   Stocks: arrayUnion({
    //     date: "",
    //     value:0,
    //     quantity:0,
    //     name:props.description,
    //     symbol:props.displaySymbol
    //   }
    // })
    const washingtonRef = doc(db, "Users", currentUser.email);
    const values ={
      dates:"",
      value:0,
      quantity:0,
      name:props.description,
      symbol:props.displaySymbol
     }
     console.log(props);
// Atomically add a new region to the "regions" array field.
    await updateDoc(washingtonRef, {
     Stock: arrayUnion(values)
  });
}
    
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={rows}
      disableCloseOnSelect
      getOptionLabel={(option) => option.description}
      renderOption={(props, option, { selected }) => (
        <li {...props} style={{color:"black"}}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8,color:"black" }}
            checked={selected}
            onChange={()=>onAdd(option)}
          />
          {option.description}
        </li>
      )}
      style={{ width: 500,color:"black" }}
      renderInput={(params) => (
        <TextField style={{color:"black"}} {...params} label="Enter Name" placeholder="Add Company" />
      )}
    />
  );
}
