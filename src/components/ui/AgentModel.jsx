import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "../common/Select"; // Adjust this import path to where your custom Select file lives
import Input from "../common/Input"; // Adjust this import path to where your custom Input file lives
import MonitorIcon from "../../assets/MonitorArrowUp.svg";

// Validation schema
const validationSchema = Yup.object().shape({
  agentName: Yup.string()
    .required("Agent name is required")
    .min(2, "Agent name must be at least 2 characters"),
  voice: Yup.string().required("Voice is required"),
  language: Yup.string().required("Language is required"),
  voiceMail: Yup.string().required("Voice mail is required"),
  qualificationScenario: Yup.string().required(
    "Qualification scenario is required",
  ),
  openingMessage: Yup.string().required("Opening message is required"),
  goal: Yup.string().required("Goal is required"),
  background: Yup.string().required("Background is required"),
  exampleConversation: Yup.string(),
});

const AgentModel = forwardRef((props, ref) => {
  const fileInputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      agentName: "",
      voice: "",
      language: "",
      voiceMail: "",
      qualificationScenario: "",
      openingMessage: "",
      goal: "",
      background: "",
      exampleConversation: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Agent form submitted:", values);
    },
  });

  // Handle file upload
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file is an image
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setUploadedPhoto(event.target?.result);
        };
        reader.readAsDataURL(file);
        console.log("File selected:", file);
      } else {
        alert("Please select a valid image file");
      }
    }
  };

  // Expose formik methods to parent
  useImperativeHandle(ref, () => ({
    validate: async () => {
      await formik.validateForm();
      formik.setTouched({
        agentName: true,
        voice: true,
        language: true,
        voiceMail: true,
        qualificationScenario: true,
        openingMessage: true,
        goal: true,
        background: true,
      });
      return Object.keys(await formik.validateForm()).length === 0;
    },
    getValues: () => formik.values,
  }));

  // Mock data arrays for your custom Select options
  const voiceOptions = [
    { label: "Rachel (Warm - English)", value: "rachel" },
    { label: "Drew (Professional - English)", value: "drew" },
    { label: "Elena (Smooth - Spanish)", value: "elena" },
  ];

  const languageOptions = [
    { label: "English (US)", value: "en-US" },
    { label: "Spanish (ES)", value: "es-ES" },
    { label: "French (FR)", value: "fr-FR" },
  ];

  return (
    /* Parent Div: Holds the complete layout styling from Figma */
    <div className="flex h-[950px] w-full items-center justify-center gap-4 rounded-[24px] bg-[#F9F9F9] p-[16px_24px] shadow-[0_1px_4px_0_rgba(133,146,173,0.10)]k">
      {/* Left Column: Form settings list (Inner Div 1) */}
      <div className="flex flex-1 flex-col items-start h-full overflow-y-auto">
        {/* Row 1: Agent Image */}
        <div className="flex py-4 items-center gap-8 self-stretch">
          <div className="flex flex-col w-[250px] items-start">
            <h3 className="text-base font-montserrat text-gray-800">
              Agent Image
            </h3>
            <p className="text-xb font-montserrat text-gray-700">
              An optional image that can be displayed in your agents list.
            </p>
          </div>
          <div className="flex flex-1 flex-col items-start gap-[8px]">
            <div className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-500 overflow-hidden">
                {uploadedPhoto ? (
                  <img
                    src={uploadedPhoto}
                    alt="Agent Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={MonitorIcon}
                    alt="Agent Avatar"
                    className="w-6 h-6"
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xb font-montserrat text-gray-700">
                  Photo size: 250px x 250px
                </span>
                <button
                  type="button"
                  onClick={handleUploadClick}
                  className="rounded-full border border-gray-300 bg-white px-4 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors">
                  Upload Photo
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  aria-label="Upload agent photo"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Agent Name */}
        <div className="flex py-4 items-center gap-8 self-stretch">
          <div className="flex flex-col w-[250px] items-start">
            <label className="text-base font-montserrat text-gray-800">
              Agent Name
            </label>
            <span className="text-xb font-montserrat text-gray-700 ">
              What name will your agent
            </span>
          </div>
          <div className="flex flex-1 flex-col items-start gap-[8px]">
            <Input
              type="text"
              value={formik.values.agentName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="agentName"
              error={
                formik.touched.agentName && formik.errors.agentName
                  ? formik.errors.agentName
                  : ""
              }
              className={`flex h-10 !w-full rounded-[100px] border bg-white px-[12px] py-[10px] text-sm self-stretch ${
                formik.touched.agentName && formik.errors.agentName
                  ? "!border-red-500"
                  : "!border-[#D8DCDE]"
              }`}
            />
          </div>
        </div>

        {/* Row 3: Voice */}
        <div className="flex py-4 items-center gap-8 self-stretch">
          <div className="flex flex-col w-[250px] items-start">
            <label className="text-base font-montserrat text-gray-800">
              Voice
            </label>
            <span className="text-xb font-montserrat text-gray-700">
              Lorem ipsum dolor sit amet
            </span>
          </div>
          <div className="flex flex-1 flex-col items-start gap-[10px] self-stretch">
            <div className="w-full">
              <Select
                value={formik.values.voice}
                onChange={(e) => {
                  formik.setFieldValue("voice", e.target.value);
                  formik.setFieldTouched("voice", true);
                }}
                onBlur={() => formik.setFieldTouched("voice", true)}
                name="voice"
                options={voiceOptions}
                placeholder="Select"
                className={`!w-full self-stretch !rounded-[20px] ${
                  formik.touched.voice && formik.errors.voice
                    ? "!border-red-500"
                    : "focus:!border-2 focus:!border-primary focus-within:!border-2 focus-within:!border-primary"
                }`}
              />
              {formik.touched.voice && formik.errors.voice && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.voice}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Row 4: Language */}
        <div className="flex py-4 items-center gap-8 self-stretch">
          <div className="flex flex-col w-[250px] items-start">
            <label className="text-base font-montserrat text-gray-800">
              Language
            </label>
            <span className="text-xb font-montserrat text-gray-700">
              Lorem ipsum dolor sit amet
            </span>
          </div>
          <div className="flex flex-1 flex-col items-start gap-[10px] self-stretch">
            <div className="w-full">
              <Select
                value={formik.values.language}
                onChange={(e) => {
                  formik.setFieldValue("language", e.target.value);
                  formik.setFieldTouched("language", true);
                }}
                onBlur={() => formik.setFieldTouched("language", true)}
                name="language"
                options={languageOptions}
                placeholder="Select"
                className={`!w-full self-stretch !rounded-[20px] 
                  ${
                    formik.touched.language && formik.errors.language
                      ? "!border-red-500"
                      : "focus:!border-2 focus:!border-primary focus-within:!border-2 focus-within:!border-primary"
                  }
                `}
              />
              {formik.touched.language && formik.errors.language && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.language}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Row 5: Voice Mail */}
        <div className="flex py-4 items-center gap-8 self-stretch">
          <div className="flex flex-col w-[250px] items-start">
            <label className="text-base font-montserrat text-gray-800">
              Voice mail
            </label>
            <span className="text-xb font-montserrat text-gray-700">
              Lorem ipsum dolor sit amet
            </span>
          </div>
          <div className="flex flex-1 flex-col items-start gap-[10px] self-stretch">
            <Input
              type="text"
              value={formik.values.voiceMail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="voiceMail"
              error={
                formik.touched.voiceMail && formik.errors.voiceMail
                  ? formik.errors.voiceMail
                  : ""
              }
              className={`flex h-10 !w-full rounded-[100px] border bg-white px-[12px] py-[10px] text-sm self-stretch ${
                formik.touched.voiceMail && formik.errors.voiceMail
                  ? "!border-red-500"
                  : "!border-[#D8DCDE]"
              }`}
            />
          </div>
        </div>

        {/* Row 6: Qualification Scenario */}
        <div className="flex py-4 items-start gap-8 self-stretch">
          <div className="flex flex-col w-[250px] items-start">
            <label className="text-base font-montserrat text-gray-800">
              Qualification Scenario
            </label>
            <span className="text-xb font-montserrat text-gray-700">
              Lorem ipsum dolor sit amet
            </span>
          </div>
          <div className="flex flex-1 flex-col items-start gap-[10px] self-stretch">
            <div className="w-full">
              <textarea
                rows={3}
                value={formik.values.qualificationScenario}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="qualificationScenario"
                className={`flex w-full rounded-[24px] border bg-white px-[12px] py-[10px] text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary resize-none self-stretch ${
                  formik.touched.qualificationScenario &&
                  formik.errors.qualificationScenario
                    ? "border-red-500"
                    : "border-[#D8DCDE]"
                }`}
              />
              {formik.touched.qualificationScenario &&
                formik.errors.qualificationScenario && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.qualificationScenario}
                  </p>
                )}
            </div>
          </div>
        </div>

        {/* Row 7: Opening Message */}
        <div className="flex py-4 items-start gap-8 self-stretch">
          <div className="flex flex-col w-[250px] items-start">
            <label className="text-base font-montserrat text-gray-800">
              Opening Message
            </label>
            <span className="text-xb font-montserrat text-gray-700">
              Lorem ipsum dolor sit amet
            </span>
          </div>
          <div className="flex flex-1 flex-col items-start gap-[10px] self-stretch">
            <div className="w-full">
              <textarea
                rows={3}
                value={formik.values.openingMessage}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="openingMessage"
                className={`flex w-full rounded-[24px] border bg-white px-[12px] py-[10px] text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary resize-none self-stretch ${
                  formik.touched.openingMessage && formik.errors.openingMessage
                    ? "border-red-500"
                    : "border-[#D8DCDE]"
                }`}
              />
              {formik.touched.openingMessage &&
                formik.errors.openingMessage && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.openingMessage}
                  </p>
                )}
            </div>
          </div>
        </div>

        {/* Row 8: Goal */}
        <div className="flex py-4 items-start gap-8 self-stretch">
          <div className="flex flex-col w-[250px] items-start">
            <label className="text-base font-montserrat text-gray-800">
              Goal
            </label>
            <span className="text-xb font-montserrat text-gray-700">
              Lorem ipsum dolor sit amet
            </span>
          </div>
          <div className="flex flex-1 flex-col items-start gap-[10px] self-stretch">
            <div className="w-full">
              <textarea
                rows={3}
                value={formik.values.goal}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="goal"
                className={`flex w-full rounded-[24px] border bg-white px-[12px] py-[10px] text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary resize-none self-stretch ${
                  formik.touched.goal && formik.errors.goal
                    ? "border-red-500"
                    : "border-[#D8DCDE]"
                }`}
              />
              {formik.touched.goal && formik.errors.goal && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.goal}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Row 9: Background */}
        <div className="flex py-4 items-start gap-8 self-stretch">
          <div className="flex flex-col w-[250px] items-start">
            <label className="text-base font-montserrat text-gray-800">
              Background
            </label>
            <span className="text-xb font-montserrat text-gray-700">
              Lorem ipsum dolor sit amet
            </span>
          </div>
          <div className="flex flex-1 flex-col items-start gap-[10px] self-stretch">
            <div className="w-full">
              <textarea
                rows={3}
                value={formik.values.background}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="background"
                className={`flex w-full rounded-[24px] border bg-white px-[12px] py-[10px] text-sm text-gray-700 font font-montserrat outline-none focus:ring-2 focus:ring-primary resize-none self-stretch ${
                  formik.touched.background && formik.errors.background
                    ? "border-red-500"
                    : "border-[#D8DCDE]"
                }`}
              />
              {formik.touched.background && formik.errors.background && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.background}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Example Conversation Preview (Inner Div 2) */}
      <div className="flex  h-full flex-col items-start gap-2 self-stretch">
        <div className="flex flex-col gap-0.5">
          <span className="text-base font-montserrat text-gray-800">
            Example Conversation{" "}
            <span className="text-xb font-montserrat text-gray-700">
              (Optional)
            </span>
          </span>
          <p className="text-xb font-montserrat text-gray-700">
            Lorem ipsum dolor sit amet consectetur. Scelerisque.
          </p>
        </div>

        {/* Conversation Area Box */}
        <div
          className={`w-full flex-1 rounded-[24px] border-2 bg-white-100 p-4 transition-colors ${
            isFocused ? "border-primary" : "border-[#D8DCDE]"
          }`}>
          <textarea
            value={formik.values.exampleConversation}
            onChange={formik.handleChange}
            onBlur={() => {
              formik.handleBlur({ target: { name: "exampleConversation" } });
              setIsFocused(false);
            }}
            onFocus={() => setIsFocused(true)}
            name="exampleConversation"
            className="w-full h-full text-sm text-gray-700 outline-none resize-none bg-transparent"
          />
        </div>
      </div>
    </div>
  );
});

AgentModel.displayName = "AgentModel";
export default AgentModel;
