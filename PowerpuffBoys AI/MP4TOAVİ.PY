import moviepy.editor as mp
from moviepy.video.io.ffmpeg_tools import ffmpeg_extract_subclip

# MP4 dosyasının yolunu girin
mp4_dosya_yolu = "D:\Downloads-D\vehicle-counting.mp4"

# AVI dosyasının adını ve yolunu girin
avi_dosya_yolu = "D:\Downloads-D\mekkuin.mp4"

# MP4 dosyasını okuyun
video = mp.VideoFileClip(mp4_dosya_yolu)

# AVI dosyasını oluşturun
video.write_videofile(avi_dosya_yolu, codec="libx264", fps=video.fps)

# Dönüştürme tamamlandı mesajı yazdırın
print("MP4 dosyası AVI dosyasına başarıyla dönüştürüldü!")
