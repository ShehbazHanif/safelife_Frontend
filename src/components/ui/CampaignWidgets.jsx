import React from "react";

import CallIcon from "../../assets/call.svg";
import ContactIcon from "../../assets/contant.svg";
import HandIcon from "../../assets/hand.svg";
const CampaignWidgets = ({ activeTab }) => {
  // Widget data configuration for clean and modular rendering
  const totalContactsValue = activeTab === "Outbound" ? "500" : "745"; // Example mockup values
  const totalCallsValue = activeTab === "Outbound" ? "320" : "120";
  const completionValue = activeTab === "Outbound" ? "64%" : "85%";
  const widgets = [
    {
      title: "Total Contacts",
      value: totalContactsValue,
      percentage: "15%",
      isPositive: true,
      subtext: "Compared to last week",
      icon: (
        <img
          className="absolute left-[252px] top-[48px] w-[40px] h-[47.19px]"
          src={ContactIcon}
        />
      ),
    },
    {
      title: "Total Calls Made",
      value: totalCallsValue,
      percentage: "15%",
      isPositive: false, // Renders red down arrow
      subtext: "Compared to last week",
      icon: (
        <img
          className="absolute left-[252px] top-[48px] w-[40px] h-[47.19px]"
          src={CallIcon}
        />
      ),
    },
    {
      title: "Percentage of Completion",
      value: completionValue,
      percentage: "15%",
      isPositive: true,
      subtext: "Compared to last week",
      icon: (
        <img
          className="absolute left-[252px] top-[48px] w-[40px] h-[47.19px]"
          src={HandIcon}
        />
      ),
    },
  ];

  return (
    /* Parent Div Styling */
    <div className="flex items-center gap-[16px] self-stretch bg-white ">
      {widgets.map((widget, index) => (
        /* Inner Div of Parent Div Styling */
        <div
          key={index}
          className="relative flex flex-col justify-center items-flex-start w-[316px] p-[24px] gap-[12px] rounded-[24px] border border-[#F2F2F2] bg-[#F9F9F9]"
          style={{ boxShadow: "0px 1px 4px 0px rgba(128, 189, 209, 0.10)" }}>
          {/* Card Header Title */}
          <h3 className="text-[#262626] font-['Montserrat'] text-[14px] font-semibold leading-[150%]">
            {widget.title}
          </h3>

          {/* Metric Section: Contains Number Value & Indicator Tag */}
          <div className="flex flex-col items-start gap-[8px]">
            <div className="flex items-center gap-[8px]">
              {/* Massive Value Counter */}
              <span className="text-[#262626] font-['Montserrat'] text-[24px] font-bold leading-[150%] tracking-[-0.24px]">
                {widget.value}
              </span>

              {/* Status Pill Badge (Dynamic for positive green vs negative red trends) */}
              <div className="flex items-center gap-[4px]">
                {widget.isPositive ? (
                  /* Figma Standard Up-Arrow SVG Indicator */
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="w-[19.5px] h-[19.5px]">
                    <path
                      d="M9.75 0C7.82164 0 5.93657 0.571828 4.33319 1.64317C2.72982 2.71451 1.48013 4.23726 0.742179 6.01884C0.00422452 7.80042 -0.188858 9.76082 0.187348 11.6521C0.563554 13.5434 1.49215 15.2807 2.85571 16.6443C4.21928 18.0079 5.95656 18.9365 7.84787 19.3127C9.73919 19.6889 11.6996 19.4958 13.4812 18.7578C15.2627 18.0199 16.7855 16.7702 17.8568 15.1668C18.9282 13.5634 19.5 11.6784 19.5 9.75C19.4973 7.16498 18.4692 4.68661 16.6413 2.85872C14.8134 1.03084 12.335 0.00272983 9.75 0ZM13.2806 9.53063C13.211 9.60036 13.1283 9.65568 13.0372 9.69342C12.9462 9.73116 12.8486 9.75059 12.75 9.75059C12.6514 9.75059 12.5538 9.73116 12.4628 9.69342C12.3718 9.65568 12.289 9.60036 12.2194 9.53063L10.5 7.81031V13.5C10.5 13.6989 10.421 13.8897 10.2803 14.0303C10.1397 14.171 9.94892 14.25 9.75 14.25C9.55109 14.25 9.36033 14.171 9.21967 14.0303C9.07902 13.8897 9 13.6989 9 13.5V7.81031L7.28063 9.53063C7.1399 9.67136 6.94903 9.75042 6.75 9.75042C6.55098 9.75042 6.36011 9.67136 6.21938 9.53063C6.07865 9.38989 5.99959 9.19902 5.99959 9C5.99959 8.80098 6.07865 8.61011 6.21938 8.46937L9.21938 5.46937C9.28903 5.39964 9.37175 5.34432 9.4628 5.30658C9.55385 5.26884 9.65144 5.24941 9.75 5.24941C9.84857 5.24941 9.94616 5.26884 10.0372 5.30658C10.1283 5.34432 10.211 5.39964 10.2806 5.46937L13.2806 8.46937C13.3504 8.53903 13.4057 8.62175 13.4434 8.7128C13.4812 8.80384 13.5006 8.90144 13.5006 9C13.5006 9.09856 13.4812 9.19616 13.4434 9.2872C13.4057 9.37825 13.3504 9.46097 13.2806 9.53063Z"
                      fill="#599F76"
                    />
                  </svg>
                ) : (
                  /* Negative Down-Arrow SVG Indicator */
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="w-[19.5px] h-[19.5px] rotate-180">
                    <path
                      d="M9.75 0C7.82164 0 5.93657 0.571828 4.33319 1.64317C2.72982 2.71451 1.48013 4.23726 0.742179 6.01884C0.00422452 7.80042 -0.188858 9.76082 0.187348 11.6521C0.563554 13.5434 1.49215 15.2807 2.85571 16.6443C4.21928 18.0079 5.95656 18.9365 7.84787 19.3127C9.73919 19.6889 11.6996 19.4958 13.4812 18.7578C15.2627 18.0199 16.7855 16.7702 17.8568 15.1668C18.9282 13.5634 19.5 11.6784 19.5 9.75C19.4973 7.16498 18.4692 4.68661 16.6413 2.85872C14.8134 1.03084 12.335 0.00272983 9.75 0ZM13.2806 9.53063C13.211 9.60036 13.1283 9.65568 13.0372 9.69342C12.9462 9.73116 12.8486 9.75059 12.75 9.75059C12.6514 9.75059 12.5538 9.73116 12.4628 9.69342C12.3718 9.65568 12.289 9.60036 12.2194 9.53063L10.5 7.81031V13.5C10.5 13.6989 10.421 13.8897 10.2803 14.0303C10.1397 14.171 9.94892 14.25 9.75 14.25C9.55109 14.25 9.36033 14.171 9.21967 14.0303C9.07902 13.8897 9 13.6989 9 13.5V7.81031L7.28063 9.53063C7.1399 9.67136 6.94903 9.75042 6.75 9.75042C6.55098 9.75042 6.36011 9.67136 6.21938 9.53063C6.07865 9.38989 5.99959 9.19902 5.99959 9C5.99959 8.80098 6.07865 8.61011 6.21938 8.46937L9.21938 5.46937C9.28903 5.39964 9.37175 5.34432 9.4628 5.30658C9.55385 5.26884 9.65144 5.24941 9.75 5.24941C9.84857 5.24941 9.94616 5.26884 10.0372 5.30658C10.1283 5.34432 10.211 5.39964 10.2806 5.46937L13.2806 8.46937C13.3504 8.53903 13.4057 8.62175 13.4434 8.7128C13.4812 8.80384 13.5006 8.90144 13.5006 9C13.5006 9.09856 13.4812 9.19616 13.4434 9.2872C13.4057 9.37825 13.3504 9.46097 13.2806 9.53063Z"
                      fill="#D9534F"
                    />
                  </svg>
                )}

                {/* Percentage Label */}
                <span
                  className={`text-center font-['Montserrat'] text-[12px] font-semibold leading-[150%] ${widget.isPositive ? "text-[#599F76]" : "text-[#D9534F]"}`}>
                  {widget.percentage}
                </span>
              </div>
            </div>

            {/* Bottom Comparison Subtext */}
            <p className="text-[#262626] text-center font-['Montserrat'] text-[12px] font-medium leading-[150%]">
              {widget.subtext}
            </p>
          </div>

          {/* Positioned Background Right-Side Card Graphics */}
          {widget.icon}
        </div>
      ))}
    </div>
  );
};

