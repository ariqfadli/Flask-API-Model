import csv
import random

def is_stunted(berat, panjang, kepala, data_berat, data_panjang, data_kepala):
    return (
        berat < data_berat[0] or berat > data_berat[1] or
        panjang < data_panjang[0] or panjang > data_panjang[1] or
        kepala < data_kepala[0] or kepala > data_kepala[1]
    )

file_path_input = r'D:\CAPESTONE\Stunting\dataset.csv'
file_path_output = r'D:\CAPESTONE\Stunting\datastunt.csv'

with open(file_path_input, 'r') as file:
    csvreader = csv.DictReader(file)
    original_data = list(csvreader)

random_entries = []

for _ in range(1000):
    jenis_kelamin = random.choice(["Laki-laki", "Perempuan"])
    umur_bulan = random.randint(0, 36)
    berat = round(random.uniform(2.4, 18.3), 2)
    panjang = round(random.uniform(46.1, 103.5), 2)
    lingkar_kepala = round(random.uniform(32.4, 39.6), 2)

    for row in original_data:
        if row['umur'] == str(umur_bulan):
            data_berat = [float(row['batas bawah berat']), float(row['batas atas berat'])]
            data_panjang = [float(row['batas bawah panjang']), float(row['batas atas panjang'])]
            data_kepala = [float(row['batas bawah kepala']), float(row['batas atas kepala'])]

            if is_stunted(berat, panjang, lingkar_kepala, data_berat, data_panjang, data_kepala):
                result = "1"
            else:
                result = "0"

            selected_data = {
                'jenis_kelamin': jenis_kelamin,
                'umur': umur_bulan,
                'berat': berat,
                'panjang': panjang,
                'kepala': lingkar_kepala,
                'hasil_stunting': result
            }
            random_entries.append(selected_data)
            break

fieldnames = ['jenis_kelamin', 'umur', 'berat', 'panjang', 'kepala', 'hasil_stunting']

with open(file_path_output, 'a', newline='') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    for data in random_entries:
        writer.writerow(data)

print("data sudah diinputkan")