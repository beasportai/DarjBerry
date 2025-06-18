export interface WhatsAppMessage {
  from: string;
  text?: {
    body: string;
  };
  location?: {
    latitude: number;
    longitude: number;
  };
  type: string;
  timestamp: string;
}

export interface WhatsAppWebhookBody {
  hub?: {
    mode: string;
    verify_token: string;
    challenge: string;
  };
  entry?: Array<{
    changes: Array<{
      value: {
        messages?: WhatsAppMessage[];
        metadata: {
          phone_number_id: string;
        };
      };
    }>;
  }>;
}

export interface WhatsAppUser {
  phoneNumber: string;
  name?: string;
  state: string;
  location?: string;
  landSize?: number;
  leadScore: number;
  lastInteraction: Date | string;
}