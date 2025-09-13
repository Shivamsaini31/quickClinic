import { Server as HttpServer } from 'http';
export declare const initializeSocket: (server: HttpServer) => void;
export declare const getReceiverSocketId: (receiverId: string) => string | undefined;
export declare const sendNotificationToUser: (userId: string, notification: any) => void;
//# sourceMappingURL=socket.d.ts.map