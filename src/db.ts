export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
}

export interface Order {
    id: string;
    productId: string;
    client: string;
    address: string;
}

type DBData = {
    products: Product[];
    orders: Order[];
};

export const db: DBData = {
    products: [
        {
            id: '28f520f7-e239-4e7a-bf96-320d8ae45a45',
            name: 'ThinkPad T420',
            price: 300,
            description: 'Durable and reliable business laptop with a classic keyboard',
        },
        {
            id: '2832a8ea-f990-409f-8f63-8839601528c7',
            name: 'ThinkPad X220',
            price: 250,
            description: 'Compact and powerful ultraportable laptop',
        },
        {
            id: 'c9e9e34a-ac08-476e-baec-9d33bd144d8f',
            name: 'ThinkPad T430',
            price: 350,
            description: 'Enhanced performance with a robust build quality',
        },
        {
            id: '0dafb28f-e0db-4b0a-889e-923ee37b3001',
            name: 'ThinkPad X31',
            price: 200,
            description: 'Lightweight and portable with a solid build',
        },
        {
            id: '5e6e4712-1510-472f-88ae-ea37b3311892',
            name: 'ThinkPad X20',
            price: 180,
            description: 'Early ultraportable with a compact design',
        },
        {
            id: '3c7c5635-c4df-445b-bd34-1f31bfc4be6a',
            name: 'ThinkPad T40',
            price: 220,
            description: 'Versatile and durable with a great keyboard',
        },
        {
            id: '3b544d6a-28aa-4e13-a940-3a7fcbb33644',
            name: 'ThinkPad T43p',
            price: 240,
            description: 'High performance with a robust build',
        },
        {
            id: '4be66634-9422-4e86-a5c1-a7b481d26112',
            name: 'ThinkPad T60p',
            price: 260,
            description: 'Professional-grade laptop with advanced features',
        },
        {
            id: '2771611e-1b29-4c4f-afec-179eaa6b0c2f',
            name: 'ThinkPad X40',
            price: 210,
            description: 'Ultra-portable with a lightweight design',
        },
        {
            id: '9e3d220d-1f1d-4650-a4f0-d0876a27a43c',
            name: 'ThinkPad X41 Tablet',
            price: 230,
            description: 'Convertible tablet with a versatile design',
        },
        {
            id: 'cadfad48-0476-4c0d-bba3-7187cd51dc36',
            name: 'ThinkPad X60 Tablet',
            price: 250,
            description: 'Convertible tablet with enhanced performance',
        },
        {
            id: 'd092d0ab-b1a0-4b7d-b08d-98c77fb4ba22',
            name: 'ThinkPad X230 Tablet',
            price: 270,
            description: 'Convertible tablet with powerful features',
        },
        {
            id: 'ca4a7338-62f0-4026-8d62-c12ca13b192d',
            name: 'ThinkPad X300',
            price: 290,
            description: 'Ultra-thin and lightweight with a solid build',
        },
        {
            id: 'abdd1859-de33-403e-ab05-8d696e907351',
            name: 'ThinkPad X301',
            price: 310,
            description: 'Enhanced version of the X300 with improved features',
        },
        {
            id: '6f3fcedf-ca54-4ea7-ad1a-eafa4a2d8a69',
            name: 'ThinkPad X60s',
            price: 240,
            description: 'Ultra-portable with a lightweight and compact design',
        },
        {
            id: '158aba7f-6017-46d8-a55c-ca47f8c2ca4f',
            name: 'ThinkPad 25',
            price: 350,
            description: 'Anniversary edition with classic design and modern features',
        },
        {
            id: '47573316-45fd-4ff9-8255-8320b356552b',
            name: 'ThinkPad W701ds',
            price: 400,
            description: 'High-performance workstation with dual screens',
        },
    ],
    orders: [
            {
              id: '74463e29-fbb3-4ee3-b5e9-069ecaa88302',
              productId: '47573316-45fd-4ff9-8255-8320b356552b',
              client: 'John Doe',
              address: '1234 Main St, New York, NY 10001',
            },
            {
              id: 'cd048ba0-e7a0-4d81-a3d1-226cdfb1698c',
              productId: '158aba7f-6017-46d8-a55c-ca47f8c2ca4f',
              client: 'Jane Doe',
              address: '23 Baker Street, New York, NY 10001',
            },
            {
              id: '860171b5-2433-4ef9-92d2-5233d9b1138a',
              productId: '6f3fcedf-ca54-4ea7-ad1a-eafa4a2d8a69',
              client: 'Al Swearengen',
              address: '12 Main St, Deadwood, DA 12002',
            },
        ]
    
};
