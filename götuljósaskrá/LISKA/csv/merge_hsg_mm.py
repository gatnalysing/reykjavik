import pandas as pd

# Load the main data CSV file
df_hsg = pd.read_csv('hsg.csv')

# Load the additional data CSV file
df_mm = pd.read_csv('mmv2.csv', delimiter=',')

# Ensure the columns to be matched are of the same type
df_hsg['GLJ_ID'] = df_hsg['GLJ_ID'].astype(str).str.strip()
df_mm['Ljósastaur XID'] = df_mm['Ljósastaur XID'].astype(str).str.strip()

# Drop duplicate rows in mmv2.csv based on 'Ljósastaur XID' to get the first occurrence
df_mm_unique = df_mm.drop_duplicates(subset=['Ljósastaur XID'])

# Merge data from mmv2.csv into hsg.csv based on the matching 'GLJ_ID' and 'Ljósastaur XID'
df_merged = pd.merge(df_hsg, df_mm_unique, left_on='GLJ_ID', right_on='Ljósastaur XID', how='left')

# Print column names for debugging
print("Columns in merged dataframe:", df_merged.columns.tolist())

# Specify the columns to fill in hsg.csv from mmv2.csv
columns_to_fill = [
    'Lóð', 'Viðfang', 'Ljósabúnaður XID', 'Auðkenni ljósabúnaðar (OBJECTID)', 
    'Tegund ljósabúnaðar', 'Heiti tegundar ljósabúnaðar', 'Framleiðandi ljósabúnaðar', 
    'Ljósgjafi', 'Skráð afl [W]', 'Notað ljósstreymi [LM]', 'Litarhitastig [K]', 
    'Ljósdreifing', 'Birgir', 'Ábyrgðartímabil [Ár]', 'Stjórneining', 'Annað', 
    'Lýsing', 'Dags. kveiking', 'Dags. uppsett', 'Eigandi Umsjón-starfsmaður', 
    'Kennitala eiganda', 'Veitutegund', 'Uppsett afl [W]', 'Uppsett ljósstreymi [ln]', 
    'Straumfesta', 'Miðnæturdimming', 'Tengill (Zhaga)', 'Halli ljósabúnaðar', 
    'Litur ljósabúnaðar', 'Þyngd [kg]', 'Vindflötur [m²]', 'Ljóshlíf', 'Lampa verkefni', 
    'Staða'
]

# Clean up column names by stripping spaces and fixing any encoding issues
df_merged.columns = df_merged.columns.str.strip()

# Handle the merging of columns
for column in columns_to_fill:
    column_mm = column + '_y'
    column_hsg = column
    
    if column_mm in df_merged.columns and column_hsg in df_hsg.columns:
        df_hsg[column_hsg] = df_merged[column_mm]
    else:
        print(f"Warning: Column '{column}' not found in the merged dataframe.")

# Write the merged data to a new CSV file
df_hsg.to_csv('hsg_merged.csv', index=False)
