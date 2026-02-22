export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const PRODUCTS = [
  {
    id: "1",
    name: "Inhale Trailblazer",
    price: 289000,
    category: "Running Shoes",
    type: "shoes",
    image: "/asset/sepatu(3).webp",
    description:
      "Our multipurpose shoe that always ready for any activity, providing comfort and long lasting materials with affordable price",
  },
  {
    id: "2",
    name: "Inhale Ultralight Bundle",
    price: 180000,
    category: "Apparel",
    type: "Apparel",
    image: "/asset/bundling (1).webp",
    description:
      "A set of running shirt and short to boost your running everyday without any worries ",
  },
  {
    id: "3",
    name: "Inhale Ultralight Short",
    price: 60000,
    category: "Apparel",
    type: "Apparel",
    image: "/asset/shorts.webp",
    description:
      'Whatever your "why" is for working out, the Metcon 9 makes it all worth it.',
  },
  {
    id: "4",
    name: "Inhale Cushion Air Max",
    price: 610000,
    category: "Running Shoes",
    type: "shoes",
    image: "/asset/sepatu(4).webp",
    description:
      "Providing best cushioning in the market while keeping your feet stabilized",
  },
  {
    id: "5",
    name: "Inhale Ultralight Shirt",
    price: 150000,
    category: "Apparel",
    type: "Apparel",
    image: "/asset/shirtz.webp",
    description:
      "The radiance lives on in the Nike Air Force 1 '07, the b-ball OG that puts a fresh spin on what you know best.",
  },
  {
    id: "6",
    name: "Inhale Flash Quantum",
    price: 1129000,
    category: "Running Shoes",
    type: "shoes",
    image: "/asset/sepatu(2).jpg",

    description:
      "Inhale's first carbon plated racing shoes, using this shoe guarantee you a PB",
  },
  {
    id: "7",
    name: "Inhale Traction 1.0",
    price: 499000,
    category: "Running Shoes",
    type: "shoes",
    image: "/asset/sepatu(1).webp",
    description:
      "Specially formulized by our engineer to accomondate your trail running journey, with each steps gripped by our vibram outsole",
  },
  {
    id: "8",
    name: "Inhale Vision",
    price: 200000,
    category: "Accessories",
    image: "/asset/glass.webp",
    description:
      "Stylish running glass to compliment your 'kalcer' outfit with UV protection",
  },
  {
    id: "9",
    name: "Inhale Active Sock",
    price: 30000,
    category: "Accessories",
    type: "Apparel",
    image: "/asset/sock.webp",
    description:
      "Thin, breathable and anti blister sock dedicated for high level runner",
  },
];
