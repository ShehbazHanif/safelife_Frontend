import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Modal } from "../common/Modal";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

// Custom Chevron Icon to match your Formik Select snippet parameters
const ChevronIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const UserModel = ({ isOpen, onClose }) => {
  // Formik validation schema architecture block
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().optional(),
    role: Yup.string().required("Role selection is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please repeat your password"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      role: "Staff Member",
      password: "",
      repeatPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Submitting validated user payload:", values);
      // Insert API submission logic here
      onClose();
      formik.resetForm();
    },
  });

  const roleOptions = [
    { value: "Staff Member", label: "Staff Member" },
    { value: "Clinician", label: "Clinician" },
    { value: "Administrator", label: "Administrator" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        formik.resetForm();
      }}
      title="Create a New User"
      footerType="custom"
      maxWidth="560px"
      footer={
        <div className="flex w-full justify-end gap-3">
          <Button
            variant="secondary"
            onClick={() => {
              onClose();
              formik.resetForm();
            }}>
            Cancel
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Create
          </Button>
        </div>
      }>
      {/* Complete Responsive Form Content Wrapper */}
      <div className="flex w-full flex-col items-start gap-6 font-montserrat">
        {/* SECTION 1: Personal Info Stack */}
        <div className="flex w-full flex-col gap-4">
          <h3 className="text-[14px] font-bold text-[#262626] uppercase tracking-wide">
            Personal Info
          </h3>

          {/* Row layout combining inputs and profile avatar placeholder */}
          <div className="flex w-full gap-6 items-start">
            {/* Input fields panel */}
            <div className="flex flex-col gap-4 flex-1">
              <div>
                <Input
                  label="Name"
                  name="name"
                  placeholder="John Doe"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full !py-2.5 !px-3 !border-[#D4D4D4] ${
                    formik.touched.name && formik.errors.name
                      ? "!border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.name}
                  </p>
                )}
              </div>

              <div>
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="johndoe@gmail.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full !py-2.5 !px-3 !border-[#D4D4D4] ${
                    formik.touched.email && formik.errors.email
                      ? "!border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div>
                <Input
                  label="Phone number (Optional)"
                  name="phone"
                  placeholder="(408) 660-2289"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full !py-2.5 !px-3 !border-[#D4D4D4] ${
                    formik.touched.phone && formik.errors.phone
                      ? "!border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Right side: Avatar Upload Panel */}
            <div className="flex flex-col items-center justify-center gap-3 pt-6">
              <div className="flex w-[120px] h-[120px] aspect-square rounded-full bg-[#E0F2FE] items-center justify-center">
                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>

              {/* Action buttons under profile picture element */}
              <div className="flex gap-4 items-center">
                <button
                  type="button"
                  className="bg-none border-none cursor-pointer text-gray-500 hover:text-gray-700 transition-colors">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="bg-none border-none cursor-pointer text-red-500 hover:text-red-700 transition-colors">
                  <svg
                    className="w-5 h-5 text-red-500 hover:text-red-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <hr className="w-full border-none border-t border-[#E9EBED] m-0" />

        {/* SECTION 2: Role Selection Field */}
        <div className="flex w-full flex-col gap-2">
          <label className="text-[14px] font-bold text-[#262626]">Role</label>
          <div className="flex w-full items-center gap-4">
            <div className="flex-1">
              <Select
                name="role"
                optionValue="value"
                optionLabel="label"
                value={formik.values.role}
                onChange={(e) => formik.setFieldValue("role", e.target.value)}
                placeholder="Select"
                options={roleOptions}
                icon={ChevronIcon}
                className={`w-full !border-[#D4D4D4] !rounded-[20px] focus:!border-2 focus:!border-primary focus-within:!border-2 focus-within:!border-primary ${
                  formik.touched.role && formik.errors.role
                    ? "!border-red-500"
                    : ""
                }`}
              />
              {formik.touched.role && formik.errors.role && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.role}
                </p>
              )}
            </div>
            <span className="text-primary text-[14px] font-semibold cursor-pointer whitespace-nowrap border-l border-[#D8DCDE] pl-4 hover:opacity-80 transition-opacity">
              Show role details
            </span>
          </div>
        </div>

        <hr className="w-full border-none border-t border-[#E9EBED] m-0" />

        {/* SECTION 3: Login Credentials Inputs */}
        <div className="flex w-full flex-col gap-4">
          <h3 className="text-[14px] font-bold text-[#262626] uppercase tracking-wide">
            Login Credentials
          </h3>
          <div className="flex w-full gap-4">
            <div className="flex-1">
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="Enter Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full !py-2.5 !px-3 !border-[#D4D4D4] ${
                  formik.touched.password && formik.errors.password
                    ? "!border-red-500"
                    : ""
                }`}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <div className="flex-1">
              <Input
                label="Repeat Password"
                name="repeatPassword"
                type="password"
                placeholder="Repeat Password"
                value={formik.values.repeatPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full !py-2.5 !px-3 !border-[#D4D4D4] ${
                  formik.touched.repeatPassword && formik.errors.repeatPassword
                    ? "!border-red-500"
                    : ""
                }`}
              />
              {formik.touched.repeatPassword &&
                formik.errors.repeatPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.repeatPassword}
                  </p>
                )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserModel;
