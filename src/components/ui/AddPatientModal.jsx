import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/material";
import { Modal } from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import plusIcon from "../../assets/Plus.svg";
import Select from "../common/Select";
import ChevronIcon from "../../assets/Chevron.svg?react";

// Validation schema
const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobilePhone: Yup.string()
    .matches(/^[\d\s\(\)\-\+]+$/, "Invalid phone number")
    .required("Mobile phone is required"),
  homePhone: Yup.string()
    .matches(/^[\d\s\(\)\-\+]*$/, "Invalid phone number")
    .required("Home phone is required"),
  workPhone: Yup.string()
    .matches(/^[\d\s\(\)\-\+]*$/, "Invalid phone number")
    .required("Work phone is required"),
  dateOfBirth: Yup.date()
    .typeError("Invalid date")
    .required("Date of birth is required"),
  gender: Yup.string().required("Gender is required"),
  address: Yup.string().required("Address is required"),
  active: Yup.string().required("Active status is required"),
  doctorName: Yup.string().required("Doctor name is required"),
  tags: Yup.string().required("Tags are required"),
});

export const AddPatientModal = ({ isOpen, onClose }) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobilePhone: "",
      homePhone: "",
      workPhone: "",
      dateOfBirth: "",
      gender: "",
      address: "",
      active: "",
      doctorName: "",
      tags: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      // Handle form submission here
      console.log("Patient Data:", values);
      resetForm();
      onClose();
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Patient"
      maxWidth="620px"
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
            onClick={formik.handleSubmit}
            className="!bg-[#004A68] !text-white hover:!bg-[#3CAFAA] h-10 px-4"
            size="md">
            Create
          </Button>
        </Box>
      }>
      {/* Form Container */}
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-2 md:w-[520px]">
        {/* Row 1: First Name & Last Name */}
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex flex-col items-start flex-1">
            <label className="mb-1 text-xb text-gray-800 font-montserrat">
              First name
            </label>
            <Input
              type="text"
              name="firstName"
              placeholder="John"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full !py-2.5 !px-3 !border-[#D4D4D4] ${
                formik.touched.firstName && formik.errors.firstName
                  ? "!border-red-500"
                  : ""
              }`}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.firstName}
              </p>
            )}
          </div>

          <div className="flex flex-col items-start flex-1">
            <label className="mb-1 text-xb text-gray-800 font-montserrat">
              Last name
            </label>
            <Input
              type="text"
              name="lastName"
              placeholder="Doe"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full !py-2.5 !px-3 !border-[#D4D4D4] ${
                formik.touched.lastName && formik.errors.lastName
                  ? "!border-red-500"
                  : ""
              }`}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Email & Address */}
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex flex-col items-start flex-1">
            <label className="mb-1 text-xb text-gray-800 font-montserrat">
              Email
            </label>
            <Input
              type="email"
              name="email"
              placeholder="john@example.com"
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
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div className="flex flex-col items-start flex-1">
            <label className="mb-1 text-xb text-gray-800 font-montserrat">
              Gender
            </label>
            <div className="w-full">
              <Select
                name="gender"
                optionValue="value"
                optionLabel="label"
                value={formik.values.gender}
                onChange={(e) => formik.setFieldValue("gender", e.target.value)}
                placeholder="Select"
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
                icon={ChevronIcon}
                className={`w-full !border-[#D4D4D4] !rounded-[20px] focus:!border-2 focus:!border-primary focus-within:!border-2 focus-within:!border-primary ${
                  formik.touched.gender && formik.errors.gender
                    ? "!border-red-500"
                    : ""
                }`}
              />
              {formik.touched.gender && formik.errors.gender && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.gender}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Row 3: Address & Date of Birth */}
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex flex-col items-start flex-1">
            <label className="mb-1 text-xb text-gray-800 font-montserrat">
              Address
            </label>
            <Input
              type="text"
              name="address"
              placeholder="123 Main St, Boston"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full !py-2.5 !px-3 !border-[#D4D4D4] ${
                formik.touched.address && formik.errors.address
                  ? "!border-red-500"
                  : ""
              }`}
            />
            {formik.touched.address && formik.errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.address}
              </p>
            )}
          </div>

          <div className="flex flex-col items-start flex-1">
            <label className="mb-1 text-xb text-gray-800 font-montserrat">
              Date of Birth
            </label>
            <Input
              type="date"
              name="dateOfBirth"
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full !py-2.5 !px-3 !border-[#D4D4D4] ${
                formik.touched.dateOfBirth && formik.errors.dateOfBirth
                  ? "!border-red-500"
                  : ""
              }`}
            />
            {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.dateOfBirth}
              </p>
            )}
          </div>
        </div>

        {/* Row 4: Active & Home Phone */}
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex flex-col items-start flex-1">
            <label className="mb-1 text-sm font-semibold text-gray-800 font-montserrat">
              Active
            </label>

            <div className="flex items-center gap-4 h-[42px]">
              {/* Yes Radio Button */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="active"
                  value="yes"
                  checked={formik.values.active === "yes"}
                  onChange={formik.handleChange}
                  className={`w-5 h-5 appearance-none rounded-full border border-[#D4D4D4] bg-white transition-all cursor-pointer
             checked:bg-primary checked:border-[2px] checked:border-secondary checked:ring-[3px] checked:ring-white-100 checked:ring-inset ${
               formik.touched.active && formik.errors.active
                 ? "!border-red-500"
                 : ""
             }`}
                />
                <span className="text-sm text-[#737373] font-montserrat">
                  Yes
                </span>
              </label>

              {/* No Radio Button */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="active"
                  value="no"
                  checked={formik.values.active === "no"}
                  onChange={formik.handleChange}
                  className={`w-5 h-5 appearance-none rounded-full border border-[#D4D4D4] bg-white transition-all cursor-pointer
                   checked:bg-primary checked:border-[2px] checked:border-secondary checked:ring-[3px] checked:ring-white-100 checked:ring-inset ${
                     formik.touched.active && formik.errors.active
                       ? "!border-red-500"
                       : ""
                   }`}
                />
                <span className="text-sm text-[#737373] font-montserrat">
                  No
                </span>
              </label>
              {formik.touched.active && formik.errors.active && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.active}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-start flex-1">
            <label className="mb-1 text-xb text-gray-800 font-montserrat">
              Home Phone
            </label>

            <Input
              type="tel"
              name="homePhone"
              placeholder="(077) 555-1234"
              value={formik.values.homePhone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full !py-2.5 !px-3 !border-[#D4D4D4] ${
                formik.touched.homePhone && formik.errors.homePhone
                  ? "!border-red-500"
                  : ""
              }`}
            />
            {formik.touched.homePhone && formik.errors.homePhone && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.homePhone}
              </p>
            )}
          </div>
        </div>

        {/* Row 5: Mobile Phone & Work Phone */}
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex flex-col items-start flex-1">
            <label className="mb-1 text-xb text-gray-800 font-montserrat">
              Mobile Phone
            </label>

            <Input
              type="tel"
              name="mobilePhone"
              placeholder="(077) 555-1234"
              value={formik.values.mobilePhone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full !py-2.5 !px-3 !border-[#D4D4D4] ${
                formik.touched.mobilePhone && formik.errors.mobilePhone
                  ? "!border-red-500"
                  : ""
              }`}
            />
            {formik.touched.mobilePhone && formik.errors.mobilePhone && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.mobilePhone}
              </p>
            )}
          </div>

          <div className="flex flex-col items-start flex-1">
            <label className="mb-1 text-xb text-gray-800 font-montserrat">
              Work Phone
            </label>

            <Input
              type="tel"
              name="workPhone"
              placeholder="(077) 555-1234"
              value={formik.values.workPhone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full !py-2.5 !px-3 !border-[#D4D4D4] ${
                formik.touched.workPhone && formik.errors.workPhone
                  ? "!border-red-500"
                  : ""
              }`}
            />
            {formik.touched.workPhone && formik.errors.workPhone && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.workPhone}
              </p>
            )}
          </div>
        </div>

        {/* Row 6: Doctor Name & Tags */}
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex flex-col items-start flex-1">
            <label className="mb-1 text-xb text-gray-800 font-montserrat">
              Doctor name
            </label>

            <Input
              type="text"
              name="doctorName"
              placeholder="Dr. Smith"
              value={formik.values.doctorName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full !py-2.5 !px-3 !border-[#D4D4D4] ${
                formik.touched.doctorName && formik.errors.doctorName
                  ? "!border-red-500"
                  : ""
              }`}
            />
            {formik.touched.doctorName && formik.errors.doctorName && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.doctorName}
              </p>
            )}
          </div>

          <div className="flex flex-col items-start flex-1">
            <label className="mb-1 text-xb text-gray-800 font-montserrat">
              Tags
            </label>

            <Input
              type="text"
              name="tags"
              placeholder="123, 485"
              value={formik.values.tags}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full !py-2.5 !px-3 !border-[#D4D4D4] ${
                formik.touched.tags && formik.errors.tags
                  ? "!border-red-500"
                  : ""
              }`}
            />
            {formik.touched.tags && formik.errors.tags && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.tags}</p>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
};