export default CampaignWidgets;

// import React from "react";
// import CallIcon from "../../assets/call.svg";
// import ContactIcon from "../../assets/contant.svg";
// import HandIcon from "../../assets/hand.svg";

// // 1. Accept activeTab as a prop
// const CampaignWidgets = ({ activeTab }) => {
//   // 2. Compute dynamic metrics based on the active tab context
//   const totalContactsValue = activeTab === "Outbound" ? "500" : "745"; // Example mockup values
//   const totalCallsValue = activeTab === "Outbound" ? "320" : "120";
//   const completionValue = activeTab === "Outbound" ? "64%" : "85%";

//   const widgets = [
//     {
//       title: "Total Contacts",
//       value: totalContactsValue, // Dynamic value
//       percentage: "15%",
//       isPositive: true,
//       subtext: "Compared to last week",
//       icon: <img className="w-[40px] h-[47px]" src={ContactIcon} alt="" />,
//     },
//     {
//       title: "Total Calls Made",
//       value: totalCallsValue, // Dynamic value
//       percentage: "8%",
//       isPositive: false,
//       subtext: "Compared to last week",
//       icon: <img className="w-[40px] h-[47px]" src={CallIcon} alt="" />,
//     },
//     {
//       title: "Percentage of Completion",
//       value: completionValue, // Dynamic value
//       percentage: "4%",
//       isPositive: true,
//       subtext: "Compared to last week",
//       icon: <img className="w-[40px] h-[47px]" src={HandIcon} alt="" />,
//     },
//   ];

