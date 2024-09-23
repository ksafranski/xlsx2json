import * as XLSX from "xlsx";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import path from "path";
import { writeFileSync } from "fs";

const main = async () => {
  const start = Date.now();
  const argv = yargs(hideBin(process.argv)).argv;

  const { file, header = 1, skip = 1, out } = argv as Record<string, any>;

  if (!file) {
    console.error("Please provide a --file=<path> argument");
    process.exit(1);
  }

  if (!out) {
    console.error("Please provide an --out=<path> argument");
    process.exit(1);
  }

  const workbook = XLSX.readFile(path.resolve(file));
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as Array<
    Array<any>
  >;

  const keys = jsonData[header]; // Get keys from header
  const dataRows = jsonData.slice(skip); // Skip any headers

  let result = dataRows.map((row) => {
    const obj: Record<string, any> = {};
    keys.forEach((key, index) => {
      obj[key] = row[index];
    });
    return obj;
  });

  const jsonOutput = JSON.stringify(result, null, 2);

  writeFileSync(path.resolve(out), jsonOutput);

  console.log(
    `Generated ${path.resolve(out)}\n${result.length} rows in ${
      Date.now() - start
    }ms`
  );
  process.exit(0);
};

main();
