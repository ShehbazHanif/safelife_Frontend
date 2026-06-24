import plusIcon from "../../assets/Plus.svg";
import GenericTable from "../../components/common/GenericTable";
import PageHeader from "../../components/common/PageHeader";
import NumberModel from "../../components/ui/NumberModel";
import { pages } from "../../constants/Patient/pages";
import { useState } from "react";
const Number = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNumbers, setSelectedNumbers] = useState(new Set());
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
  const columns = [
    {
      id: "number",
      label: "Numbers",
      items: phoneNumbers,
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

  const actions = [
    {
      label: "Buy Number",
      variant: "primary",
      onClick: () => setIsModalOpen(true),
      startIcon: <img src={plusIcon} alt="" className="w-4 h-4" />,
    },
  ];
  return (
    <div className="flex h-full px-2 pb-4 flex-col items-start gap-4 self-stretch">
      <PageHeader title="Number" actions={actions} />
      <NumberModel isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <GenericTable
        columns={columns}
        selectedRows={selectedNumbers}
        onRowSelect={handleRowSelect}
        onSelectAll={handleSelectAll}
        pages={pages}
        headerIcon={false}
        maxheight="h-[400px]"
      />
    </div>
  );
};

export default Number;
