// import { PrismaClient } from '@prisma/client';
// const db = new PrismaClient();
// enum Role {
//   USER = 'USER',
//   ADMIN = 'ADMIN',
// }

// function getProducts() {
//     return [
//         {
//             id: '28f520f7-e239-4e7a-bf96-320d8ae45a45',
//             name: 'ThinkPad T420',
//             cpu: 'i5',
//             ram: 4,
//             storage: 250,
//             screen: 14,
//             price: 300,
//             description: 'Durable and reliable business laptop with a classic keyboard',
//             image: "t420"
//         },
//         {
//             id: '2832a8ea-f990-409f-8f63-8839601528c7',
//             name: 'ThinkPad X220',
//             cpu: 'i5',
//             ram: 4,
//             storage: 250,
//             screen: 14,
//             price: 250,
//             description: 'Compact and powerful ultraportable laptop',
//             image: "ThinkPadX220"
//         },
//         {
//             id: 'c9e9e34a-ac08-476e-baec-9d33bd144d8f',
//             name: 'ThinkPad T430',
//             cpu: 'i5',
//             ram: 4,
//             storage: 250,
//             screen: 14,
//             price: 350,
//             description: 'Enhanced performance with a robust build quality',
//             image: "t420"
//         },
//         {
//             id: '0dafb28f-e0db-4b0a-889e-923ee37b3001',
//             name: 'ThinkPad X301',
//             cpu: 'i5',
//             ram: 4,
//             storage: 250,
//             screen: 14,
//             price: 200,
//             description: 'Lightweight and portable with a solid build',
//             image: "426px-ThinkPadX301"
//         },
//         {
//             id: '5e6e4712-1510-472f-88ae-ea37b3311892',
//             name: 'ThinkPad X20',
//             cpu: 'i5',
//             ram: 4,
//             storage: 250,
//             screen: 14,
//             price: 180,
//             description: 'Early ultraportable with a compact design',
//             image: "ThinkPadX20"
//         },
//         {
//             id: '3c7c5635-c4df-445b-bd34-1f31bfc4be6a',
//             name: 'ThinkPad T40',
//             cpu: 'Celeron',
//             ram: 4,
//             storage: 250,
//             screen: 14,
//             price: 220,
//             description: 'Versatile and durable with a great keyboard',
//             image: "ThinkPadT40"
//         },
//         {
//             id: '3b544d6a-28aa-4e13-a940-3a7fcbb33644',
//             name: 'ThinkPad T43p',
//             cpu: 'Celeron',
//             ram: 4,
//             storage: 250,
//             screen: 14,
//             price: 240,
//             description: 'High performance with a robust build',
//             image: "ThinkpadT43P"
//         },
//         {
//             id: '4be66634-9422-4e86-a5c1-a7b481d26112',
//             name: 'ThinkPad T60p',
//             cpu: 'Core Duo',
//             ram: 4,
//             storage: 250,
//             screen: 14,
//             price: 260,
//             description: 'Professional-grade laptop with advanced features',
//             image: "ThinkPadT60"
//         },
//         {
//             id: '2771611e-1b29-4c4f-afec-179eaa6b0c2f',
//             name: 'ThinkPad X40',
//             cpu: 'Pentium',
//             ram: 4,
//             storage: 250,
//             screen: 14,
//             price: 210,
//             description: 'Ultra-portable with a lightweight design',
//             image: "ThinkPadX40"
//         },
//         {
//             id: '9e3d220d-1f1d-4650-a4f0-d0876a27a43c',
//             name: 'ThinkPad X41 Tablet',
//             cpu: 'Pentium',
//             ram: 4,
//             storage: 100,
//             screen: 12,
//             price: 230,
//             description: 'Convertible tablet with a versatile design',
//             image: "ThinkPadX40"
//         },
//         {
//             id: 'cadfad48-0476-4c0d-bba3-7187cd51dc36',
//             name: 'ThinkPad X60 Tablet',
//             cpu: 'Core Duo',
//             ram: 4,
//             storage: 100,
//             screen: 12,
//             price: 250,
//             description: 'Convertible tablet with enhanced performance',
//             image: "X60_Tablet"
//         },
//         {
//             id: 'd092d0ab-b1a0-4b7d-b08d-98c77fb4ba22',
//             name: 'ThinkPad X230 Tablet',
//             cpu: 'i3',
//             ram: 4,
//             storage: 100,
//             screen: 12,
//             price: 270,
//             description: 'Convertible tablet with powerful features',
//             image: "X60_Tablet"
//         },
//         {
//             id: 'ca4a7338-62f0-4026-8d62-c12ca13b192d',
//             name: 'ThinkPad X300',
//             cpu: 'Core Duo',
//             ram: 1,
//             storage: 100,
//             screen: 12,
//             price: 290,
//             description: 'Ultra-thin and lightweight with a solid build',
//             image: "X300"
//         },
//         {
//             id: 'abdd1859-de33-403e-ab05-8d696e907351',
//             name: 'ThinkPad X301',
//             cpu: 'Core Duo',
//             ram: 1,
//             storage: 100,
//             screen: 12,
//             price: 310,
//             description: 'Enhanced version of the X300 with improved features',
//             image: "426px-ThinkPadX301"
//         },
//         {
//             id: '6f3fcedf-ca54-4ea7-ad1a-eafa4a2d8a69',
//             name: 'ThinkPad X60s',
//             cpu: 'Core Duo',
//             ram: 1,
//             storage: 100,
//             screen: 12,
//             price: 240,
//             description: 'Ultra-portable with a lightweight and compact design',
//             image: "ThinkPadX60"
//         },
//         {
//             id: '158aba7f-6017-46d8-a55c-ca47f8c2ca4f',
//             name: 'ThinkPad 25',
//             cpu: 'i7',
//             ram: 8,
//             storage: 512,
//             screen: 14,
//             price: 800,
//             description: 'Anniversary edition with classic design and modern features',
//             image: "T25"
//         },
//         {
//             id: '47573316-45fd-4ff9-8255-8320b356552b',
//             name: 'ThinkPad W701ds',
//             cpu: 'i7',
//             ram: 8,
//             storage: 512,
//             screen: 14,
//             price: 400,
//             description: 'High-performance workstation with dual screens',
//             image: "ThinkPadW701ds"
//         },
//     ]
// }

