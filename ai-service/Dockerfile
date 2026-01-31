FROM python:3.9-slim

WORKDIR /app

# Install dependencies
RUN pip install --no-cache-dir flask scikit-learn pandas

COPY app.py .
COPY model/ ./model/

EXPOSE 5001

CMD ["python", "app.py"]
