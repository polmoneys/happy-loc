import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Button from "./Button";

describe("Button", () => {
  it("should renders a msg", () => {
    // arrange
    render(<Button>Hello world</Button>);

    // act
    const title = screen.getByTestId("button");

    // assert
    expect(title).toHaveTextContent(/Hello world/i);
  });

  it("should spell aria-label", () => {
    // arrange
    render(<Button label="hey ho">Hello world</Button>);

    // act
    const button = screen.getByRole("button", { name: "hey ho" });

    // assert
    expect(button).toBeInTheDocument();
  });

  it("should call cb onClick", () => {
    const callback = jest.fn();

    // arrange
    render(<Button onClick={callback}>Hello world</Button>);

    // act
    const button = screen.getByRole("button", { name: "Hello world" });
    userEvent.click(button);
    // assert
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
