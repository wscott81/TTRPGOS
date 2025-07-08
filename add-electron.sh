#!/bin/bash

echo "Adding Electron to ttrpg-os-starter..."

# Step 1: Ensure we're in the project directory
if [ ! -f "package.json" ]; then
    echo "ERROR: Run this script from inside your React project directory!"
    exit 1
fi

# Step 2: Install Electron
npm install --save-dev electron

# Step 3: Create Electron main.js
cat << 'EOF' > public/electron-main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      contextIsolation: true,
    },
  });

  win.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
EOF

# Step 4: Add Electron script to package.json
echo "Adding 'electron' run script to package.json..."

# Backup package.json first
cp package.json package.json.bak

# Insert the new script using jq (safe way)
npm pkg set scripts.electron="electron public/electron-main.js"

echo "Done!"

echo "Next steps:"
echo "1. In one terminal: npm start  (start React dev server)"
echo "2. In another terminal: npm run electron  (launch Electron Desktop window)"

echo "✅ Electron setup complete!"

