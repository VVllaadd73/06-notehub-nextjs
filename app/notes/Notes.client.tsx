// app/notes/Notes.client.tsx

'use client';

import SearchBox from '@/components/SearchBox/SearchBox';
import Paginate from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import NoteForm from '@/components/NoteForm/NoteForm';
import Modal from '@/components/Modal/Modal';

import { fetchNotes } from '@/lib/api';

import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { type Note } from '@/types/note';

import css from './NotesPage.module.css';

type NotesResponse = {
   notes: Note[];
   totalPages: number;
};

export default function NotesClient() {
   const [onQuery, setOnQuery] = useState('');
   const [page, setPage] = useState(1);
   const [modalOpen, setModalOpen] = useState(false);

   const closeModal = () => setModalOpen(false);
   const openModal = () => setModalOpen(true);

   const { data, isSuccess, isLoading, isError } = useQuery<NotesResponse>({
      queryKey: ['notes', 'list', { page, search: onQuery }],
      queryFn: () => fetchNotes(onQuery, page),
      placeholderData: keepPreviousData,
   });

   const notes = Array.isArray(data?.notes) ? data!.notes : [];
   const totalPages = data?.totalPages ?? 0;

   const onFound = useDebouncedCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
         setOnQuery(e.target.value);
         setPage(1);
      },
      250
   );

   return (
      <div className={css.app}>
         <header className={css.toolbar}>
            <SearchBox query={onFound} />

            {totalPages > 1 && (
               <Paginate
                  totalPages={totalPages}
                  currentPage={page}
                  setPage={setPage}
               />
            )}

            <button className={css.button} onClick={openModal}>
               Create note +
            </button>
         </header>

         {isLoading && <div className={css.statusBox}>Loading notes...</div>}

         {isError && (
            <div className={css.statusBoxError}>
               Something went wrong! Try again
            </div>
         )}

         {isSuccess && notes.length > 0 && <NoteList notes={notes} />}

         {isSuccess && notes.length === 0 && (
            <div className={css.statusBox}>
               No notes yet. Create your first note ✨
            </div>
         )}

         {modalOpen && (
            <Modal onClose={closeModal}>
               <NoteForm onClose={closeModal} />
            </Modal>
         )}
      </div>
   );
}