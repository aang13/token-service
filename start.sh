#!/usr/bin/env sh

# Check if ports are already in use. Kill the associated process
function is_port_in_use {
  local port=$1
  local pid=$(lsof -ti :$port)

  if [ -n "$pid" ]; then
    echo "Port $port is already in use. Killing the process with PID $pid "
    kill -9 $pid
  fi
}

is_port_in_use 8001
is_port_in_use 8002

# Starting Apps:

# Start the Generator Service
 cd generator && ./mvnw spring-boot:run &

 # Start the Validator Service
 cd validator && ./mvnw spring-boot:run &

 # Start the frontend
  cd frontend && npm start