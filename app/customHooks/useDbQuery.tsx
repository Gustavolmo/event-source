
'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { DbData, User } from '@/app-types/types';

export const useDbQuery = ( dbFunction: (
  userEmail: User['email']) => Promise<DbData[] | undefined>,
  userEmail?: User['email'],
  clickToRender?: Boolean
) => {
  const { data: session } = useSession();
  const [dbData, setDbData] = useState<DbData[] | undefined>();

  useEffect(() => {
    const fetchDbEvents = async () => {
      const eventData = await dbFunction(userEmail || session?.user?.email);
      setDbData(eventData);
    }
    fetchDbEvents().catch(console.error);
  }, [clickToRender]);

  return [dbData];
};

export default useDbQuery;
