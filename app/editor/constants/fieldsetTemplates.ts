import { FIELD_TYPES, type TextField } from "@/lib/types/form";

export const contactsFieldset = {
  id: "contacts",
  legend: "Contacts",
  fields: [
    {
      id: "name",
      label: "Name",
      description: "Your name and position",
      type: FIELD_TYPES.TEXT,
      value: "",
      required: true,
      name: "name",
    } as TextField,
    {
      id: "phone",
      label: "Phone",
      description: "Enter your phone with country code",
      type: FIELD_TYPES.TEXT,
      value: "",
      required: true,
      name: "phone",
    } as TextField,
    {
      id: "email",
      label: "Email",
      description: "Enter your working email",
      type: FIELD_TYPES.TEXT,
      value: "",
      required: true,
      name: "email",
    } as TextField,
    {
      id: "organization",
      label: "Organization",
      description: "",
      type: FIELD_TYPES.TEXT,
      value: "",
      required: true,
      name: "organization",
    } as TextField,
  ],
};

export const emptyFieldset = {
  legend: "New Section",
  fields: [],
};

export const deliveryConditionsFieldset = {
  legend: "Delivery Conditions",
  fields: [
    {
      label: "Location",
      description: "Where you deliver to",
      type: FIELD_TYPES.TEXT,
      value: "",
      required: false,
      name: "location",
    } as TextField,
    {
      label: "Delivery Time",
      description: "When you deliver",
      type: FIELD_TYPES.TEXT,
      value: "",
      required: false,
      name: "deliveryTime",
    } as TextField,
  ],
};
