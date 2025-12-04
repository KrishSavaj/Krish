import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score, mean_absolute_error
import joblib
import matplotlib.pyplot as plt

# ===  Load dataset ===
df = pd.read_csv("../results/per_net_dataset1.csv")

# Drop any rows with missing or invalid data
df = df.replace([np.inf, -np.inf], np.nan).dropna()

# ===  Define features and target ===
# Input features (X)
feature_cols = [
    "pos_norm",
    "manhattan_len",
    "bbox_area",
    "overlap_frac",
    "pin_count",
    "net_index_in_order",
    "order_total_est_len",
    "order_mean_overlap",
    "order_std_overlap",
    "order_mean_manhattan",
    "order_final_occupied_ratio",
]

# Target (y): what we want to predict (routing cost)
target_col = "est_routed_len"

X = df[feature_cols]
y = df[target_col]

# ===  Train/test split ===
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ===  Train model ===
model = RandomForestRegressor(
    n_estimators=300, max_depth=20, random_state=42, n_jobs=-1
)
model.fit(X_train, y_train)

# ===  Evaluate ===
y_pred = model.predict(X_test)
r2 = r2_score(y_test, y_pred)
mae = mean_absolute_error(y_test, y_pred)

print(f" Model trained successfully!")
print(f"R² Score: {r2:.4f}")
print(f"MAE: {mae:.4f}")

# ===  Feature importance plot ===
importances = model.feature_importances_
plt.figure(figsize=(10,5))
plt.barh(feature_cols, importances)
plt.title("Feature Importance for Routing Cost Prediction")
plt.xlabel("Importance")
plt.tight_layout()
plt.show()

# ===  Save model ===
joblib.dump(model, "../results/net_cost_model.pkl")
print(" Model saved to ../results/net_cost_model.pkl")
