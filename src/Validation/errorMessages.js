
export const isRequired = fieldName => `${fieldName} is required`;

export const minLength = length => {
  console.log("caslled min length error");
  return (fieldName) => `${fieldName} must be at least ${length} characters`;
};

export const validateEmail = length => {
    return (fieldName) => `${fieldName} must be at valid email`;
};


export const validateUpperLowerNumeric = str => {
    console.log("caslled validateUpperLowerNumeric length error");
    return (fieldName) => `check if ${fieldName} has atleast 1 upper, 1 lower, 1 digit`;
};


