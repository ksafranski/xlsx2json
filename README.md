# xlsx2json

Conversion script and binaries for converting XLSX files to JSON.

## Usage

```bash
xlsx2json --file=input.xlsx --header=1 --skip=1 --out=output.json
```

Arguments:

- `--file` - path to the input XLSX file
- `--header` - row number of the header (default: 1)
- `--skip` - number of rows to skip from the beginning (default: 1 for header)
- `--out` - path to the output JSON file

## Development

This project is written in TypeScript and uses `ts-node` to run the script and requires Node.js 20+.

To run locally fist install the dependencies with `yarn`, you can then test the script locally
by installing ts-node (`yarn add global ts-node`).

```bash
ts-node src/index.ts --file=input.xlsx --header=1 --skip=3 --out=output.json
```

### Building

To build the project run `yarn build` which will compile the project, `yarn build:binaries` will compile the binary outputs.

### Generating Binaries

To package the project run `yarn make` which will compile and build a binaries for linux, mac and windows in the `/bin` directory.
