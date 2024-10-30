import { render, screen } from "@testing-library/react";
import { NotFoundPage } from "../NotFoundPage";
import { MemoryRouter } from "react-router-dom";


describe("NotFoundPage Component", () => {

    test("render NotFoundPage Component", () => {

        render(
            <MemoryRouter>
                <NotFoundPage />
            </MemoryRouter>
        );
        expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
    });
});