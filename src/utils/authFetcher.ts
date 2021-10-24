import firebase from 'firebase';
import { Fetcher } from 'swr/dist/types';

// injects a auth token into useSwr
const fetcher: Fetcher<any> = async (...args: any) => {
  const authToken = await firebase.auth().currentUser?.getIdToken();
  const url: string = args[0];

  if (!authToken) throw new Error();

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return await res.json();
};

export default fetcher;
