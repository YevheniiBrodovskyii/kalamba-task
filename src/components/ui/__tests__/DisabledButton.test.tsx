import { fireEvent, render, screen } from "@testing-library/react";
import { DisabledButton } from "../DisabledButton";

//TODO: Test displaying different variants
describe("DisabledButton Component", () => {
    test("render DisabledButton Component", () => {
        const onClick = jest.fn();

        render(<DisabledButton text="Test"/>);

        const buttonElement = screen.getByText('Test');
        fireEvent.click(buttonElement);
        expect(onClick).toHaveBeenCalledTimes(0);
    });
});