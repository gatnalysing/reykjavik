import pandas as pd

# Load the filtered data with GPS CSV file
df_filtered_with_gps = pd.read_csv('filtered_data_with_gps.csv')

# Load the additional data CSV file with specified delimiter and data types
df_additional = pd.read_csv('MM_Ljosbunadur_1106-2024.csv', delimiter=';', dtype={'Ljósastaur XID': str})

# Ensure the columns to be matched are of the same type
df_filtered_with_gps['GLJ_ID'] = df_filtered_with_gps['GLJ_ID'].astype(str)

# Merge additional data from MM_Ljosbunadur_1106-2024.csv into filtered_data_with_gps.csv
df_merged_final = pd.merge(df_filtered_with_gps, df_additional, left_on='GLJ_ID', right_on='Ljósastaur XID', how='left')

# Write the final merged data to a new CSV file
df_merged_final.to_csv('filtered_data_with_gps_additional.csv', index=False)
