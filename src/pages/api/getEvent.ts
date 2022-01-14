import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '.prisma/client';
import { SessionWithUserId } from './auth/[...nextauth]';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = (await getSession({ req })) as SessionWithUserId | null;

  if (!session) {
    res.status(403).json({
      error: 'Not authenticated',
    });

    return;
  }

  if (req.query.month) {
    await month(
      session,
      res,
      parseInt(req.query.month as string),
      parseInt(req.query.year as string)
    );
  } else {
    // take many
    await many(session, res);
    return;
  }
}

async function month(
  session: SessionWithUserId,
  res: NextApiResponse,
  month: number,
  year: number
) {
  const addLeadingZeroToMonth = (month: number) =>
    month + 1 < 10 && '0' + (month + 1).toString();

  prisma.$connect();

  const events = await prisma.event.findMany({
    take: 10,
    where: {
      authorId: session.user?.id,
      date: {
        gte: new Date(
          `${year}-${addLeadingZeroToMonth(month)}-01T00:00:00.000`
        ),
        // TODO: leap years
        // FIXME: time zone issues?

        // before the first of next month (exclusive)
        lt: new Date(
          `${month === 11 ? year + 1 : year}-${
            month === 11 ? '01' : addLeadingZeroToMonth(month + 1)
          }-01T00:00:00.000Z`
        ),
      },
    },
  });

  prisma.$disconnect();

  res.status(200).json(events);
}

async function many(session: SessionWithUserId, res: NextApiResponse) {
  prisma.$connect();

  const events = await prisma.event.findMany({
    take: 20,
    where: {
      authorId: session.user?.id,
    },
    orderBy: {
      date: 'asc',
    },
  });

  prisma.$disconnect();

  res.status(200).json(events);
}
