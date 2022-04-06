import { Ticket } from "../ticket";

it("implements optimistic concurrency", async () => {
  // create an instance of a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 5,
    userId: "123",
  });
  await ticket.save();
  // fetch ticket twice

  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);
  // make two separate change to the tickets we fetched
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });

  await firstInstance!.save();
  
  // save the first fetched ticket
  try {
    await secondInstance!.save();
  } catch (err) {
    return;
  }
  throw new Error("Should not reach this point");
  // save the second fetched ticket
});

it("increments the version number on multiple save", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 5,
    userId: "123",
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
