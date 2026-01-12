// app/notes/[id]/NoteDetails.client.tsx

'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteId } from '@/lib/api';
import css from './NoteDetails.module.css';

export default function NoteDetails() {
   const params = useParams();
   const id = params.id as string;

   const { data: note, isLoading, isError } = useQuery({
      queryKey: ['note', id],
      queryFn: () => fetchNoteId(id),
   });

   if (isLoading) return <p>Loading, please wait...</p>;
   if (isError) return <p>Something went wrong.</p>;
   if (!note) return <p>Note not found</p>;

   return (
      <div className={css.container}>
         <div className={css.item}>
            <div className={css.header}>
               <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>
               Created: {new Date(note.createdAt).toLocaleString()}
            </p>
         </div>
      </div>
   );
}
