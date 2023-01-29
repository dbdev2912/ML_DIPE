export default [
    { id: 0, name: "TinyInt", type: "int", range: { min: -128, max: 127 } },
    { id: 1, name: "TinyInt Unsigned", type: "int", range: { min: 0, max: 255 } },
    { id: 2, name: "SmallInt", type: "int", range: { min: -32768, max: 32767 } },
    { id: 3, name: "SmallInt Unsigned", type: "int", range: { min: 0, max: 65535 } },
    { id: 4, name: "MediumInt", type: "int", range: { min: -8388608, max: 8388607 } },
    { id: 5, name: "MediumInt Unsigned", type: "int", range: { min: 0, max: 16777215 } },
    { id: 6, name: "Int", type: "int", range: { min: -2147483648, max: 2147483647 } },
    { id: 7, name: "Int Unsigned", type: "int", range: { min: 0, max: 4294967295 } },
    { id: 8, name: "Big Int", type: "int", range: { min: -9223372036854775808, max: 9223372036854775807 } },
    { id: 9, name: "Big Int Unsigned", type: "int", range: { min: 0, max: 18446744073709551615 } },
    { id: 10, name: "Bool", type: "bool" },
    { id: 11, name: "Decimal", type: "floating-point" }, /* dec(5,2) ~ 999.99 */
    { id: 12, name: "Decimal Unsigned", type: "floating-point" },
    { id: 13, name: "Date", type: "datetime" },
    { id: 14, name: "Time", type: "datetime" },
    { id: 15, name: "Datetime", type: "datetime" },
    { id: 16, name: "Timestamp", type: "datetime" },
    { id: 17, name: "Year", type: "datetime" },
    { id: 18, name: "Text", type: "text" },
    { id: 19, name: "Char", type: "char" },
    { id: 20, name: "Varchar", type: "char" },
]