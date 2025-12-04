#include <czmq.h>
#include <stdio.h>
#include <stdlib.h>

void run_server() {
    zsock_t *server = zsock_new_rep("ipc:///tmp/zeromq-ipc");
    if (!server) {
        printf("Failed to create server socket\n");
        return;
    }
    printf("Server listening on port 5555...\n");

    char buffer [100];
    while (1) {
        char *request = zstr_recv(server);
        zstr_send(server, "1");
	printf ("length = %d\n",strlen(request));
    }
    zsock_destroy(&server);
}

void run_client() {
    zsock_t *client = zsock_new_req("tcp://127.0.0.1:5555");
    if (!client) {
        printf("Failed to create client socket\n");
        return;
    }
    printf("Client connecting to server...\n");

    zstr_send(client, "Hello from Client!");
    
    char *reply = zstr_recv(client);
    if (reply) {
        printf("Received reply: %s\n", reply);
        free(reply);
    }

    zsock_destroy(&client);
}

int main(int argc, char *argv[]) {
    if (argc < 2) {
        printf("Usage: %s [server|client]\n", argv[0]);
        return EXIT_FAILURE;
    }

    if (strcmp(argv[1], "server") == 0) {
        run_server();
    } else if (strcmp(argv[1], "client") == 0) {
        run_client();
    } else {
        printf("Invalid argument: use 'server' or 'client'\n");
        return EXIT_FAILURE;
    }

    return EXIT_SUCCESS;
}
