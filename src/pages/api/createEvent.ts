import { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import { ServiceAccount } from '@google-cloud/storage';

import Event from '@utils/types/event';
import { createEvent } from '@utils/server/db';

import serviceAccount from '@utils/serviceAccountKey.json';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // // log into firebase admin sdk
  // if (admin.apps.length === 0)
  //   admin.initializeApp({
  //     credential: admin.credential.cert({
  //       clientEmail: serviceAccount.client_email,
  //       privateKey: serviceAccount.private_key,
  //       projectId: serviceAccount.project_id,
  //     }),
  //   });

  // const idToken = req.headers.authorization?.split(' ')[1];

  // if (!idToken) {
  //   res.status(403).json({
  //     error: 'Not authenticated',
  //   });

  //   return;
  // }

  // const user = await admin.auth().verifyIdToken(idToken);

  console.log({
    ...req.body,
    authorId: 'asd',
    createdAt: Date.now(),
  });

  const complete = isACompleteEvent({
    ...req.body,
    authorId: 'asd',
    createdAt: Date.now(),
  });

  if (!complete) {
    res.status(200).json({
      error: 'A field is null',
    });

    return;
  }
  console.log(complete);

  res.status(200).end();
}

function isACompleteEvent(o: Event): boolean {
  return !(
    Object.values({
      title: !o.title,
      description: !o.description,
      authorId: !o.authorId,
      createdAt: !o.createdAt,
    }).find((v) => v === true) ?? false
  );
}
