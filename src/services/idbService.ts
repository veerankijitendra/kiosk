// services/idb.service.ts
import { openDB } from 'idb';
import type { AdsResponseType } from '../types';

type Ad = AdsResponseType['data'][0];

class IDBService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private db: any = null;

  async init() {
    if (this.db) return this.db;

    this.db = await openDB('offline_ads', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('ads')) {
          db.createObjectStore('ads', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('metadata')) {
          db.createObjectStore('metadata', { keyPath: 'key' });
        }
      },
    });

    return this.db;
  }

  async saveAds(ads: Ad[]) {
    const db = await this.init();
    const tx = db.transaction('ads', 'readwrite');
    for (const ad of ads) {
      await tx.store.put(ad);
    }
    await tx.done;
  }

  async getAds() {
    const db = await this.init();
    const allAds = await db.getAll('ads');
    return allAds.filter((ad: Ad) => ad.isActive !== false);
  }

  async setLastFetch(date: Date) {
    const db = await this.init();
    await db.put('metadata', { key: 'lastFetch', value: date });
  }

  async getLastFetch() {
    const db = await this.init();
    const data = await db.get('metadata', 'lastFetch');
    return data ? new Date(data.value) : null;
  }

  async clearAds() {
    const db = await this.init();
    await db.clear('ads');
  }
}

export const idb = new IDBService();
