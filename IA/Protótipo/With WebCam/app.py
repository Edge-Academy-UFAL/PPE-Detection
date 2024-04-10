from ultralytics import YOLO
import cv2
import cvzone
import math

cap = cv2.VideoCapture(0)  # For Webcam
cap.set(3, 1920)
cap.set(4, 1080)


model = YOLO('IA/models/v1.pt')

classNames = ['capacete', 'colete-de-seguranca', 'luva', 'mascara', 'oculos', 'sapato', 'sem_capacete', 'sem_colete-de-seguranca', 'sem_luva', 'sem_mascara', 'sem_oculos', 'sem_sapato']

while True:
    success, img = cap.read()
    results = model(img, stream=True)
    for r in results:
        boxes = r.boxes
        for box in boxes:
            # Bounding Box
            x1, y1, x2, y2 = box.xyxy[0]
            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)

            w, h = x2 - x1, y2 - y1
            cvzone.cornerRect(img, (x1, y1, w, h))

            # Confidence
            conf = math.ceil((box.conf[0] * 100)) / 100

            # Class name
            cls = int(box.cls[0])

            current_class = classNames[cls]

            if current_class == 'capacete' or current_class == 'mascara' or current_class == 'colete-de-seguranca' or current_class == 'luva' or current_class == 'oculos' or current_class == 'sapato':
                        myColor = (0, 255, 0)
            elif current_class == 'sem_capacete' or current_class == 'sem_mascara' or current_class == 'sem_colete-de-seguranca' or current_class == 'sem_luva' or current_class == 'sem_oculos' or current_class == 'sem_sapato':
                myColor = (0, 0, 255)
            else:
                myColor = (255, 0, 0)

            cvzone.putTextRect(img, f'{classNames[cls]} {conf}', (max(0, x1), max(35, y1)), scale=1, thickness=1, colorB=myColor, colorT=(255, 255, 255), colorR=myColor, offset=5)

    cv2.imshow("Image", img)
    cv2.waitKey(1)