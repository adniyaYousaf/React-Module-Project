import Search from "./Search.jsx";
import { render, fireEvent, screen } from "@testing-library/react";
describe("Search Component", () => {
  test("renders a search input", () => {
    render(<Search />);
    const searchInput = screen.getByRole("searchbox");
    expect(searchInput).toBeInTheDocument();
  });
  it("When I type in the field", () => {
    render(<Search />);
    const inputField = screen.getByRole("searchbox");
    fireEvent.change(inputField, { target: { value: "test value" } });
    expect(inputField.value).toBe("test value");
  });
  it("check the input value is logged or not", () => {
    render(<Search />);
    const consoleLogSpy = jest.spyOn(console, 'log');
    const inputField = screen.getByRole("searchbox");
    fireEvent.change(inputField, { target: { value: 'test value' } });
    expect(consoleLogSpy).toHaveBeenCalledWith('Input value: test value');
    consoleLogSpy.mockRestore();
  });
});