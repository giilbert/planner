import { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';

import Event from '@utils/types/event';
import { createEvent } from '@utils/server/db';

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

  console.log({
    ...req.body,
    authorId: user.uid,
    createdAt: Date.now(),
  });

  const complete = isACompleteEvent({
    ...req.body,
    authorId: user.uid,
    createdAt: Date.now(),
  });

  if (!complete) {
    res.status(200).json({
      error: 'A field is null',
    });

    return;
  }

  await createEvent({
    ...req.body,
    authorId: user.uid,
    createdAt: Date.now(),
  });

  res.status(200).end();
}

function isACompleteEvent(o: Event): boolean {
  return !(
    Object.values({
      title: o.title === '',
      authorId: !o.authorId,
      createdAt: !o.createdAt,
      dateTime: isNaN(o.dateTime),
    }).find((v) => v === true) ?? false
  );
}
