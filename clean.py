import pandas as pd

df = pd.read_csv("students_data.csv")

# Keep only the columns your current model uses
df = df[[
    "weekly_self_study_hours",
    "attendance_percentage",
    "class_participation"
]]

# Remove rows that are completely empty
df = df.dropna(how="all")

# Save clean file
df.to_csv("students_data.csv", index=False)

print("CSV cleaned successfully")
