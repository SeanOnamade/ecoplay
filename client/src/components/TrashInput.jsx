import axios from "axios";
import { useState } from "react";

function TrashInput() {
  const [item, setItem] = useState("");
  const [result, setResult] = useState(null);

  const submitItem = async () => {
    try {
      const res = await axios.post("http://localhost:5000/classify", { item });
      setResult(res.data);
    } catch (error) {
      console.error("Error classifying item:", error);
    }
  };

  return (
    <div className="w-100" style={{ maxWidth: "500px" }}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="e.g. plastic bottle"
        />
        <button onClick={submitItem} className="btn btn-success">
          Submit
        </button>
      </div>

      {result && (
        <div className="mt-3">
          <p>
            <strong>Category:</strong> {result.category}
          </p>
          <p>
            <strong>Score:</strong> {result.score}
          </p>
          <p>
            <strong>Message:</strong> {result.message}
          </p>
        </div>
      )}
    </div>
  );
}

export default TrashInput;
