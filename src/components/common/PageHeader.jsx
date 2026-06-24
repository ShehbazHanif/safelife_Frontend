import Button from "../common/Button";

const PageHeader = ({
  title,
  actions = [],
  rightActions = null,
  showSearch = false,
  searchValue = "",
  onSearchChange,
  showFilter = false,
  filterOptions = [],
  onFilterChange,
}) => {
  return (
    <div className="flex flex-col gap-2 md:gap-0 md:flex-row items-start justify-between md:items-center self-stretch pt-3 w-full">
      {/* Left side: Title and Button Actions */}
      <div
        className={`flex flex-col items-start md:flex-row md:items-center ${title ? "md:gap-4" : ""}`}>
        {title && (
          <h2 className="font-montserrat text-lg tracking-[-0.24px] text-gray-800">
            {title}
          </h2>
        )}

        {actions.length > 0 && (
          <div className="flex flex-col items-start md:flex-row md:items-center gap-2">
            {actions.map((action, index) => (
              <Button
                key={index}
                ref={action.ref}
                variant={action.variant || "primary"}
                fullWidth={action.fullWidth}
                onClick={action.onClick}
                startIcon={action.startIcon}
                endIcon={action.endIcon}>
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Right side: Custom Actions (like Search and Filter) */}
      {rightActions && <div className="flex items-center">{rightActions}</div>}
    </div>
  );
};

export default PageHeader;
