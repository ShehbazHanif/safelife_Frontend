import { useState } from "react";
import { Modal } from "../common/Modal";
import { Box } from "@mui/material";
import Button from "../common/Button";
import GenericTable from "../common/GenericTable";

export const ImportPatientModal = ({ isOpen, onClose, columns, fileName }) => {
  const [selectedRows, setSelectedRows] = useState(new Set());

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(
        new Set(
          Array.from({ length: columns[0]?.items?.length || 0 }, (_, i) => i),
        ),
      );
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (rowIndex) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(rowIndex)) {
      newSelected.delete(rowIndex);
    } else {
      newSelected.add(rowIndex);
    }
    setSelectedRows(newSelected);
  };

  const numRows = columns[0]?.items?.length || 0;
  const isAllSelected = selectedRows.size === numRows && numRows > 0;

  const handleImport = () => {
    console.log("Imported rows:", Array.from(selectedRows));
    // TODO: Handle the actual import logic here (e.g., send to backend)
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Import Patient"
      maxWidth="1050px"
      footerType="actions-only"
      footer={
        <Box sx={{ display: "flex", gap: "8px" }}>
          <Button
            type="button"
            onClick={onClose}
            className="!bg-[#F2F2F2] !text-[#737373] hover:!bg-[#E5E7EB] h-10 px-4"
            size="md">
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleImport}
            disabled={selectedRows.size === 0}
            className="!bg-[#004A68] !text-white hover:!bg-[#3CAFAA] h-10 px-4"
            size="md">
            Import
          </Button>
        </Box>
      }>
      <div className="flex flex-col gap-4">
        {/* Info message */}
        {/* <div className="bg-blue-50 border border-blue-200 rounded p-3">
          <p className="text-sm text-blue-800">
            Preview: {numRows} patient record{numRows !== 1 ? "s" : ""} found in
            the file. Select records to import.
          </p>
        </div> */}

        {/* GenericTable with checkboxes enabled */}
        <GenericTable
          columns={columns}
          showFooter={false}
          maxHeight="400px"
          showCheckbox={true}
          headerIcon={false}
          selectedRows={selectedRows}
          onRowSelect={(rowIndex) => handleSelectRow(rowIndex)}
          onSelectAll={(isSelected) => {
            if (isSelected) {
              setSelectedRows(
                new Set(Array.from({ length: numRows }, (_, i) => i)),
              );
            } else {
              setSelectedRows(new Set());
            }
          }}
        />
      </div>
    </Modal>
  );
};

export default ImportPatientModal;
