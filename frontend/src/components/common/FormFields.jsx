import React from 'react';
import { 
  TextField, 
  MenuItem, 
  FormControl, 
  FormHelperText,
  InputLabel,
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  FormGroup
} from '@mui/material';

/**
 * テキストフィールドコンポーネント
 */
export const TextFieldElement = ({ 
  name, 
  label, 
  value, 
  onChange, 
  error, 
  helperText, 
  required = false, 
  multiline = false, 
  rows = 1,
  type = 'text',
  fullWidth = true,
  ...props 
}) => {
  return (
    <TextField
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      error={Boolean(error)}
      helperText={helperText}
      required={required}
      multiline={multiline}
      rows={rows}
      type={type}
      fullWidth={fullWidth}
      variant="outlined"
      margin="normal"
      {...props}
    />
  );
};

/**
 * セレクトフィールドコンポーネント
 */
export const SelectFieldElement = ({
  name,
  label,
  value,
  onChange,
  options,
  error,
  helperText,
  required = false,
  fullWidth = true,
  ...props
}) => {
  return (
    <FormControl 
      fullWidth={fullWidth} 
      margin="normal" 
      error={Boolean(error)}
      required={required}
      {...props}
    >
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

/**
 * 複数選択可能なセレクトコンポーネント
 */
export const MultiSelectFieldElement = ({
  name,
  label,
  value,
  onChange,
  options,
  error,
  helperText,
  required = false,
  fullWidth = true,
  ...props
}) => {
  return (
    <FormControl 
      fullWidth={fullWidth} 
      margin="normal" 
      error={Boolean(error)}
      required={required}
      {...props}
    >
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        name={name}
        multiple
        value={value}
        onChange={onChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => selected.map(v => {
          const option = options.find(opt => opt.value === v);
          return option ? option.label : v;
        }).join(', ')}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox checked={value.indexOf(option.value) > -1} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

/**
 * ラジオグループコンポーネント
 */
export const RadioGroupElement = ({
  name,
  label,
  value,
  onChange,
  options,
  error,
  helperText,
  required = false,
  row = false,
  ...props
}) => {
  return (
    <FormControl 
      component="fieldset" 
      margin="normal" 
      error={Boolean(error)}
      required={required}
      {...props}
    >
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        aria-label={name}
        name={name}
        value={value}
        onChange={onChange}
        row={row}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

/**
 * チェックボックスグループコンポーネント
 */
export const CheckboxGroupElement = ({
  name,
  label,
  value,
  onChange,
  options,
  error,
  helperText,
  required = false,
  row = false,
  ...props
}) => {
  const handleChange = (event) => {
    const optionValue = event.target.value;
    const newValue = [...value];
    
    if (event.target.checked) {
      newValue.push(optionValue);
    } else {
      const index = newValue.indexOf(optionValue);
      if (index !== -1) {
        newValue.splice(index, 1);
      }
    }
    
    // onChange関数にイベントを模倣したオブジェクトを渡す
    onChange({
      target: {
        name,
        value: newValue
      }
    });
  };

  return (
    <FormControl 
      component="fieldset" 
      margin="normal" 
      error={Boolean(error)}
      required={required}
      {...props}
    >
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup row={row}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                checked={value.includes(option.value)}
                onChange={handleChange}
                value={option.value}
                name={name}
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};