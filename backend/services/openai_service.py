import os
from openai import OpenAI


def _get_client():
    return OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

SYSTEM_PROMPT = """You are TripAssist AI, a knowledgeable and friendly corporate travel assistant for Spotnana.

Your role is to help business travelers with:
- Travel policy questions (per diems, class of travel, hotel budgets)
- Visa and document requirements for international travel
- Flight booking guidance and airline recommendations
- Travel disruption handling (cancellations, delays, rebooking)
- Expense reimbursement processes
- General travel tips and best practices

Guidelines:
- Be concise but thorough in your responses
- Use bullet points and structured formatting when listing multiple items
- If you don't have specific company policy details, provide general corporate travel best practices
- Always be professional, helpful, and proactive in suggesting related information
- When discussing costs, mention that actual amounts may vary by company policy
"""


def get_chat_response(messages: list[dict]) -> str:
    formatted_messages = [{'role': 'system', 'content': SYSTEM_PROMPT}]

    for msg in messages:
        formatted_messages.append({
            'role': msg['role'],
            'content': msg['content']
        })

    client = _get_client()
    response = client.chat.completions.create(
        model='gpt-4o-mini',
        messages=formatted_messages,
        temperature=0.7,
        max_tokens=1000,
    )

    return response.choices[0].message.content
