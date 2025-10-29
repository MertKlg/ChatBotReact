import { io, Socket } from "socket.io-client"
import { API_BASE_URL } from "./api"
import authStorage from "../storage/auth-storage"

class SocketService {
    public static instance: SocketService
    private socket: Socket | null = null

    private constructor() { }

    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService()
        }
        return SocketService.instance
    }


    public connect() {
        // If socket already connected
        if (this.socket && this.socket.connected) {
            return;
        }
        // If socket not already connected, create new one
        this.socket = io(
            API_BASE_URL,
            {
                auth: {
                    token: authStorage.getState().accessToken
                },
                reconnection: true,
                reconnectionAttempts: 5,
                transports: ["websocket"]
            }
        )

        this.socket.on("connect", () => {
            console.log("connection succesfull")
        })

        this.socket.on("disconnect", (reason) => {
            console.log("Socket disconnected", reason)
        })

        this.socket.on("connect_error", (error) => {
            console.error("Socket io connect_error: ", error)
        })
    }

    public emit(name: string, data: any): void {
        if (this.socket) {
            this.socket.emit(name, data)
        } else {
            console.log("Might be socket won'T connected")
        }
    }

    public on(eventName: string, listener: (...args: any[]) => void): void {
        if (this.socket) {
            this.socket.on(eventName, listener);
        }
    }

    public off(eventName: string, listener: (...args: any[]) => void): void {
        if (this.socket)
            this.socket.off(eventName, listener)
    }

    public disconnect() {
        if (this.socket) {
            this.socket.disconnect()
            this.socket = null
        }
    }

}

export default SocketService.getInstance()