// function getUsers() {
//     return [
//                 {
//                     id: '74463e29-fbb3-4ee3-b5e9-069ecaa88302',
//                     email: 'john.doe@gmail.com',
//                     role: Role.USER,
//                 },
//                 {
//                     id: 'cd048ba0-e7a0-4d81-a3d1-226cdfb1698c',
//                     email: 'jane.doe@gmail.com',
//                     role: Role.USER,
//                 },
//                 {
//                     id: '860171b5-2433-4ef9-92d2-5233d9b1138a',
//                     email: 'dave.doe@gmail.com',
//                     role: Role.USER,
//                 },
//             ]
// }
  
// function getPasswords() {
//     return [
//       {
//         user: { connect: { id: '74463e29-fbb3-4ee3-b5e9-069ecaa88302' } },
//         hashedPassword: 'password1',
//       },
//       {
//         user: { connect: { id: 'cd048ba0-e7a0-4d81-a3d1-226cdfb1698c' } },
//         hashedPassword: 'password2',
//       },
//       {
//         user: { connect: { id: '860171b5-2433-4ef9-92d2-5233d9b1138a' } },
//         hashedPassword: 'password3',
//       },
//     ]
// }

// function getCarts() {
//     return [
//       {
//         id: '4e0c1cb1-a2b4-4fc6-8c3a-3c57c8886b2d',
//         user: { connect: { id: '74463e29-fbb3-4ee3-b5e9-069ecaa88302' } },
//       },
//       {
//         id: '9b2d5c4e-c7a4-4ddc-b75e-918b1d93a6e3',
//         user: { connect: { id: 'cd048ba0-e7a0-4d81-a3d1-226cdfb1698c' } },
//       },
//       {
//         id: '73df22e5-f9aa-4d91-8c91-c144d16c3bc9',
//         user: { connect: { id: '860171b5-2433-4ef9-92d2-5233d9b1138a' } },
//       },
//     ];
//   }

// function getCartProducts() {
//     return [
//       {
//         quantity: 1,
//         cart: { connect: { id: '4e0c1cb1-a2b4-4fc6-8c3a-3c57c8886b2d' } },
//         product: { connect: { id: '47573316-45fd-4ff9-8255-8320b356552b' } },
//       },
//       {
//         quantity: 1,
//         cart: { connect: { id: '9b2d5c4e-c7a4-4ddc-b75e-918b1d93a6e3' } },
//         product: { connect: { id: '158aba7f-6017-46d8-a55c-ca47f8c2ca4f' } },
//       },
//       {
//         quantity: 1,
//         cart: { connect: { id: '73df22e5-f9aa-4d91-8c91-c144d16c3bc9' } },
//         product: { connect: { id: '6f3fcedf-ca54-4ea7-ad1a-eafa4a2d8a69' } },
//       },
//     ]
//   }

//   function getOrders() {
//     return [
//       {
//         id: '550e8400-e29b-41d4-a716-446655440000',
//         date: new Date(),
//         totalPrice: 200,
//         customer: 'John Doe',
//         email: 'john.doe@gmail.com',
//         address: '1 Trafalgar Square, London',
//         user: { connect: { id: '74463e29-fbb3-4ee3-b5e9-069ecaa88302' } },
//       },
//     ]
// }

// function getOrderItems() {
//     return [
//       {
//         quantity: 1,
//         price: 200,
//         order: { connect: { id: '550e8400-e29b-41d4-a716-446655440000' } },
//         product: { connect: { id: '73df22e5-f9aa-4d91-8c91-c144d16c3bc9' } },
//       },
//     ]
// }

// async function seed() {
//     await Promise.all(
//       getProducts().map((product) => {
//         return db.product.create({ data: product });
//       }),
//     );
//     await Promise.all(
//       getUsers().map((user) => {
//         return db.user.create({ data: user });
//       }),
//     );

//     await Promise.all(
//         getPasswords().map((password) => {
//           return db.password.create({ data: password });
//         }),
//       );
//       await Promise.all(
//         getCarts().map((cart) => {
//           return db.cart.create({ data: cart });
//         }),
//       );
//       await Promise.all(
//         getCartProducts().map((cartItem) => {
//           return db.cartItem.create({ data: cartItem });
//         }),
//       );
//       await Promise.all(
//         getOrders().map((order) => {
//           return db.order.create({ data: order });
//         }),
//       );
//       await Promise.all(
//         getOrderItems().map((orderItem) => {
//           return db.orderItem.create({ data: orderItem });
//         }),
//       );
//   }
