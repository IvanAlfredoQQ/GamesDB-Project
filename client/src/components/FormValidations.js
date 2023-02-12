export function validate(form) {
  let errors = {};
  //name
  if (form.name === "") {
    errors.name = "*Name is required*";
  } else {
    errors.name = "";
  }
  //release
 if(!form.release){
  errors.release = "*Release date is required*"
  // eslint-disable-next-line
 } else if (!/^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/.test(form.release)){
    errors.release = "*Date format is wrong*"
  }
  //rating validation is controlled by input values
  //description
  if (!form.description) {
    errors.description = "*Description is required*";
  }
  //background_image
  if (!form.background_image) {
    errors.background_image = "*Image URL is required*";
  } else if (
    // eslint-disable-next-line
    !/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(form.background_image)
  ) {
    errors.background_image = "*URL format is wrong*";
  } else {
    errors.background_image = "";
  }
  //genres & platforms are controlled by input values
  
  //return errors
  return errors;
}