#define BLYNK_TEMPLATE_ID "TMPL661gDaEBa"
#define BLYNK_TEMPLATE_NAME "bismillah"
#define BLYNK_AUTH_TOKEN "hKXWdih9Rdi37QnVqRCRsNs50ZcwKFb5"

#define BLYNK_PRINT Serial

#include <WiFi.h>
#include <WiFiClient.h>
#include <BlynkSimpleEsp32.h>
#include <DHT.h>
#include <ESP32Servo.h>

char auth[] = BLYNK_AUTH_TOKEN;
char ssid[] = "Wokwi-GUEST";
char pass[] = "";

#define TRIG_PIN 12
#define ECHO_PIN 13
#define DHT_PIN 2

DHT dht(DHT_PIN, DHT22);
BlynkTimer timer;

void sendDataToBlynk();

void setup() {
  Serial.begin(115200);
  Serial.println("Memulai...");

  // Inisialisasi Blynk
  Serial.print("Menghubungkan ke Wi-Fi...");
  Blynk.begin(auth, ssid, pass); // Koneksi otomatis ke cloud
  Serial.println("Berhasil terhubung ke Blynk!");

  // Inisialisasi pin dan perangkat
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  dht.begin(); // Inisialisasi sensor DHT22

  // Timer untuk pengiriman data ke Blynk setiap 1 detik
  timer.setInterval(1000L, sendDataToBlynk);
}

void loop() {
  Blynk.run();
  timer.run();
}

void sendDataToBlynk() {
  long duration;
  float distance, temperature, humidity;

  // Membaca jarak menggunakan sensor ultrasonik
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  duration = pulseIn(ECHO_PIN, HIGH, 50000); // Timeout 50ms

  // Hitung jarak (cm)
  if (duration == 0) {
    distance = -1; // Jika tidak ada sinyal, nilai default
  } else {
    distance = duration * 0.034 / 2;
    // Validasi jarak
    if (distance < 2 || distance > 400) {
      distance = -1; // Jika jarak di luar batas
    }
  }

  // Membaca data suhu dan kelembapan dari DHT22
  temperature = dht.readTemperature();
  humidity = dht.readHumidity();

  // Validasi data suhu dan kelembapan
  if (isnan(temperature)) temperature = -1;
  if (isnan(humidity)) humidity = -1;

  // Kirim data ke Blynk Virtual Pin
  Blynk.virtualWrite(V0, distance);
  Blynk.virtualWrite(V1, temperature);
  Blynk.virtualWrite(V2, humidity);

  // Log hanya data valid ke Serial Monitor
  Serial.print("Distance: ");
  Serial.print(distance == -1 ? "N/A" : String(distance) + " cm"); // Jika gagal, tampilkan N/A
  Serial.print(", Temperature: ");
  Serial.print(temperature == -1 ? "N/A" : String(temperature) + " °C");
  Serial.print(", Humidity: ");
  Serial.println(humidity == -1 ? "N/A" : String(humidity) + " %");
}
