import csv
from pyproj import Transformer

def convert_coordinates(x, y):
    transformer = Transformer.from_crs("epsg:3057", "epsg:4326")  # Convert from ISN93 to WGS84 (GPS coordinates)
    lon, lat = transformer.transform(x, y)
    return lat, lon

input_file = "input.csv"
output_file = "output.csv"

with open(input_file, 'r') as csv_input, open(output_file, 'w', newline='') as csv_output:
    reader = csv.reader(csv_input)
    writer = csv.writer(csv_output)

    # Write header to the output file
    header = next(reader)
    writer.writerow(header + ['latitude', 'longitude'])

    for row in reader:
        x = float(row[0])
        y = float(row[1])

        lat, lon = convert_coordinates(x, y)

        writer.writerow(row + [lat, lon])

print("Conversion completed successfully.")
