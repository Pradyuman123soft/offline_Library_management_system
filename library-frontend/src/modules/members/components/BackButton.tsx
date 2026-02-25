import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center gap-2 text-sm font-medium 
                 text-gray-600 hover:text-blue-600 transition"
    >
      <span className="text-lg">←</span>
      Back
    </button>
  );
};

export default BackButton;