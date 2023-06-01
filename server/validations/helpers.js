//
export const parseDate = (value) => {
  if (!(value instanceof Date) || isNaN(value.getTime())) {
    throw new Error('Invalid date');
  }

  return true;
};

export const correctAge = (value) => {
  const today = new Date();
  const birthDate = new Date(value);

  const age = today.getFullYear() - birthDate.getFullYear();

  if (age > 80 || age < 10) {
    throw new Error('Age must be between 10 and 80');
  }

  return true;
};
