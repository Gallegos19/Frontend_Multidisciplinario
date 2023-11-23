import { over } from "stompjs";
import SockJS from "sockjs-client/dist/sockjs";

const URI = "http://localhost:8081/ws";
let socket = new SockJS(URI);
export const stompClient = over(socket);
