// app/notes/[id]/page.tsx

import {
   QueryClient,
   HydrationBoundary,
   dehydrate,
} from '@tanstack/react-query';
import { fetchNoteId } from '@/lib/api';

import NoteDetails from './NoteDetails.client';

type Props = {
   params: Promise<{ id: string }>;
};

export default async function NoteDetailsPage({ params }: Props) {
   const { id } = await params;

   const queryClient = new QueryClient();

   await queryClient.prefetchQuery({
      queryKey: ['note', id],
      queryFn: () => fetchNoteId(id),
   });

   return (
      <HydrationBoundary state={dehydrate(queryClient)}>
         <NoteDetails />
      </HydrationBoundary>
   );
}