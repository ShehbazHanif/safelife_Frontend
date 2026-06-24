import { useState, useMemo } from "react";
import PageHeader from "../../components/common/PageHeader";
import plusIcon from "../../assets/Plus.svg";
import { SearchAndFilter } from "../../components/common/SearchAndFilter";
import TaskWidgets from "../../components/ui/TaskWidgets";
import TaskModel from "../../components/ui/TaskModel";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../../components/common/CustomPagination";
import avatar from "../../assets/avatar 1.png";

const Task = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();

  // Tasks dataset - each object contains its own hardcoded layout count value
  const tasks = [
    {
      id: 1,
      status: "Open",
      priority: "Normal",
      title: "Set an appointment with Dr. Asad",
      date: "Dec 14 2025",
      avatar: avatar,
      count: "5",
      assignees: [
        {
          name: "Laura Olmos",
          avatar: avatar,
        },
        {
          name: "Laura Olmos",
          avatar: avatar,
        },
      ],
    },
    {
      id: 2,
      status: "In Progress",
      priority: "High",
      title: "Follow up with patient",
      date: "Dec 15 2025",
      avatar: avatar,
      count: "3",
    },
    {
      id: 3,
      status: "Resolved",
      priority: "Normal",
      title: "Complete medical records",
      date: "Dec 16 2025",
      avatar: avatar,
      count: "4",
    },
    {
      id: 4,
      status: "Open",
      priority: "High",
      title: "Send prescription reminder",
      date: "Dec 17 2025",
      avatar: avatar,
      count: "5",
    },
    {
      id: 5,
      status: "Open",
      priority: "Normal",
      title: "Set an appointment with Dr. Asad",
      date: "Dec 14 2025",
      avatar: avatar,
      count: "5",
    },
    {
      id: 6,
      status: "In Progress",
      priority: "High",
      title: "Follow up with patient",
      date: "Dec 15 2025",
      avatar: avatar,
      count: "3",
    },
    {
      id: 7,
      status: "Resolved",
      priority: "Normal",
      title: "Complete medical records",
      date: "Dec 16 2025",
      avatar: avatar,
      count: "4",
    },
    {
      id: 8,
      status: "Open",
      priority: "High",
      title: "Send prescription reminder",
      date: "Dec 17 2025",
      avatar: avatar,
      count: "5",
    },
    {
      id: 9,
      status: "Open",
      priority: "Normal",
      title: "Set an appointment with Dr. Asad",
      date: "Dec 14 2025",
      avatar: avatar,
      count: "5",
    },
    {
      id: 10,
      status: "In Progress",
      priority: "High",
      title: "Follow up with patient",
      date: "Dec 15 2025",
      avatar: avatar,
      count: "3",
    },
    {
      id: 11,
      status: "Resolved",
      priority: "Normal",
      title: "Complete medical records",
      date: "Dec 16 2025",
      avatar: avatar,
      count: "4",
    },
    {
      id: 12,
      status: "Open",
      priority: "High",
      title: "Send prescription reminder",
      date: "Dec 17 2025",
      avatar: avatar,
      count: "7",
    },
  ];

  const filterOptions = [
    { label: "Open", value: "Open" },
    { label: "In Progress", value: "In Progress" },
    { label: "Resolved", value: "Resolved" },
  ];

  const ITEMS_PER_PAGE = 10;

  // Filter tasks based on Search AND Filter Dropdown selections
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const matchesFilter = filterValue ? task.status === filterValue : true;
      return matchesSearch && matchesFilter;
    });
  }, [searchValue, filterValue]);

  const TOTAL_ITEMS = filteredTasks.length;
  const pageCount = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

  // Slices array based on active pagination markers
  const displayedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredTasks.slice(startIndex, endIndex);
  }, [currentPage, filteredTasks]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleTaskClick = (task) => {
    console.log("handleTaskClick called with task:", task);
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log("handleCloseModal called");
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  console.log("Task component - handleTaskClick function:", handleTaskClick);

  const actions = [
    {
      label: "Create Task",
      variant: "primary",
      onClick: () => navigate("/task/create"),
      startIcon: <img src={plusIcon} alt="" className="w-4 h-4" />,
    },
  ];

  return (
    <div className="flex h-full px-2 pb-4 flex-col items-start gap-4 self-stretch overflow-hidden">
      <PageHeader
        title="Tasks"
        actions={actions}
        rightActions={
          <SearchAndFilter
            filterOptions={filterOptions}
            searchValue={searchValue}
            onSearchChange={(e) => {
              setSearchValue(e.target.value);
              setCurrentPage(1);
            }}
            filterValue={filterValue}
            onFilterChange={(value) => {
              const actualValue =
                value && value.target ? value.target.value : value;
              setFilterValue(actualValue);
              setCurrentPage(1);
            }}
          />
        }
      />

      <div className="w-full overflow-y-auto flex-1">
        <TaskWidgets
          displayedTasks={displayedTasks}
          onTaskClick={handleTaskClick}
        />
      </div>

      {pageCount > 1 && (
        <div className="w-full flex justify-center mt-2">
          <CustomPagination
            count={pageCount}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      )}

      <TaskModel
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        task={selectedTask}
      />
    </div>
  );
};

export default Task;
