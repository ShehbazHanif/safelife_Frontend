import * as XLSX from 'xlsx';

/**
 * Export patient table data to Excel file
 * @param {Array} columns - Array of column objects with id, label, and items
 * @param {string} filename - Name of the exported file
 */
export const exportPatientDataToExcel = (columns, filename = 'patient_data.xlsx') => {
    try {
        // Transform columns data into rows format
        const rows = [];

        // Get the number of rows from the first column's items
        const numRows = columns[0]?.items?.length || 0;

        // Create rows by iterating through items
        for (let i = 0; i < numRows; i++) {
            const row = {};
            columns.forEach(column => {
                row[column.label] = column.items[i] || '';
            });
            rows.push(row);
        }

        // Create a new workbook and add worksheet
        const worksheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Patients');

        // Set column widths for better readability
        const columnWidths = columns.map(() => 20);
        worksheet['!cols'] = columnWidths.map(width => ({ wch: width }));

        // Write the file
        XLSX.writeFile(workbook, filename);

        console.log('Patient data exported successfully');
    } catch (error) {
        console.error('Error exporting patient data:', error);
        throw error;
    }
};
