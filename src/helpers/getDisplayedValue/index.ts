import IAnyDataObject from "interfaces/anyDataObject";
import ITableHeader from "interfaces/tableHeader";

const getDisplayedValue = ({
  data,
  header,
}: {
  data: IAnyDataObject;
  header: ITableHeader;
}) => {
  switch (header.type) {
    case "dateTime": {
      return new Date(data[header.prop]).toLocaleString();
    }
    case "boolean": {
      return data[header.prop] ? "yes" : "no";
    }
    default: {
      return data[header.prop] || "-";
    }
  }
};

export default getDisplayedValue;
