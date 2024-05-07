import ultralytics
import supervision as sv
import cv2
import numpy as np

# Load pre-trained YOLOv8 model
MODEL = "yolov8n.pt"
model = ultralytics.YOLO(MODEL)
model.fuse()

# dict mapping class_id to class_name
CLASS_NAMES_DICT = model.model.names

# class_ids of interest - car, motorcycle, bus, and truck
selected_classes = [2, 3, 5, 7]

# path to your single image

IMAGE_PATH = "C:/Users/Osdijum/Desktop/NIGDE/nevsehir-kavsak-veri/images/all/00023.jpeg"
   

# load the image
frame = cv2.imread(IMAGE_PATH)

# create instance of BoxAnnotator
box_annotator = sv.BoxAnnotator(thickness=1, text_thickness=1, text_scale=1)

# model prediction on single frame and conversion to supervision Detections
results = model(frame, verbose=False)[0]

# convert to Detections
detections = sv.Detections.from_ultralytics(results)
# only consider class id from selected_classes defined above
detections = detections[np.isin(detections.class_id, selected_classes)]

# format custom labels
labels = [
    f"{CLASS_NAMES_DICT[class_id]} {confidence:0.6f}"
    for confidence, class_id in zip(detections.confidence, detections.class_id)
]

# annotate and display frame
annotated_frame = box_annotator.annotate(scene=frame, detections=detections, labels=labels)

# save the annotated frame
output_image_path = "C:/Users/Osdijum/Desktop/NIGDE/nevsehir-kavsak-veri/images/output/f-1.jpeg"
cv2.imwrite(output_image_path, annotated_frame)

# count the number of cars
num_cars = len(detections)
print("Number of cars detected:", num_cars)
