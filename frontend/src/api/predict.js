export async function getRiskPrediction(payload) {
  const url = "https://6f176dd6cc68.ngrok-free.app/predict";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API error ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Prediction API Error:", err);
    return { error: err.message };
  }
}
