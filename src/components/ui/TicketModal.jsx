import { useState, useEffect, useRef, useCallback } from "react";
import { Modal } from "../common/Modal";
import CustomIconButton from "../common/CustomIconButton";
import CustomSelect from "../common/Select";
import Textfield from "../common/Input";
import CustomTextArea from "../common/CustomTextArea ";
import Snackbar from "../common/Snackbar";
import Button from "../common/Button";
import {
  ClockCountdown,
  Buildings,
  ArrowRight,
  Trash,
  User,
  Warning,
  X,
  ChatText,
  Flag,
  ListChecks,
} from "@phosphor-icons/react";
import avatar from "../../assets/avatar 1.png";
import apiService from "../../apiservices/ApiServices";
import { Box } from "@mui/material";

const EMPTY_FORM = {
  title: "",
  status: "open",
  priority: "normal",
  dueDate: "",
  description: "",
  callerPhoneNumber: "",
  patientPhoneNumber: "",
  patientName: "",
  patientDob: "",
  patientAddress: "",
  patientState: "",
  patientZipCode: "",
};

const PRIORITY_OPTIONS = [
  { value: "normal", label: "Normal", bg: "#E5E7EB", color: "#374151" },
  { value: "high", label: "High", bg: "#FEF3C7", color: "#92400E" },
  { value: "urgent", label: "Urgent", bg: "#FEE2E2", color: "#991B1B" },
];
// make a aviableDEpts array that filters out the assignedDepartments from the departments array

const DEFAULT_DEPARTMENT_OPTIONS = [
  { value: "cardiology", label: "Cardiology" },
  { value: "neurology", label: "Neurology" },
  { value: "oncology", label: "Oncology" },
  { value: "pediatrics", label: "Pediatrics" },
  { value: "radiology", label: "Radiology" },
  { value: "emergency", label: "Emergency" },
  { value: "orthopedics", label: "Orthopedics" },
  { value: "dermatology", label: "Dermatology" },
  { value: "gastroenterology", label: "Gastroenterology" },
  { value: "urology", label: "Urology" },
  { value: "ophthalmology", label: "Ophthalmology" },
  { value: "psychiatry", label: "Psychiatry" },
  { value: "endocrinology", label: "Endocrinology" },
];

const STATUS_CONFIG = {
  todo: { label: "Open", bg: "#F2F2F2", color: "#262626" },
  open: { label: "Open", bg: "#F2F2F2", color: "#262626" },
  in_progress: { label: "In Progress", bg: "#FEF9E5", color: "#854D0E" },
  done: { label: "Resolved", bg: "#C2F2D2", color: "#166534" },
  resolved: { label: "Resolved", bg: "#C2F2D2", color: "#166534" },
};

const TEXT_FIELDS = new Set([
  "title",
  "description",
  "callerPhoneNumber",
  "patientPhoneNumber",
  "patientName",
  "patientAddress",
  "patientState",
  "patientZipCode",
]);

const formatCommentTime = (val) => {
  if (!val) return "";
  const ms = Number(val);
  const date = isNaN(ms) ? new Date(val) : new Date(ms);
  if (isNaN(date.getTime())) return "";
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return isToday
    ? `Today - ${time}`
    : `${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${time}`;
};

const humanizeLogAction = (action) => {
  if (!action) return "Ticket updated";
  return action
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const parseLogObject = (val) => {
  if (!val) return null;
  if (typeof val === "object") return val;
  if (typeof val !== "string") return null;
  try {
    return JSON.parse(val);
  } catch {
    return null;
  }
};

const findLogValue = (source, keys) => {
  if (!source || typeof source !== "object") return "";

  for (const key of keys) {
    if (
      source[key] !== undefined &&
      source[key] !== null &&
      source[key] !== ""
    ) {
      return source[key];
    }
  }

  for (const value of Object.values(source)) {
    if (value && typeof value === "object") {
      const found = findLogValue(value, keys);
      if (found) return found;
    }
  }

  return "";
};

const formatActivityValue = (val) => {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "number" || typeof val === "boolean") return String(val);
  if (val.status) return val.status;
  if (val.name) return val.name;
  if (val.title) return val.title;
  if (val.content) return val.content;
  return "";
};

const formatStatusLabel = (status) => {
  const value = formatActivityValue(status);
  return STATUS_CONFIG[value]?.label || humanizeLogAction(value);
};

