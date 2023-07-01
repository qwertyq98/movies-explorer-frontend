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
    // if(!regexpEmail.test(values.email)) {
    //   errors.email = 'Адрес электронной почты введен неправильно!';
    // }

    setValues({...values});
    setErrors({...errors});
    setValid(event.target.checkValidity());
  }

  function _validateInput(input) {
    if (input.validity.valueMissing && input.hasAttribute('emptytextvalidation')) {
      input.setCustomValidity(input.getAttribute('emptytextvalidation'));
    } else if (input.validity.patternMismatch && input.hasAttribute('patterntextvalidation')) {
      input.setCustomValidity(input.getAttribute('patterntextvalidation'));
    } else {
      input.setCustomValidity('');
    }
  }

  return { values, onChangeHandler, errors, valid, resetForm, onSubmitHandler };
}