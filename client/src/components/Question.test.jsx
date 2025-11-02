import { render, screen, fireEvent } from '@testing-library/react';
import Question from './Question';

// Credit to AI for helping me write my first test

const sampleQuestion = {
  question: "Which animal steals tourists’ wallets?",
  options: ["Monkeys", "Parrots", "Cats", "Raccoons"],
  answer: "Monkeys",
};

test('renders question text', () => {
  render(
    <Question
      question={sampleQuestion}
      selectedOption=""
      onOptionChange={() => {}}
      onSubmit={() => {}}
    />
  );
  expect(screen.getByText(/Which animal steals tourists/)).toBeInTheDocument();
});

test('selects an option when clicked', () => {
  let selected = "";
  const handleOptionChange = (e) => { selected = e.target.value; };

  render(
    <Question
      question={sampleQuestion}
      selectedOption={selected}
      onOptionChange={handleOptionChange}
      onSubmit={() => {}}
    />
  );

  const monkeyBtn = screen.getByText("Monkeys");
  fireEvent.click(monkeyBtn);

  expect(selected).toBe("Monkeys");
});
