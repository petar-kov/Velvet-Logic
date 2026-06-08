import json
import os
import glob
import re

brain_dir = r"C:\Users\kpeta\.gemini\antigravity\brain"
pattern = re.compile(r'\b(SEO|GEO)\b', re.IGNORECASE)

for transcript_path in glob.glob(os.path.join(brain_dir, '*', '.system_generated', 'logs', 'transcript.jsonl')):
    with open(transcript_path, 'r', encoding='utf-8') as f:
        for line in f:
            try:
                data = json.loads(line)
                if 'content' in data and data['content']:
                    content = data['content']
                    if pattern.search(content):
                        # Filter out tool output unless it's a message from user/model
                        if data.get('type') in ['USER_INPUT', 'PLANNER_RESPONSE', 'MODEL_RESPONSE', 'CHAT_MESSAGE']:
                            print(f"--- Found in {transcript_path} ---")
                            print(f"Type: {data.get('type')}")
                            # Print a snippet
                            print(content[:1000])
                            print("-" * 40)
            except Exception as e:
                pass
