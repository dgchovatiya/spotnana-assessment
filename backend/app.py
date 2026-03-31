import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from openai import RateLimitError, AuthenticationError, APIConnectionError
from services.openai_service import get_chat_response

load_dotenv()

app = Flask(__name__)
CORS(app)


@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok', 'message': 'TripAssist AI backend is running'})


@app.route('/api/chat', methods=['POST'])
def chat():
    if not os.getenv('OPENAI_API_KEY'):
        return jsonify({'error': 'OpenAI API key is not configured. Please add it to backend/.env'}), 503

    data = request.get_json()

    if not data or 'messages' not in data:
        return jsonify({'error': 'Messages are required.'}), 400

    messages = data['messages']

    if not messages or len(messages) == 0:
        return jsonify({'error': 'At least one message is required.'}), 400

    try:
        response = get_chat_response(messages)
        return jsonify({'response': response})
    except AuthenticationError:
        return jsonify({'error': 'Invalid API key. Please check your OpenAI API key configuration.'}), 401
    except RateLimitError:
        return jsonify({'error': 'Too many requests. Please wait a moment and try again.'}), 429
    except APIConnectionError:
        return jsonify({'error': 'Unable to connect to OpenAI. Please check your internet connection.'}), 502
    except Exception as e:
        return jsonify({'error': f'Something went wrong: {str(e)}'}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5001)
