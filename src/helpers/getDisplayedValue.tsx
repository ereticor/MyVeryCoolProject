import dateToHuman from "helpers/dateToHuman";

import IAnyDataObject from "interfaces/anyDataObject";
import ITableHeader from "interfaces/tableHeader";

const getDisplayedValue = ({
  data,
  header,
  maxLength,
  isWithTitle = false,
}: {
  data: IAnyDataObject;
  header: ITableHeader;
  maxLength?: number;
  isWithTitle?: boolean;
}) => {
  if (!data || !data[header.prop]) {
    return "-";
  }

  const formatValueByType = () => {
    switch (header.type) {
      case "date": {
        return dateToHuman(data[header.prop]);
      }
      case "dateTime": {
        return dateToHuman(data[header.prop], {
          hour: "numeric",
          minute: "numeric",
        });
      }
      case "boolean": {
        return data[header.prop] ? "yes" : "no";
      }
      default: {
        return data[header.prop] || "-";
      }
    }
  };

  const formattedValue = formatValueByType();

  let result = formattedValue;

  if (maxLength && formattedValue.length > 40) {
    result = formattedValue.slice(0, 38) + "...";
  }

  if (isWithTitle) {
    return <span title={formattedValue}>{result}</span>;
  }

  return result || "-";
};

export default getDisplayedValue;
