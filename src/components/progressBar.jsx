import React from "react";

const ProgressBar = ({ currentStep }) => {
  const steps = [
    { label: "Personal details", id: 1 },
    { label: "Account details", id: 2 },
    { label: "Preferences", id: 3 },
  ];

  return (
    <div className="w-full my-6">
      {/* Step Labels */}
      <div className="flex justify-between text-sm font-medium mb-4">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center sm:mx-0 mx-2">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step.id <= currentStep
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
            >
              {step.id}
            </div>
            <span
              className={`text-xs mt-2 hidden sm:block ${
                step.id === currentStep ? "text-blue-600" : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="flex justify-between">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`h-2 flex-1 mx-1 ${
              step.id < currentStep || step.id == 4 ? "bg-blue-500" : "bg-gray-200"
            } rounded`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
