import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
const joiPassword = Joi.extend(joiPasswordExtendCore);

export const centerSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  start_time: Joi.string().required(),
  end_time: Joi.string().required(),
  process_minutes: Joi.number().required(),
  manager: Joi.number().required(),
  location: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  status: Joi.boolean().allow(""),
  days: Joi.array()
    .items(Joi.string().valid("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"))
    .required(),
});
export const deviceSchema = Joi.object({
  device: Joi.string().required(),
  type: Joi.string().required(),
  center: Joi.number().required(),
  status: Joi.boolean().allow(""),
});
export const userSchema = Joi.object({
  first_name: Joi.string().required(),
  middle_name: Joi.string().required(),
  last_name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),

  center: Joi.number().allow(""),
  is_staff: Joi.boolean().required(),
  // status: Joi.boolean().allow(""),
});
const isOver18 = (value, helpers) => {
  const birthDate = new Date(value);
  const now = new Date();
  const age = now.getFullYear() - birthDate.getFullYear();
  const isBeforeBirthday =
    now.getMonth() < birthDate.getMonth() ||
    (now.getMonth() === birthDate.getMonth() &&
      now.getDate() < birthDate.getDate());

  if (age < 18 || (age === 18 && isBeforeBirthday)) {
    return helpers.error("date.over18");
  }

  return value;
};
export const applicantSchema = Joi.object({
  first_name: Joi.string().label("first name").required(),
  middle_name: Joi.string().required().label("middle name"),
  last_name: Joi.string().required().label("last name"),
  mother_first_name: Joi.string().label("mother first name").required(),
  mother_middle_name: Joi.string().required().label("mother middle name"),
  mother_last_name: Joi.string().required().label("mother last name"),
  sex: Joi.string().required().valid("m", "f"),
  marital_status: Joi.string()
    .required()
    .label("merital status")
    .valid("single", "married", "devorced"),
  blood_type: Joi.string().required().label("blood type"),
  date_of_birth: Joi.date()

    .required()
    .custom(isOver18, "custom validation")
    .label("birth date")
    .messages({
      "date.over18": "Birthdate must be over 18 years old",
    }),
  birth_country: Joi.string().required().label("birth country"),
  birth_region: Joi.string().required().label("birth region"),
  birth_city: Joi.string().required().label("birth city"),
  residence: Joi.string().required().label("residence"),
  country: Joi.string().required(),
  region: Joi.string().required(),
  city: Joi.string().required(),
  email: Joi.string()
    .email({
      tlds: { allow: false },
    })
    .allow(""),
  phone: Joi.string().min(9).max(9).required(),
  file: Joi.any(),
});

export const applicantFields = [
  { label: "First name", type: "text", name: "first_name" },
  { label: "Middle name", type: "text", name: "middle_name" },
  { label: "Last name", type: "text", name: "last_name" },
  { label: "Mother's first name", type: "text", name: "mother_first_name" },
  { label: "Mother's middle name", type: "text", name: "mother_middle_name" },
  { label: "Mother's last name", type: "text", name: "mother_last_name" },
  {
    label: "Sex",
    type: "select",
    name: "sex",
    options: [
      {
        label: "Male",
        name: "sex",
        value: "m",
      },
      {
        label: "Female",
        name: "sex",
        value: "f",
      },
    ],
  },
  { label: "Birth date", type: "date", name: "date_of_birth" },
  {
    label: "Marital status",
    type: "select",
    name: "marital_status",
    options: [
      {
        label: "Single",
        name: "marital_status",
        value: "single",
      },
      {
        label: "Married",
        name: "marital_status",
        value: "married",
      },
      {
        label: "Devorced",
        name: "marital_status",
        value: "devorced",
      },
    ],
  },
  {
    label: "Blood type",
    type: "select",
    name: "blood_type",
    options: [
      {
        label: "A+",
        name: "blood_type",
        value: "A+",
      },
      {
        label: "A-",
        name: "blood_type",
        value: "A-",
      },
      {
        label: "B+",
        name: "blood_type",
        value: "B+",
      },
      {
        label: "B-",
        name: "blood_type",
        value: "B-",
      },
      {
        label: "O+",
        name: "blood_type",
        value: "O+",
      },
      {
        label: "O-",
        name: "blood_type",
        value: "O-",
      },
      {
        label: "AB+",
        name: "blood_type",
        value: "AB+",
      },
      {
        value: "AB-",
        label: "AB-",
        name: "blood_type",
      },
    ],
  },
  {
    label: "Birth Country",
    type: "select",
    name: "birth_country",

    options: [
      {
        label: "Somalia",
        name: "birth_country",
        value: "Somalia",
      },
    ],
  },
  {
    label: "Birth region",
    type: "select",
    name: "birth_region",
    options: [
      {
        label: "Banaadir",
        name: "birth_region",
        value: "Banaadir",
      },
    ],
  },
  {
    label: "Birth city ",
    type: "select",
    name: "birth_city",
    options: [
      {
        label: "Mogadishu",
        name: "birth_city",
        value: "Mogadishu",
      },
    ],
  },
  {
    label: "Country",
    type: "select",
    name: "country",

    options: [
      {
        label: "Somalia",
        name: "country",
        value: "Somalia",
      },
    ],
  },
  {
    label: "region",
    type: "select",
    name: "region",
    options: [
      {
        label: "Banaadir",
        name: "region",
        value: "Banaadir",
      },
    ],
  },
  {
    label: "city",
    type: "select",
    name: "city",
    options: [
      {
        label: "Mogadishu",
        name: "city",
        value: "Mogadishu",
      },
    ],
  },
  {
    label: "Residence",
    type: "select",
    name: "residence",
    options: [
      {
        label: "Somali",
        name: "residence",
        value: "Somali",
      },
      {
        label: "Resident alien",
        name: "residence",
        value: "Resident alien",
      },
    ],
  },
  { label: "Email", type: "text", name: "email" },
  { label: "Phone", type: "text", name: "phone" },
];
export const centerFields = [
  { label: "Name", type: "text", name: "name" },
  { label: "Phone", type: "text", name: "phone" },
  { label: "Start time", type: "time", name: "start_time" },
  { label: "End time", type: "time", name: "end_time" },
  { label: "Process minutes", type: "text", name: "process_minutes" },
  { label: "Manager", type: "select", name: "manager" },
  { label: "Location", type: "text", name: "location" },
  { label: "Latitude", type: "text", name: "latitude" },
  { label: "longitude", type: "text", name: "longitude" },

  // Add more fields as needed
];
export const deviceFields = [
  { label: "Device", type: "text", name: "device" },
  { label: "Type", type: "select", name: "type" },
  { label: "Center", type: "select", name: "center" },

  // Add more fields as needed
];
export const userFields = [
  { label: "First Name", type: "text", name: "first_name" },
  { label: "Middle Name", type: "text", name: "middle_name" },
  { label: "Last Name", type: "text", name: "last_name" },
  { label: "Username", type: "text", name: "username" },
  { label: "Password", type: "text", name: "password" },
  { label: "Email", type: "text", name: "email" },
  { label: "Center", type: "select", name: "center" },
  { label: "Is admin", type: "switch", name: "is_staff" },

  // Add more fields as needed
];