const getLogContent = (log) => {
  const action = (log.action || "").toLowerCase();
  const actionLabel = humanizeLogAction(log.action);
  const metadata = parseLogObject(log.metadata);
  const snapshot = parseLogObject(log.taskSnapshot);
  const message =
    log.message && log.message.toLowerCase() !== actionLabel.toLowerCase()
      ? log.message
      : "";

  if (action.includes("comment")) {
    const comment = formatActivityValue(
      findLogValue(metadata, [
        "comment",
        "commentText",
        "commentContent",
        "content",
        "text",
        "newComment",
      ]),
    );
    return comment
      ? `Comment: "${comment}"`
      : message || "A comment was added to this ticket.";
  }

  if (action.includes("status")) {
    const fromStatus = formatStatusLabel(
      findLogValue(metadata, [
        "fromStatus",
        "oldStatus",
        "previousStatus",
        "statusFrom",
        "from",
        "oldValue",
        "before",
      ]),
    );
    const toStatus = formatStatusLabel(
      findLogValue(metadata, [
        "toStatus",
        "newStatus",
        "currentStatus",
        "statusTo",
        "to",
        "newValue",
        "after",
      ]) ||
        snapshot?.status ||
        log.task?.status,
    );
    if (fromStatus && toStatus)
      return `Status changed from ${fromStatus} to ${toStatus}.`;
    if (toStatus) return `Status changed to ${toStatus}.`;
    return message || "The ticket status was changed.";
  }

  if (action.includes("priority")) {
    const fromPriority = formatActivityValue(
      findLogValue(metadata, [
        "fromPriority",
        "oldPriority",
        "previousPriority",
        "from",
        "oldValue",
      ]),
    );
    const toPriority = formatActivityValue(
      findLogValue(metadata, [
        "toPriority",
        "newPriority",
        "currentPriority",
        "to",
        "newValue",
      ]) || snapshot?.priority,
    );
    if (fromPriority && toPriority)
      return `Priority changed from ${humanizeLogAction(fromPriority)} to ${humanizeLogAction(toPriority)}.`;
    if (toPriority)
      return `Priority changed to ${humanizeLogAction(toPriority)}.`;
    return message || "The ticket priority was changed.";
  }

  if (action.includes("assign"))
    return message || "The ticket assignment was updated.";
  if (action.includes("delete")) return "An item was removed from this ticket.";
  if (action.includes("create")) return "This ticket was created.";

  return message || "Ticket activity was recorded.";
};

const toTicketForm = (ticket) => {
  // Normalize status to lowercase and replace spaces with hyphens
  const normalizeStatus = (status) => {
    if (!status) return "open";
    return status.toLowerCase().replace(/\s+/g, "_");
  };

  return {
    ...EMPTY_FORM,
    title: ticket?.title || "",
    status: normalizeStatus(ticket?.status),
    priority: ticket?.priority || "normal",
    dueDate: ticket?.dueDate,
    description: ticket?.description || "",
    callerPhoneNumber: ticket?.callerPhoneNumber || "",
    patientPhoneNumber: ticket?.patientPhoneNumber || "",
    patientName: ticket?.patientName || "",
    patientDob: ticket?.patientDob,
    patientAddress: ticket?.patientAddress || "",
    patientState: ticket?.patientState || "",
    patientZipCode: ticket?.patientZipCode || "",
  };
};

const InitialsAvatar = ({ name, sizeClass = "w-8 h-8" }) => {
  const initials = (name || "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      className={`${sizeClass} rounded-full bg-[#CFEFF6] flex items-center justify-center text-[10px] font-bold text-[#004A68] shrink-0`}>
      {initials}
    </div>
  );
};

const EditableComment = ({ initialText, onSave, onCancel }) => {
  const [text, setText] = useState(initialText);
  return (
    <div className="flex-1 flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSave(text);
          if (e.key === "Escape") onCancel();
        }}
        autoFocus
        className="flex-1 text-sm text-grey-800 border border-[#3CAFAA] rounded-lg px-3 py-2 outline-none"
      />
      <button
        type="button"
        onClick={() => onSave(text)}
        disabled={!text.trim()}
        className="px-3 py-1.5 rounded-lg bg-[#004A68] text-white text-xs font-medium disabled:opacity-40">
        Save
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="px-3 py-1.5 rounded-lg bg-grey-200 text-grey-700 text-xs font-medium">
        Cancel
      </button>
    </div>
  );
};

