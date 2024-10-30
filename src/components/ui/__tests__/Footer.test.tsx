import { render, screen } from "@testing-library/react";
import { Footer } from "../Footer";


describe("Footer Component", () => {
  
      test("render Footer Component", () => {
        
        render(<Footer />);
        
        expect(screen.getByTestId('footer')).toBeInTheDocument();
      });
});