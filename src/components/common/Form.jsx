import { Switch } from "@chakra-ui/react";
import React, { CSSProperties } from "react";
import Select from "react-select";

const CustomForm = ({ fields, register, errors, setValue, data }) => {
  return (
    <>
      {fields.map((field) => (
        <div key={field.name} className="mb-3">
          <label className="block mb-1">{field.label}</label>
          {field.type === "select" ? (
            <>
              <Select
                {...register(field.name)}
                defaultValue={field?.defaultValue}
                onChange={(obj) => {
                  const { name, value } = obj;
                  setValue(name, value);
                }}
                options={field.options}
              />
              {errors && errors?.[field.name] && (
                <span className="text-red-400 text-left">
                  {errors[field.name].message}
                </span>
              )}
            </>
          ) : field.type == "switch" ? (
            <Switch
              {...register(field.name)}
              defaultChecked={data?.status == "active" ? true : false}
              colorScheme="teal"
              size="lg"
            />
          ) : (
            <>
              <input
                type={field.type}
                {...register(field.name)}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
              {errors && errors?.[field.name] && (
                <span className="text-red-400 text-left">
                  {errors[field.name].message}
                </span>
              )}
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default CustomForm;

// <select
//   name={field.name}
//   // value={formFields[field.name]}
//   // onChange={handleChange}
//   className="border border-gray-300 rounded px-3 py-2 w-full"
// >
//   {field.options.map((option) => (
//     <option key={option.value} value={option.value}>
//       {option.label}
//     </option>
//   ))}
// </select>
