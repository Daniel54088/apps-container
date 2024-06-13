import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TicketContextProvider from "@/contexts/ticketpilot-context-provider";
import TicketList from "@/components/ticketpilot/ticket-list";
import SearchForm from "@/components/ticketpilot/search-form";

export const tickets = [
  {
    id: "982ee5a6-b16a-4d04-9e56-9817c7a2b352",
    title: "Fix login issue",
    ownerName: "Alice",
    content: "This ticket involves fixing the login issue reported by users.",
    imageUrl:
      "https://fastly.picsum.photos/id/453/2048/1365.jpg?hmac=A8uxtdn4Y600Z5b2ngnn9hCXAx8sUnOVzprtDnz6DK8",
    labels: [
      {
        label: "medium",
        value: "3fcc145e-c4ee-4ed1-88e3-bb87f2089337",
        color: "#3385ff",
      },
      {
        label: "urgent",
        value: "93560206-41a3-4072-8084-b596cd60d917",
        color: "#eb0505",
      },
      {
        label: "bug",
        value: "6a25a638-e0e0-4a82-ae12-f3a2d6b01714",
        color: "#ebd005",
      },
    ],
  },
  {
    id: "982ee5fwefwea6-b16a-4d04-9e56-fwetr45655fwe",
    title: "Refactor",
    ownerName: "Daniel",
    content: "This ticket involves fixing the login issue reported by users.",
    imageUrl:
      "https://fastly.picsum.photos/id/453/2048/1365.jpg?hmac=A8uxtdn4Y600Z5b2ngnn9hCXAx8sUnOVzprtDnz6DK8",
    labels: [
      {
        label: "medium",
        value: "3fcc145e-c4ee-4ed1-88e3-bb87f2089337",
        color: "#3385ff",
      },
      {
        label: "urgent",
        value: "93560206-41a3-4072-8084-b596cd60d917",
        color: "#eb0505",
      },
      {
        label: "bug",
        value: "6a25a638-e0e0-4a82-ae12-f3a2d6b01714",
        color: "#ebd005",
      },
    ],
  },
];

export const labels = [
  {
    id: "3fcc145e-c4ee-4ed1-88e3-bb87f2089337",
    name: "medium",
    color: "#3385ff",
    value: "3fcc145e-c4ee-4ed1-88e3-bb87f2089337",
    label: "medium",
  },
  {
    id: "93560206-41a3-4072-8084-b596cd60d917",
    name: "urgent",
    color: "#eb0505",
    value: "93560206-41a3-4072-8084-b596cd60d917",
    label: "urgent",
  },
  {
    id: "6a25a638-e0e0-4a82-ae12-f3a2d6b01714",
    name: "bug",
    color: "#ebd005",
    value: "6a25a638-e0e0-4a82-ae12-f3a2d6b01714",
    label: "bug",
  },
];

describe("Public Components", () => {
  test("renders tickets correctly", () => {
    render(
      <TicketContextProvider data={tickets} labels={labels}>
        <TicketList />
      </TicketContextProvider>
    );

    // Check if the tickets are rendered correctly
    expect(screen.getByText("Fix login issue")).toBeInTheDocument();
    expect(screen.getByText("Refactor")).toBeInTheDocument();
  });

  test("handles ticket selection correctly", () => {
    render(
      <TicketContextProvider data={tickets} labels={labels}>
        <TicketList />
      </TicketContextProvider>
    );
    const firstTicketButton = screen.getByRole("button", {
      name: /Fix login issue/i,
    });
    const secondTicketButton = screen.getByRole("button", {
      name: /Refactor/i,
    });
    // // Initially, no ticket should have the selected class
    expect(firstTicketButton).not.toHaveClass("bg-[#EFF1F2]");
    expect(secondTicketButton).not.toHaveClass("bg-[#EFF1F2]");

    // Click on the second ticket
    fireEvent.click(secondTicketButton);

    // Verify that handleSelectedTicketIdChange is called with the correct id
    expect(firstTicketButton).not.toHaveClass("bg-[#EFF1F2]");
    expect(secondTicketButton).toHaveClass("bg-[#EFF1F2]");

    // Click on the first ticket
    fireEvent.click(firstTicketButton);
    expect(firstTicketButton).toHaveClass("bg-[#EFF1F2]");
    expect(secondTicketButton).not.toHaveClass("bg-[#EFF1F2]");
  });

  test("test ticket list with searchform components.", () => {
    render(
      <TicketContextProvider data={tickets} labels={labels}>
        <SearchForm />
        <TicketList />
      </TicketContextProvider>
    );

    // Check if the input field is rendered correctly
    const inputElement = screen.getByPlaceholderText("Search ticket");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("");

    /// updates search query on input change
    fireEvent.change(inputElement, { target: { value: "fix" } });

    // first ticket exist, second ticket should disapeared
    expect(screen.getByText("Fix login issue")).toBeInTheDocument();
    const ticketItem = screen.queryByText("Refactor");
    expect(ticketItem).not.toBeInTheDocument();
  });
});
