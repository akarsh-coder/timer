Here’s your **README.md** with setup instructions for both **yarn** and **npm**, excluding iOS instructions.  

---

# **🕒 Timer App**  

## **📌 Setup Instructions**  

### **🔧 Prerequisites**  
Ensure you have the following installed before setting up the project:  
- [Node.js](https://nodejs.org/) (Latest LTS recommended)  
- [React Native CLI](https://reactnative.dev/docs/environment-setup)  
- [Android Studio](https://developer.android.com/studio) (For Android development)  
- [Yarn](https://yarnpkg.com/) or npm (Choose one for package management)  

### **📥 1️⃣ Clone the Repository**  
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### **📦 2️⃣ Install Dependencies**  
Using **Yarn**:  
```bash
yarn install
```
Using **npm**:  
```bash
npm install
```

### **🚀 3️⃣ Run the Application**  
For Android:  
Using **Yarn**:  
```bash
yarn android
```
Using **npm**:  
```bash
npm run android
```

---

## **📌 Assumptions Made During Development**  

### **🔹 State Management**  
- The app uses **useState + useReducer** instead of Redux for global state management.  

### **🔹 Timer Functionality**  
- A global interval (`setInterval`) updates timers every second.  
- When a timer reaches **0**, it is marked as `"completed"` and stored in history.  

### **🔹 History Feature**  
- Each completed timer is logged with:  
  - Timer **name**  
  - **Duration** set  
- This history is displayed on a separate **History Screen**.  

### **🔹 AsyncStorage for Persistence**  
- Timers are stored in `AsyncStorage` to persist across app restarts.  
- If `AsyncStorage` fails, errors are logged to prevent crashes.  

### **🔹 UI & UX**  
- Minimalist **black-themed modal** appears when a timer completes.  
- Completed timers are visually distinct (`gray background, ✅ Completed label`).  

---

This README ensures smooth setup and helps developers understand key design choices. Let me know if you need any modifications! 🚀