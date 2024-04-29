'use server';

import { redirect } from 'next/navigation';

export async function fetchKhaltiData(url: string, payload: any) {
  const res = await fetch(url, payload);
  const data = await res.json();

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  redirect(data.payment_url);
}
