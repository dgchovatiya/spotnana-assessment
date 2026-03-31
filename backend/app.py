from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from services.openai_service import get_chat_response

load_dotenv()

app = Flask(__name__)
CORS(app)


@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok', 'message': 'TripAssist AI backend is running'})


@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()

    if not data or 'messages' not in data:
        return jsonify({'error': 'Messages are required'}), 400

    messages = data['messages']

    if not messages or len(messages) == 0:
        return jsonify({'error': 'At least one message is required'}), 400

    try:
        response = get_chat_response(messages)
        return jsonify({'response': response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5001)
