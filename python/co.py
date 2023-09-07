import csv
import sys
import os
from datetime import datetime
from pyproj import Transformer

def convert_coordinates(x, y):
    transformer = Transformer.from_crs(
        "epsg:3057",
        "epsg:4326"
    )  # Convert from ISN93 to WGS84 (GPS coordinates)
    lat, lon = transformer.transform(x, y)
    return lat, lon

def format_coordinate(coord_str):
    # If a dot already exists in the string, return it as is (as a float)
    if '.' in coord_str:
        return float(coord_str)
    # Else, format as before
    return float(coord_str[:-3] + '.' + coord_str[-3:])

def main(input_file):
  
    # Extract the file name without the extension and its extension
    base_name, extension = os.path.splitext(input_file)
    # Construct the new output file name
    output_file = f"{base_name}-umbreytt{datetime.now().strftime('%Y%m%d%H%M')}{extension}"
    
    # Step 1: Determine the number of lines in the input file
    with open(input_file, 'r') as f:
        total_lines = sum(1 for line in f) - 1  # Subtract 1 for the header

    with open(input_file, 'r') as csv_input, open(output_file, 'w', newline='') as csv_output:
        reader = csv.DictReader(csv_input)
        fieldnames = ["latitude", "longitude", "name", "status", "type", "colour", "DNR", "EIGANDI", "DAGS"]
        writer = csv.DictWriter(csv_output, fieldnames=fieldnames)

        # Write header to the output file
        writer.writeheader()

        # Process each row and print progress
        for index, row in enumerate(reader, 1):
            x = format_coordinate(row['X'])
            y = format_coordinate(row['Y'])
            lat, lon = convert_coordinates(x, y)

            new_row = {
                "latitude": lat,
                "longitude": lon,
                "name": row['GLJ_ID'],
                "status": "",
                "type": row['HLUTVERK'],
                "colour": "blue" if row['HLUTVERK'] == "Götuljós" else "green",
                "DNR": row['DNR'],
                "EIGANDI": row['EIGANDI'],
                "DAGS": row['DAGSINNSETNINGAR'].split()[0] if row['DAGSINNSETNINGAR'] else "1776/07/04"  # Extract the date without time
            }
            writer.writerow(new_row)

            # Step 2: Print progress
            print(f"Progress: Converting line {index} of {total_lines}", end='\r')  # end='\r' will overwrite the line in the console, keeping it neat

    print("\nConversion completed successfully.")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: python3 {sys.argv[0]} <input_file.csv>")
        sys.exit(1)

    main(sys.argv[1])