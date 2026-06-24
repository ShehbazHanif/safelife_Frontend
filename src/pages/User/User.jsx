import { useState, useMemo } from "react";
import PageHeader from "../../components/common/PageHeader";
import plusIcon from "../../assets/Plus.svg";
import { SearchAndFilter } from "../../components/common/SearchAndFilter";
import { useNavigate } from "react-router-dom";
import GenericTable from "../../components/common/GenericTable";
import UserModel from "../../components/ui/UserModel";

const User = () => {
  const [activeTab, setActiveTab] = useState("User");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [selectedRoles, setSelectedRoles] = useState(new Set());
  const navigate = useNavigate();

  const filterOptions = useMemo(() => {
    if (activeTab === "User") {
      return [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ];
    }
    return [
      { label: "Admin Roles", value: "Admin" },
      { label: "Clinical Roles", value: "Clinical" },
    ];
  }, [activeTab]);

  const users = useMemo(
    () => [
      { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        status: "Inactive",
      },
      {
        id: 3,
        name: "Robert Downey",
        email: "robert@example.com",
        status: "Active",
      },
    ],
    [],
  );

  const rolesAndPermissions = useMemo(
    () => [
      {
        id: 1,
        role: "Clinician",
        perms:
          "View Contacts, Edit Contacts, Edit Users, Add Users, View Contacts, Edit Contacts, Edit Users, Add Users",
        overflowCount: 9,
        status: "Active",
        type: "Clinical",
      },
      {
        id: 2,
        role: "Staff Member",
        perms:
          "View Contacts, Edit Contacts, Edit Users, Add Users, View Contacts, Edit Contacts, Edit Users, Add Users",
        overflowCount: 9,
        status: "Active",
        type: "Clinical",
      },
      {
        id: 1,
        role: "Clinician",
        perms:
          "View Contacts, Edit Contacts, Edit Users, Add Users, View Contacts, Edit Contacts, Edit Users, Add Users",
        overflowCount: 9,
        status: "Active",
        type: "Clinical",
      },
      {
        id: 2,
        role: "Staff Member",
        perms:
          "View Contacts, Edit Contacts, Edit Users, Add Users, View Contacts, Edit Contacts, Edit Users, Add Users",
        overflowCount: 9,
        status: "Active",
        type: "Clinical",
      },
      {
        id: 1,
        role: "Clinician",
        perms:
          "View Contacts, Edit Contacts, Edit Users, Add Users, View Contacts, Edit Contacts, Edit Users, Add Users",
        overflowCount: 9,
        status: "Active",
        type: "Clinical",
      },
      {
        id: 2,
        role: "Staff Member",
        perms:
          "View Contacts, Edit Contacts, Edit Users, Add Users, View Contacts, Edit Contacts, Edit Users, Add Users",
        overflowCount: 9,
        status: "Active",
        type: "Clinical",
      },
      {
        id: 1,
        role: "Clinician",
        perms:
          "View Contacts, Edit Contacts, Edit Users, Add Users, View Contacts, Edit Contacts, Edit Users, Add Users",
        overflowCount: 9,
        status: "Active",
        type: "Clinical",
      },
      {
        id: 2,
        role: "Staff Member",
        perms:
          "View Contacts, Edit Contacts, Edit Users, Add Users, View Contacts, Edit Contacts, Edit Users, Add Users",
        overflowCount: 9,
        status: "Active",
        type: "Clinical",
      },
      {
        id: 1,
        role: "Clinician",
        perms:
          "View Contacts, Edit Contacts, Edit Users, Add Users, View Contacts, Edit Contacts, Edit Users, Add Users",
        overflowCount: 9,
        status: "Active",
        type: "Clinical",
      },
      {
        id: 2,
        role: "Staff Member",
        perms:
          "View Contacts, Edit Contacts, Edit Users, Add Users, View Contacts, Edit Contacts, Edit Users, Add Users",
        overflowCount: 9,
        status: "Active",
        type: "Clinical",
      },
      {
        id: 1,
        role: "Clinician",
        perms:
          "View Contacts, Edit Contacts, Edit Users, Add Users, View Contacts, Edit Contacts, Edit Users, Add Users",
        overflowCount: 9,
        status: "Active",
        type: "Clinical",
      },
      {
        id: 2,
        role: "Staff Member",
        perms:
          "View Contacts, Edit Contacts, Edit Users, Add Users, View Contacts, Edit Contacts, Edit Users, Add Users",
        overflowCount: 9,
        status: "Active",
        type: "Clinical",
      },
    ],
    [],
  );

  const filteredData = useMemo(() => {
    if (activeTab === "User") {
      return users.filter((user) => {
        const matchesSearch = user.name
          .toLowerCase()
          .includes(searchValue.toLowerCase());
        const matchesFilter = filterValue ? user.status === filterValue : true;
        return matchesSearch && matchesFilter;
      });
    } else {
      return rolesAndPermissions.filter((item) => {
        const matchesSearch =
          item.role.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.perms.toLowerCase().includes(searchValue.toLowerCase());
        const matchesFilter = filterValue ? item.type === filterValue : true;
        return matchesSearch && matchesFilter;
      });
    }
  }, [activeTab, users, rolesAndPermissions, searchValue, filterValue]);

  const columns = useMemo(() => {
    if (activeTab === "User") {
      return [
        {
          id: "name",
          label: "Name",
          width: "240px",
          items: filteredData.map((u) => u.name),
        },
        {
          id: "email",
          label: "Email",
          width: "240px",
          items: filteredData.map((u) => u.email),
        },
        {
          id: "status",
          label: "Status",
          width: "140px",
          items: filteredData.map((u) => u.status),
        },
      ];
    } else {
      return [
        {
          id: "name_permissions",
          label: "Name/Permissions",
          width: "550px",
          items: filteredData,
          renderCell: (item) => (
            <div className="flex flex-col items-start justify-center h-full w-full max-w-[520px] py-2">
              <span className="text-sm  font-montserrat text-gray-800 capitalize">
                {item.role}
              </span>
              <div className="flex items-center gap-2 w-full mt-0.5">
                <span className="text-[12px] text-gray-800  truncate max-w-[420px] block">
                  {item.perms}
                </span>
                {item.overflowCount > 0 && (
                  <span className="flex items-center justify-center bg-[#CBF4F1] text-[#3CAFAA] font-montserrat text-xs h-[15px] px-1.5 rounded-full flex-shrink-0">
                    +{item.overflowCount}
                  </span>
                )}
              </div>
            </div>
          ),
        },
        {
          id: "status",
          label: "Status",
          width: "160px",
          items: filteredData.map((r) => r.status),
          renderCell: (status) => (
            <span className="px-3 py-0.5 text-[12px] font-semibold text-white-100 bg-[#48805F] rounded-full">
              {status}
            </span>
          ),
        },
      ];
    }
  }, [activeTab, filteredData]);

  const tableActions = useMemo(() => {
    return [
      {
        label: "View",
        icon: (
          <svg
            className="w-5 h-5 text-gray-500 hover:text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        ),
        onClick: (rowIndex) =>
          console.log("Viewing item:", filteredData[rowIndex]),
      },
      {
        label: "Edit",
        icon: (
          <svg
            className="w-5 h-5 text-gray-500 hover:text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        ),
        onClick: (rowIndex) =>
          console.log("Editing item:", filteredData[rowIndex]),
      },
      {
        label: "Delete",
        icon: (
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
        ),
        onClick: (rowIndex) => console.log("Deleting row index:", rowIndex),
      },
    ];
  }, [filteredData]);

  const headerActions = [
    {
      label: activeTab === "User" ? "Create User" : "Create Role",
      variant: "primary",
      onClick: () => {
        if (activeTab === "User") {
          setIsModalOpen(true);
        } else {
          navigate("/user/role");
        }
      },
      startIcon: <img src={plusIcon} alt="" className="w-4 h-4" />,
    },
  ];

  const handleRowSelect = (index) => {
    const currentSet = activeTab === "User" ? selectedUsers : selectedRoles;
    const setter = activeTab === "User" ? setSelectedUsers : setSelectedRoles;
    const newSelected = new Set(currentSet);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setter(newSelected);
  };

  const handleSelectAll = (isSelectedAll) => {
    const setter = activeTab === "User" ? setSelectedUsers : setSelectedRoles;
    if (isSelectedAll) {
      const allIndices = new Set(filteredData.map((_, i) => i));
      setter(allIndices);
    } else {
      setter(new Set());
    }
  };

  return (
    <div className="flex h-full px-2 pb-4 flex-col items-start gap-4 self-stretch overflow-hidden">
      <PageHeader title="User Management" />

      {/* Tabs */}
      <div className="flex items-center gap-[24px]">
        {["User", "Roles And Permissions"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setSearchValue("");
              setFilterValue("");
            }}
            className={`pb-2 px-1 text-center font-['Montserrat'] text-base   ${
              activeTab === tab
                ? "text-[#004A68] border-b-[3px] border-[#004A68]"
                : "text-gray-700 text-xb"
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Filters and Search */}
      <PageHeader
        actions={headerActions}
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

      <UserModel isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Table */}
      <div className="h-full w-full overflow-y-auto">
        <GenericTable
          columns={columns}
          actions={tableActions}
          selectedRows={activeTab === "User" ? selectedUsers : selectedRoles}
          onRowSelect={handleRowSelect}
          onSelectAll={handleSelectAll}
          showFooter={true}
          maxHeight="420px"
          page
        />
      </div>
    </div>
  );
};

export default User;
