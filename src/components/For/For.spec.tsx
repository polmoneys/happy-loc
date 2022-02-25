import { render, screen } from "@testing-library/react";

import For, { ObjectLike } from "./For";

describe("For", () => {
  it("should display 2 items", () => {
    // arrange
    render(
      <For
        of={[
          { id: "1", name: "aaaaaa" },
          { id: "2", name: "b" },
        ]}
      >
        {({ item, key, loading }: ObjectLike) => {
          const i = item as { id: number; name: string };
          const itemId = i?.id as number;
          const itemName = i?.name as string;

          return (
            <p key={key as number}>
              {itemId} - {itemName}
            </p>
          );
        }}
      </For>
    );

    // act
    const itemA = screen.getByText("aaaaaa", { exact: false });
    const itemB = screen.getByText("b", { exact: false });

    // assert
    expect(itemA).toBeInTheDocument();
    expect(itemB).toBeInTheDocument();
    // Make it fail
    // expect(itemB).not.toBeInTheDocument();
  });

  it("renders as ul in given order", () => {
    const names = [
      { name: "Bucciarati" },
      { name: "Abbacchio" },
      { name: "Narancia" },
    ];
    // arrange
    render(
      <For as="ul" of={names}>
        {({ item, key, loading }: ObjectLike) => {
          const i = item as { id: number; name: string };
          const itemName = i?.name as string;

          return <li key={key as number}>{itemName}</li>;
        }}
      </For>
    );

    // act

    const renderedNames = screen.getAllByRole("listitem");
    // assert

    expect(renderedNames[0]).toHaveTextContent("Bucciarati");
    expect(renderedNames[1]).toHaveTextContent("Abbacchio");
    expect(renderedNames[2]).toHaveTextContent("Narancia");
  });
});
