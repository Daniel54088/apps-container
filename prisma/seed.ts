import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  const labelsData = [
    { id: faker.string.uuid(), name: "urgent", color: "#FF0000" },
    { id: faker.string.uuid(), name: "bug", color: "#FF9900" },
    { id: faker.string.uuid(), name: "feature", color: "#00FF00" },
    { id: faker.string.uuid(), name: "production", color: "#0000FF" },
    { id: faker.string.uuid(), name: "optimization", color: "#FFFF00" },
    { id: faker.string.uuid(), name: "primary", color: "#00cc00" },
    { id: faker.string.uuid(), name: "medium", color: "#3385ff" },
    { id: faker.string.uuid(), name: "low", color: "#8533ff" },
    { id: faker.string.uuid(), name: "staging", color: "#ff5500" },
  ];

  // Create labels first
  await prisma.label.createMany({ data: labelsData });

  // Create tickets and associate labels
  const ticketsData = [
    {
      id: faker.string.uuid(),
      title: "Fix login issue",
      ownerName: "Alice",
      imageUrl: faker.image.url(),
      updatedAt: new Date(),
      createdAt: new Date(),
      content: "This ticket involves fixing the login issue reported by users.",
      labels: [],
    },
    {
      id: faker.string.uuid(),
      title: "Add new feature to dashboard",
      ownerName: "Bob",
      imageUrl: faker.image.url(),
      updatedAt: new Date(),
      createdAt: new Date(),
      labels: [],
      content:
        "This ticket is about adding a new feature to the dashboard to improve user experience.",
    },
    {
      id: faker.string.uuid(),
      title: "Refactor codebase",
      ownerName: "Charlie",
      imageUrl: faker.image.url(),
      updatedAt: new Date(),
      createdAt: new Date(),
      labels: [],
      content:
        "This ticket involves refactoring the codebase to improve maintainability and performance.",
    },
  ];

  // Create tickets and ticket-label associations
  for (const ticketData of ticketsData) {
    await prisma.ticket.create({
      data: {
        id: ticketData.id,
        title: ticketData.title,
        ownerName: ticketData.ownerName,
        imageUrl: ticketData.imageUrl,
        updatedAt: ticketData.updatedAt,
        createdAt: ticketData.createdAt,
        content: ticketData.content,
        labels: ticketData.labels,
      },
    });
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
