import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, ArrowLeft } from "lucide-react";

const getRiskConfig = (score) => {
  if (score < 25)
    return {
      label: "Low Risk",
      bg: "bg-green-50",
      border: "border-green-500",
      bar: "bg-green-500",
      icon: "text-green-600",
      text: "The assessed risk factors suggest a low probability of adverse outcomes.",
    };

  if (score < 50)
    return {
      label: "Medium Risk",
      bg: "bg-yellow-50",
      border: "border-yellow-500",
      bar: "bg-yellow-500",
      icon: "text-yellow-600",
      text: "Moderate risk detected. Regular monitoring is recommended.",
    };

  if (score < 75)
    return {
      label: "High Risk",
      bg: "bg-orange-50",
      border: "border-orange-500",
      bar: "bg-orange-500",
      icon: "text-orange-600",
      text: "High risk detected. Medical consultation is advised.",
    };

  return {
    label: "Critical Risk",
    bg: "bg-red-50",
    border: "border-red-500",
    bar: "bg-red-500",
    icon: "text-red-600",
    text: "Critical risk detected. Immediate medical attention is required.",
  };
};

const ResultPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state?.result) {
    navigate("/");
    return null;
  }

  const { risk_of_death, prediction } = state.result;
  const score = Math.round(risk_of_death * 100);
  const risk = getRiskConfig(score);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-gray-600 mb-6 hover:text-black"
      >
        <ArrowLeft size={18} />
        New Assessment
      </button>

      <div className={`border-2 ${risk.border} ${risk.bg} rounded-2xl p-8 text-center`}>
        <CheckCircle size={56} className={`mx-auto ${risk.icon}`} />

        <div className="text-4xl font-bold mt-4">
          {score}
          <span className="text-gray-400 text-2xl">/100</span>
        </div>

        <div className={`inline-block mt-4 px-4 py-1 rounded-full text-white text-sm ${risk.bar}`}>
          {risk.label}
        </div>

        <p className="mt-4 text-gray-700 max-w-xl mx-auto">
          {risk.text}
        </p>

        <div className="w-full bg-gray-200 rounded-full h-4 mt-6">
          <div
            className={`h-4 rounded-full ${risk.bar}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      <div className="bg-white shadow rounded-xl p-6 mt-8">
        <h3 className="text-lg font-semibold mb-1">
          Risk Score Breakdown
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Visual representation of the calculated risk level
        </p>

        <div className="relative h-4 rounded-full bg-gradient-to-r from-green-500 via-yellow-400 via-orange-500 to-red-600" />

        <div
          className="relative"
          style={{ left: `${score}%`, marginTop: "-14px" }}
        >
          <div className="w-1 h-8 bg-black rounded" />
        </div>

        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>0</span>
          <span>20</span>
          <span>40</span>
          <span>60</span>
          <span>100</span>
        </div>

        <div className="flex justify-between text-sm font-medium mt-2">
          <span className="text-green-600">Low</span>
          <span className="text-yellow-500">Medium</span>
          <span className="text-orange-500">High</span>
          <span className="text-red-600">Critical</span>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
