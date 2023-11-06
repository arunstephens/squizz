"use client";

import { redirect } from 'next/navigation';
import Image from 'next/image'
import { MouseEvent, MouseEventHandler, useEffect, useState } from 'react';
import { QuizLink, getQuiz, getQuizzes } from './actions/quiz';
import Link from 'next/link';

export default function Home() {
  const [quizzes, setQuizzes] = useState<QuizLink[]>([]);

  useEffect(() => {
    (async () => {
      const result = await getQuizzes();
      console.log({ result })
      setQuizzes(result);
    })()
  }, [])

  const redirectToQuiz = async (e: MouseEvent<HTMLAnchorElement>) => {
    const url = (e.target as HTMLAnchorElement).href;
    getQuiz(url);
    console.log(url);
    e.preventDefault();
  }

  return (
    <main className="m-5">
      <h1 className="text-xl font-bold mb-2">Squizz</h1>

      <form action={getQuiz} >
        <label>Paste the original URL here: <input name='url' className="border rounded px-1" type="text" defaultValue="https://www.stuff.co.nz/national/quizzes/300988161/stuff-quiz-morning-trivia-challenge-november-6-2023" /></label>
        <button className="rounded ml-2 px-2 bg-slate-600 text-white active:bg-slate-400" type="submit">Get quiz</button>
      </form>

      <ul className='list-disc ml-5'>
        {quizzes.map((q) => {
          return <li className='my-3' key={q.url}><Link className='text-blue-600 hover:underline hover:text-blue-400' href={q.url} onClick={redirectToQuiz}>{q.title}</Link></li>
        })}
      </ul>
    </main>
  )
}
