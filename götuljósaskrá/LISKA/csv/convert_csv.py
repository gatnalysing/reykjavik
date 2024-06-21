import pandas as pd

# Load the semicolon-separated CSV file
df = pd.read_csv('mm.csv', delimiter=';')

# Save the dataframe to a new CSV file with comma as the delimiter
df.to_csv('mmv2.csv', index=False)
