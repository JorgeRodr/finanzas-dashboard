import { TransactionFirebaseData } from '@/interfaces/transaction';
import { UserFirestoreData } from '@/interfaces/user';
import { NextResponse } from 'next/server';

export function postResponse(resource: TransactionFirebaseData | UserFirestoreData, resourcePath: string) {
  return NextResponse.json(resource, {
    status: 201,
    headers: {
      Location: `${resourcePath}/${resource.id}`,
    },
  });
}
