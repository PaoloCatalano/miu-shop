export default {
  openGraph: {
    type: "website",
    locale: "en_IE",
    site_name: process.env.WEBSITE_NAME,
    title: "Miu Shop",
    description:
      "In this e-commerce web site you can buy stickers, dolls, kimonos, handcrafts, and much more.",
    url: "https://miu-shop.vercel.app/",
    images: [
      {
        url: "https://miu-shop.vercel.app/icon.png",
        width: 1000,
        height: 1000,
        alt: "Miu Shop letter μ",
      },
      {
        url: "https://miu-shop.vercel.app/logo.png",
        width: 1000,
        height: 1000,
        alt: "Miu Shop character",
      },
    ],
  },
  title: process.env.WEBSITE_NAME,
  description:
    "In this e-commerce web site you can buy stickers, dolls, kimonos, handcrafts, and much more.",
};
