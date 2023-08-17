'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { DbData, User } from '@/app-types/types';

export const useDbQuery = (
  dbFunction: (userEmail: User['email']) => Promise<DbData[] | undefined>,
  userEmail?: User['email'],
  clickToRender?: Boolean
) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [dbData, setDbData] = useState<DbData[] | undefined>();

  useEffect(() => {
    const fetchDbEvents = async () => {
      setLoading(true);
      const eventData = await dbFunction(userEmail || session?.user?.email);
      setDbData(eventData);
      setLoading(false);
    };
    fetchDbEvents().catch(console.error);
  }, [clickToRender]);

  return { dbData, loading };
};

export default useDbQuery;
