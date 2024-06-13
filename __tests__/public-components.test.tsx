import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TicketContextProvider from "@/contexts/ticketpilot-context-provider";
import Stats from "@/components/stats";

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
  test("Stats component renders correctly with mock data", () => {
    render(
      <TicketContextProvider data={tickets} labels={labels}>
        <Stats />
      </TicketContextProvider>
    );

    expect(screen.getByText("Current Tickets")).toBeInTheDocument();

    const ticketLengthElement = screen.getByTestId("ticket-length");
    expect(ticketLengthElement).toBeInTheDocument();
    expect(ticketLengthElement).toHaveTextContent("1");
  });
  // todo: finish all of the public comonents testing
});
