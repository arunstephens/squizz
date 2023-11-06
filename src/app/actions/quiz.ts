'use server';


import { redirect } from "next/navigation";

export async function getQuiz(input: FormData | string) {
    let url: string = "";

    if (input instanceof FormData) {
        url = input.get("url") as string || "";
    } else if (typeof input === "string") {
        url = input;
    }
    const response = await fetch(new URL(url!));

    if (response.ok) {
        console.log('ok')
        const page = await response.text();

        const regex = /"https:\/\/www.riddle.com\/embed\/a\/([^\\"]*)\\/;
        const match = page.match(regex);

        let quizUrl: string | undefined

        if (match && match[1]) {
            quizUrl = "https://riddle.com/view/" + match[1];
        }

        console.log({ quizUrl });

        redirect(quizUrl!)
    }
    else {
        console.log('not ok', response.status)
        return { url, status: response.statusText }
    }
}

const getTitle = (item: string) => {
    return item.substring(item.lastIndexOf('/') + 1).replaceAll('-', ' ').replace("stuff quiz ", "");
}

export type QuizLink = {
    title: string;
    url: string
}

export async function getQuizzes(): Promise<QuizLink[]> {

    const url = "https://www.stuff.co.nz/national/quizzes?t=" + new Date().getDate();

    const response = await fetch(new URL(url));

    if (response.ok) {
        const page = await response.text();

        const regex = /(\/national\/quizzes\/.*\/stuff-quiz-(morning|afternoon)-trivia-challenge-[^"]+)"/g
        const match = page.match(regex)!.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });

        const quizzes = [];

        for (const item of match.map(x => x.substring(0, x.length - 1))) {
            quizzes.push({ title: getTitle(item), url: `https://www.stuff.co.nz${item}` });
        }

        return quizzes;
    }

    return [];
}
