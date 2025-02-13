import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const GenderPicker = ({ gender, setGender }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Femenino', value: 'Femenino' },
  ]);

  return (
    <DropDownPicker
      open={open}
      value={gender}
      items={items}
      setOpen={setOpen}
      setValue={setGender}
      setItems={setItems}
      placeholder="Seleccione su género"
      style={{ marginBottom: 16 }}
      zIndex={3000}
    />
  );
};

export default GenderPicker;