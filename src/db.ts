export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
}

type DBData = {
    products: Product[];
};

export const db: DBData = {
    products: [
        {
            id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
            name: 'ThinkPad T420',
            price: 300,
            description: 'Durable and reliable business laptop with a classic keyboard',
        },
        {
            id: '2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q',
            name: 'ThinkPad X220',
            price: 250,
            description: 'Compact and powerful ultraportable laptop',
        },
        {
            id: '3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r',
            name: 'ThinkPad T430',
            price: 350,
            description: 'Enhanced performance with a robust build quality',
        },
        {
            id: '4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s',
            name: 'ThinkPad X31',
            price: 200,
            description: 'Lightweight and portable with a solid build',
        },
        {
            id: '5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t',
            name: 'ThinkPad X20',
            price: 180,
            description: 'Early ultraportable with a compact design',
        },
        {
            id: '6f7g8h9i-0j1k-2l3m-4n5o-6p7q8r9s0t1u',
            name: 'ThinkPad T40',
            price: 220,
            description: 'Versatile and durable with a great keyboard',
        },
        {
            id: '7g8h9i0j-1k2l-3m4n-5o6p-7q8r9s0t1u2v',
            name: 'ThinkPad T43p',
            price: 240,
            description: 'High performance with a robust build',
        },
        {
            id: '8h9i0j1k-2l3m-4n5o-6p7q-8r9s0t1u2v3w',
            name: 'ThinkPad T60p',
            price: 260,
            description: 'Professional-grade laptop with advanced features',
        },
        {
            id: '9i0j1k2l-3m4n-5o6p-7q8r-9s0t1u2v3w4x',
            name: 'ThinkPad X40',
            price: 210,
            description: 'Ultra-portable with a lightweight design',
        },
        {
            id: '0j1k2l3m-4n5o-6p7q-8r9s-0t1u2v3w4x5y',
            name: 'ThinkPad X41 Tablet',
            price: 230,
            description: 'Convertible tablet with a versatile design',
        },
        {
            id: '1k2l3m4n-5o6p-7q8r-9s0t-1u2v3w4x5y6z',
            name: 'ThinkPad X60 Tablet',
            price: 250,
            description: 'Convertible tablet with enhanced performance',
        },
        {
            id: '2l3m4n5o-6p7q-8r9s-0t1u-2v3w4x5y6z7a',
            name: 'ThinkPad X230 Tablet',
            price: 270,
            description: 'Convertible tablet with powerful features',
        },
        {
            id: '3m4n5o6p-7q8r-9s0t-1u2v-3w4x5y6z7a8b',
            name: 'ThinkPad X300',
            price: 290,
            description: 'Ultra-thin and lightweight with a solid build',
        },
        {
            id: '4n5o6p7q-8r9s-0t1u-2v3w-4x5y6z7a8b9c',
            name: 'ThinkPad X301',
            price: 310,
            description: 'Enhanced version of the X300 with improved features',
        },
        {
            id: '5o6p7q8r-9s0t-1u2v-3w4x-5y6z7a8b9c0d',
            name: 'ThinkPad X60s',
            price: 240,
            description: 'Ultra-portable with a lightweight and compact design',
        },
        {
            id: '6p7q8r9s-0t1u-2v3w-4x5y-6z7a8b9c0d1e',
            name: 'ThinkPad 25',
            price: 350,
            description: 'Anniversary edition with classic design and modern features',
        },
        {
            id: '7q8r9s0t-1u2v-3w4x-5y6z-7a8b9c0d1e2f',
            name: 'ThinkPad W701ds',
            price: 400,
            description: 'High-performance workstation with dual screens',
        }
    ],
};
