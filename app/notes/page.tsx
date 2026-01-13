// app/notes/page.tsx

import {
   QueryClient,
   HydrationBoundary,
   dehydrate,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage() {
   const queryClient = new QueryClient();

await queryClient.prefetchQuery({
  queryKey: ['notes', 'list', { page: 1, search: '' }],
  queryFn: () => fetchNotes('', 1),
});

   return (
      <HydrationBoundary state={dehydrate(queryClient)}>
         <NotesClient />
      </HydrationBoundary>
   );
}