const TicketModal = ({
  mode = "create",
  open,
  onClose,
  ticket,
  onSubmit,
  onDelete,
}) => {
  const isEdit = mode === "edit";
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [assignedDepartments, setAssignedDepartments] = useState([]);
  const [departments, setDepartments] = useState(DEFAULT_DEPARTMENT_OPTIONS);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [message, setMessage] = useState("");
  const [deleteTicketModal, setDeleteTicketModal] = useState(false);
  const [deleteCommentModal, setDeleteCommentModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [activePanel, setActivePanel] = useState("comments");
  const [ticketLogs, setTicketLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [logsError, setLogsError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [validationErrors, setValidationErrors] = useState({});
  const debounceRef = useRef(null);
  // console.log("assignedDepartments in TicketModal:", assignedDepartments);
  const resetCreateState = () => {
    setFormData(EMPTY_FORM);
    setAssignedDepartments([]);
    setComments([]);
    setNewComment("");
    setMessage("");
    setActivePanel("comments");
    setTicketLogs([]);
    setLogsError("");
    setSnackbarOpen(false);
    setSnackbarMessage("");
    setSnackbarSeverity("error");
    setValidationErrors({});
  };

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        console.log("fetching departments");
        const response = await apiService.getDepartments();

        const normalizedDepartments = (response || []).map((department) => ({
          id: department?.id,
          value: department?.id,
          label: department?.name || department?.label,
          name: department?.name || department?.label,
        }));

        setDepartments(
          normalizedDepartments.length > 0
            ? normalizedDepartments
            : DEFAULT_DEPARTMENT_OPTIONS,
        );
      } catch (error) {
        console.error("Failed to fetch departments", error);
        if (isMounted) {
          setDepartments(DEFAULT_DEPARTMENT_OPTIONS);
        }
      }
    };

    if (open) {
      loadDepartments();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    if (isEdit && ticket) {
      setFormData(toTicketForm(ticket));
      console.log("ticket in TicketModal useEffect:", ticket);
      const assignees = ticket.assignedTo
        ? Array.isArray(ticket.assignedTo)
          ? ticket.assignedTo
          : [ticket.assignedTo]
        : [];
      console.log("assignees in TicketModal useEffect:", assignees);
      setAssignedDepartments(
        assignees.map((d) => ({ id: d.id, name: d.name })),
      );

      setComments(
        (ticket.comments || []).map((c) => ({
          id: c.id,
          author: c.author?.name || "System",
          text: c.content || c.text || "",
          time: formatCommentTime(c.createdAt),
        })),
      );
      setMessage("");
      setActivePanel("comments");
    } else {
      resetCreateState();
    }
  }, [open, isEdit, ticket]);

  const loadTicketLogs = useCallback(async () => {
    if (!isEdit || !ticket?.id) return;

    try {
      setLoadingLogs(true);
      setLogsError("");

      const response = await apiService.getTaskLogs(ticket.id, {
        page: 1,
        limit: 20,
      });

      setTicketLogs(response?.logs || []);
    } catch (err) {
      console.error("Failed to load ticket logs", err);
      setLogsError(err.message || "Failed to load activity");
      setTicketLogs([]);
    } finally {
      setLoadingLogs(false);
    }
  }, [isEdit, ticket?.id]);

  useEffect(() => {
    if (!open || !isEdit || !ticket?.id) return;
    loadTicketLogs();
  }, [open, isEdit, ticket?.id, loadTicketLogs]);

  useEffect(() => {
    if (!open && debounceRef.current) clearTimeout(debounceRef.current);
  }, [open]);
  console.log("formata data", formData.status);
  const statusStyle = STATUS_CONFIG[formData.status] || STATUS_CONFIG.open;

  // const submitNow = useCallback(
  //   async (updatedData, depts) => {
  //     if (isEdit && ticket && onSubmit) {
  //       const success = await onSubmit({
  //         ...ticket,
  //         ...updatedData,
  //         assignedTo: depts ?? assignedDepartments,
  //       });
  //       if (success) {
  //         await loadTicketLogs();
  //       }
  //     }
  //   },
  //   [isEdit, ticket, onSubmit, assignedDepartments, loadTicketLogs],
  // );
  const submitNow = useCallback(
    async (updatedData, depts) => {
      // Cancel any pending debounced save — this call already has the freshest data
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }

      if (isEdit && ticket && onSubmit) {
        const success = await onSubmit({
          ...ticket,
          ...updatedData,
          assignedTo: depts ?? assignedDepartments,
        });
        if (success) {
          await loadTicketLogs();
        }
      }
    },
    [isEdit, ticket, onSubmit, assignedDepartments, loadTicketLogs],
  );
  const submitDebounced = useCallback(
    (updatedData, depts) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        submitNow(updatedData, depts);
      }, 1000);
    },
    [submitNow],
  );

  const handleChange = (field, value) => {
    // console.log(`feild is :  and value is ${value}`);
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: "" }));
    }

    if (!isEdit) return;
    if (TEXT_FIELDS.has(field)) {
      submitDebounced(updated);
    } else {
      submitNow(updated);
    }
  };

  const availableDepts = departments.filter(
    (d) => !assignedDepartments.find((a) => a.id === d.id),
  );

  // const handleAddDepartment = (e) => {
  //   const selectedValue = e.target.value;
  //   const selectedDepartment = departments.find(
  //     (d) => String(d.id ?? d.value) === String(selectedValue),
  //   );

  //   setAssignedDepartments((prev) => [
  //     ...prev,
  //     {
  //       id: selectedValue,
  //       name:
  //         selectedDepartment?.name ||
  //         selectedDepartment?.label ||
  //         selectedValue,
  //     },
  //   ]);
  // };
  const handleAddDepartment = (e) => {
    const selectedValue = e.target.value;
    const selectedDepartment = departments.find(
      (d) => String(d.id ?? d.value) === String(selectedValue),
    );

    const newDept = {
      id: selectedValue,
      name:
        selectedDepartment?.name || selectedDepartment?.label || selectedValue,
    };

    const updated = [...assignedDepartments, newDept];
    setAssignedDepartments(updated);
    if (isEdit) submitNow(formData, updated);
  };
  const handleRemoveDepartment = (id) => {
    const updated = assignedDepartments.filter((d) => d.id !== id);
    setAssignedDepartments(updated);
    if (isEdit) submitNow(formData, updated);
  };

  const handleClose = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!isEdit) resetCreateState();
    onClose();
  };

  const handleCreateSubmit = async () => {
    const errors = {
      title: formData.title.trim() ? "" : "Title is required",
      dueDate: formData.dueDate ? "" : "Due date is required",
    };
    const hasErrors = Object.values(errors).some(Boolean);

    if (hasErrors) {
      setValidationErrors(errors);
      setSnackbarSeverity("error");
      setSnackbarMessage("Please fill in required fields");
      setSnackbarOpen(true);
      return;
    }

    const normalizedPayload = {
      ...formData,
      assignedTo: assignedDepartments.map((dept) => dept.id).filter(Boolean),
      comments: comments.map((comment) => ({
        id: comment.id,
        text: comment.text,
        content: comment.text,
      })),
    };

    const success = await onSubmit?.(normalizedPayload);
    if (success) {
      setSnackbarSeverity("success");
      setSnackbarMessage("Task created successfully");
      setSnackbarOpen(true);
      resetCreateState();
      return;
    }

    setSnackbarSeverity("error");
    setSnackbarMessage("Failed to create task");
    setSnackbarOpen(true);
  };

  const handleAddDraftComment = () => {
    const text = newComment.trim();
    if (!text) return;
    setComments((prev) => [...prev, { id: Date.now(), text, editing: false }]);
    setNewComment("");
  };

  const handleEditDraftComment = (id, text) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, text, editing: false } : c)),
    );
  };

  const toggleDraftCommentEdit = (id) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, editing: !c.editing } : c)),
    );
  };

  const handleConfirmDeleteTicket = async () => {
    if (!ticket?.id) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Unable to archive this ticket");
      setSnackbarOpen(true);
      return;
    }

    try {
      setDeleteTicketModal(false);
      const success = await onDelete?.(ticket.id);

      if (success) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Ticket archived successfully");
        setSnackbarOpen(true);
        onClose?.();
        return;
      }

      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to archive ticket");
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Failed to archive ticket", err);
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to archive ticket");
      setSnackbarOpen(true);
    }
  };

  const handleDeleteCommentClick = (comment) => {
    if (!isEdit) {
      setComments((prev) => prev.filter((c) => c.id !== comment.id));
      return;
    }
    setCommentToDelete(comment);
    setDeleteCommentModal(true);
  };

  const handleConfirmDeleteComment = async () => {
    if (!commentToDelete) return;
    const currentUser = (() => {
      try {
        return JSON.parse(localStorage.getItem("user") || "{}");
      } catch {
        return {};
      }
    })();
    const actorId = currentUser?.userId || currentUser?.id;
    if (!actorId) {
      console.error("Unable to identify logged-in user");
      return;
    }

    try {
      setComments((prev) => prev.filter((c) => c.id !== commentToDelete.id));
      setDeleteCommentModal(false);
      setCommentToDelete(null);
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  const handleSendMessage = async () => {
    const text = message.trim();
    if (!text) return;

    const currentUser = (() => {
      try {
        return JSON.parse(localStorage.getItem("user") || "{}");
      } catch {
        return {};
      }
    })();
    const userId = currentUser?.userId || currentUser?.id;
    const tempId = `temp-${Date.now()}`;
    const optimistic = {
      id: tempId,
      author: currentUser?.name || "You",
      text,
      time: formatCommentTime(Date.now()),
    };

    setComments((prev) => [...prev, optimistic]);
    setMessage("");

    try {
      const updated = await apiService.addComment(ticket.id, userId, text);
      const real = updated.comments[updated.comments.length - 1];
      setComments((prev) =>
        prev.map((c) =>
          c.id === tempId
            ? {
                id: real.id,
                author: real.author?.name || "You",
                text: real.content,
                time: formatCommentTime(real.createdAt),
              }
            : c,
        ),
      );
      await loadTicketLogs();
    } catch (err) {
      console.error("Failed to add comment", err);
      setComments((prev) => prev.filter((c) => c.id !== tempId));
      setMessage(text);
    }
  };

  const modalFooter = isEdit
    ? {
        hideFooter: true,
        footerReplacement: (
          <div className="w-full flex items-center justify-between gap-3">
            {/* {onDelete && ( */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setDeleteTicketModal(true);
              }}
              className="px-4 py-2 rounded-lg bg-[#004A68] hover:bg-[#003350] text-white-100 font-medium transition-colors shrink-0">
              Archive
            </button>

            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Write a comment..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="w-full px-4 py-3 pr-14 rounded-lg border border-gray-600 outline-none focus:border-[#3CAFAA] transition-colors"
              />
              <div className="absolute right-3 top-[10px]">
                <CustomIconButton
                  backgroundColor="#004A68"
                  icon={<ArrowRight size={20} color="#fff" />}
                  onClick={handleSendMessage}
                />
              </div>
            </div>
          </div>
        ),
      }
    : {
        onSave: handleCreateSubmit,
        onCancel: handleClose,
        submitLabel: "Create Ticket",
      };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      />

      <Modal
        isOpen={deleteTicketModal}
        onClose={() => setDeleteTicketModal(false)}
        title="Archive Ticket"
        width="480px"
        zIndex={1500}
        footer={
          <Box sx={{ display: "flex", gap: "8px" }}>
            <Button
              type="button"
              onClick={() => setDeleteTicketModal(false)}
              className="!bg-[#F2F2F2] !text-[#737373] hover:!bg-[#E5E7EB] h-10 px-4"
              size="md">
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConfirmDeleteTicket}
              className="!bg-[#004A68] !text-white hover:!bg-[#3CAFAA] h-10 px-4"
              size="md">
              Archive
            </Button>
          </Box>
        }>
        <div className="px-6 py-6 flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#CFEAF8] flex items-center justify-center">
            <Warning size={40} weight="fill" className="text-[#004A68]" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-grey-800 mb-2">
              Are you sure?
            </h3>
            <p className="text-grey-700 text-sm">
              You are about to archive ticket{" "}
              <span className="font-semibold text-[#004A68]">
                {ticket?.title}
              </span>
              .
            </p>
            <p className="text-grey-600 text-sm mt-2">
              You can restore archived tickets from the archived bucket.
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={deleteCommentModal}
        onClose={() => {
          setDeleteCommentModal(false);
          setCommentToDelete(null);
        }}
        title="Delete Comment"
        cancelLabel="Cancel"
        width="480px"
        footer={
          <Box sx={{ display: "flex", gap: "8px" }}>
            <Button
              type="button"
              onClick={() => {
                setDeleteCommentModal(false);
                setCommentToDelete(null);
              }}
              className="!bg-[#F2F2F2] !text-[#737373] hover:!bg-[#E5E7EB] h-10 px-4"
              size="md">
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConfirmDeleteComment}
              className="!bg-[#004A68] !text-white hover:!bg-[#3CAFAA] h-10 px-4"
              size="md">
              Delete
            </Button>
          </Box>
        }

        // zIndex={1500}
      >
        <div className="px-6 py-6 flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <Warning size={40} weight="fill" className="text-red-600" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-grey-800 mb-2">
              Delete this comment?
            </h3>
            <p className="text-grey-600 text-sm mt-1">
              This action cannot be undone.
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={open}
        onClose={handleClose}
        title={
          <div
            className="flex px-4 py-2 items-center gap-1 rounded-full"
            style={{ backgroundColor: statusStyle.bg }}>
            <span
              className="text-sm font-semibold"
              style={{ color: statusStyle.color }}>
              {statusStyle.label}
            </span>
          </div>
        }
        // width="1220px"
        // height="90vh"
        maxWidth="94vw"
        // bodyClassName="overflow-hidden flex-1 min-h-0"
        {...modalFooter}>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] bg-white h-full min-h-0 overflow-hidden">
          <div
            className={`flex min-h-0 flex-col ${isEdit ? "gap-5" : "gap-6"} px-6 pt-5 pb-8 overflow-y-auto`}>
            <div className="flex flex-col gap-3">
              <Textfield
                label="Title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder={isEdit ? "Ticket title" : "Enter ticket title"}
                labelColor="#262626"
                size={isEdit ? undefined : "small"}
                sx={
                  validationErrors.title
                    ? {
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "#DC2626",
                          },
                        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "#DC2626 !important",
                          },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "#DC2626 !important",
                          },
                      }
                    : {}
                }
              />
              {validationErrors.title && (
                <p className="m-0 -mt-1 text-xs font-medium text-red-600">
                  {validationErrors.title}
                </p>
              )}
              <CustomTextArea
                label="Description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Add a description..."
                minRows={7}
                maxRows={7}
                minHeight="150px"
                labelColor="#262626"
              />
            </div>
            <div className="w-full flex items-center justify-between mt-4">
              <div className="flex items-center gap-3 ">
                <div
                  className={`flex items-center gap-2 shrink-0 ${isEdit ? "w-[90px]" : ""}`}>
                  <Flag size={15} color="#A3A3A3" weight="fill" />
                  <span className="text-grey-800 text-sm font-medium">
                    Priority
                  </span>
                </div>
                <CustomSelect
                  placeholder="Select priority"
                  options={PRIORITY_OPTIONS.map((option) => ({
                    label: option.label,
                    value: option.value,
                  }))}
                  value={formData.priority}
                  onChange={(event) =>
                    handleChange("priority", event.target.value)
                  }
                  displayEmpty
                  sx={{
                    maxWidth: 220,
                    padding: 0,
                    minHeight: 30,
                    borderRadius: 2,
                  }}
                />
              </div>
              <div
                className={
                  isEdit ? "flex items-center gap-3" : "flex items-center gap-4"
                }>
                <div
                  className={`flex items-center gap-2 shrink-0 ${isEdit ? "w-[90px]" : "min-w-[120px]"}`}>
                  <ClockCountdown
                    size={isEdit ? 15 : 16}
                    color="#A3A3A3"
                    weight="fill"
                  />
                  <span className="text-grey-800 text-sm font-medium whitespace-nowrap">
                    Due Date
                  </span>
                </div>
                <div className="flex flex-col gap-1  rounded-[16px]">
                  <input
                    type="date"
                    value={formData.dueDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => handleChange("dueDate", e.target.value)}
                    className={`text-grey-700 text-sm font-medium border border-[#D8DCDE] rounded-lg px-3 py-1.5 outline-none focus:border-[#3CAFAA] ${
                      validationErrors.dueDate
                        ? "border-red-600 focus:border-red-600"
                        : "border-grey-300"
                    }`}
                  />
                  {validationErrors.dueDate && (
                    <p className="m-0 text-xs font-medium text-red-600">
                      {validationErrors.dueDate}
                    </p>
                  )}
                </div>
              </div>

              {isEdit && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 shrink-0 ">
                    <User color="#A3A3A3" />
                    <span className="text-grey-800 text-sm font-medium whitespace-nowrap">
                      Created by
                    </span>
                  </div>
                  {ticket?.createdBy ? (
                    <div className="flex items-center gap-2">
                      <InitialsAvatar
                        name={ticket.createdBy.name}
                        sizeClass="w-6 h-6"
                      />
                      <span className="text-grey-700 text-sm font-medium">
                        {ticket.createdBy.name}
                      </span>
                    </div>
                  ) : (
                    <span className="text-grey-700 text-sm font-medium">
                      System
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div
                  className={`flex items-center gap-2 shrink-0 ${isEdit ? "w-[90px]" : "min-w-[120px]"}`}>
                  <Buildings
                    size={isEdit ? 15 : 16}
                    color="#A3A3A3"
                    weight={isEdit ? undefined : "fill"}
                  />
                  <span className="text-grey-800 text-sm font-medium">
                    {isEdit ? "Assigned" : "Assignees"}
                  </span>
                </div>
                {departments.length > 0 && (
                  <CustomSelect
                    placeholder="+ Add department"
                    options={departments.map((option) => ({
                      value: option.id ?? option.value,
                      label: option.label ?? option.name,
                    }))}
                    value=""
                    onChange={handleAddDepartment}
                    displayEmpty
                    sx={{
                      maxWidth: 220,
                      padding: 0,
                      minHeight: 40,
                      borderRadius: 2,
                    }}
                  />
                )}
              </div>
              {assignedDepartments.length > 0 && (
                <div
                  className={`flex min-h-11 w-full max-w-[640px] items-center gap-2 flex-wrap rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 ${isEdit ? "ml-[102px]" : "ml-[132px]"}`}>
                  {assignedDepartments.map((dept) => (
                    <div
                      key={dept.id}
                      className="flex px-2 py-1 items-center gap-1 rounded-full bg-blue-100">
                      <span className="text-blue-800 text-xs font-medium">
                        {dept.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDepartment(dept.id)}
                        className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors">
                        <X size={12} color="#1e40af" weight="bold" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-grey-800 text-xs font-medium">
                  Patient Name
                </span>
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(e) => handleChange("patientName", e.target.value)}
                  placeholder="e.g. John Doe"
                  className="text-grey-800 text-sm border border-gray-600 rounded-lg px-3 py-1.5 outline-none focus:border-[#3CAFAA]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-grey-800 text-xs font-medium">
                  Patient Date of Birth
                </span>
                <input
                  type="date"
                  value={formData.patientDob}
                  onChange={(e) => handleChange("patientDob", e.target.value)}
                  className="text-grey-700 text-sm border border-gray-600 rounded-lg px-3 py-1.5 outline-none focus:border-[#3CAFAA]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-grey-800 text-xs font-medium">
                  Caller Phone Number
                </span>
                <input
                  type="tel"
                  value={formData.callerPhoneNumber}
                  onChange={(e) =>
                    handleChange("callerPhoneNumber", e.target.value)
                  }
                  placeholder="+1 (555) 000-0000"
                  className="text-grey-800 text-sm border border-gray-600 rounded-lg px-3 py-1.5 outline-none focus:border-[#3CAFAA]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-grey-800 text-xs font-medium">
                  Patient Phone Number
                </span>
                <input
                  type="tel"
                  value={formData.patientPhoneNumber}
                  onChange={(e) =>
                    handleChange("patientPhoneNumber", e.target.value)
                  }
                  placeholder="+1 (555) 000-0000"
                  className="text-grey-800 text-sm border border-gray-600 rounded-lg px-3 py-1.5 outline-none focus:border-[#3CAFAA]"
                />
              </div>
              <div className="flex flex-col gap-1 col-span-2">
                <span className="text-grey-800 text-xs font-medium">
                  Patient Address
                </span>
                <input
                  type="text"
                  value={formData.patientAddress}
                  onChange={(e) =>
                    handleChange("patientAddress", e.target.value)
                  }
                  placeholder="Enter patient address"
                  className="text-grey-800 text-sm border border-gray-600 rounded-lg px-3 py-1.5 outline-none focus:border-[#3CAFAA]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-grey-800 text-xs font-medium">State</span>
                <input
                  type="text"
                  value={formData.patientState}
                  onChange={(e) => handleChange("patientState", e.target.value)}
                  placeholder="e.g. IL"
                  className="text-grey-800 text-sm border border-gray-600 rounded-lg px-3 py-1.5 outline-none focus:border-[#3CAFAA]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-grey-800 text-xs font-medium">
                  ZIP Code
                </span>
                <input
                  type="text"
                  value={formData.patientZipCode}
                  onChange={(e) =>
                    handleChange("patientZipCode", e.target.value)
                  }
                  placeholder="e.g. 60601"
                  className="text-grey-800 text-sm border border-gray-600 rounded-lg px-3 py-1.5 outline-none focus:border-[#3CAFAA]"
                />
              </div>
            </div>
          </div>

          <aside className="flex min-h-0 flex-col overflow-hidden border-t lg:border-t-0 lg:border-l border-gray-600 bg-gray-100">
            <div className="shrink-0 px-5 py-4 border-b border-gray-600 bg-white">
              {isEdit ? (
                <div className="grid grid-cols-2 gap-1 rounded-lg bg-gray-200 p-1">
                  <button
                    type="button"
                    onClick={() => setActivePanel("comments")}
                    className={`flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                      activePanel === "comments"
                        ? "bg-white-100 text-gray-800 shadow-sm"
                        : "text-grey-600 hover:text-grey-800"
                    }`}>
                    <ChatText size={16} weight="fill" />
                    Comments
                    {comments.length > 0 && (
                      <span className="text-xs font-medium text-grey-500">
                        ({comments.length})
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePanel("activity")}
                    className={`flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                      activePanel === "activity"
                        ? "bg-white-100 text-grey-800 shadow-sm"
                        : "text-grey-600 hover:text-grey-800"
                    }`}>
                    <ListChecks size={16} weight="fill" />
                    Activity
                    {ticketLogs.length > 0 && (
                      <span className="text-xs font-medium text-grey-500">
                        ({ticketLogs.length})
                      </span>
                    )}
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <ChatText size={16} color="#A3A3A3" weight="fill" />
                  <h3 className="text-grey-800 text-base font-bold">
                    Comments{" "}
                    {comments.length > 0 && (
                      <span className="text-grey-500 font-normal text-sm">
                        ({comments.length})
                      </span>
                    )}
                  </h3>
                </div>
              )}
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-5 py-4">
              {activePanel === "activity" && isEdit ? (
                loadingLogs ? (
                  <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-gray-600 bg-white px-4 py-8">
                    <p className="text-grey-500 text-sm">Loading activity...</p>
                  </div>
                ) : logsError ? (
                  <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-red-200 bg-white-100 px-4 py-8">
                    <p className="text-red-500 text-sm">{logsError}</p>
                  </div>
                ) : ticketLogs.length === 0 ? (
                  <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-gray-600 bg-white px-4 py-8">
                    <p className="text-gray-500 text-sm">No activity yet</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {ticketLogs.map((log) => {
                      const actorName =
                        log.actor?.name || log.actorType || "System";
                      const actionLabel = humanizeLogAction(log.action);
                      const content = getLogContent(log);
                      return (
                        <div key={log.id} className="relative flex gap-3">
                          <div className="flex flex-col items-center">
                            <InitialsAvatar
                              name={actorName}
                              sizeClass="w-9 h-9"
                            />
                            <div className="mt-2 h-full min-h-6 w-px bg-gray-600" />
                          </div>
                          <div className="min-w-0 flex-1 rounded-2xl border border-gray-600 bg-white p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="m-0 text-sm font-bold text-gray-800">
                                  {actionLabel}
                                </p>
                                <p className="m-0 mt-1 text-sm text-gray-700">
                                  {content}
                                </p>
                              </div>
                              {log.createdAt && (
                                <span className="shrink-0 text-xs font-medium text-gray-700">
                                  {formatCommentTime(log.createdAt)}
                                </span>
                              )}
                            </div>

                            <div className="mt-3 rounded-lg bg-gray-300 px-3 py-2">
                              <div className="flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                  <p className="m-0 text-xs font-semibold text-gray-700">
                                    Performed by
                                  </p>
                                  <p className="m-0 mt-0.5 truncate text-sm font-semibold text-grey-800">
                                    {actorName}
                                  </p>
                                  {log.actor?.email && (
                                    <p className="m-0 truncate text-xs text-grey-600">
                                      {log.actor.email}
                                    </p>
                                  )}
                                </div>
                              </div>
                              {/* {log.task?.title && (
                                <p className="m-0 mt-2 border-t border-grey-300 pt-2 text-xs text-grey-500">
                                  Ticket: {log.task.title}{log.task.status ? ` - ${log.task.status}` : ''}
                                </p>
                              )} */}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              ) : comments.length === 0 ? (
                <div className="flex flex-1 items-center justify-center rounded-lg border border-gray-600 bg-white-100 px-4 py-8">
                  <p className="text-grey-500 text-sm">No comments yet</p>
                </div>
              ) : (
                <div
                  className={
                    isEdit ? "flex flex-col gap-3" : "flex flex-col gap-2"
                  }>
                  {comments.map((c) =>
                    isEdit ? (
                      <div
                        key={c.id}
                        className="flex gap-3 items-start p-3 rounded-2xl bg-white border border-gray-600 group">
                        <InitialsAvatar name={c.author} />
                        <div className="flex flex-col flex-1 gap-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-grey-800 text-sm font-bold">
                                {c.author}
                              </span>
                              {c.time && (
                                <span className="text-grey-600 text-xs">
                                  {c.time}
                                </span>
                              )}
                            </div>
                            {(() => {
                              const currentUser = (() => {
                                try {
                                  return JSON.parse(
                                    localStorage.getItem("user") || "{}",
                                  );
                                } catch {
                                  return {};
                                }
                              })();
                              const canDelete = currentUser?.name === c.author;
                              return canDelete ? (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteCommentClick(c)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-100"
                                  title="Delete comment">
                                  <Trash size={14} color="#ef4444" />
                                </button>
                              ) : null;
                            })()}
                          </div>
                          <p className="text-grey-700 text-sm m-0">{c.text}</p>
                        </div>
                      </div>
                    ) : (
                      <div key={c.id} className="flex items-start gap-2 group">
                        {c.editing ? (
                          <EditableComment
                            initialText={c.text}
                            onSave={(text) =>
                              handleEditDraftComment(c.id, text)
                            }
                            onCancel={() => toggleDraftCommentEdit(c.id)}
                          />
                        ) : (
                          <>
                            <div className="flex-1 bg-white border border-grey-300 rounded-lg px-3 py-2 text-sm text-grey-800">
                              {c.text}
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                type="button"
                                onClick={() => toggleDraftCommentEdit(c.id)}
                                className="p-1 rounded hover:bg-grey-200 text-grey-600 text-xs font-medium">
                                Edit
                              </button>
                              {(() => {
                                const currentUser = (() => {
                                  try {
                                    return JSON.parse(
                                      localStorage.getItem("user") || "{}",
                                    );
                                  } catch {
                                    return {};
                                  }
                                })();
                                const canDelete =
                                  currentUser?.name === c.author;
                                return canDelete ? (
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteCommentClick(c)}
                                    className="p-1 rounded hover:bg-red-100">
                                    <Trash size={14} color="#ef4444" />
                                  </button>
                                ) : null;
                              })()}
                            </div>
                          </>
                        )}
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
            {!isEdit && (
              <div className="flex shrink-0 gap-2 px-5 py-4 border-t border-gray-600 bg-wite-100">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleAddDraftComment()
                  }
                  placeholder="Add a comment..."
                  className="flex-1 min-w-0 text-sm text-grey-800 border border-gray-600 rounded-lg px-3 py-2 outline-none focus:border-[#3CAFAA]"
                />
                <button
                  type="button"
                  onClick={handleAddDraftComment}
                  disabled={!newComment.trim()}
                  className="px-3 py-2 rounded-lg bg-[#004A68] text-white-100 text-sm font-medium disabled:opacity-40 hover:bg-[#003a52] transition-colors">
                  Add
                </button>
              </div>
            )}
          </aside>
        </div>
      </Modal>
    </>
  );
};

export default TicketModal;
