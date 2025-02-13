import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const db = new PrismaClient();
enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

function getProducts() {
  return [
    {
      id: '28f520f7-e239-4e7a-bf96-320d8ae45a45',
      name: 'ThinkPad T420',
      cpu: 'i5',
      ram: 4,
      storage: 250,
      screen: 14,
      price: 300,
      description: 'Durable and reliable business laptop with a classic keyboard',
      images: "t420_1 t420_2 t420_3 t420_4",
    },
    {
      id: '2832a8ea-f990-409f-8f63-8839601528c7',
      name: 'ThinkPad X220',
      cpu: 'i5',
      ram: 4,
      storage: 250,
      screen: 14,
      price: 250,
      description: 'Compact and powerful ultraportable laptop',
      images: "x220_1 x220_2 x220_3 x220_4",
    },
    {
      id: 'c9e9e34a-ac08-476e-baec-9d33bd144d8f',
      name: 'ThinkPad T430s',
      cpu: 'i5',
      ram: 4,
      storage: 250,
      screen: 14,
      price: 350,
      description: 'Enhanced performance with a robust build quality',
      images: "t430s_1 t430s_2 t430s_3 t430s_4",
    },
    {
      id: '0dafb28f-e0db-4b0a-889e-923ee37b3001',
      name: 'ThinkPad X301',
      cpu: 'i5',
      ram: 4,
      storage: 250,
      screen: 14,
      price: 200,
      description: 'Lightweight and portable with a solid build',
      images: "x301_1 x301_2 x301_3 x301_4",
    },
    {
      id: '5e6e4712-1510-472f-88ae-ea37b3311892',
      name: 'ThinkPad X20',
      cpu: 'i5',
      ram: 4,
      storage: 250,
      screen: 14,
      price: 180,
      description: 'Early ultraportable with a compact design',
      images: "x20_1 x20_2 x20_3 x20_4",
    },
    {
      id: '3c7c5635-c4df-445b-bd34-1f31bfc4be6a',
      name: 'ThinkPad T40',
      cpu: 'Celeron',
      ram: 4,
      storage: 250,
      screen: 14,
      price: 220,
      description: 'Versatile and durable with a great keyboard',
      images: "t40_1 t40_2 t40_3 t40_4",
    },
    {
      id: '3b544d6a-28aa-4e13-a940-3a7fcbb33644',
      name: 'ThinkPad T43p',
      cpu: 'Celeron',
      ram: 4,
      storage: 250,
      screen: 14,
      price: 240,
      description: 'High performance with a robust build',
      images: "t43p_1 t43p_2 t43p_3 t43p_4",
    },
    {
      id: '4be66634-9422-4e86-a5c1-a7b481d26112',
      name: 'ThinkPad T60p',
      cpu: 'Core Duo',
      ram: 4,
      storage: 250,
      screen: 14,
      price: 260,
      description: 'Professional-grade laptop with advanced features',
      images: "t60_1 t60_2 t60_3 t60_4",
    },
    {
      id: '2771611e-1b29-4c4f-afec-179eaa6b0c2f',
      name: 'ThinkPad X40',
      cpu: 'Pentium',
      ram: 4,
      storage: 250,
      screen: 14,
      price: 210,
      description: 'Ultra-portable with a lightweight design',
      images: "x40_1 x40_2 x40_3 x40_4",
    },
    {
      id: '9e3d220d-1f1d-4650-a4f0-d0876a27a43c',
      name: 'ThinkPad X41 Tablet',
      cpu: 'Pentium',
      ram: 4,
      storage: 100,
      screen: 12,
      price: 230,
      description: 'Convertible tablet with a versatile design',
      images: "x41Tablet_1 x41Tablet_2 x41Tablet_3 x41Tablet_4",
    },
    {
      id: 'cadfad48-0476-4c0d-bba3-7187cd51dc36',
      name: 'ThinkPad X60 Tablet',
      cpu: 'Core Duo',
      ram: 4,
      storage: 100,
      screen: 12,
      price: 250,
      description: 'Convertible tablet with enhanced performance',
      images: "x60Tablet_1 x60Tablet_2 x60Tablet_3 x60Tablet_4",
    },
    {
      id: 'abdd1859-de33-403e-ab05-8d696e907351',
      name: 'ThinkPad X301',
      cpu: 'Core Duo',
      ram: 1,
      storage: 100,
      screen: 12,
      price: 310,
      description: 'Enhanced version of the X300 with improved features',
      images: "x301_1 301_2 x301_3 x301_4",
    },
    {
      id: '6f3fcedf-ca54-4ea7-ad1a-eafa4a2d8a69',
      name: 'ThinkPad X60s',
      cpu: 'Core Duo',
      ram: 1,
      storage: 100,
      screen: 12,
      price: 240,
      description: 'Ultra-portable with a lightweight and compact design',
      images: "x60_1 x60_2 x60_3 x60_4",
    },
    {
      id: '158aba7f-6017-46d8-a55c-ca47f8c2ca4f',
      name: 'ThinkPad 25',
      cpu: 'i7',
      ram: 8,
      storage: 512,
      screen: 14,
      price: 800,
      description: 'Anniversary edition with classic design and modern features',
      images: "T25_1 T25_2 T25_3 T25_4",
    },
    {
      id: '47573316-45fd-4ff9-8255-8320b356552b',
      name: 'ThinkPad W701ds',
      cpu: 'i7',
      ram: 8,
      storage: 512,
      screen: 14,
      price: 400,
      description: 'High-performance workstation with dual screens',
      images: "w701ds_1 w701ds_2 w701ds_3 w701ds_4",
    },
  ]
}

