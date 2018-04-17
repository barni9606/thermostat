import socket
from mysocket import Socket

serversocket = socket.socket(
    socket.AF_INET, socket.SOCK_STREAM)
serversocket.bind(('', 5001))
#become a server socket
serversocket.listen(1)

while 1:
    #accept connections from outside
    (clientsocket, address) = serversocket.accept()
    #now do something with the clientsocket
    conn = Socket(clientsocket)
    # sock.connect('localhost', 5001)
    with open("test.txt", "w") as f:
        f.write(conn.receive())
        f.flush()