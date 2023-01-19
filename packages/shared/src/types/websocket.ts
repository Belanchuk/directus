import type { Query } from './query';

type MessageType = 'SUBSCRIBE' | 'UNSUBSCRIBE' | 'PING' | 'PONG' | 'AUTH' | 'FOCUS' | 'BLUR';

type MessageCallback = (data: Record<string, any>) => void;

type WSQuery = Query & {
	status?: boolean;
	event?: string | string[];
};

interface SubscribeOptions {
	collection: string;
	item?: string | number;
	query?: WSQuery;
}

interface WebSocketWrapper {
	onConnect(callback: (client: WebSocketClient) => void): void;
	onDisconnect(callback: () => void): void;
}

interface WebSocketClient {
	subscribe(options: SubscribeOptions, callback: MessageCallback): number;
	unsubscribe(uid: number): void;
	send(type: MessageType, data?: Record<string, any>, timeout?: number | false): Promise<Record<string, any>> | void;
}

export type { MessageType, MessageCallback, WSQuery, SubscribeOptions, WebSocketWrapper, WebSocketClient };