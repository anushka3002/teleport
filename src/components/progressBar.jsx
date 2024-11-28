import React from "react";

const ProgressBar = ({ currentStep }) => {
  const steps = [
    { label: "Personal Information", id: 1 },
    { label: "Account Details", id: 2 },
    { label: "Preferences", id: 3 },
  ];

  return (
    <div className="w-full my-6">
      {/* Step Labels */}
      <div className="flex justify-between text-sm font-medium mb-4">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center">
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
              className={`text-xs mt-2 ${
                step.id === currentStep ? "text-blue-600" : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="relative h-2 bg-gray-200 rounded">
        <div
          className="absolute h-2 bg-blue-500 rounded transition-all duration-300"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
