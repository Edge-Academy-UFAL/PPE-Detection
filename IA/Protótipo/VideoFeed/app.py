from flask import Flask, Response, jsonify
import cv2
import cvzone
import math
import os
from ultralytics import YOLO

app = Flask(__name__)

# Função para ler o vídeo local
def read_video(video_path):
    try:
        cap = cv2.VideoCapture(video_path)
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            yield frame
        cap.release()
    except Exception as e:
        print(f"Erro ao ler o vídeo: {e}")

video_path = "IA/videos/ppe-1.mp4"

model_path = os.path.join(os.path.dirname(__file__), '..', '..','models','v1.pt')

model = YOLO(model_path)

# Defina as classes
classNames = ['capacete', 'colete-de-seguranca', 'luva', 'mascara', 'oculos', 'sapato', 'sem_capacete', 'sem_colete-de-seguranca', 'sem_luva', 'sem_mascara', 'sem_oculos', 'sem_sapato']

missing_epi_set = set()

@app.route('/video_feed')
def video_feed():
    def generate():
        for frame in read_video(video_path):
            global missing_epi_set
            missing_epi_set.clear()
            
            results = model(frame, stream=True)

            # Processar os resultados
            for r in results:
                boxes = r.boxes
                for box in boxes:
                    # Bounding Box
                    x1, y1, x2, y2 = box.xyxy[0]
                    x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)

                    # Confidence
                    conf = math.ceil((box.conf[0] * 100)) / 100

                    # Class name
                    cls = int(box.cls[0])

                    current_class = classNames[cls]

                    if current_class.startswith('sem_'):
                        missing_epi_set.add(current_class[4:])

                    if current_class in ['capacete', 'mascara', 'colete-de-seguranca', 'luva', 'oculos', 'sapato']:
                        myColor = (0, 255, 0)
                    elif current_class in ['sem_capacete', 'sem_mascara', 'sem_colete-de-seguranca', 'sem_luva', 'sem_oculos', 'sem_sapato']:
                        myColor = (0, 0, 255)
                        
                    else:
                        myColor = (255, 0, 0)

                    cvzone.putTextRect(frame, f'{classNames[cls]} {conf}', (max(0, x1), max(35, y1)), scale=1, thickness=1, colorB=myColor, colorT=(255, 255, 255), colorR=myColor, offset=5)

            # Codificar o frame em JPEG para transmissão
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()

            # Envie o frame como parte do stream de vídeo
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    return Response(generate(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/camera_feed')
def camera_feed():
    def generate():
        cap = cv2.VideoCapture(0) 

        if not cap.isOpened():
            print("Erro ao acessar a câmera")
            return

        while True:
            ret, frame = cap.read()
            if not ret:
                break

            results = model(frame, stream=True)

            
            for r in results:
                boxes = r.boxes
                for box in boxes:
                    # Bounding Box
                    x1, y1, x2, y2 = box.xyxy[0]
                    x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)

                    # Confidence
                    conf = math.ceil((box.conf[0] * 100)) / 100

                    # Class name
                    cls = int(box.cls[0])

                    current_class = classNames[cls]

                    if current_class.startswith('sem_'):
                        missing_epi_set.add(current_class[4:])

                    if current_class in ['capacete', 'mascara', 'colete-de-seguranca', 'luva', 'oculos', 'sapato']:

                        myColor = (0, 255, 0)
                    elif current_class in ['sem_capacete', 'sem_mascara', 'sem_colete-de-seguranca', 'sem_luva', 'sem_oculos', 'sem_sapato']:
                        myColor = (0, 0, 255)
                        
                    else:
                        myColor = (255, 0, 0)

                    cvzone.putTextRect(frame, f'{classNames[cls]} {conf}', (max(0, x1), max(35, y1)), scale=1, thickness=1, colorB=myColor, colorT=(255, 255, 255), colorR=myColor, offset=5)

            # Codificar o frame em JPEG para transmissão
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()

            # Envie o frame como parte do stream de vídeo
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

        cap.release()

    return Response(generate(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/missing_epi')
def send_missing_epi():
    global missing_epi_set
    if missing_epi_set:
        response = jsonify({"missing_epi": list(missing_epi_set)})
        return response
    else:
        return jsonify({})

if __name__ == '__main__':
    app.run(debug=True, host='192.168.1.113', port=5001)
