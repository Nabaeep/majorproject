import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, ArrowLeft,ShieldCheck, AlertCircle, HeartPulse, Baby } from "lucide-react";

const getRiskConfig = (score) => {
  if (score < 25)
    return {
      label: "Low Risk",
      bg: "bg-green-50",
      border: "border-green-500",
      bar: "bg-green-500",
      icon: "text-green-600",
      text: "The assessed risk factors suggest a low probability of adverse outcomes.",
      suggestions: [   " Continue regular antenatal and postnatal check-ups",
"Maintain balanced nutrition for mother and child",
"Ensure complete immunization schedule",
"Practice exclusive breastfeeding for the first 6 months",
"Maintain proper hygiene and sanitation",
"Monitor child’s growth and weight periodically"]
    };

  if (score < 50)
    return {
      label: "Medium Risk",
      bg: "bg-yellow-50",
      border: "border-yellow-500",
      bar: "bg-yellow-500",
      icon: "text-yellow-600",
      text: "Moderate risk detected. Regular monitoring is recommended.",
      suggestions:["Increase frequency of medical check-ups",

"Consult a healthcare provider for nutrition guidance",

"Monitor child for early signs of illness",

"Avoid long gaps between pregnancies",

"Ensure delivery and follow-ups at a healthcare facility",

"Educate family members on newborn care practices"]
    };

  if (score < 60)
    return {
      label: "High Risk",
      bg: "bg-orange-50",
      border: "border-orange-500",
      bar: "bg-orange-500",
      icon: "text-orange-600",
      text: "High risk detected. Medical consultation is advised.",
      suggestions:[ "Seek immediate consultation with a qualified healthcare professional",
  "Prefer institutional delivery and neonatal care facilities",
  "Ensure frequent medical check-ups for mother and infant",
  "Monitor the infant closely for early signs of illness",
  "Address maternal health issues such as anemia or infections",
  "Ensure proper nutrition for both mother and child",
  "Maintain strict hygiene and sanitation in the living environment",
  "Ensure emergency medical services are accessible",
  "Educate caregivers on newborn care and danger signs"]
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

        <div className="relative h-4 rounded-full bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 to-red-600" />

        <div
          className="relative"
          style={{ left: `${score}%`, marginTop: "-14px" }}
        >
          <div className="w-1 h-8 bg-black rounded" />

        </div>
 <div className="mt-8 rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm">
  <div className="flex items-center gap-2 mb-4">
    <HeartPulse className="text-red-500" />
    <h3 className="text-lg font-semibold text-gray-800">
      Recommended Care Measures
    </h3>
  </div>

  <ul className="space-y-3">
    {risk.suggestions.map((item, index) => (
      <li
        key={index}
        className="flex items-start gap-3 rounded-lg bg-white p-3 shadow-sm border border-gray-100"
      >
        <ShieldCheck className="text-green-600 mt-0.5" size={18} />
        <span className="text-sm text-gray-700 leading-relaxed">
          {item}
        </span>
      </li>
    ))}
  </ul>

  <div className="mt-5 flex items-start gap-2 text-xs text-gray-500 bg-gray-100 p-3 rounded-lg">
    <AlertCircle size={16} className="mt-0.5" />
    <p>
      These recommendations are for awareness and educational purposes only and
      do not replace professional medical advice.
    </p>
  </div>
</div>



       

       
      </div>
    </div>
  );
};

export default ResultPage;
