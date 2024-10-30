import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "../Button";

//TODO: Test displaying different variants
describe("Button Component", () => {
    test("render Button Component", () => {
        const onClick = jest.fn();

        render(<Button onClick={onClick}>Test</Button>);

        const buttonElement = screen.getByText('Test');
        fireEvent.click(buttonElement);
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});