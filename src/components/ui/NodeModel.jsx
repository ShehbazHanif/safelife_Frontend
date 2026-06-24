import React, { useState } from "react";
import { Modal } from "../common/Modal"; // Adjust directory path depending on where your wrapper sits
import Button from "../common/Button";

const NodeModel = ({ isOpen, onClose, onCreateNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNode, setSelectedNode] = useState("start"); // Tracks active node card select token

  // Available node templates mapping layout fields
  const nodeTemplates = [
    {
      id: "start",
      title: "Start Node",
      color: "#004A68",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none">
          <path
            d="M13.1634 4.20904C13.2406 3.9209 13.429 3.67519 13.6872 3.52593C13.9455 3.37668 14.2525 3.33609 14.5406 3.4131C15.9951 3.792 17.3221 4.55203 18.3849 5.6148C19.4476 6.67757 20.2077 8.0046 20.5866 9.45904C20.6282 9.60282 20.6408 9.75348 20.6235 9.90218C20.6062 10.0509 20.5594 10.1946 20.4858 10.325C20.4123 10.4554 20.3134 10.5698 20.1951 10.6615C20.0768 10.7532 19.9413 10.8203 19.7967 10.859C19.6521 10.8977 19.5012 10.9071 19.3529 10.8867C19.2046 10.8664 19.0619 10.8166 18.933 10.7403C18.8042 10.6641 18.6919 10.5629 18.6027 10.4427C18.5135 10.3225 18.4491 10.1857 18.4134 10.0403C18.1341 8.96893 17.5741 7.99143 16.7911 7.20853C16.0082 6.42562 15.0307 5.86562 13.9594 5.58623C13.6712 5.50909 13.4255 5.32068 13.2763 5.06243C13.127 4.80417 13.0864 4.49721 13.1634 4.20904ZM21.3609 17.2103C21.1822 18.5712 20.5141 19.8205 19.4816 20.7248C18.449 21.6292 17.1226 22.1268 15.75 22.1247C8.09907 22.1247 1.87501 15.9006 1.87501 8.24967C1.87288 6.87707 2.37046 5.55064 3.27482 4.51809C4.17918 3.48555 5.42848 2.8175 6.78938 2.63873C7.19037 2.59 7.59638 2.67174 7.94727 2.87184C8.29816 3.07194 8.57526 3.37975 8.73751 3.74967L10.7166 8.1681C10.7187 8.17389 10.7212 8.17953 10.7241 8.18498C10.8457 8.46925 10.8951 8.77918 10.868 9.08718C10.8408 9.39518 10.7379 9.69168 10.5684 9.95029C10.5443 9.98797 10.5177 10.024 10.4888 10.0581L8.70188 12.1872C9.36376 13.3909 10.6238 14.6397 11.8416 15.3006L13.9331 13.5194C13.9667 13.4912 14.0018 13.465 14.0381 13.4406C14.2976 13.2665 14.5967 13.1603 14.9079 13.1318C15.2192 13.1033 15.5326 13.1534 15.8194 13.2775L15.8363 13.285L20.25 15.2622C20.6198 15.4245 20.9275 15.7017 21.1276 16.0525C21.3277 16.4034 21.4095 16.8093 21.3609 17.2103ZM19.0819 17.2047L15.1444 15.4412L13.0416 17.229C13.0085 17.2577 12.9738 17.2843 12.9375 17.3087C12.6672 17.488 12.355 17.594 12.0315 17.6165C11.7079 17.639 11.3841 17.5772 11.0916 17.4372C9.26532 16.5559 7.44563 14.7484 6.56251 12.9372C6.42207 12.646 6.35932 12.3234 6.38034 12.0008C6.40137 11.6781 6.50546 11.3664 6.68251 11.0959C6.70695 11.0582 6.73388 11.0222 6.76313 10.9881L8.55938 8.8581L6.79501 4.9206C6.03695 5.08766 5.35882 5.50892 4.87315 6.11446C4.38749 6.72001 4.1235 7.47342 4.12501 8.24967C4.12873 11.3317 5.3547 14.2864 7.534 16.4657C9.7133 18.645 12.668 19.8709 15.75 19.8747C16.5267 19.8768 17.2808 19.6131 17.8869 19.1274C18.493 18.6417 18.9147 17.9632 19.0819 17.2047ZM12.9028 9.13748C13.3629 9.28249 13.7812 9.5363 14.1223 9.87739C14.4634 10.2185 14.7172 10.6368 14.8622 11.0969C14.934 11.3251 15.0767 11.5245 15.2695 11.6662C15.4624 11.8078 15.6954 11.8842 15.9347 11.8844C16.0495 11.8842 16.1635 11.8668 16.2731 11.8328C16.5566 11.7431 16.7931 11.5448 16.9308 11.2813C17.0685 11.0178 17.0963 10.7105 17.0081 10.4265C16.7544 9.62102 16.3101 8.88859 15.7129 8.29141C15.1158 7.69424 14.3833 7.24994 13.5778 6.99623C13.4361 6.94866 13.2862 6.92983 13.1371 6.94084C12.988 6.95185 12.8425 6.99248 12.7093 7.06036C12.576 7.12823 12.4577 7.22199 12.3611 7.33615C12.2645 7.45031 12.1916 7.58258 12.1468 7.72522C12.1019 7.86787 12.0859 8.01803 12.0998 8.16692C12.1136 8.31581 12.157 8.46046 12.2274 8.59239C12.2978 8.72432 12.3938 8.84089 12.5097 8.93529C12.6257 9.02968 12.7593 9.10001 12.9028 9.14217V9.13748Z"
            fill="#004A68"
          />
        </svg>
      ),
    },
    {
      id: "transfer",
      title: "Transfer Call",
      color: "#262626",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          <line x1="12" y1="2" x2="22" y2="12" />
          <polyline points="18 2 22 2 22 6" />
        </svg>
      ),
    },
    {
      id: "webhook",
      title: "Webhook",
      color: "#262626",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <circle cx="12" cy="5" r="3" />
          <circle cx="5" cy="19" r="3" />
          <circle cx="19" cy="19" r="3" />
          <path d="M5 16V9a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v7" />
        </svg>
      ),
    },
    {
      id: "end",
      title: "End Call",
      color: "#262626",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />
          <line x1="23" y1="1" x2="1" y2="23" />
        </svg>
      ),
    },
  ];

  const filteredNodes = nodeTemplates.filter((node) =>
    node.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCreateAction = () => {
    const activeNodeDetails = nodeTemplates.find((n) => n.id === selectedNode);
    if (activeNodeDetails && onCreateNode) {
      onCreateNode(activeNodeDetails);
    }
    onClose();
  };

  // Custom Modal Footer Layout Block Matching your specs
  const customModalFooter = (
    <div className="flex w-full justify-end items-center gap-2 font-['Montserrat']">
      <button
        onClick={onClose}
        className="flex px-5 py-2.5 justify-center items-center rounded-[100px] bg-[#F2F2F2] text-[#737373] text-[14px] font-medium transition-colors hover:bg-gray-200">
        Cancel
      </button>
      <button
        onClick={handleCreateAction}
        className="flex px-5 py-2.5 justify-center items-center rounded-[100px] bg-[#004A68] text-white-100 text-[14px] font-medium transition-colors hover:bg-[#003B53]">
        Create
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add new node"
      footer={customModalFooter}
      footerType="custom"
      maxWidth="580px"
      bodyStyle={{ padding: "20px 24px", gap: "24px" }}>
      <div className="flex flex-col items-start gap-6 w-full font-['Montserrat']">
        {/* --- SEARCH INPUT ELEMENT LAYOUT --- */}
        <div className="flex h-10 px-3 py-2.5 items-center gap-2 self-stretch rounded-[100px] border border-[#D4D4D4] bg-white-100 w-full focus-within:border-[#004A68]  transition-colors">
          <div className="flex w-4 h-5 py-0.5 flex-col justify-center items-center shrink-0 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search Node..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-[14px] font-normal text-[#262626] placeholder-[#A3A3A3]"
          />
        </div>

        {/* --- GRID SELECTION CONTAINER BLOCK --- */}
        <div className="flex items-start gap-4 self-stretch w-full">
          <div className="grid grid-cols-2 gap-4 w-full">
            {filteredNodes.map((node) => {
              const isSelected = selectedNode === node.id;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node.id)}
                  className={`flex p-6 flex-col items-center gap-2 flex-1 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? "border-[#4A9FBA] bg-[#B5E8F7]/40 shadow-[0_1px_4px_0_rgba(128,189,209,0.10)]"
                      : "border-[#E5E5E5] bg-white hover:bg-gray-50/60"
                  }`}>
                  {/* Node Logo Container Aspect Box */}
                  <div
                    className={`w-6 h-6 aspect-square shrink-0 flex items-center justify-center transition-colors ${
                      isSelected ? "text-[#004A68]" : "text-gray-500"
                    }`}>
                    {node.icon}
                  </div>

                  {/* Node Descriptor Text copy label */}
                  <span
                    className={`text-center text-[16px] font-semibold leading-[150%] transition-colors ${
                      isSelected ? "text-[#004A68]" : "text-[#262626]"
                    }`}>
                    {node.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NodeModel;
