**Project: Optimizing Traffic Light Control at Intersections With AI**


This project, developed by Team Powerpuffboys during the 24-hour 2024-Nigde Smart Cities Artificial Intelligence Hackathon, proposes a solution to improve traffic flow at intersections. The project focuses on detecting approaching vehicles (and pedestrians) and estimating their arrival times to optimize traffic light sequencing.

Motivation

Long waiting times at intersections and roundabouts can significantly impact traffic flow on connected main roads. This project aims to address this challenge by providing real-time data for intelligent traffic light control.

Methodology

Data Collection and Labeling:
    Traffic data was collected from a major intersection near Nevşehir University (Turkey).
    The collected data was labeled for training a deep learning-based object detection algorithm | YoloX and Roboflow Supervision.
    Due to limitations with large file sizes on GitHub, only a small sample of the labeled dataset is included.

Model Development:
    Initial training with YOLO v8 yielded unsatisfactory results.
    The team pivoted to a combined approach using YOLOx and Roboflow Supervision.
    This approach leverages compatible labels for both algorithms, achieving promising results.
    Deep learning model training files are provided in the repository.

Mobile Application Development:
    A mobile application was developed using React Native for user interaction.
    PostgreSQL and SQLite databases manage application data.
    A Java Spring Boot (version 17) backend supports server-side operations.

Documentation and Presentation:
    Project documentation and presentation materials are included in the repository, available in both English (EN) and Turkish (TR).

Note: Due to time constraints, prediction algorithms could not be fully integrated into the project.

Additional Resources

    Videos and app screenshots can be found in the app_images folder.

Further Development

Future iterations of this project will focus on incorporating prediction algorithms to refine traffic light control strategies.

Team Powerpuffboys

This project represents the collaborative effort of Team Powerpuffboys during the hackathon.

THE TEAM:
Cafer Osman YILDIZ: https://www.linkedin.com/in/caferosman/

Caner Mastan: https://www.linkedin.com/in/caner-mastan/

Sena Karadag: https://www.linkedin.com/in/sena-karadag-7a066b21b/

Huseyin Semih Kodalak: https://www.linkedin.com/in/h%C3%BCseyin-semih-kodalak-638720251/




https://github.com/ottosman/AI-Hackathon-2024-TR/assets/90345196/c90cb763-5773-4172-a758-984a7f700b73



