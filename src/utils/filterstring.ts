import _ from "lodash";
export const filterString = (filterCondition: any) => {
  const stringType = ["=", "!=", "LIKE", "UNLIKE"];
  let filterString: string = "";
  filterString += "[";
  for (let i = 0; i < filterCondition.length; i++) {
    if (i === 0) filterString += "[";
    else filterString += ",[";
    for (let j = 0; j < filterCondition[i].length; j++) {
      const crrCondition = filterCondition[i][j];
      let type;
      if (stringType.includes(crrCondition.Operator)) type = "string";
      else type = "number";
      if (j === 0) filterString += "{";
      else filterString += ",{";
      if (crrCondition.Operator === "UNLIKE") {
        filterString += "Negative: true, ";
        if (crrCondition.Values)
          filterString += `FieldName:"${crrCondition.FieldName}", ValueType:"${type}", Operator:"LIKE", Values:["${crrCondition.Values[0]}"]}`;
        else
          filterString += `FieldName:"${crrCondition.FieldName}", ValueType:"${type}", Operator:"LIKE"}`;
      } else {
        filterString += "Negative: false, ";
        if (crrCondition.Values)
          filterString += `FieldName:"${crrCondition.FieldName}", ValueType:"${type}", Operator:"${crrCondition.Operator}", Values:["${crrCondition.Values[0]}"]}`;
        else
          filterString += `FieldName:"${crrCondition.FieldName}", ValueType:"${type}", Operator:"${crrCondition.Operator}"}`;
      }
      if (crrCondition.SecondOperator)
        filterString += `,{Negative: false,FieldName:"${crrCondition.FieldName}", ValueType:"${type}", Operator:"${crrCondition.SecondOperator}", Values:["${crrCondition.SecondValues[0]}"]}`;
    }
    filterString += "]";
  }
  filterString += "]";
  return filterString;
};

export const parseFilterString = (filterString: any) => {
  let filterArray = filterString.split(":");
  for (let i = 0; i < filterArray.length - 1; i++) {
    let fieldString: string = "";
    for (let j = filterArray[i].length - 1; j >= 0; j--) {
      if (
        ("A" <= filterArray[i][j] && filterArray[i][j] <= "Z") ||
        ("a" <= filterArray[i][j] && filterArray[i][j] <= "z")
      )
        fieldString += filterArray[i][j];
      else break;
    }
    fieldString = fieldString.split("").reverse().join("");
    filterArray[i] = filterArray[i].replace(fieldString, `"${fieldString}"`);
  }
  filterString = filterArray.join(":");
  return JSON.parse(filterString);
};

export const createNewFilterCondition = (
  filterCondition: any,
  crrDeiceSelect: any
) => {
  let newCondition = [];
  for (let i = 0; i < crrDeiceSelect.length; i++) {
    let crrSerial = crrDeiceSelect[i];
    let addAndOperation = _.clone(filterCondition);
    if (filterCondition.length > 0)
      for (let j = 0; j < addAndOperation.length; j++) {
        let newAndCondition = _.clone(addAndOperation[j]);
        newAndCondition.push({
          FieldName: "SerialNumber",
          Negative: false,
          Operator: "=",
          valueType: "string",
          Values: [crrSerial],
        });
        newCondition.push(newAndCondition);
      }
    else {
      let newAndCondition: any = [];
      newAndCondition.push({
        FieldName: "SerialNumber",
        Negative: false,
        Operator: "=",
        valueType: "string",
        Values: [crrSerial],
      });
      newCondition.push(newAndCondition);
    }
  }
  return newCondition;
};
