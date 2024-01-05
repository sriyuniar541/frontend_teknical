export default function Validation(inputData) {
  let errors = {};

  // Validate email
  if (!inputData.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(inputData.email)) {
    errors.email = "Invalid email address";
  }

  // Validate name
  if (!inputData.name) {
    errors.name = "Name is required";
  } else if (inputData.name.length < 3 || inputData.name.length > 256) {
    errors.name = "Name must be between 3 and 256 characters";
  }

  // Validate phone
  if (!inputData.phone) {
    errors.phone = "Phone is required";
  } else if (!/628[0-9]+/.test(inputData.phone)) {
    errors.phone = "Invalid phone number";
  }

  // Validate password
  if (!inputData.password) {
    errors.password = "Password is required";
  } else if (inputData.password.length < 3 || inputData.password.length > 256) {
    errors.password = "Password must be between 3 and 256 characters";
  }

  // Validate age
  if (!inputData.age) {
    errors.age = "Age is required";
  } else if (inputData.age < 18 || inputData.age >= 100) {
    errors.age = "Age must be between 18 and 99";
  }

  // Validate photos
  if (!inputData.photos || inputData.photos.length === 0) {
    errors.photos = "At least one photo is required";
  } else if (inputData.photos.length > 3) {
    errors.photos = "Maximum of 3 photos allowed";
  }

  return errors;
}
