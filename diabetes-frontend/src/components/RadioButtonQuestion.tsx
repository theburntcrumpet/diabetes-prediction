import { FormControl, FormLabel, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { Question } from "./Questions";

interface Props {
    question: Question,
    onChange: (value: string) => void
}

function RadioButtonQuestion(props: Props) {
    return (
        <FormControl>
            <FormLabel>{props.question.question}</FormLabel>
            <RadioGroup onChange={props.onChange}>
                <Stack spacing={4} direction='row'>
                    {props.question.answers.map(
                        t => {
                            return (<Radio value={t.value.toString()}>
                                {t.label}
                            </Radio>)
                        }
                    )}
                </Stack>
            </RadioGroup>
        </FormControl>);
}

export default RadioButtonQuestion