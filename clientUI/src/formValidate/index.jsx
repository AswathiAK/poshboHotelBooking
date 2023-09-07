import * as Yup from "yup";

const mobileNo = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const letters = /^[A-Za-z\s]*$/;
const timeFormat = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s(?:[AaPp][Mm])?$/;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/webp"];

export const registerValidation = Yup.object({
  name: Yup.string().matches(letters, "Name can only contain letters and spaces").min(2).max(25).required("Please Enter a Name"),
  mobile: Yup.string().matches(mobileNo, "Must be 10 digits").required("Please Enter a Valid Mobile no"),
  email: Yup.string().email().required("Please Enter a Email"),
  password: Yup.string().min(8).required("Please Enter a Password"),
  role: Yup.string().required("Select what do you want to do"),
});
export const otpValidation = Yup.object({
  otp: Yup.string().required("Please Enter the OTP")
});

export const loginValidation = Yup.object({
  email: Yup.string().email().required("Please Enter a Email"),
  password: Yup.string().required("Please Enter a Password")
});
export const forgotPasswordValidation = Yup.object({
  email: Yup.string().email().required("Please Enter a Email")
});
export const resetPasswordValidation = Yup.object({
  password: Yup.string().min(8).required("Please Enter a Password"),
  confirmPassword: Yup.string().min(8).required("Please Re-enter the Password") 
});

export const propertyFormValidation = Yup.object({
  name: Yup.string().min(2).required("Name is required"),
  type: Yup.string().required("Select the type"),
  title: Yup.string().matches(letters, "can only contain letters and spaces").min(2).required("Title is required"),
  city: Yup.string().matches(letters, "can only contain letters and spaces").min(2).max(25).required("Location is required"),
  address: Yup.string().min(5).required("Address is required"),
  description: Yup.string().min(10).required("Add description"),
  extraInfo: Yup.string().min(10),
  checkInTime: Yup.string().matches(timeFormat,"Enter a valid time (eg:12:00 pm)").required("Check-in time is required"),
  checkOutTime: Yup.string().matches(timeFormat,"Enter a valid time (eg:12:00 pm)").required("Check-out time is required"),
  cheapestPrice: Yup.string().matches(/^\d+(\.\d+)?$/, "Price must be a positive number").required("Price is required"),
  perks: Yup.array().of(Yup.string()).min(1,'Select at least one perk'),      
  documentProof: Yup.mixed().nullable().required('please upload jpg/jpeg/png/webp formats and size less than 5Mb ')
    .test("FILE_SIZE", 'File size is too large',
      (value) => !value || (value && value.size <= 1024 * 1024 * 1024)
    ).test("FILE_FORMAT", 'Unsupported file formats',
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
    ),
  photos: Yup.array()    
    .test("FILE_LENGTH", "Upload at least one photo", (value) => {
      if (value.length < 1) return false;
      return true;
    })
    .test("FILE_SIZE", 'File size is too large', (value) => {
      if (value && value.length > 0) {
        for (let i = 0; i < value.length; i++){
          if (value[i].size > 1024 * 1024 * 1024 ) return false;
        }
      }    
      return true;
    })
    .test("FILE_FORMAT", 'Unsupported file formats', (value) => {
      if (value && value.length > 0) {
        for (let i = 0; i < value.length; i++){
          if (!SUPPORTED_FORMATS.includes(value[i]?.type)) return false;          
        }
      }    
      return true;
    })
});

export const editPropertyFormValidation = Yup.object({
  name: Yup.string().min(2).required("Name is required"),
  type: Yup.string().required("Select the type"),
  title: Yup.string().matches(letters, "can only contain letters and spaces").min(2).required("Title is required"),
  city: Yup.string().matches(letters, "can only contain letters and spaces").min(2).max(25).required("Location is required"),
  address: Yup.string().min(5).required("Address is required"),
  description: Yup.string().min(10).required("Add description"),
  extraInfo: Yup.string().min(10),
  checkInTime: Yup.string().matches(timeFormat,"Enter a valid time (eg:12:00 pm)").required("Check-in time is required"),
  checkOutTime: Yup.string().matches(timeFormat,"Enter a valid time (eg:12:00 pm)").required("Check-out time is required"),
  cheapestPrice: Yup.string().matches(/^\d+(\.\d+)?$/, "Price must be a positive number").required("Price is required"),
  perks: Yup.array().of(Yup.string()).min(1,'Select at least one perk'),      
  // documentProof: Yup.mixed().nullable().required('please upload jpg/jpeg/png/webp formats and size less than 5Mb ')
  //   .test("FILE_SIZE", 'File size is too large',
  //     (value) => !value || (value && value.size <= 1024 * 1024 * 1024)
  //   ).test("FILE_FORMAT", 'Unsupported file formats',
  //     (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
  //   ),
  // photos: Yup.array()    
  //   .test("FILE_LENGTH", "Upload at least one photo", (value) => {
  //     if (value.length < 1) return false;
  //     return true;
  //   })
  //   .test("FILE_SIZE", 'File size is too large', (value) => {
  //     if (value && value.length > 0) {
  //       for (let i = 0; i < value.length; i++){
  //         if (value[i].size > 1024 * 1024 * 1024 ) return false;
  //       }
  //     }    
  //     return true;
  //   })
  //   .test("FILE_FORMAT", 'Unsupported file formats', (value) => {
  //     if (value && value.length > 0) {
  //       for (let i = 0; i < value.length; i++){
  //         if (!SUPPORTED_FORMATS.includes(value[i]?.type)) return false;          
  //       }
  //     }    
  //     return true;
  //   })
});

export const roomFormValidation = Yup.object({
  title: Yup.string().min(2).required("Name is required"),
  price: Yup.string().matches(/^\d+(\.\d+)?$/, "must be a positive number").required("Price is required"),
  maxGuests: Yup.string().matches(/^\d+(\.\d+)?$/, "must be a positive number").required("No of guests is required"),
  description: Yup.string().min(10).required("Add description"),
  // roomNumbers: Yup.array().of(Yup.string()).required('must be a positive number') 
});