// function getUsers() {
//   return [
//     {
//       id: '74463e29-fbb3-4ee3-b5e9-069ecaa88302',
//       email: 'john.doe@gmail.com',
//       role: Role.USER,
//     },
//     {
//       id: 'cd048ba0-e7a0-4d81-a3d1-226cdfb1698c',
//       email: 'jane.doe@gmail.com',
//       role: Role.USER,
//     },
//     {
//       id: '860171b5-2433-4ef9-92d2-5233d9b1138a',
//       email: 'dave.doe@gmail.com',
//       role: Role.USER,
//     },
//   ]
// }

// function getPasswords() {
//   return [
//     {
//       user: { connect: { id: '74463e29-fbb3-4ee3-b5e9-069ecaa88302' } },
//       hashedPassword: 'password1',
//     },
//     {
//       user: { connect: { id: 'cd048ba0-e7a0-4d81-a3d1-226cdfb1698c' } },
//       hashedPassword: 'password2',
//     },
//     {
//       user: { connect: { id: '860171b5-2433-4ef9-92d2-5233d9b1138a' } },
//       hashedPassword: 'password3',
//     },
//   ]
// }

// function getCarts() {
//   return [
//     {
//       id: '4e0c1cb1-a2b4-4fc6-8c3a-3c57c8886b2d',
//       user: { connect: { id: '74463e29-fbb3-4ee3-b5e9-069ecaa88302' } },
//     },
//     {
//       id: '9b2d5c4e-c7a4-4ddc-b75e-918b1d93a6e3',
//       user: { connect: { id: 'cd048ba0-e7a0-4d81-a3d1-226cdfb1698c' } },
//     },
//     {
//       id: '73df22e5-f9aa-4d91-8c91-c144d16c3bc9',
//       user: { connect: { id: '860171b5-2433-4ef9-92d2-5233d9b1138a' } },
//     },
//   ];
// }

// function getCartProducts() {
//   return [
//     {
//       quantity: 1,
//       cart: { connect: { id: '4e0c1cb1-a2b4-4fc6-8c3a-3c57c8886b2d' } },
//       product: { connect: { id: '47573316-45fd-4ff9-8255-8320b356552b' } },
//     },
//     {
//       quantity: 1,
//       cart: { connect: { id: '9b2d5c4e-c7a4-4ddc-b75e-918b1d93a6e3' } },
//       product: { connect: { id: '158aba7f-6017-46d8-a55c-ca47f8c2ca4f' } },
//     },
//     {
//       quantity: 1,
//       cart: { connect: { id: '73df22e5-f9aa-4d91-8c91-c144d16c3bc9' } },
//       product: { connect: { id: '6f3fcedf-ca54-4ea7-ad1a-eafa4a2d8a69' } },
//     },
//   ]
// }

function getOrders() {
  return [
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      // date: new Date(),
      totalPrice: 200,
      customer: 'John Doe',
      email: 'john.doe@gmail.com',
      address: '1 Trafalgar Square, London',
      // orderItems: [
      //   { connect: { id: '58684427-56fe-5ffa-9266-9431c467663c' } }
      // ],
      // user: { connect: { id: '74463e29-fbb3-4ee3-b5e9-069ecaa88302' } },
    },
  ]
}

function getOrderItems() {
  return [
    {
      id: '58684427-56fe-5ffa-9266-9431c467663c',
      quantity: 1,
      price: 200,
      comment: "Please deliver before 5pm",
      order: { connect: { id: '550e8400-e29b-41d4-a716-446655440000' } },
      product: { connect: { id: '47573316-45fd-4ff9-8255-8320b356552b' } },
    },
  ]
}

async function cleanDatabase() {
  console.log("Cleaning database...");

  // await db.cartItem.deleteMany();
  // await db.cart.deleteMany();
  await db.orderItem.deleteMany();
  await db.order.deleteMany();
  // await db.password.deleteMany();
  // await db.user.deleteMany();
  await db.product.deleteMany();

  console.log("Database cleaned.");
}

async function seed() {
  await cleanDatabase();

  await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: product });
    }),
  );

  // await Promise.all(
  //   getUsers().map((user) => {
  //     return db.user.create({ data: user });
  //   }),
  // );

  // await Promise.all(
  //   getPasswords().map( async (item) => {
  //     item.hashedPassword = await bcrypt.hash(item.hashedPassword, 10);
  //     return db.password.create({ data: item });
  //   }),
  // );

  // await Promise.all(
  //   getCarts().map((cart) => {
  //     return db.cart.create({ data: cart });
  //   }),
  // );

  // await Promise.all(
  //   getCartProducts().map((cartItem) => {
  //     return db.cartItem.create({ data: cartItem });
  //   }),
  // );

  
  await Promise.all(
    getOrders().map((order) => {
      return db.order.create({ data: order });
    }),
  );
  
  await Promise.all(
    getOrderItems().map((orderItem) => {
      return db.orderItem.create({ data: orderItem });
    }),
  );
}

seed();