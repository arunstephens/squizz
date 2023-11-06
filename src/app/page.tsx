import { redirect } from 'next/navigation';
import Image from 'next/image'

export default function Home() {
  async function getQuiz(input: FormData) {
    'use server';

    const url = input.get("url") as string;

    const response = await fetch(new URL(url!));

    if (response.ok) {
      console.log('ok')
      const page = await response.text();

      const regex = /"(https:\/\/www.riddle.com\/embed\/a\/[^\\"]*)\\/;
      const match = page.match(regex);

      let quizUrl: string | undefined

      if (match && match[1]) {
        quizUrl = match[1];
      }

      console.log({ quizUrl });

      redirect(quizUrl!)
    }
    else {
      console.log('not ok', response.status)
      return { url, status: response.statusText }
    }
  }

  return (
    <main className="">
      <h1 className="text-xl font-bold mb-2">Squizz</h1>

      <form action={getQuiz} >
        <label>Paste the original URL here: <input name='url' className="border rounded" type="text" defaultValue="https://www.stuff.co.nz/national/quizzes/300988161/stuff-quiz-morning-trivia-challenge-november-6-2023" /></label>
        <button className="rounded ml-2 px-2 bg-slate-600 text-white active:bg-slate-400" type="submit">Get quiz</button>
      </form>
    </main>
  )
}
