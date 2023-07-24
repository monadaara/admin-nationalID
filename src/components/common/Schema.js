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
