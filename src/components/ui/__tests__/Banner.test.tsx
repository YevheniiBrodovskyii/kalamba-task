import { render, screen } from "@testing-library/react";
import { Banner } from "../Banner";


describe("Banner Component", () => {
  
      test("render Banner Component", () => {
        
        render(<Banner />);
        
        expect(screen.getByTestId('banner')).toBeInTheDocument();
      });
});