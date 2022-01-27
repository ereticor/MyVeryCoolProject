export default [
  { isEditable: true, text: "Name", prop: "name", type: "string" },
  {
    isEditable: false,
    text: "created At",
    prop: "createdAt",
    type: "dateTime",
  },
  {
    isEditable: false,
    text: "created By",
    prop: "createdByName",
    type: "string",
  },
  {
    isEditable: false,
    text: "updated At",
    prop: "lastModifiedAt",
    type: "dateTime",
  },
  {
    isEditable: false,
    text: "updated By",
    prop: "lastModifiedByName",
    type: "string",
  },
  { isEditable: false, text: "sap code", prop: "sapCode", type: "number" },
];
