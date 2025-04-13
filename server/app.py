from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app)

@app.route("/classify", methods=["POST"])
def classify():
    data = request.json
    item = data.get("item", "")

    prompt = (
        f"Classify this item for disposal: '{item}'.\n"
        "Respond on two lines:\n"
        "1. The disposal category — exactly one word: either 'Recycle', 'Compost', or 'Landfill'.\n"
        "2. A short reason for your choice."
    )

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.6
    )

    gpt_reply = response['choices'][0]['message']['content']
    lines = gpt_reply.splitlines()
    category = lines[0].strip()  # The expected one-word category.
    reason = "\n".join(lines[1:]).strip() if len(lines) > 1 else ""

    score = {"Compost": 5, "Recycle": 3, "Landfill": 1}.get(category, 1)

    return jsonify({
        "category": category,
        "score": score,
        "reason": reason,
        "message": gpt_reply  # Optionally return the full GPT response.
    })

@app.route("/", methods=["GET"])
def index():
    return "EcoPlay Flask server is running!"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
