FROM python:3.9-slim

WORKDIR /app

# Install dependencies
RUN pip install --no-cache-dir flask scikit-learn pandas requests

COPY app.py .

# Create the model directory and ensure it exists
RUN mkdir -p model

# Copy model only if it exists in the build context
# Note: For production, we recommend downloading the model from a URL 
# if it's not committed to Git due to size limits.
COPY model* ./model/

EXPOSE 5001

CMD ["python", "app.py"]
