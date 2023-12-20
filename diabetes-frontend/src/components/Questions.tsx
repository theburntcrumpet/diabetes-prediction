import { useState } from "react"
import RadioButtonQuestion from "./RadioButtonQuestion";
import NumericQuestion from "./NumericQuestion";
import { Button, Heading } from "@chakra-ui/react";
import { DiabetesResponse } from "../ts/interface/DiabetesResponse";

interface Answer {
    label: string,
    value: number
}

export interface Question {
    question: string,
    answers: Answer[],
    selectedAnswer?: Answer,
    type: string
}


function Questions() {
    const yesNoAnswers = [
        {
            label: "No",
            value: 0
        },
        {
            label: "Yes",
            value: 1
        }
    ]

    const [diabetesResponse, setDiabetesResponse] = useState<DiabetesResponse | null>(null);

    const [questions, setQuestions] = useState<Question[]>([
        {
            question: "How old are you?",
            answers: [
            ],
            type: "numeric"
        },
        {
            question: "Are you male or female?",
            answers: [
                {
                    label: "Male",
                    value: 0
                },
                {
                    label: "Female",
                    value: 1
                }
            ],
            type: "radio"
        },
        {
            question: "Are you displaying polyuria? (peeing more than normal)",
            answers: yesNoAnswers,
            type: "radio"
        },
        {
            question: "Are you displaying polydipsia? (drinking more than normal)",
            answers: yesNoAnswers,
            type: "radio"
        },
        {
            question: "Have you been experiencing sudden weightloss?",
            answers: yesNoAnswers,
            type: "radio"
        },
        {
            question: "Are you feeling unusually weak?",
            answers: yesNoAnswers,
            type: "radio"
        },
        {
            question: "Have you had an increased appetite? (Polyphagia)",
            answers: yesNoAnswers,
            type: "radio"
        },
        {
            question: "Do you have genital thrush?",
            answers: yesNoAnswers,
            type: "radio"
        },
        {
            question: "Have you experienced blurred vision?",
            answers: yesNoAnswers,
            type: "radio"
        },
        {
            question: "Have you experienced itching?",
            answers: yesNoAnswers,
            type: "radio"
        },
        {
            question: "Have you been more irritable than usual?",
            answers: yesNoAnswers,
            type: "radio"
        },
        {
            question: "Have you experienced delayed healing?",
            answers: yesNoAnswers,
            type: "radio"
        },
        {
            question: "Have you experienced partial paresis (impaired muscle movement)?",
            answers: yesNoAnswers,
            type: "radio"
        },
        {
            question: "Have you experienced muscle stiffness?",
            answers: yesNoAnswers,
            type: "radio"
        },
        {
            question: "Have you experienced alopecia? (Hair Loss)",
            answers: yesNoAnswers,
            type: "radio"
        },
        {
            question: "Are you obese?",
            answers: yesNoAnswers,
            type: "radio"
        }
    ]);


    const handleAnswerChange = (questionIndex: number, valueString: string) => {
        const selectedValue = parseInt(valueString);
        const updatedQuestions = questions.map((q, index) => {
            if (index === questionIndex) {
                return { ...q, selectedAnswer: { label: '', value: selectedValue } };
            }
            return q;
        });
        setQuestions(updatedQuestions);
    };

    function getAnswerAtIndex(idx: number): number {
        const answer = questions[idx];
        if (!answer) return 0;
        if (!answer?.selectedAnswer) return 0;
        return answer?.selectedAnswer.value;
    }

    function predict() {
        const requestQuestions: DiabetesQuestions = {
            age: getAnswerAtIndex(0),
            gender: getAnswerAtIndex(1),
            polyuria: getAnswerAtIndex(2),
            polydipsia: getAnswerAtIndex(3),
            weightloss: getAnswerAtIndex(4),
            weakness: getAnswerAtIndex(5),
            polyphagia: getAnswerAtIndex(6),
            thrush: getAnswerAtIndex(7),
            blurring: getAnswerAtIndex(8),
            itching: getAnswerAtIndex(9),
            irritability: getAnswerAtIndex(10),
            delayed_healing: getAnswerAtIndex(11),
            partial_paresis: getAnswerAtIndex(12),
            muscle_stiffness: getAnswerAtIndex(13),
            alopecia: getAnswerAtIndex(14),
            obesity: getAnswerAtIndex(15)
        }
        const queryParams = new URLSearchParams(requestQuestions as any).toString();
        fetch(`http://localhost:8000/diabetes?${queryParams}`)
            .then(response => response.json())
            .then(data => setDiabetesResponse(data))
            .catch(e => console.log(e));
    }

    if (diabetesResponse) {
        return (
            <>
                <Heading size={"md"}>There's a {Math.round(diabetesResponse.diabetes * 10000) / 100}% chance you'll test positive for diabetes</Heading>
                <br />
                <Button colorScheme='blue' onClick={() => { setDiabetesResponse(null) }}>Test Again</Button>
            </>
        );
    }

    return (<>
        <>
            {questions.map((t, index) => t.type == "radio" ? (
                <RadioButtonQuestion
                    key={index}
                    question={t}
                    onChange={(value) => handleAnswerChange(index, value)}
                />
            ) :
                (
                    <NumericQuestion
                        key={index}
                        question={t}
                        onChange={(value) => handleAnswerChange(index, value)}
                    />
                )

            )}
            <br />
            <Button colorScheme='blue' onClick={predict}>Submit</Button>
        </>
    </>)
}

export default Questions