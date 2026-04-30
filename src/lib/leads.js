import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export async function saveWaitlistLead({ audience, email }) {
  const collectionName = audience === 'creadores' ? 'waitlist_creadores' : 'waitlist_marcas';

  await addDoc(collection(db, collectionName), {
    audience,
    email,
    createdAt: serverTimestamp(),
  });
}

export async function saveDemoReservation({ name, email, dayIso, time }) {
  await addDoc(collection(db, 'demo_reservations'), {
    name,
    email,
    dayIso,
    time,
    createdAt: serverTimestamp(),
  });
}
