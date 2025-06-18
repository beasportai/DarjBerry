import axios from 'axios';

export class WhatsAppService {
  private static readonly BASE_URL = 'https://graph.facebook.com/v18.0';
  private static readonly PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
  private static readonly ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

  static async sendMessage(to: string, message: string) {
    if (!this.PHONE_NUMBER_ID || !this.ACCESS_TOKEN) {
      console.log('WhatsApp not configured, would send:', { to, message });
      return;
    }

    try {
      const response = await axios.post(
        `${this.BASE_URL}/${this.PHONE_NUMBER_ID}/messages`,
        {
          messaging_product: 'whatsapp',
          to,
          type: 'text',
          text: { body: message },
        },
        {
          headers: {
            'Authorization': `Bearer ${this.ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('WhatsApp message sent:', response.data);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('WhatsApp send error:', errorMessage);
      throw error;
    }
  }

  static async sendTemplate(to: string, templateName: string, components?: unknown[]) {
    if (!this.PHONE_NUMBER_ID || !this.ACCESS_TOKEN) {
      console.log('WhatsApp not configured, would send template:', { to, templateName });
      return;
    }

    try {
      const response = await axios.post(
        `${this.BASE_URL}/${this.PHONE_NUMBER_ID}/messages`,
        {
          messaging_product: 'whatsapp',
          to,
          type: 'template',
          template: {
            name: templateName,
            language: { code: 'en' },
            components: components || [],
          },
        },
        {
          headers: {
            'Authorization': `Bearer ${this.ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('WhatsApp template sent:', response.data);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('WhatsApp template error:', errorMessage);
      throw error;
    }
  }

  static async sendLocation(to: string, latitude: number, longitude: number, name?: string, address?: string) {
    if (!this.PHONE_NUMBER_ID || !this.ACCESS_TOKEN) {
      console.log('WhatsApp not configured, would send location:', { to, latitude, longitude });
      return;
    }

    try {
      const response = await axios.post(
        `${this.BASE_URL}/${this.PHONE_NUMBER_ID}/messages`,
        {
          messaging_product: 'whatsapp',
          to,
          type: 'location',
          location: {
            latitude,
            longitude,
            name,
            address,
          },
        },
        {
          headers: {
            'Authorization': `Bearer ${this.ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('WhatsApp location sent:', response.data);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('WhatsApp location error:', errorMessage);
      throw error;
    }
  }

  static async sendDocument(to: string, documentUrl: string, filename: string, caption?: string) {
    if (!this.PHONE_NUMBER_ID || !this.ACCESS_TOKEN) {
      console.log('WhatsApp not configured, would send document:', { to, documentUrl, filename });
      return;
    }

    try {
      const response = await axios.post(
        `${this.BASE_URL}/${this.PHONE_NUMBER_ID}/messages`,
        {
          messaging_product: 'whatsapp',
          to,
          type: 'document',
          document: {
            link: documentUrl,
            filename,
            caption,
          },
        },
        {
          headers: {
            'Authorization': `Bearer ${this.ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('WhatsApp document sent:', response.data);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('WhatsApp document error:', errorMessage);
      throw error;
    }
  }

  static async sendInteractiveButtons(to: string, bodyText: string, buttons: Array<{id: string, title: string}>) {
    if (!this.PHONE_NUMBER_ID || !this.ACCESS_TOKEN) {
      console.log('WhatsApp not configured, would send buttons:', { to, bodyText, buttons });
      return;
    }

    try {
      const response = await axios.post(
        `${this.BASE_URL}/${this.PHONE_NUMBER_ID}/messages`,
        {
          messaging_product: 'whatsapp',
          to,
          type: 'interactive',
          interactive: {
            type: 'button',
            body: { text: bodyText },
            action: {
              buttons: buttons.map(btn => ({
                type: 'reply',
                reply: {
                  id: btn.id,
                  title: btn.title,
                },
              })),
            },
          },
        },
        {
          headers: {
            'Authorization': `Bearer ${this.ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('WhatsApp interactive message sent:', response.data);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('WhatsApp interactive error:', errorMessage);
      throw error;
    }
  }
}