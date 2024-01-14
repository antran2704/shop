import { INavItem } from "./interface";

export const initItemDesktop: INavItem[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Design",
    path: "/design",
  },
  {
    name: "Collections",
    path: "/collections",
    images: [
      "https://theme.hstatic.net/1000197303/1001046599/14/mega-image_1-1.jpg?v=7844",
      "https://theme.hstatic.net/1000197303/1001046599/14/mega-image_1-2.jpg?v=7844"
    ],
    children: [
      {
        name: "Thời trang theo Dịp/Sự kiện",
        children: [
          {
            name: "Accessories",
            path: "/collections/accessories",
          },
          {
            name: "Garden Decor",
            path: "/collections/garden-decor",
          },
          {
            name: "Gift",
            path: "/collections/gift",
          },
          {
            name: "Accessories",
            path: "/collections/accessories",
          },
          {
            name: "Garden Decor",
            path: "/collections/garden-decor",
          },
          {
            name: "Gift",
            path: "/collections/gift",
          },
        ],
      },
      {
        name: "Thời trang theo Dịp/Sự kiện",
        children: [
          {
            name: "Accessories",
            path: "/collections/accessories",
          },
          {
            name: "Garden Decor",
            path: "/collections/garden-decor",
          },
          {
            name: "Gift",
            path: "/collections/gift",
          },
        ],
      },
      {
        name: "Thời trang theo Dịp/Sự kiện",
        children: [
          {
            name: "Accessories",
            path: "/collections/accessories",
          },
          {
            name: "Garden Decor",
            path: "/collections/garden-decor",
          },
          {
            name: "Gift",
            path: "/collections/gift",
          },
        ],
      },
    ],
  },
  {
    name: "About Us",
    path: "/aboutUs",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];
