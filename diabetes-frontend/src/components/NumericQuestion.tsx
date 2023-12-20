import { FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { Question } from "./Questions";

interface Props {
    question: Question,
    onChange: (value: string) => void
}

function RadioButtonQuestion(props: Props) {
    return (
        <FormControl>
            <FormLabel>{props.question.question}</FormLabel>
            <NumberInput onChange={props.onChange}>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
        </FormControl>);
}

export default RadioButtonQuestion