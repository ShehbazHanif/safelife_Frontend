import React, { useState, forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../common/Input";
import Select from "../common/Select";
import GenericTable from "../common/GenericTable";
import searchIcon from "../../assets/search.svg";
import { pages } from "../../constants/Patient/pages";

// Validation schema
const validationSchema = Yup.object().shape({
  campaignName: Yup.string()
    .required("Campaign name is required")
    .min(2, "Campaign name must be at least 2 characters"),
  agent: Yup.string().required("Agent is required"),
  maxDuration: Yup.number()
    .required("Max duration is required")
    .min(1, "Max duration must be at least 1")
    .typeError("Max duration must be a number"),
  maxContacts: Yup.number()
    .required("Max contacts is required")
    .min(1, "Max contacts must be at least 1")
    .typeError("Max contacts must be a number"),
  voiceMail: Yup.string().required("Voice mail is required"),
  phoneNumbers: Yup.array()
    .min(1, "At least one phone number must be selected")
    .required("Phone numbers are required"),
});

const StepCampaignDetails = forwardRef((props, ref) => {
  const [selectedNumbers, setSelectedNumbers] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      campaignName: "",
      agent: "",
      maxDuration: "",
      maxContacts: "",
      voiceMail: "",
      phoneNumbers: [],
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      // Handle form submission here
    },
  });

  // Expose formik methods to parent
  useImperativeHandle(ref, () => ({
    validate: async () => {
      await formik.validateForm();
      formik.setTouched({
        campaignName: true,
        agent: true,
        maxDuration: true,
        maxContacts: true,
        voiceMail: true,
        phoneNumbers: true,
      });
      return Object.keys(await formik.validateForm()).length === 0;
    },
    getValues: () => formik.values,
  }));

  const agentOptions = [
    { label: "Agent 1", value: "agent-1" },
    { label: "Agent 2", value: "agent-2" },
    { label: "Agent 3", value: "agent-3" },
  ];
  const voiceMailOptions = [
    { label: "VoiceMail 1", value: "voicemail-1" },
    { label: "VoiceMail 2", value: "voicemail-2" },
    { label: "VoiceMail 3", value: "voicemail-3" },
  ];

  const phoneNumbers = [
    "+12542673372",
    "+12543292790",
    "+12542673372",
    "+12543292790",
    "+12542673372",
    "+12543292790",
    "+12542673372",
    "+12543292790",
    "+12542673372",
    "+12543292790",
    "+12542673372",
    "+12543292790",
    "+12542673372",
    "+12543292790",
    "+12542673372",
    "+12543292790",
    "+12542673372",
    "+12543292790",
    "+12542673372",
    "+12543292790",
    "+12542673372",
    "+12543292790",
    "+12542673372",
    "+12543292790",
    "+12542673372",
    "+12543292790",
    "+12542673372",
    "+12543292790",
    "+12542673372",
    "+12543292790",
    "+12542673372",
    "+12543292790",
  ];

  const filteredNumbers = phoneNumbers.filter((num) =>
    num.includes(searchQuery),
  );

  const columns = [
    {
      id: "number",
      label: "Numbers",
      items: filteredNumbers,
    },
  ];

  const handleRowSelect = (index) => {
    const newSelected = new Set(selectedNumbers);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedNumbers(newSelected);
    // Update Formik value
    formik.setFieldValue("phoneNumbers", Array.from(newSelected));
  };

  const handleSelectAll = (selected) => {
    if (selected) {
      const allIndices = new Set(filteredNumbers.map((_, i) => i));
      setSelectedNumbers(allIndices);
      formik.setFieldValue("phoneNumbers", Array.from(allIndices));
    } else {
      setSelectedNumbers(new Set());
      formik.setFieldValue("phoneNumbers", []);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Row 1 - Campaign Name & Agent */}
      <div className="grid grid-cols-2 gap-6 w-full">
        {/* Campaign Name */}
        <div className="flex items-start gap-4 justify-between">
          <div className="w-1/2">
            <label className="text-gray-800 font-montserrat text-sm block mb-1 font-semibold">
              Campaign Name
            </label>
            <p className="text-xs text-gray-400 mb-2">
              Enter the name of your campaign
            </p>
          </div>
          <div className="w-1/2">
            <Input
              type="text"
              placeholder="e.g. Q3 Sales Push"
              value={formik.values.campaignName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="campaignName"
              error={
                formik.touched.campaignName && formik.errors.campaignName
                  ? formik.errors.campaignName
                  : ""
              }
              className={`w-full rounded-[100px] ${
                formik.touched.campaignName && formik.errors.campaignName
                  ? "!border-red-500"
                  : "!border-[#D4D4D4]"
              }`}
            />
          </div>
        </div>

        {/* Agent Select */}
        <div className="flex items-start gap-4 justify-between">
          <div className="w-1/2">
            <label className="text-gray-800 font-montserrat text-sm block mb-1 font-semibold">
              Agent
            </label>
            <p className="text-xs text-gray-400 mb-2">
              Select the agent for your campaign
            </p>
          </div>
          <div className="w-1/2">
            <Select
              value={formik.values.agent}
              onChange={(e) => {
                formik.setFieldValue("agent", e.target.value);
                formik.setFieldTouched("agent", true);
                setTimeout(() => {
                  formik.validateField("agent");
                }, 0);
              }}
              onBlur={() => {
                formik.setFieldTouched("agent", true);
                formik.validateField("agent");
              }}
              name="agent"
              options={agentOptions}
              optionValue="value"
              optionLabel="label"
              placeholder="Select"
              className={`!w-full !py-1 !rounded-[100px] ${
                formik.touched.agent && formik.errors.agent
                  ? "!border-red-500"
                  : "focus:!border-2 focus:!border-primary focus-within:!border-2 focus-within:!border-primary"
              }`}
            />
            {formik.touched.agent && formik.errors.agent && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.agent}</p>
            )}
          </div>
        </div>
      </div>

      {/* Row 2 - Max Duration & Max Contacts */}
      <div className="grid grid-cols-2 gap-6 w-full">
        {/* Max Duration */}
        <div className="flex items-start gap-4 justify-between">
          <div className="w-1/2">
            <label className="text-gray-800 font-montserrat text-sm block mb-1 font-semibold">
              Max Duration in Minutes
            </label>
            <p className="text-xs text-gray-400 mb-2">
              Specify the maximum call duration for your agent.
            </p>
          </div>
          <div className="w-1/2">
            <Input
              type="number"
              placeholder="e.g. 15"
              value={formik.values.maxDuration}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="maxDuration"
              min="1"
              error={
                formik.touched.maxDuration && formik.errors.maxDuration
                  ? formik.errors.maxDuration
                  : ""
              }
              className={`w-full rounded-[100px] ${
                formik.touched.maxDuration && formik.errors.maxDuration
                  ? "!border-red-500"
                  : "!border-[#D4D4D4]"
              }`}
            />
          </div>
        </div>

        {/* Max Contacts */}
        <div className="flex items-start gap-4 justify-between">
          <div className="w-1/2">
            <label className="text-gray-800 font-['Montserrat'] text-sm block mb-1 font-semibold">
              Max Contacts
            </label>
            <p className="text-xs text-gray-400 mb-2">
              Select the maximum numbers of contacts
            </p>
          </div>
          <div className="w-1/2">
            <Input
              type="number"
              placeholder="e.g. 500"
              value={formik.values.maxContacts}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="maxContacts"
              min="1"
              error={
                formik.touched.maxContacts && formik.errors.maxContacts
                  ? formik.errors.maxContacts
                  : ""
              }
              className={`w-full rounded-[100px] ${
                formik.touched.maxContacts && formik.errors.maxContacts
                  ? "!border-red-500"
                  : "!border-[#D4D4D4]"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Voice Mail Section */}
      <div className="grid grid-cols-2 gap-6 w-full">
        <div className="flex items-start gap-4 justify-between">
          <div className="w-1/2">
            <label className="text-gray-800 font-montserrat text-sm block mb-1 font-semibold">
              Voice Mail
            </label>
            <p className="text-xs text-gray-400 mb-2">
              Select the voicemail for your campaign
            </p>
          </div>
          <div className="w-1/2">
            <Select
              value={formik.values.voiceMail}
              onChange={(e) => {
                formik.setFieldValue("voiceMail", e.target.value);
                formik.setFieldTouched("voiceMail", true);
                setTimeout(() => {
                  formik.validateField("voiceMail");
                }, 0);
              }}
              onBlur={() => {
                formik.setFieldTouched("voiceMail", true);
                formik.validateField("voiceMail");
              }}
              name="voiceMail"
              options={voiceMailOptions}
              optionValue="value"
              optionLabel="label"
              placeholder="Select"
              className={`!w-full !py-1 !rounded-[100px] ${
                formik.touched.voiceMail && formik.errors.voiceMail
                  ? "!border-red-500"
                  : "focus:!border-2 focus:!border-primary focus-within:!border-2 focus-within:!border-primary"
              }`}
            />
            {formik.touched.voiceMail && formik.errors.voiceMail && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.voiceMail}
              </p>
            )}
          </div>
        </div>
        {/* Kept empty to balance the 2-column grid system alignment */}
        <div></div>
      </div>

      {/* Phone Number Section */}
      <div className="flex flex-col items-start gap-6 w-full">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col gap-1">
            <label className="text-gray-800 font-montserrat text-sm font-semibold">
              Phone Number
            </label>
            <p className="text-xs text-gray-400">
              The phone number which the agent selected will call from
            </p>
            {formik.touched.phoneNumbers && formik.errors.phoneNumbers && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.phoneNumbers}
              </p>
            )}
          </div>
          <div className="relative w-[280px]">
            <Input
              type="text"
              placeholder="Search for numbers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 pl-9 rounded-[100px] border border-[#D8DCDE] bg-white font-['Montserrat'] text-xs focus:outline-none"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              <img src={searchIcon} alt="Search" className="w-3 h-3" />
            </span>
          </div>
        </div>

        <GenericTable
          columns={columns}
          showCheckbox={true}
          selectedRows={selectedNumbers}
          onRowSelect={handleRowSelect}
          onSelectAll={handleSelectAll}
          pages={pages}
          headerIcon={false}
          maxHeight="320px"
        />
      </div>
    </div>
  );
});

StepCampaignDetails.displayName = "StepCampaignDetails";
export default StepCampaignDetails;
