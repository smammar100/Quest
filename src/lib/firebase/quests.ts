// Model layer — Firestore data access for quests.
// TODO: uncomment after wiring up firebase/config.ts and installing firebase.
//
// import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
// import { db } from './config';
// import type { Task, TaskStatus } from '@/lib/models/task';
//
// export async function fetchOpenQuests(category?: string): Promise<Task[]> {
//   const ref = collection(db, 'tasks');
//   const constraints = [
//     where('status', '==', 'open' satisfies TaskStatus),
//     orderBy('createdAt', 'desc'),
//     ...(category ? [where('category', '==', category)] : []),
//   ];
//   const snap = await getDocs(query(ref, ...constraints));
//   return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Task));
// }

export {};
