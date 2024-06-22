import io
import os
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload
from oauth2client.service_account import ServiceAccountCredentials
import docx

print("Hello World")

CREDENTIALS_FILE_PATH = './config/credentials.json'

SCOPES = ['https://www.googleapis.com/auth/drive.readonly']

credentials = ServiceAccountCredentials.from_json_keyfile_name(CREDENTIALS_FILE_PATH, scopes=SCOPES)
service = build('drive', 'v3', credentials=credentials)


FILE_ID = '1u3-gjaDkv4K8L5CtboJDDd6yWbZp_Pi45mEIu2p6EVE'

request = service.files().export_media(fileId=FILE_ID, mimeType='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
# request = service.files().get_media(fileId=FILE_ID)

file_handler = io.BytesIO()
downloader = MediaIoBaseDownload(file_handler, request)
done = False

while not done:
    status, done = downloader.next_chunk()
    print(f'Download {int(status.progress() * 100)}%.')

FILE_NAME = 'downloaded_file.docx'
with open(FILE_NAME, 'wb') as f:
    f.write(file_handler.getbuffer())    

if done:
    print('File Retreived from Google Drive sucessfully. Text content:')


def extract_text_from_docx(file_path):
    """Extract text from a DOCX file."""
    doc = docx.Document(file_path)
    result = ""
    for para in doc.paragraphs:
        result += para.text + '\n'
    return result

text = extract_text_from_docx(FILE_NAME)
print(text)