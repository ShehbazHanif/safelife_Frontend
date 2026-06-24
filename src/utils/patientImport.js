import * as XLSX from 'xlsx';

/**
 * Import patient data from Excel or CSV file
 * @param {File} file - The uploaded file
 * @returns {Promise<Object>} - Promise resolving to { columns: Array, rawData: Array }
 */
export const importPatientDataFromFile = (file) => {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const data = e.target.result;
                    const workbook = XLSX.read(data, { type: 'binary' });

                    // Get the first sheet
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];

                    // Convert to JSON
                    const jsonData = XLSX.utils.sheet_to_json(worksheet);

                    if (jsonData.length === 0) {
                        reject(new Error('The file appears to be empty'));
                        return;
                    }

                    // Get column headers from the first row
                    const headers = Object.keys(jsonData[0]);

                    // Transform data into columns format
                    const columns = headers.map(header => ({
                        id: header.toLowerCase().replace(/\s+/g, '_'),
                        label: header,
                        items: jsonData.map(row => row[header] || ''),
                    }));

                    resolve({
                        columns,
                        rawData: jsonData,
                        fileName: file.name,
                    });
                } catch (error) {
                    reject(new Error(`Error processing file: ${error.message}`));
                }
            };

            reader.onerror = () => {
                reject(new Error('Failed to read the file'));
            };

            reader.readAsBinaryString(file);
        } catch (error) {
            reject(error);
        }
    });
};
