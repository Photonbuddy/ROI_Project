// 1. Export the raw data with quotes (Exactly what App.js wants)
export const initialDepartmentsCSV = `"id","name"
"0","General"
"1","Information Communications Technology"
"2","Finance"
"3","Marketing"
"4","Human Resources"`;

/**
 * 2. Export the parser function (Exactly what App.js wants)
 * Parses raw CSV string, automatically removing surrounding quotes and whitespace.
 */
export const parseDepartmentCSV = (csvText) => {
  if (!csvText) return [];
  
  const lines = csvText.split('\n').map(line => line.trim()).filter(line => line);
  const dataRows = lines.slice(1); // Skip header row
  
  return dataRows.map(row => {
    // Splits by "," and strips out any remaining standalone double quotes
    const values = row.split('","').map(val => val.replace(/"/g, '').trim());
    return {
      id: values[0] || "",
      name: values[1] || ""
    };
  });
};