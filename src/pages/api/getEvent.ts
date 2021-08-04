import { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';

import { getEvents, getEventsInMonth } from '@utils/server/db';

import serviceAccount from '@utils/serviceAccountKey';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // log into firebase admin sdk
  if (admin.apps.length === 0)
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key,
        projectId: serviceAccount.project_id,
      }),
    });

  const idToken = req.headers.authorization?.split(' ')[1];

  if (!idToken) {
    res.status(403).json({
      error: 'Not authenticated',
    });

    return;
  }

  const user = await admin.auth().verifyIdToken(idToken);

  // filters events by the month
  const month = req.query.month as string;
  if (month) {
    console.log(month);
    const events = await getEventsInMonth(user.uid, parseInt(month));
    res.status(200).json(events);
    return;
  }

  // no filter, limit = 20
  const events = await getEvents(user.uid);
  res.status(200).json(events);
}
