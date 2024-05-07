import requests
import ultralytics
import supervision as sv
import cv2
import numpy as np
import cv2
import json
import os
import json

from networkx import intersection

# Eğitimli yolov8 model yükle; nano/small/medium/large/xlarge
MODEL = "yolov8x.pt"
model = ultralytics.YOLO(MODEL)
model.fuse()


def runAI(image_name):
    IMAGE_PATH = f"frames/{image_name}"
    print(IMAGE_PATH)
    CLASS_NAMES_DICT = model.model.names

    # kullanılan classlar - car, motorcycle, bus, truck
    selected_classes = [2, 3, 5, 7]

    # bizim verisetinden görüntü yükle yükle
    frame = cv2.imread(IMAGE_PATH)

    # kutucukların ayarlaması
    box_annotator = sv.BoxAnnotator(thickness=2, text_thickness=1, text_scale=1)

    # tek bir framein tanımlanması ve supervision kullanım değerleri
    results = model(frame, verbose=False)[0]

    # tespitlere dönüştür
    detections = sv.Detections.from_ultralytics(results)
    # sadece yukarıda seçilen klasların kullanılması ve tespit değerleri numpy dizisi
    detections = detections[np.isin(detections.class_id, selected_classes)]

    # label formatı
    labels = [
        f"{CLASS_NAMES_DICT[class_id]} {confidence:0.6f}"
        for confidence, class_id in zip(detections.confidence, detections.class_id)
    ]

    # etiketle ve göster frameleri
    annotated_frame = box_annotator.annotate(scene=frame, detections=detections, labels=labels)

    # etiketlenmiş verileri kaydet

    output_image_path = f"annotated_frames/{image_name}"
    cv2.imwrite(output_image_path, annotated_frame)

    # araba sayılarını bas (JSON ATILACAK ŞİMDİLİK BÖYLE)

    import datetime
    """def save_data_to_txt(vehicle_count, intersection):
        now = datetime.datetime.now()
        date_str = now.strftime("%d.%m.%Y")
        time_str = now.strftime("%H:%M")

        data_str = f"vehicle_count = {vehicle_count}, intersection = {intersection}, date = {date_str}, time = {time_str}\n"

        with open("/content/drive/MyDrive/HEKATON/output/count/data.txt", "a") as file:
            file.write(data_str)"""

    num_cars = len(detections)
    # save_data_to_txt(num_cars, "Kavşak İsmi")

    intersection = "Nevşehir Üniversite Kavşağı"
    # print("araba sayısı:", num_cars)
    data = {
        "vehicle_count": num_cars,
        "intersection": intersection,
        "date": datetime.datetime.now().strftime("%d.%m.%Y"),
        "time": datetime.datetime.now().strftime("%H:%M")
    }
    print(data)

    response = {
        "vehicle_count": num_cars,
        "image_name": image_name,
    }

    # TODO: uygun response döndür
    requests.post("http://172.20.10.7:8082/api/save", json=data)
    return response

from flask import Flask, send_file

app = Flask(__name__)

@app.route("/api/image/<image_name>", methods=["GET"])
def get_image(image_name):
    # Görsel dosyasının yolu
    image_path = f"annotated_frames/{image_name}"
    print(image_path)
    try:
        # return runAI(image_name)
        # Görseli kullanıcıya gönder
        return send_file(image_path, mimetype='image/jpeg')
    except FileNotFoundError:
        # Eğer dosya bulunamazsa 404 hatası dön
        return "Image not found", 404


@app.route("/api/runAI/<image_name>",
           methods=["GET"])  # normalde interception olması lazım simülasyon için image_name oldu
def run(image_name):
    try:
        return runAI(image_name)
    except:
        raise Exception("HATA!")


if __name__ == "__main__":
    port = 5057
    print("Model yükleniyor...")
    app.run(debug=True, port=port, host='0.0.0.0')
    import socket

    hostname = socket.gethostname()
    ip_address = socket.gethostbyname(hostname)

    print("Hostname:", hostname)
    print("IP Address:", ip_address)
    print(f"Server başlatıldı. Port:{port}")