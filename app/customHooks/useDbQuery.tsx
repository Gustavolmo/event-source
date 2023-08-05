
'use client';
import { Document } from 'mongodb';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { EventData, User } from '@/app-types/types';
import { WithId } from 'mongodb';

export const useDbQuery = (
  dbFunction: (
    userEmail: User['email']
  ) => Promise<false | EventData[] | undefined>
) => {
  const { data: session, status } = useSession();
  const [dbData, setDbData] = useState<false | EventData[] | undefined>();

  const fetchDbEvents = useCallback(async () => {
    if (status !== 'authenticated') return;
    const eventData = await dbFunction(session?.user?.email);
    setDbData(eventData);
  }, [status]);

  useEffect(() => {
    if (status !== 'authenticated') return;
    fetchDbEvents().catch(console.error);
  }, [status]);

  return [dbData];
};

export default useDbQuery;
