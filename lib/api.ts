// app/api.ts

import axios from 'axios';
import { type Note } from '@/types/note';

interface FetchNotesResponse {
   notes: Note[];
   totalPages: number;
}

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

export async function fetchNotes(onQuery: string, page: number) {
   const response = await axios.get<FetchNotesResponse>('/notes', {
      headers: {
         Authorization: `Bearer ${API_KEY}`,
      },
      params: {
         search: onQuery,
         page: page,
         perPage: 12,
      },
   });
   return response.data;
}

export interface CreateNotePayload {
   title: string;
   content: string;
   tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
   const response = await axios.post<Note>('/notes', payload, {
      headers: {
         Authorization: `Bearer ${API_KEY}`,
      },
   });

   return response.data;
}

export async function deleteNote(id: string) {
   const response = await axios.delete<Note>(`/notes/${id}`, {
      headers: {
         Authorization: `Bearer ${API_KEY}`,
      },
   });
   return response.data;
}

export async function fetchNoteId(id: string) {
   const response = await axios.get<Note>(`/notes/${id}`, {
      headers: {
         Authorization: `Bearer ${API_KEY}`,
      },
   });
   return response.data;
}