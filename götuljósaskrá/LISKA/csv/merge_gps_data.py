import pandas as pd

# Load the filtered data CSV file
df_filtered = pd.read_csv('filtered_data.csv')

# Load the GPS data CSV file
df_gps = pd.read_csv('gps.csv')

# Ensure the columns to be matched are of the same type
df_filtered['GLJ_ID'] = df_filtered['GLJ_ID'].astype(str)
df_gps['NAFN'] = df_gps['NAFN'].astype(str)

# Merge the LAT and LON from gps.csv into filtered_data.csv based on GLJ_ID and NAFN
df_merged = pd.merge(df_filtered, df_gps[['NAFN', 'LAT', 'LON']], left_on='GLJ_ID', right_on='NAFN', how='left')

# Drop the duplicate column used for merging
df_merged = df_merged.drop(columns=['NAFN'])

# Write the merged data to a new CSV file
df_merged.to_csv('filtered_data_with_gps.csv', index=False)

