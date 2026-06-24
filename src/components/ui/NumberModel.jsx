import { Modal } from "../../components/common/Modal";
import Select from "../../components/common/Select";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import GenericTable from "../../components/common/GenericTable"; // Imported to show results
import { useState } from "react";
import { Box } from "@mui/material";

const NumberModel = ({ isOpen, onClose, pages }) => {
  // Step state: 1 = Form inputs, 2 = Table results
  const [step, setStep] = useState(1);
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [selectedNumbers, setSelectedNumbers] = useState(new Set());

  const countryCodes = [
    { value: "+1", label: "United States (+1)" },
    { value: "+44", label: "United Kingdom (+44)" },
    { value: "+91", label: "India (+91)" },
    { value: "+61", label: "Australia (+61)" },
    { value: "+81", label: "Japan (+81)" },
    { value: "+49", label: "Germany (+49)" },
    { value: "+33", label: "France (+33)" },
    { value: "+86", label: "China (+86)" },
    { value: "+39", label: "Italy (+39)" },
    { value: "+7", label: "Russia (+7)" },
  ];

  const mockTableData = [
    {
      number: "(270) 838-3566",
      locality: "Cayce",
      region: "KY",
      postalCode: "75563",
    },
    {
      number: "(430) 218-3955",
      locality: "Linden",
      region: "TX",
      postalCode: "75563",
    },
    {
      number: "(430) 218-3955",
      locality: "Linden",
      region: "TX",
      postalCode: "75563",
    },
    {
      number: "(430) 218-3955",
      locality: "Linden",
      region: "TX",
      postalCode: "75563",
    },
    {
      number: "(430) 218-3955",
      locality: "Linden",
      region: "TX",
      postalCode: "75563",
    },
  ];

  const columns = [
    {
      id: "number",
      label: "Number",
      items: mockTableData.map((d) => d.number),
    },
    {
      id: "locality",
      label: "Locality",
      items: mockTableData.map((d) => d.locality),
    },
    {
      id: "region",
      label: "Region",
      items: mockTableData.map((d) => d.region),
    },
    {
      id: "postalCode",
      label: "Postal Code",
      items: mockTableData.map((d) => d.postalCode),
    },
  ];

  const handleFetchNumbers = () => {
    if (!selectedCountryCode) {
      alert("Please select a country code");
      return;
    }

    setStep(2);
  };

  const handleBuyNumbers = () => {
    // Final action logic for purchasing numbers
    console.log("Purchasing numbers indices:", Array.from(selectedNumbers));
    handleModalClose();
  };

  const handleModalClose = () => {
    setStep(1); // Reset back to form for its next open state trigger
    setSelectedNumbers(new Set());
    onClose();
  };

  const handleRowSelect = (index) => {
    const newSelected = new Set(selectedNumbers);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedNumbers(newSelected);
  };

  const handleSelectAll = (selected) => {
    if (selected) {
      const allIndices = new Set(mockTableData.map((_, i) => i));
      setSelectedNumbers(allIndices);
    } else {
      setSelectedNumbers(new Set());
    }
  };

  // Render Footer Buttons dynamically depending on current step
  const renderFooter = () => {
    if (step === 1) {
      return (
        <Box sx={{ display: "flex", gap: "12px" }}>
          <Button
            type="button"
            onClick={handleModalClose}
            className="!bg-[#F2F2F2] !text-[#737373] hover:!bg-[#E5E7EB] h-11 px-6 !rounded-[100px] font-semibold text-sm transition-colors">
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleFetchNumbers}
            className="!bg-[#004A68] !text-white hover:!bg-[#003850] h-11 px-6 !rounded-[100px] font-semibold text-sm transition-colors">
            Fetch Numbers
          </Button>
        </Box>
      );
    }

    return (
      <Box sx={{ display: "flex", gap: "12px" }}>
        <Button
          type="button"
          onClick={() => setStep(1)}
          className="!bg-[#F2F2F2] !text-[#737373] hover:!bg-[#E5E7EB] h-11 px-6 !rounded-[100px] font-semibold text-sm transition-colors">
          Back
        </Button>
        <Button
          type="button"
          onClick={handleBuyNumbers}
          disabled={selectedNumbers.size === 0}
          className={`h-11 px-6 !rounded-[100px] font-semibold text-sm transition-colors !bg-[#004A68] !text-white hover:!bg-[#003850]
            selectedNumbers.size === 0
       `}>
          Buy
        </Button>
      </Box>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      title="Buy Number"
      maxWidth={step === 1 ? "540px" : "800px"}
      footer={renderFooter()}
      footerType="actions-only">
      {step === 1 ? (
        /* STEP 1: FORM CONTROLS VIEW */
        <div className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-gray-800 font-montserrat text-sm font-semibold">
              Country Code
            </label>
            <Select
              name="countryCode"
              options={countryCodes}
              optionValue="value"
              optionLabel="label"
              value={selectedCountryCode}
              placeholder="Select"
              className="!w-full !py-1 !rounded-[100px] border border-[#D8DCDE]"
              onChange={(e) => setSelectedCountryCode(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-gray-800 font-montserrat text-sm font-semibold">
              Area Code
            </label>
            <Input
              name="areaCode"
              placeholder="Enter Area Code"
              value={areaCode}
              className="!w-full !rounded-[100px] border !border-[#D8DCDE]"
              onChange={(e) => setAreaCode(e.target.value)}
            />
          </div>
        </div>
      ) : (
        /* STEP 2: GENERIC TABLE OUTPUT VIEW */
        <div className="w-full custom-table-container">
          <GenericTable
            columns={columns}
            showCheckbox={true}
            selectedRows={selectedNumbers}
            onRowSelect={handleRowSelect}
            onSelectAll={handleSelectAll}
            pages={pages}
            headerIcon={false}
            maxheight="h-[350px]"
          />
        </div>
      )}
    </Modal>
  );
};

export default NumberModel;
