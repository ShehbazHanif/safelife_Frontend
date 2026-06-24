import React, { useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../common/Input";
import GenericTable from "../common/GenericTable"; // Adjust path to your component location
import CheckBox from "../common/CheckBox"; // Adjust path to your CheckBox location

const PermissionsConfigView = () => {
  // 1. Static structural definition for the system modules matching Figma
  const systemModules = [
    "Dashboard",
    "Agents",
    "Patients",
    "Automations",
    "Numbers",
    "Task",
    "Users",
    "Campaigns",
    "Lorem",
  ];

  // 2. Initialize Formik state map using a structured object
  const initialPermissions = systemModules.reduce((acc, module) => {
    acc[module] = { create: false, read: false, update: false, delete: false };
    return acc;
  }, {});

  const formik = useFormik({
    initialValues: {
      roleName: "Staff Member",
      permissions: initialPermissions,
    },
    validationSchema: Yup.object({
      roleName: Yup.string().required("Role Name is required"),
    }),
    onSubmit: (values) => {
      console.log(
        "Saving customized permission matrix configurations:",
        values,
      );
    },
  });

  // 3. Helper to determine if an individual module row has all CRUD operations checked
  const isRowAllChecked = (moduleName) => {
    return ["create", "read", "update", "delete"].every(
      (op) => formik.values.permissions[moduleName]?.[op],
    );
  };

  // 4. Compute which rows are fully checked to pass as a Set to GenericTable
  const computedSelectedRows = useMemo(() => {
    const selectedSet = new Set();
    systemModules.forEach((module, index) => {
      if (isRowAllChecked(module)) {
        selectedSet.add(index); // Submits indices matching GenericTable standard rules
      }
    });
    return selectedSet;
  }, [formik.values.permissions]);

  // 5. Check if all columns are active for column headers
  const isColumnAllChecked = (operation) => {
    return systemModules.every(
      (module) => formik.values.permissions[module][operation],
    );
  };

  // 6. TOGGLE HANDLERS

  // Handler A: Column Header Checkbox Toggle (Vertical check)
  const handleColumnHeaderToggle = (operation) => {
    const isAllChecked = isColumnAllChecked(operation);
    const updatedPermissions = { ...formik.values.permissions };

    systemModules.forEach((module) => {
      updatedPermissions[module][operation] = !isAllChecked;
    });
    formik.setFieldValue("permissions", updatedPermissions);
  };

  // Handler B: Individual Cell Checkbox Toggle
  const handleCellToggle = (moduleName, operation) => {
    const currentValue = formik.values.permissions[moduleName]?.[operation];
    formik.setFieldValue(
      `permissions.${moduleName}.${operation}`,
      !currentValue,
    );
  };

  // Handler C: Row Checkbox Toggle (Horizontal check - triggered by onRowSelect)
  const handleRowSelectToggle = (rowIndex) => {
    const moduleName = systemModules[rowIndex];
    const shouldCheckAllRow = !isRowAllChecked(moduleName);
    const updatedPermissions = { ...formik.values.permissions };

    updatedPermissions[moduleName] = {
      create: shouldCheckAllRow,
      read: shouldCheckAllRow,
      update: shouldCheckAllRow,
      delete: shouldCheckAllRow,
    };
    formik.setFieldValue("permissions", updatedPermissions);
  };

  // Handler D: Master Top-Left Box Toggle (Global check - triggered by onSelectAll)
  const handleSelectAllToggle = () => {
    // If all rows are already fully selected, turn everything off; otherwise turn everything on.
    const shouldSelectAll = computedSelectedRows.size !== systemModules.length;
    const updatedPermissions = { ...formik.values.permissions };

    systemModules.forEach((module) => {
      updatedPermissions[module] = {
        create: shouldSelectAll,
        read: shouldSelectAll,
        update: shouldSelectAll,
        delete: shouldSelectAll,
      };
    });
    formik.setFieldValue("permissions", updatedPermissions);
  };

  // 7. Transform modules into Columns structure layout accepted by GenericTable
  const tableColumns = useMemo(() => {
    return [
      {
        id: "modules",
        label: "Modules",
        items: systemModules,
        renderCell: (moduleName) => (
          <span className="text-[14px] font-medium text-[#262626] font-montserrat">
            {moduleName}
          </span>
        ),
      },
      {
        id: "create",
        label: (
          <div className="flex items-center gap-3">
            <CheckBox
              checked={isColumnAllChecked("create")}
              onChange={() => handleColumnHeaderToggle("create")}
            />
            <span className="font-semibold text-[14px] text-gray-800 font-montserrat">
              Create
            </span>
          </div>
        ),
        items: systemModules,
        renderCell: (moduleName) => (
          <CheckBox
            checked={formik.values.permissions[moduleName]?.create || false}
            onChange={() => handleCellToggle(moduleName, "create")}
          />
        ),
      },
      {
        id: "read",
        label: (
          <div className="flex items-center gap-3">
            <CheckBox
              checked={isColumnAllChecked("read")}
              onChange={() => handleColumnHeaderToggle("read")}
            />
            <span className="font-semibold text-[14px] text-gray-800 font-montserrat">
              Read
            </span>
          </div>
        ),
        items: systemModules,
        renderCell: (moduleName) => (
          <CheckBox
            checked={formik.values.permissions[moduleName]?.read || false}
            onChange={() => handleCellToggle(moduleName, "read")}
          />
        ),
      },
      {
        id: "update",
        label: (
          <div className="flex items-center gap-3">
            <CheckBox
              checked={isColumnAllChecked("update")}
              onChange={() => handleColumnHeaderToggle("update")}
            />
            <span className="font-semibold text-[14px] text-gray-800 font-montserrat">
              Update
            </span>
          </div>
        ),
        items: systemModules,
        renderCell: (moduleName) => (
          <CheckBox
            checked={formik.values.permissions[moduleName]?.update || false}
            onChange={() => handleCellToggle(moduleName, "update")}
          />
        ),
      },
      {
        id: "delete",
        label: (
          <div className="flex items-center gap-3">
            <CheckBox
              checked={isColumnAllChecked("delete")}
              onChange={() => handleColumnHeaderToggle("delete")}
            />
            <span className="font-semibold text-[14px] text-gray-800 font-montserrat">
              Delete
            </span>
          </div>
        ),
        items: systemModules,
        renderCell: (moduleName) => (
          <CheckBox
            checked={formik.values.permissions[moduleName]?.delete || false}
            onChange={() => handleCellToggle(moduleName, "delete")}
          />
        ),
      },
    ];
  }, [formik.values.permissions]);

  return (
    <div className="flex flex-col items-start justify-center p-6 bg-gray-200 rounded-[24px]">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col gap-6">
        {/* Role Input Box Panel */}
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-bold text-gray-800 font-montserrat">
            Role Name
          </label>
          <div className="w-full max-w-[320px]">
            <Input
              name="roleName"
              placeholder="Staff Member"
              value={formik.values.roleName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full !bg-white !py-2.5 !px-4 !border-[#EAEAEA] !text-gray-400"
            />
          </div>
        </div>

        {/* Permissions Table Block Matrix */}
        <div className="flex flex-col gap-3">
          <h3 className="text-[14px] font-bold text-gray-800 font-montserrat">
            Permissions
          </h3>

          <GenericTable
            columns={tableColumns}
            showCheckbox={true}
            selectedRows={computedSelectedRows} // Dynamically derived Set of row indices
            onRowSelect={handleRowSelectToggle} // Triggers horizontal select/unselect for whole row module
            onSelectAll={handleSelectAllToggle} // Triggers total matrix select/unselect global status
            maxHeight="250px"
            showFooter={true}
            headerIcon={false}
            totalItems={105}
            itemsPerPage={11}
          />
        </div>
      </form>
    </div>
  );
};

export default PermissionsConfigView;
