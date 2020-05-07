export const validations = {
  number: /^[a-z0-9A-Z-]+$/
}

export const validateValueWithRegex = (value, regex) => {
  if (!value) {
    return false
  } else if (!regex) {
    return false
  }
  return !String(value).match(regex)
}

export const validateFormField = (value, regex, isRequired) => {
  const requiredError = isRequired ? (value === undefined || value === '' || value === null) : false
  const regexError = validateValueWithRegex(value, regex)
  return requiredError || regexError
}

export const validateForm = (form, regexObj, requiredFields) => {
  const fields = Object.keys(form)
  const fieldErrors = {}
  let hasError = false
  for (const field of fields) {
    fieldErrors[field] = validateFormField(form[field], regexObj[field], requiredFields.indexOf(field) >= 0)
    hasError = hasError || fieldErrors[field]
  }
  return { fieldErrors, hasError }
}
