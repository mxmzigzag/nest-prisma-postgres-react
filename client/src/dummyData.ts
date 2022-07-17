import topSport from "./images/categories/sport/michael-jordan-jump-shot.webp";
import topSpace from "./images/categories/space/web-first-images.png";
import topScience from "./images/categories/science/science-lab.webp";
import topEconomy from "./images/categories/economics/bitcoin.webp";
import topPolitics from "./images/categories/politics/United-Nations.jpeg";
import gsw2022Champs from "./images/categories/sport/gsw-2022-champs.jpeg";

export const posts = [
  {
    id: 0,
    title: "G.O.A.T",
    image: topSport,
    description: "The rise of the G.O.A.T",
    body: "Michael Jordan and the Bulls got their 6th ring!",
    isPublished: true,
    authorId: 1,
    author: {
      userName: "The_Blogger",
    },
    categoryId: 1,
    category: {
      id: 0,
      title: "Sport",
      color: "orange",
    },
    viewsCount: 55,
    tags: [
      {
        name: "NBA",
      },
      {
        name: "Chicago Bulls",
      },
    ],
  },
  {
    id: 32,
    title: "New 21/22 NBA Champoins!",
    image: gsw2022Champs,
    description: "Golden State Worriors got theirs 4th ring",
    body: "This year San Francisco will go wild because their basketball team became this years NBA champions",
    isPublished: true,
    authorId: 5,
    author: {
      userName: "ZigZag",
    },
    categoryId: 1,
    category: {
      id: 1,
      title: "Sport",
      color: "orange",
    },
    viewsCount: 3,
    tags: [
      {
        name: "Basketball",
      },
      {
        name: "NBA",
      },
      {
        name: "GSW",
      },
    ],
  },
  {
    id: 4,
    title: "The massive blow!",
    image: topSpace,
    description: "Now we can see what is going on up there",
    body: "The Webb telescope showed us something new",
    isPublished: true,
    authorId: 4,
    author: {
      userName: "Stdot",
    },
    categoryId: 2,
    category: {
      id: 2,
      title: "Space",
      color: "purple",
    },
    viewsCount: 12,
    tags: [
      {
        name: "Webb",
      },
      {
        name: "NASA",
      },
      {
        name: "Space",
      },
    ],
  },
  {
    id: 5,
    title: "New gravity!",
    image: topScience,
    description: "Phisiscists at CalTech discovered new type of gravity!",
    body: "Calefornia dreamin!",
    isPublished: true,
    authorId: 2,
    author: {
      userName: "userino",
    },
    categoryId: 3,
    category: {
      id: 3,
      title: "Science",
      color: "lightblue",
    },
    viewsCount: 100,
    tags: [
      {
        name: "Phisics",
      },
    ],
  },
  {
    id: 6,
    title: "Thats going to be intense!",
    image: topEconomy,
    description: "War in Ukraine will be hard for everyone",
    body: "Euro is now lesser than the Dollar, what the hell man...",
    isPublished: true,
    authorId: 1,
    author: {
      userName: "Dummyster",
    },
    categoryId: 4,
    category: {
      id: 4,
      title: "Economy",
      color: "gold",
    },
    viewsCount: 42,
    tags: [
      {
        name: "Euro",
      },
      {
        name: "Dollar",
      },
    ],
  },
  {
    id: 7,
    title: "War",
    image: topPolitics,
    description: "Russia invaded into Ukraine",
    body: "Stupid russnia",
    isPublished: true,
    authorId: 5,
    author: {
      userName: "ZigZag",
    },
    categoryId: 5,
    category: {
      id: 5,
      title: "Politics",
      color: "brown",
    },
    viewsCount: 263,
    tags: [
      {
        name: "War",
      },
      {
        name: "Ukraine",
      },
    ],
  },
];

export const topViewedPosts = [
  {
    id: 0,
    title: "G.O.A.T",
    image: topSport,
    description: "The rise of the G.O.A.T",
    category: {
      id: 0,
      title: "Sport",
      color: "orange",
    },
  },
  {
    id: 1,
    title: "The massive blow!",
    image: topSpace,
    description: "Now we can see what is going on up there",
    category: {
      id: 1,
      title: "Space",
      color: "purple",
    },
  },
  {
    id: 2,
    title: "New gravity!",
    image: topScience,
    description: "Phisiscists at CalTech discovered new type of gravity!",
    category: {
      id: 3,
      title: "Science",
      color: "lightblue",
    },
  },
  {
    id: 6,
    title: "Thats going to be intense!",
    image: topEconomy,
    description: "War in Ukraine will be hard for everyone",
    category: {
      id: 4,
      title: "Economy",
      color: "gold",
    },
  },
  {
    id: 7,
    title: "War",
    image: topPolitics,
    description: "Russia invaded into Ukraine",
    category: {
      id: 5,
      title: "Politics",
      color: "brown",
    },
  },
];
