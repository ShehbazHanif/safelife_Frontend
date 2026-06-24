import ShieldCheckGreen from "../../assets/ShieldCheckGreen.svg";
import ShieldCheckYellow from "../../assets/ShieldCheckYellow.svg";

const HomeCard = ({ sections = [] }) => {
  const statusConfig = {
    success: {
      icon: ShieldCheckGreen,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    warning: {
      icon: ShieldCheckYellow,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 self-stretch">
      {sections.map((section, idx) => (
        <div
          key={idx}
          className="flex flex-1 flex-col items-start gap-4 p-6 rounded-3xl border border-gray-300 bg-gray-200 shadow-[0_1px_4px_0_rgba(128,189,209,0.10)]">
          {/* Title */}
          <div className="flex flex-col items-start self-stretch">
            <h3 className="text-xl  font-montserrat text-gray-800 ">
              {section.title}
            </h3>
          </div>

          {/* Metrics */}
          <div className="flex flex-col items-start self-stretch gap-4">
            {section.metrics.map((metric, metricIdx) => {
              const config = statusConfig[metric.statusType] || {};

              return (
                <div
                  key={metricIdx}
                  className="flex p-6 flex-col md:flex-row justify-between items-center self-stretch rounded-3xl border border-gray-300 bg-white-100 shadow-[0_1px_4px_0_rgba(128,189,209,0.10)]">
                  {/* LEFT SIDE */}
                  <div className="flex items-center gap-3 flex-1">
                    {/* Dynamic Icon */}
                    {metric.statusType && (
                      <div
                        className={` flex items-center justify-center flex-shrink-0 rounded-[8px] p-2 ${config.bg}`}>
                        <img
                          src={config.icon}
                          alt={metric.label}
                          className="object-contain"
                        />
                      </div>
                    )}

                    <div className="flex flex-col items-start gap-1">
                      <p className="text-xs font-montserrat text-gray-700">
                        {metric.label}
                      </p>

                      {/* Dynamic Value Color */}
                      <p
                        className={`text-xl font-montserrat ${
                          config.text || "text-gray-800"
                        }`}>
                        {metric.value}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="flex flex-col md:flex-row items-center gap-2 flex-shrink-0">
                    {metric.changeIcon && (
                      <div className="w-6 h-6 flex   items-center justify-center">
                        <img
                          src={metric.changeIcon}
                          alt={metric.label}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}

                    {metric.change && (
                      <span
                        className={`text-xb  font-montserrat whitespace-nowrap text-green-500 
                         
                        `}>
                        {metric.change}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeCard;
