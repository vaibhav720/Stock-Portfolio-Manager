import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { rows } from './Symbol';
import { doc, setDoc, updateDoc,addDoc,collection, arrayUnion } from "firebase/firestore";
import { auth, db } from '../Firebase';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags() {
  const {currentUser} = useAuth();
  
  const history = useNavigate();
  
  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    limit: 50,
  });

  async function onAdd(props){
    //console.log(props);
    const washingtonRef = doc(db, "Users", currentUser.email);
    const values ={
      dates:"",
      value:0,
      quantity:0,
      name:props.description,
      symbol:props.symbol
     }
    // console.log(props);
// Atomically add a new region to the "regions" array field.
    await updateDoc(washingtonRef, {
     Stock: arrayUnion(values)
  });
  history("/watchlist");
}
    
  return (
    <Autocomplete
      filterOptions={filterOptions}
      multiple
      id="checkboxes-tags-demo"
      options={rows}
      disableCloseOnSelect
      getOptionLabel={(option) => option.description}
      renderOption={(props, option, { selected }) => (
        <li {...props} style={{color:"black"}} key={option.symbol}>
          <Checkbox
          key={option.symbol}
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
