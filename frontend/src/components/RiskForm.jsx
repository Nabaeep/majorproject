import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Baby, Send } from "lucide-react";


const birthTypeOptions = [
  { value: 1, label: "Single birth" },
  { value: 2, label: "Twin birth" },
  { value: 3, label: "Triplet or higher" },
];

const sexOptions = [
  { value: 1, label: "Female" },
  { value: 2, label: "Male" },
];

const sizeAtBirthOptions = [
  { value: 1, label: "Very small" },
  { value: 2, label: "Smaller than average" },
  { value: 3, label: "Average" },
  { value: 4, label: "Larger than average" },
  { value: 5, label: "Very large" },
  { value: 8, label: "Don't know" },
];

const deliveryPlaceOptions = [
  { value: 11, label: "Home" },
  { value: 21, label: "Government hospital" },
  { value: 22, label: "Government health center" },
  { value: 31, label: "Private hospital" },
  { value: 96, label: "Other / Unknown" },
];

const residenceOptions = [
  { value: 1, label: "Urban" },
  { value: 2, label: "Rural" },
];

const pregnancyWantedOptions = [
  { value: 0, label: "Wanted at the time" },
  { value: 1, label: "Not wanted / Wanted later" },
];

const API_URL = " https://74fa5a7cd94e.ngrok-free.app/predict ";

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">
      {label}
    </label>
    {children}
  </div>
);

const RiskForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    b0: "",
    b4: "",
    b11: "",
    m18: "",
    m15: "",
    v012: "",
    v025: "",
    v136: "",
    m17: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      navigate("/result", {
        state: { result: data },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Baby className="text-blue-600" />
        Risk Assessment (DHS Variables)
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Type of Birth">
          <select name="b0" onChange={handleChange} className="input">
            <option value="">Select</option>
            {birthTypeOptions.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>

        <Field label="Sex of Child">
          <select name="b4" onChange={handleChange} className="input required">
            <option value="">Select</option>
            {sexOptions.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>

        <Field label="Preceding Birth Interval (months)">
          <input type="number" name="b11" className="input" onChange={handleChange} placeholder="eg: 12" required />
        </Field>

        <Field label="Size of Child at Birth">
          <select name="m18" onChange={handleChange} className="input">
            <option value="">Select</option>
            {sizeAtBirthOptions.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>

        <Field label="Place of Delivery">
          <select name="m15" onChange={handleChange} className="input">
            <option value="">Select</option>
            {deliveryPlaceOptions.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>

       <Field label="Mother's Age (years)">
  <input
    type="number"
    name="v012"
    min={0}
    placeholder="Enter age (15+)"
    className="input"
    value={formData.v012}
    onChange={(e) =>
      setFormData({ ...formData, v012: e.target.value })
    }
    onBlur={() => {
      if (formData.v012 && Number(formData.v012) < 15) {
        setError("Mother's age must be 15 years or older.");
      } else if (formData.v012 && Number(formData.v012) > 50) {
        setError("Mother's age must be less than 50 years.");
      } else{
        setError(null);
      }
    }}
  />
</Field>

        <Field label="Place of Residence">
          <select name="v025" onChange={handleChange} className="input">
            <option value="">Select</option>
            {residenceOptions.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>

        <Field label="Number of Children in Household">
          <input type="number" name="v136" className="input" onChange={handleChange} placeholder="eg: 3" />
        </Field>

        <Field label="Pregnancy Wanted Status">
          <select name="m17" onChange={handleChange} className="input">
            <option value="">Select</option>
            {pregnancyWantedOptions.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full mt-6 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
      >
        <Send size={18} />
        {loading ? "Predicting..." : "Calculate Risk Score"}
      </button>

      {error && (
        <div className="mt-6 bg-red-50 border border-red-300 rounded-lg p-4 text-red-700">
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default RiskForm;
