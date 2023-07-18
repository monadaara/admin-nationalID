import Joi from "joi";

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
});
export const deviceSchema = Joi.object({
  device: Joi.string().required(),
  type: Joi.string().required(),
  center: Joi.number().required(),
  status: Joi.boolean().allow(""),
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
