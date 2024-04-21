from flask import Flask, request, send_file, Response, jsonify
from ultralytics import YOLO
import math
import cv2
import cvzone
import numpy as np
from PIL import Image
import io
import os
from jinja2 import Template
from weasyprint import HTML
import json

model_path = os.path.join(os.path.dirname(__file__), 'models', 'v1.pt')

model = YOLO(model_path)

app = Flask(__name__)

@app.route('/detect', methods=['POST'])
def predict():
    # classes que o modelo reconhece
    classNames = ['capacete', 'colete-de-seguranca', 'luva', 'mascara', 'oculos', 'sapato', 'sem_capacete', 'sem_colete-de-seguranca', 'sem_luva', 'sem_mascara', 'sem_oculos', 'sem_sapato']
    classNames2 = json.loads(request.form['classNames'])
    try:
        file = request.files['image'].read()  # lê o conteúdo do arquivo
        # Converte o conteúdo do arquivo para um objeto PIL.Image
        image = Image.open(io.BytesIO(file))

        # Converte a imagem para RGB
        image = image.convert('RGB')

        # Converter a imagem para um objeto numpy.array
        image_np = np.array(image)

        # Executa a detecção de objetos no quadro atual
        results = model(image, stream=False)

        # Loop para processar os resultados da detecção
        for r in results:
            boxes = r.boxes
            for box in boxes:
                # Obtem os bounding Box
                x1, y1, x2, y2 = box.xyxy[0]
                x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)

                # Confidence
                conf = math.ceil((box.conf[0] * 100)) / 100
                # Class name
                cls = int(box.cls[0])
                # Current class
                current_class = classNames[cls]
                index = classNames[cls]
                for i in range(len(classNames2)):
                    if index == classNames2[i]:
                        index = i
                        break

                if conf > 0.45:
                    if current_class in ['sem_capacete', 'sem_mascara', 'sem_colete-de-seguranca', 'sem_luva', 'sem_oculos', 'sem_sapato'] and current_class in classNames2:
                        # Cor vermelha
                        myColor = (255, 0, 0)
                        cvzone.putTextRect(image_np, f'{classNames2[index]} {conf}', (max(0, x1), max(35, y1)), scale=1,
                                       thickness=1, colorB=myColor, colorT=(255, 255, 255), colorR=myColor, offset=5)

                        cv2.rectangle(image_np, (x1, y1), (x2, y2), myColor, 3)
                    else:
                        continue

        # Converte o objeto numpy.array para um objeto PIL.Image
        image_output = Image.fromarray(image_np)
        # Cria um objeto BytesIO
        img_io = io.BytesIO()
        # Salva a imagem no objeto BytesIO
        image_output.save(img_io, 'PNG')
        # Move o cursor para o início do objeto BytesIO
        img_io.seek(0)
        # Retorna a imagem
        return send_file(img_io, mimetype='image/png')
    except Exception as e:
        return str(e), 400

@app.route('/report', methods=['POST'])
def report():
    # classes que o modelo reconhece
    classNames = ['capacete', 'colete-de-seguranca', 'luva', 'mascara', 'oculos', 'sapato', 'sem_capacete', 'sem_colete-de-seguranca', 'sem_luva', 'sem_mascara', 'sem_oculos', 'sem_sapato']
    counts = {
        'capacete': 0,
        'colete-de-seguranca': 0,
        'luva': 0,
        'mascara': 0,
        'oculos': 0,
        'sapato': 0,
        'sem_capacete': 0,
        'sem_colete-de-seguranca': 0,
        'sem_luva': 0,
        'sem_mascara': 0,
        'sem_oculos': 0,
        'sem_sapato': 0
    }
    classNames2 = json.loads(request.form['classNames'])
    try:
        file = request.files['image'].read()  # lê o conteúdo do arquivo
        # Converte o conteúdo do arquivo para um objeto PIL.Image
        image = Image.open(io.BytesIO(file))

        # Converte a imagem para RGB
        image = image.convert('RGB')

        # Converter a imagem para um objeto numpy.array
        image_np = np.array(image)

        # Executa a detecção de objetos no quadro atual
        results = model(image, stream=False)

        # Loop para processar os resultados da detecção
        for r in results:
            boxes = r.boxes
            for box in boxes:
                # Obtem os bounding Box
                x1, y1, x2, y2 = box.xyxy[0]
                x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)

                # Confidence
                conf = math.ceil((box.conf[0] * 100)) / 100
                # Class name
                cls = int(box.cls[0])
                # Current class
                current_class = classNames[cls]
                index = classNames[cls]
                for i in range(len(classNames2)):
                    if index == classNames2[i]:
                        index = i
                        break

                if conf > 0.45:
                    if current_class in ['capacete', 'mascara', 'colete-de-seguranca', 'luva', 'oculos', 'sapato'] and current_class in classNames2:
                        myColor = (0, 255, 0)
                        cvzone.putTextRect(image_np, f'{classNames2[index]} {conf}', (max(0, x1), max(35, y1)), scale=1,
                                        thickness=1, colorB=myColor, colorT=(255, 255, 255), colorR=myColor, offset=5)
                        # Desenha a caixa delimitadora
                        cv2.rectangle(image_np, (x1, y1), (x2, y2), myColor, 3)

                        counts[current_class] += 1
                    elif current_class in ['sem_capacete', 'sem_mascara', 'sem_colete-de-seguranca', 'sem_luva', 'sem_oculos', 'sem_sapato'] and current_class in classNames2:
                        myColor = (255, 0, 0)         
                        cvzone.putTextRect(image_np, f'{classNames2[index]} {conf}', (max(0, x1), max(35, y1)), scale=1,
                                        thickness=1, colorB=myColor, colorT=(255, 255, 255), colorR=myColor, offset=5)
                        # Desenha a caixa delimitadora
                        cv2.rectangle(image_np, (x1, y1), (x2, y2), myColor, 3)

                        counts[current_class] += 1              
                    
        filtered_data = {k: v for k, v in counts.items() if v != 0}

        report_data = [{'name': k, 'quantity': v} for k, v in filtered_data.items()]

        ausentes = [item for item in report_data if item['name'].startswith('NO-')]
        detectados = [item for item in report_data if not item['name'].startswith('NO-')]

        # Path to your HTML template
        template_path = './relatorio.html'

        image_output = Image.fromarray(image_np)

        # Convert image to base64
        img_io = io.BytesIO()
        image_output.save(img_io, 'PNG')
        img_io.seek(0)

        import base64
        base64_image = base64.b64encode(img_io.getvalue()).decode('utf-8')

        # Render HTML with dynamic data
        with open(template_path, 'r') as file:
            template_content = file.read()
            template = Template(template_content)
            html_content = template.render(detectados=detectados, ausentes=ausentes, img=str(base64_image))

        pdf_bytes = HTML(string=html_content).write_pdf()

        # Return PDF file as response
        return send_file(io.BytesIO(pdf_bytes), mimetype='application/pdf')
    except Exception as e:
        return str(e), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