//   return (
//     <div className="flex flex-wrap items-center gap-[16px] self-stretch bg-white">
//       {widgets.map((widget, index) => (
//         <div
//           key={index}
//           // Changed to justify-between to cleanly push items apart without breaking layout layouts
//           className="relative flex justify-between items-start w-[316px] p-[24px] rounded-[24px] border border-[#F2F2F2] bg-[#F9F9F9]"
//           style={{ boxShadow: "0px 1px 4px 0px rgba(128, 189, 209, 0.10)" }}>
//           {/* Left Text Metric Content */}
//           <div className="flex flex-col gap-[12px]">
//             <h3 className="text-[#262626] font-['Montserrat'] text-[14px] font-semibold leading-[150%]">
//               {widget.title}
//             </h3>

//             <div className="flex flex-col items-start gap-[8px]">
//               <div className="flex items-center gap-[8px]">
//                 <span className="text-[#262626] font-['Montserrat'] text-[24px] font-bold leading-[150%] tracking-[-0.24px]">
//                   {widget.value}
//                 </span>

//                 <div className="flex items-center gap-[4px]">
//                   {widget.isPositive ? (
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       viewBox="0 0 20 20"
//                       fill="none"
//                       className="w-[19.5px] h-[19.5px]">
//                       <path
//                         d="M9.75 0C7.82164 0 5.93657 0.571828 4.33319 1.64317C2.72982 2.71451 1.48013 4.23726 0.742179 6.01884C0.00422452 7.80042 -0.188858 9.76082 0.187348 11.6521C0.563554 13.5434 1.49215 15.2807 2.85571 16.6443C4.21928 18.0079 5.95656 18.9365 7.84787 19.3127C9.73919 19.6889 11.6996 19.4958 13.4812 18.7578C15.2627 18.0199 16.7855 16.7702 17.8568 15.1668C18.9282 13.5634 19.5 11.6784 19.5 9.75C19.4973 7.16498 18.4692 4.68661 16.6413 2.85872C14.8134 1.03084 12.335 0.00272983 9.75 0ZM13.2806 9.53063C13.211 9.60036 13.1283 9.65568 13.0372 9.69342C12.9462 9.73116 12.8486 9.75059 12.75 9.75059C12.6514 9.75059 12.5538 9.73116 12.4628 9.69342C12.3718 9.65568 12.289 9.60036 12.2194 9.53063L10.5 7.81031V13.5C10.5 13.6989 10.421 13.8897 10.2803 14.0303C10.1397 14.171 9.94892 14.25 9.75 14.25C9.55109 14.25 9.36033 14.171 9.21967 14.0303C9.07902 13.8897 9 13.6989 9 13.5V7.81031L7.28063 9.53063C7.1399 9.67136 6.94903 9.75042 6.75 9.75042C6.55098 9.75042 6.36011 9.67136 6.21938 9.53063C6.07865 9.38989 5.99959 9.19902 5.99959 9C5.99959 8.80098 6.07865 8.61011 6.21938 8.46937L9.21938 5.46937C9.28903 5.39964 9.37175 5.34432 9.4628 5.30658C9.55385 5.26884 9.65144 5.24941 9.75 5.24941C9.84857 5.24941 9.94616 5.26884 10.0372 5.30658C10.1283 5.34432 10.211 5.39964 10.2806 5.46937L13.2806 8.46937C13.3504 8.53903 13.4057 8.62175 13.4434 8.7128C13.4812 8.80384 13.5006 8.90144 13.5006 9C13.5006 9.09856 13.4812 9.19616 13.4434 9.2872C13.4057 9.37825 13.3504 9.46097 13.2806 9.53063Z"
//                         fill="#599F76"
//                       />
//                     </svg>
//                   ) : (
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       viewBox="0 0 20 20"
//                       fill="none"
//                       className="w-[19.5px] h-[19.5px] rotate-180">
//                       <path
//                         d="M9.75 0C7.82164 0 5.93657 0.571828 4.33319 1.64317C2.72982 2.71451 1.48013 4.23726 0.742179 6.01884C0.00422452 7.80042 -0.188858 9.76082 0.187348 11.6521C0.563554 13.5434 1.49215 15.2807 2.85571 16.6443C4.21928 18.0079 5.95656 18.9365 7.84787 19.3127C9.73919 19.6889 11.6996 19.4958 13.4812 18.7578C15.2627 18.0199 16.7855 16.7702 17.8568 15.1668C18.9282 13.5634 19.5 11.6784 19.5 9.75C19.4973 7.16498 18.4692 4.68661 16.6413 2.85872C14.8134 1.03084 12.335 0.00272983 9.75 0ZM13.2806 9.53063C13.211 9.60036 13.1283 9.65568 13.0372 9.69342C12.9462 9.73116 12.8486 9.75059 12.75 9.75059C12.6514 9.75059 12.5538 9.73116 12.4628 9.69342C12.3718 9.65568 12.289 9.60036 12.2194 9.53063L10.5 7.81031V13.5C10.5 13.6989 10.421 13.8897 10.2803 14.0303C10.1397 14.171 9.94892 14.25 9.75 14.25C9.55109 14.25 9.36033 14.171 9.21967 14.0303C9.07902 13.8897 9 13.6989 9 13.5V7.81031L7.28063 9.53063C7.1399 9.67136 6.94903 9.75042 6.75 9.75042C6.55098 9.75042 6.36011 9.67136 6.21938 9.53063C6.07865 9.38989 5.99959 9.19902 5.99959 9C5.99959 8.80098 6.07865 8.61011 6.21938 8.46937L9.21938 5.46937C9.28903 5.39964 9.37175 5.34432 9.4628 5.30658C9.55385 5.26884 9.65144 5.24941 9.75 5.24941C9.84857 5.24941 9.94616 5.26884 10.0372 5.30658C10.1283 5.34432 10.211 5.39964 10.2806 5.46937L13.2806 8.46937C13.3504 8.53903 13.4057 8.62175 13.4434 8.7128C13.4812 8.80384 13.5006 8.90144 13.5006 9C13.5006 9.09856 13.4812 9.19616 13.4434 9.2872C13.4057 9.37825 13.3504 9.46097 13.2806 9.53063Z"
//                         fill="#D9534F"
//                       />
//                     </svg>
//                   )}

//                   <span
//                     className={`text-center font-['Montserrat'] text-[12px] font-semibold leading-[150%] ${widget.isPositive ? "text-[#599F76]" : "text-[#D9534F]"}`}>
//                     {widget.percentage}
//                   </span>
//                 </div>
//               </div>

//               <p className="text-[#737373] font-['Montserrat'] text-[12px] font-medium leading-[150%]">
//                 {widget.subtext}
//               </p>
//             </div>
//           </div>

//           {/* Right Aligned Icon (Fixes fragile pixel positioning layout bug) */}
//           <div className="pt-2">{widget.icon}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CampaignWidgets;
