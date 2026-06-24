import { useState, useMemo, useRef } from "react";
import PageHeader from "../../components/common/PageHeader";
import downloadIcon from "../../assets/DownloadSimple.svg";
import ChevronIcon from "../../assets/CaretDown.svg";
import plusIcon from "../../assets/Plus.svg";
import { SearchAndFilter } from "../../components/common/SearchAndFilter";
import { AddPatientModal } from "../../components/ui/AddPatientModal";
import ImportPatientModal from "../../components/ui/ImportPatientModal";
import { exportPatientDataToExcel } from "../../utils/patientExport";
import { importPatientDataFromFile } from "../../utils/patientImport";
import { columns as defaultColumns } from "../../constants/Patient/coloumsData";
import { pages } from "../../constants/Patient/pages";
import GenericTable from "../../components/common/GenericTable";

// Import your reusable dropdown component
import ActionDropdown from "../../components/common/ActionDropdown";

const Patient = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importedData, setImportedData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");

  // States to track the dropdown state natively linked to actions array
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownAnchorRef = useRef(null);

  // Filter and search logic
  const filteredColumns = useMemo(() => {
    if (!searchValue && !filterValue) {
      return defaultColumns;
    }

    let validIndices = new Set(
      defaultColumns[0]?.items?.map((_, idx) => idx) || [],
    );

    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      const searchMatchingIndices = new Set();

      // Only search in text-based columns (not gender, active, etc)
      const searchableColumns = defaultColumns.filter((col) =>
        [
          "first_name",
          "last_name",
          "address",
          "home_phone",
          "mobile_phone",
          "work_phone",
        ].includes(col.id),
      );

      searchableColumns.forEach((col) => {
        col.items.forEach((item, idx) => {
          if (item.toString().toLowerCase().includes(searchLower)) {
            searchMatchingIndices.add(idx);
          }
        });
      });

      validIndices = new Set(
        [...validIndices].filter((idx) => searchMatchingIndices.has(idx)),
      );
    }

    if (filterValue) {
      const filterLower = filterValue.toLowerCase();
      let filterColumn = null;

      if (filterLower === "male" || filterLower === "female") {
        filterColumn = defaultColumns.find((col) => col.id === "gender");
      } else if (filterLower === "active") {
        filterColumn = defaultColumns.find((col) => col.id === "active");
      }

      if (filterColumn) {
        const filterMatchingIndices = new Set();

        filterColumn.items.forEach((item, idx) => {
          const itemLower = item.toString().toLowerCase();
          const searchTerm = filterLower === "active" ? "true" : filterLower;

          if (itemLower === searchTerm) {
            filterMatchingIndices.add(idx);
          }
        });

        validIndices = new Set(
          [...validIndices].filter((idx) => filterMatchingIndices.has(idx)),
        );
      }
    }

    return defaultColumns.map((column) => ({
      ...column,
      items: column.items.filter((_, idx) => validIndices.has(idx)),
    }));
  }, [searchValue, filterValue]);

  // Handle download patient data to Excel
  const handleDownloadPatients = () => {
    try {
      exportPatientDataToExcel(defaultColumns, "patients.xlsx");
    } catch (error) {
      alert("Failed to download patient data. Please try again.");
      console.error("Download error:", error);
    }
  };

  // Handle file upload for importing patients
  const handleUploadPatients = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".xlsx, .xls, .csv";
    fileInput.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        const data = await importPatientDataFromFile(file);
        setImportedData(data);
        setIsImportModalOpen(true);
      } catch (error) {
        alert(`Error importing file: ${error.message}`);
        console.error("Import error:", error);
      }
    };
    fileInput.click();
  };

  // Setup options data object
  const dropdownItems = [
    { label: "Download Patients", onClick: handleDownloadPatients },
    { label: "Import Patients", onClick: handleUploadPatients },
  ];

  const filterOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Active", value: "active" },
  ];

  const actions = [
    {
      label: "Create Patient",
      variant: "primary",
      onClick: () => setIsModalOpen(true),
      startIcon: <img src={plusIcon} alt="" className="w-4 h-4" />,
    },
    {
      label: "Import Patients",
      variant: "secondary",
      ref: dropdownAnchorRef, // Connects the button target node directly to the ref inside PageHeader
      onClick: (e) => {
        e.stopPropagation();
        setDropdownOpen((prev) => !prev);
      },
      startIcon: (
        <img
          src={downloadIcon}
          alt="download"
          className="w-4 h-4 object-contain cursor-pointer"
        />
      ),
      endIcon: (
        <img
          src={ChevronIcon}
          alt="arrow"
          className={`w-4 h-4 object-contain cursor-pointer transition-transform duration-200 ${
            dropdownOpen ? "rotate-180" : ""
          }`}
        />
      ),
    },
  ];

  return (
    <div className="flex h-full px-2 pb-4 flex-col items-start gap-4 self-stretch">
      <PageHeader
        title="Patient"
        actions={actions}
        rightActions={
          <SearchAndFilter
            filterOptions={filterOptions}
            searchValue={searchValue}
            onSearchChange={(e) => setSearchValue(e.target.value)}
            filterValue={filterValue}
            onFilterChange={(value) => {
              const actualValue =
                value && value.target ? value.target.value : value;
              setFilterValue(actualValue);
            }}
          />
        }
      />

      {/* Render the extracted Dropdown component alongside the page structure smoothly */}
      <ActionDropdown
        open={dropdownOpen}
        anchorEl={dropdownAnchorRef.current}
        onClose={() => setDropdownOpen(false)}
        items={dropdownItems}
      />

      <AddPatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <ImportPatientModal
        isOpen={isImportModalOpen}
        onClose={() => {
          setIsImportModalOpen(false);
          setImportedData(null);
        }}
        columns={importedData?.columns || []}
        fileName={importedData?.fileName || ""}
      />

      <GenericTable columns={filteredColumns} pages={pages} />
    </div>
  );
};

export default Patient;
