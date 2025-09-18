import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
declare let io: Server;
export declare const initializeSocket: (server: HttpServer) => void;
export { io };
export declare const getReceiverSocketId: (receiverId: string) => string | undefined;
export declare const sendNotificationToUser: (userId: string, notification: any) => void;
//# sourceMappingURL=socket.d.ts.map