import React, { useCallback } from "react";

export function useValidationForm() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [valid, setValid] = React.useState(false);

  const onChangeHandler = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    _validateInput(target);
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setValid(newIsValid);
    },
    [setValues, setErrors, setValid]
  );

  const onSubmitHandler = (event) => {
    for (const input of event.target.getElementsByTagName('input')) {
      _validateInput(input);
      values[input.name] = input.value;
      errors[input.name] = input.validationMessage;
    };

    setValues({...values});
    setErrors({...errors});
    setValid(event.target.checkValidity());
  }

  function _validateInput(input) {
    if (input.validity.valueMissing && input.getAttribute('emptytextvalidation')) {
      input.setCustomValidity(input.getAttribute('emptytextvalidation'));
    } else {
      input.setCustomValidity('');
    }
  }

  return { values, onChangeHandler, errors, valid, resetForm, onSubmitHandler };
}