from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os

app = Flask(__name__)
CORS(app)

openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route("/classify", methods=["POST"])
def classify():
    data = request.json
    item = data["item"]

    prompt = f"Classify this item for disposal: '{item}'. Is it compost, recycle, or landfill? Give a short reason too."

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.6
    )

    gpt_reply = response['choices'][0]['message']['content']

    # Parse response (simplified)
    category = "Compost" if "compost" in gpt_reply.lower() else \
               "Recycle" if "recycle" in gpt_reply.lower() else "Landfill"

    score = {"Compost": 5, "Recycle": 3, "Landfill": 1}[category]

    return jsonify({
        "category": category,
        "score": score,
        "message": gpt_reply
    })

if __name__ == "__main__":
    app.run(debug=True)
