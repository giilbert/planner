import { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import { ServiceAccount } from '@google-cloud/storage';

import { getEvents } from '@utils/server/db';

import serviceAccount from '@utils/serviceAccountKey.json';

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
  const events = await getEvents(user.uid);

  res.status(200).json(events);
}
