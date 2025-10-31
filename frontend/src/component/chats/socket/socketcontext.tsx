import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const PROD = process.env.NODE_ENV === 'production';

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';
    const API_ORIGIN = (() => {
      try { return new URL(API_URL).origin; } catch { return 'http://localhost:5000'; }
    })();

    const WS_URL = process.env.REACT_APP_WS_URL || API_ORIGIN;

    const newSocket = io(WS_URL, {
      path: '/socket.io',
      withCredentials: true,
      // 👇 Key: Vercel serverless -> polling in prod; dev supports websocket
      transports: PROD ? ['polling'] : ['websocket', 'polling'],
      upgrade: !PROD,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 10000,
    });

    newSocket.on('connect', () => { console.log('[socket] connected', newSocket.id); setIsConnected(true); });
    newSocket.on('disconnect', () => { console.log('[socket] disconnected'); setIsConnected(false); });
    newSocket.on('connect_error', (err) => { console.error('[socket] connect_error:', err?.message || err); setIsConnected(false); });

    setSocket(newSocket);
    return () => { newSocket.close(); };
  }, []);

  return <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error('useSocket must be used within a SocketProvider');
  return ctx;
};
