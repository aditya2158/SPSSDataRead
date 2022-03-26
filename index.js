import XLSX from "xlsx";
import * as fs from "fs";

function read() {
  const wb = XLSX.readFile("Data_LayoutPLFS.xlsx");

  let data = [],
    txtData,
    arr = [];

  const sheets = wb.SheetNames;

  const temp = XLSX.utils.sheet_to_json(wb.Sheets[sheets[0]]);
  temp.forEach((res) => {
    data.push(res);
  });

  console.log(data[165]);

  try {
    txtData = fs.readFileSync("PERV1.txt", "utf8");
  } catch (err) {
    console.error(err);
  }

  let copy = txtData;

  copy.split(/\r?\n/).forEach((line) => {
    arr.push(line);
  });

  for (let j = 0; j < arr.length; j++) {
    let newArr = [];
    let thisElement = arr[j];
    for (let i = 37; i < 166; i++) {
      newArr.push(
        thisElement.substring(data[i]["__EMPTY_4"] - 1, data[i]["__EMPTY_5"])
      );
    }
    arr[j] = newArr.join(",");
  }
  createAndWriteFile(arr.join("\r\n"));
}

function createAndWriteFile(content) {
  try {
    fs.writeFileSync("./PERV1_modified.txt", content);
  } catch (err) {
    console.error(err);
  }
}

read();
