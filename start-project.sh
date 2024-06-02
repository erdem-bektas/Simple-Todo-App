#!/bin/bash

APP_DIR="./app"
SERVER_DIR="./server"

APP_LOG="app.log"
SERVER_LOG="server.log"
APP_PID="app.pid"
SERVER_PID="server.pid"

cd $APP_DIR
if [ ! -d "node_modules" ]; then
  echo "Installing npm packages for app..."
  npm install
fi
npm run dev > "../$APP_LOG" 2>&1 &
echo $! > "../$APP_PID"

cd "../$SERVER_DIR"
if [ ! -d "node_modules" ]; then
  echo "Installing npm packages for server..."
  npm install
fi
npm run dev > "../$SERVER_LOG" 2>&1 &
echo $! > "../$SERVER_PID"

echo "Projects are running. Logs are being written to $APP_LOG and $SERVER_LOG."
echo "To stop the projects, use the following command:"
echo "kill \$(cat $APP_PID) \$(cat $SERVER_PID)"