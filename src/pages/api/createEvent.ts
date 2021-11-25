import { NextApiRequest, NextApiResponse } from 'next';

import Event from '@utils/types/event';

import { getSession } from 'next-auth/react';
import { PrismaClient } from '.prisma/client';
import { Session } from 'next-auth';

interface SessionWithUserId extends Session {
  expires: string;
  user: {
    name: string;
    email: string;
    id: string | undefined;
  };
}

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = (await getSession({ req })) as SessionWithUserId | null;

  if (!session || !session.user.id) {
    res.status(403).json({
      error: 'Not authenticated',
    });

    return;
  }

  const complete = isACompleteEvent({
    ...req.body,
    authorId: session.user?.id,
  });

  if (!complete) {
    res.status(200).json({
      error: 'A field is null',
    });

    return;
  }

  await prisma.$connect();

  await prisma.event.create({
    data: {
      authorId: session.user.id,
      date: new Date(req.body.dateTime),
      title: req.body.title,
      description: req.body.description,
    },
  });

  await prisma.$disconnect();

  res.status(200).end();
}

// check if all the data for an event is completed and valid
function isACompleteEvent(o: Event): boolean {
  return !(
    Object.values({
      title: o.title === '',
      authorId: !o.authorId,
      // @ts-ignore
      dateTime: isNaN(o.dateTime),
    }).find((v) => v === true) ?? false
  );
}
