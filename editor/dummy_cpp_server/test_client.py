#!/usr/bin/env python3
"""
Test client for C++ ZeroMQ Server
Tests all operations defined in communication.pdf
"""

import zmq
import json
import sys

def send_request(socket, request_type, payload, request_id=None):
    """Send a request and print the response"""
    if request_id is None:
        import time
        request_id = f"test-{int(time.time())}"
    
    request = {
        "type": request_type,
        "requestId": request_id,
        "payload": payload
    }
    
    print(f"\n{'='*60}")
    print(f"SENDING: {request_type}")
    print(f"{'='*60}")
    print(json.dumps(request, indent=2))
    
    socket.send_json(request)
    response = socket.recv_json()
    
    print(f"\n{'='*60}")
    print(f"RESPONSE:")
    print(f"{'='*60}")
    print(json.dumps(response, indent=2))
    
    return response

def main():
    # Connect to server
    context = zmq.Context()
    socket = context.socket(zmq.REQ)
    socket.connect("tcp://localhost:5555")
    
    print("Connected to server at tcp://localhost:5555")
    print("Running test suite...")
    
    try:
        # Test 1: Get Canvas
        send_request(socket, "getCanvas", {
            "canvasId": "canvas-1"
        })
        
        # Test 2: Add Component
        send_request(socket, "addComponent", {
            "componentId": "10",
            "canvasComponentId": "C1001"
        })
        
        # Test 3: Delete Components
        send_request(socket, "deleteComponents", {
            "canvasComponentIds": ["C1001", "C1002"]
        })
        
        # Test 4: Move Component
        send_request(socket, "moveComponent", {
            "canvasComponentId": "C44",
            "position": {"x": 120, "y": 80}
        })
        
        # Test 5: Rotate Components
        send_request(socket, "rotateComponents", {
            "canvasComponentIds": ["C10", "C11"]
        })
        
        # Test 6: Flip Horizontally
        send_request(socket, "flipX", {
            "canvasComponentIds": ["C10", "C11"]
        })
        
        # Test 7: Flip Vertically
        send_request(socket, "flipY", {
            "canvasComponentIds": ["C10"]
        })
        
        # Test 8: Resize Component
        send_request(socket, "resizeComponent", {
            "componentId": "5",
            "canvasComponentId": "C20",
            "width": 80,
            "height": 40,
            "position": {"x": 100, "y": 100}
        })
        
        # Test 9: Paste Components
        send_request(socket, "pasteComponents", {
            "components": [
                {
                    "componentId": "8",
                    "canvasComponentId": "C501",
                    "position": {"x": 140, "y": 200}
                }
            ]
        })
        
        # Test 10: Add Wire
        send_request(socket, "addWire", {
            "id": "W100",
            "connPoint1": {"canvasComponentId": "C1", "pinId": "P1"},
            "connPoint2": {"canvasComponentId": "C2", "pinId": "P2"}
        })
        
        # Test 11: Delete Wire
        send_request(socket, "deleteWire", {
            "id": "W100"
        })
        
        # Test 12: Unknown operation (should return error)
        send_request(socket, "unknownOperation", {
            "someData": "test"
        })
        
        print(f"\n{'='*60}")
        print("✓ All tests completed!")
        print(f"{'='*60}\n")
        
    except KeyboardInterrupt:
        print("\n\nTest interrupted by user")
    except Exception as e:
        print(f"\n\nError: {e}")
    finally:
        socket.close()
        context.term()

if __name__ == "__main__":
    main()
