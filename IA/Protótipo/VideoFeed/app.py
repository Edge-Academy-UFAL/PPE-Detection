from flask import Flask, Response, jsonify, request
import cv2
import cvzone
import math
import os
from ultralytics import YOLO
import json

app = Flask(__name__)

video_path = "IA/videos/ppe-1.mp4"

model_path = os.path.join(os.path.dirname(__file__), '..', '..','models','v1.pt')

model = YOLO(model_path)

# Defina as classes
classNames = ['capacete', 'colete-de-seguranca', 'luva', 'mascara', 'oculos', 'sapato', 'sem_capacete', 'sem_colete-de-seguranca', 'sem_luva', 'sem_mascara', 'sem_oculos', 'sem_sapato']

missing_epi_set = set()

classNames2 = []

@app.route('/camera_feed')
def camera_feed():
    def generate():
        cap = cv2.VideoCapture(0) 
        print("AQUI2222222222222222222:   ",classNames2)
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

                    index = classNames[cls]

                    for i in range(len(classNames2)):
                        if index == classNames2[i]:
                            index = i
                            break


                    if current_class in ['capacete', 'mascara', 'colete-de-seguranca', 'luva', 'oculos', 'sapato'] and (current_class in classNames2):

                        myColor = (0, 255, 0)
                        cvzone.putTextRect(frame, f'{classNames2[index]} {conf}', (max(0, x1), max(35, y1)), scale=1, thickness=1, colorB=myColor, colorT=(255, 255, 255), colorR=myColor, offset=5)

                    elif current_class in ['sem_capacete', 'sem_mascara', 'sem_colete-de-seguranca', 'sem_luva', 'sem_oculos', 'sem_sapato'] and (current_class in classNames2):
                        myColor = (0, 0, 255)
                        cvzone.putTextRect(frame, f'{classNames2[index]} {conf}', (max(0, x1), max(35, y1)), scale=1, thickness=1, colorB=myColor, colorT=(255, 255, 255), colorR=myColor, offset=5)

                        missing_epi_set.add(current_class[4:])

                    # cvzone.putTextRect(frame, f'{classNames[cls]} {conf}', (max(0, x1), max(35, y1)), scale=1, thickness=1, colorB=myColor, colorT=(255, 255, 255), colorR=myColor, offset=5)

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
    
@app.route('/receiveParams', methods=['POST'])
def receiveParams():
    global classNames2
    data = request.json
    classNames2 = data.get('classNames')
    print("AQUI11111111111111111111111111111",classNames2)
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(debug=True, host='192.168.0.103', port=5001)
