from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

# Load environment variables explicitly from the directory of this file
basedir = os.path.abspath(os.path.dirname(__file__))
dotenv_path = os.path.join(basedir, ".env")
load_dotenv(dotenv_path)

openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app)

@app.route("/classify", methods=["POST"])
def classify():
    data = request.json
    item = data.get("item", "")

    # Enhanced prompt with clear formatting instructions.
    prompt = (
    f"You are an eco-friendly disposal assistant. The user is throwing away: '{item}'.\n"
    "Return exactly three lines of text, with no extra lines or text beyond these:\n"
    "Line 1: A single word only: Recycle, Compost, or Landfill.\n"
    "Line 2: A concise explanation of why the item belongs in that category, without repeating the exact category word.\n"
    "Line 3: A short, motivational sentence encouraging the user to continue making eco-friendly choices.\n\n"
    "Scoring reminder:\n"
    "- Recycle = 3 points\n"
    "- Compost = 5 points\n"
    "- Landfill = 1 point\n"
    "Please follow these instructions exactly and produce only these three lines."
)


    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.6
    )

    gpt_reply = response['choices'][0]['message']['content']
    lines = gpt_reply.strip().splitlines()

    # Safeguard: handle unexpected output format
    if len(lines) < 3:
        # Fallback if GPT doesn't follow instructions
        category = "Landfill"
        reason = "GPT didn't provide a valid format."
        tip = "Better luck next time!"
    else:
        category = lines[0].strip()
        reason = lines[1].strip()
        tip = lines[2].strip()

        # Post-process the reason: remove the category word if it appears at the beginning
        if reason.lower().startswith(category.lower()):
            # Remove the category from the beginning. 
            # Also strip typical punctuation and spaces.
            reason = reason[len(category):].lstrip(" :,-.").strip()

    # Determine score based on category
    score_map = {"Compost": 5, "Recycle": 3, "Landfill": 1}
    score = score_map.get(category, 1)

    return jsonify({
        "category": category,
        "score": score,
        "reason": reason,
        "encouragement": tip,
        "message": gpt_reply  # Optionally return the full GPT response for debugging
    })

@app.route("/", methods=["GET"])
def index():
    return "EcoPlay Flask server is running!"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
