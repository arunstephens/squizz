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
    <main className="my-5 mx-auto w-96">
      <h1 className="text-xl font-bold mb-2">Squizz</h1>

      {/* <form action={getQuiz} >
        <label>Paste the original URL here: <input name='url' className="border rounded px-1" type="text" defaultValue="https://www.stuff.co.nz/national/quizzes/300988161/stuff-quiz-morning-trivia-challenge-november-6-2023" /></label>
        <button className="rounded ml-2 px-2 bg-slate-600 text-white active:bg-slate-400" type="submit">Get quiz</button>
      </form> */}

      {(quizzes && quizzes.length > 0) && <ul className='list-disc ml-5'>
        <li className='my-3' key={quizzes[0].url}><Link className='text-blue-600 hover:underline hover:text-blue-400' href={quizzes[0].url} onClick={redirectToQuiz}>{quizzes[0].title}</Link></li>
        <li><Image src="/hangfive.png" alt="Hang Five logo" width={24} height={24} className='inline mr-2' /><a href="https://playhangfive.com/?utm_medium=social&utm_source=squizz&utm_campaign=squizz20231106" className='text-blue-600 hover:underline hover:text-blue-400 font-bold'>Hang Five for {Intl.DateTimeFormat("en-NZ", { dateStyle: 'long' }).format(new Date())}</a></li>
        {quizzes.slice(1).map((q) => {
          return <li className='my-3' key={q.url}><Link className='text-blue-600 hover:underline hover:text-blue-400' href={q.url} onClick={redirectToQuiz}>{q.title}</Link></li>
        })}
      </ul>}


    </main>
  )
}
