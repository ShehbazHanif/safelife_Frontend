import React, { useState } from "react";
import Input from "../common/Input";
import GenericTable from "../common/GenericTable";
import searchIcon from "../../assets/search.svg";
const CampaignContact = () => {
  const [selectedNumbers, setSelectedNumbers] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const contacts = [
    {
      FirstName: "John",
      LastName: "Doe",
      PhoneNumber: "+12542673372",
      Email: "john.doe@example.com",
    },
    {
      FirstName: "John",
      LastName: "Doe",
      PhoneNumber: "+12542673372",
      Email: "john.doe@example.com",
    },
    {
      FirstName: "John",
      LastName: "Doe",
      PhoneNumber: "+12542673372",
      Email: "john.doe@example.com",
    },
    {
      FirstName: "John",
      LastName: "Doe",
      PhoneNumber: "+12542673372",
      Email: "john.doe@example.com",
    },
    {
      FirstName: "John",
      LastName: "Doe",
      PhoneNumber: "+12542673372",
      Email: "john.doe@example.com",
    },
    {
      FirstName: "John",
      LastName: "Doe",
      PhoneNumber: "+12542673372",
      Email: "john.doe@example.com",
    },
    {
      FirstName: "John",
      LastName: "Doe",
      PhoneNumber: "+12542673372",
      Email: "john.doe@example.com",
    },
    {
      FirstName: "John",
      LastName: "Doe",
      PhoneNumber: "+12542673372",
      Email: "john.doe@example.com",
    },
    {
      FirstName: "John",
      LastName: "Doe",
      PhoneNumber: "+12542673372",
      Email: "john.doe@example.com",
    },
    {
      FirstName: "John",
      LastName: "Doe",
      PhoneNumber: "+12542673372",
      Email: "john.doe@example.com",
    },
    {
      FirstName: "John",
      LastName: "Doe",
      PhoneNumber: "+12542673372",
      Email: "john.doe@example.com",
    },
    {
      FirstName: "John",
      LastName: "Doe",
      PhoneNumber: "+12542673372",
      Email: "john.doe@example.com",
    },
    {
      FirstName: "John",
      LastName: "Doe",
      PhoneNumber: "+12542673372",
      Email: "john.doe@example.com",
    },
    {
      FirstName: "John",
      LastName: "Doe",
      PhoneNumber: "+12542673372",
      Email: "john.doe@example.com",
    },
    {
      FirstName: "John",
      LastName: "Doe",
      PhoneNumber: "+12542673372",
      Email: "john.doe@example.com",
    },
    {
      FirstName: "John",
      LastName: "Doe",
      PhoneNumber: "+12542673372",
      Email: "john.doe@example.com",
    },
    {
      FirstName: "John",
      LastName: "Doe",
      PhoneNumber: "+12542673372",
      Email: "john.doe@example.com",
    },
    {
      FirstName: "John",
      LastName: "Doe",
      PhoneNumber: "+12542673372",
      Email: "john.doe@example.com",
    },
    {
      FirstName: "John",
      LastName: "Doe",
      PhoneNumber: "+12542673372",
      Email: "john.doe@example.com",
    },
    {
      FirstName: "John",
      LastName: "Doe",
      PhoneNumber: "+12542673372",
      Email: "john.doe@example.com",
    },
  ];

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.FirstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.LastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.PhoneNumber.includes(searchQuery) ||
      contact.Email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const columns = [
    {
      id: "FirstName",
      label: "First Name",
      items: filteredContacts.map((c) => c.FirstName),
    },
    {
      id: "LastName",
      label: "Last Name",
      items: filteredContacts.map((c) => c.LastName),
    },
    {
      id: "PhoneNumber",
      label: "Phone Number",
      items: filteredContacts.map((c) => c.PhoneNumber),
    },
    {
      id: "Email",
      label: "Email",
      items: filteredContacts.map((c) => c.Email),
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
  };

  const handleSelectAll = (selected) => {
    if (selected) {
      setSelectedNumbers(new Set(filteredContacts.map((_, i) => i)));
    } else {
      setSelectedNumbers(new Set());
    }
  };
  return (
    <div className="flex flex-col items-flex-start gap-6 self-stretch h-full overflow-hidden">
      {/* Phone Number Header */}
      <div className="flex justify-between items-center self-stretch mt-1 ">
        <div className="flex flex-col items-flex-start gap-1">
          <label className="text-gray-800 font-montserrat text-sm ">
            Phone Number
          </label>
          <p className="text-xs text-gray-400">
            The phone number which the agent selected will call from
          </p>
        </div>
        {/* Search Input */}
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

      {/* Phone Numbers Table */}
      <GenericTable
        columns={columns}
        showCheckbox={true}
        selectedRows={selectedNumbers}
        onRowSelect={handleRowSelect}
        onSelectAll={handleSelectAll}
        headerIcon={false}
        maxHeight="320px"
      />
    </div>
  );
};
export default CampaignContact;
