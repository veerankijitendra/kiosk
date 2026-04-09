interface ServerToClientEvents {
  'kiosk:createToken': (data: TokenEvent) => void;
  'kiosk:update-token': (data: TokenEvent) => void;
  'kiosk:deleteToken': (data: TokenEvent) => void;
}

interface ClientToServerEvents {
  'token:created': (data: TokenEvent) => void;
}

type TokenEvent = {
  _id: string;
  status: 'WAITING' | 'CALLED' | 'COMPLETED' | 'EMERGENCY';
  tokenNumber: string;
  isEmergency: boolean;
};

export type { ServerToClientEvents, ClientToServerEvents, TokenEvent };
