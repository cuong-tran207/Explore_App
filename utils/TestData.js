const categories = [
  { id: 1, name: "Du lịch", icon: "map-outline" },
  { id: 2, name: "Khách sạn", icon: "bed-outline" },
];

const tours = [
  {
    id: 1,
    name: "Bãi biển Cửa Lò",
    image: require("../assets/image/tour1.jpg"),
    description:
      "Bãi biển Cửa Lò là một trong những điểm du lịch nổi tiếng của Nghệ An, với bờ biển dài, cát trắng và nước biển trong xanh.",
    rating: 4.5,
    reviews: 23,
  },
  {
    id: 2,
    name: "Đền thờ Quang Trung",
    image: require("../assets/image/tour2.jpg"),
    description:
      "Đền thờ Hoàng đế Quang Trung nằm trên núi Dũng Quyết, là một di tích lịch sử quan trọng, ghi dấu chiến công hiển hách của vị vua anh minh.",
    rating: 4.8,
    reviews: 12,
  },
];

const images = [
  {
    id: 1,
    uri: "https://images.unsplash.com/photo-1740328398503-20fe0f3ff00f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Biển Diễn Châu nổi tiếng với vẻ đẹp hoang sơ và yên bình.",
  },
  {
    id: 2,
    uri: "https://images.unsplash.com/photo-1724583698704-94b3f4771c58?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Vùng đất Thanh Chương với những đồi chè xanh bát ngát.",
  },
  {
    id: 3,
    uri: "https://images.unsplash.com/photo-1724583698200-555b46369d9f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Huyện Quỳ Hợp nổi bật với những dãy núi đá vôi hùng vĩ.",
  },
  {
    id: 4,
    uri: "https://images.unsplash.com/photo-1724583701664-977dd9ac3aff?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Cánh đồng sen quê Bác tại Nam Đàn vào mùa nở rộ.",
  },
];

const explores = [
  {
    id: "1",
    title: "Thác Khe Kèm",
    image:
      "https://images.unsplash.com/photo-1740328398503-20fe0f3ff00f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    height: 180,
    position: "left",
  },
  {
    id: "2",
    title: "Làng Sen Quê Bác",
    image:
      "https://images.unsplash.com/photo-1724583698704-94b3f4771c58?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    height: 240,
    position: "right",
  },
  {
    id: "3",
    title: "Đồi Chè Thanh Chương",
    image:
      "https://images.unsplash.com/photo-1724583698200-555b46369d9f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    height: 240,
    position: "left",
  },
  {
    id: "4",
    title: "Biển Quỳnh",
    image:
      "https://images.unsplash.com/photo-1724583701664-977dd9ac3aff?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    height: 180,
    position: "right",
  },
  {
    id: "5",
    title: "Vườn Quốc Gia Pù Mát",
    image:
      "https://images.unsplash.com/photo-1740328398503-20fe0f3ff00f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    height: 180,
    position: "left",
  },
];

const favorites = [
  {
    id: 1,
    title: "Vườn Quốc Gia Pù Mát",
    image:
      "https://plus.unsplash.com/premium_photo-1690320203102-447b0f6fcd4c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    height: 200,
    position: "left",
    rating: 4.5,
    reviews: 123,
  },
  {
    id: 2,
    title: "Biển Cửa Hội",
    image:
      "https://images.unsplash.com/photo-1616484173745-07f25fd0547f?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    height: 300,
    position: "right",
    rating: 4.8,
    reviews: 234,
  },
  {
    id: 3,
    title: "Thác Xao Va",
    image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf",
    height: 250,
    position: "left",
    rating: 4.9,
    reviews: 345,
  },
  {
    id: 4,
    title: "Đền Ông Hoàng Mười",
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86",
    height: 180,
    position: "right",
    rating: 4.7,
    reviews: 456,
  },
];
const initialComments = [
  {
    id: "1",
    userName: "Ricky Smith",
    userAvatar: "https://cdn-icons-png.flaticon.com/512/219/219983.png",
    time: "4h",
    content:
      "I couldn't agree more, Alice! Morning workouts have been a game-changer for me. I feel so accomplished by the time I start work.",
    upvotes: 1125,
    replies: [
      {
        id: "1-1",
        userName: "Daniel Hamilton",
        userAvatar: "https://cdn-icons-png.flaticon.com/512/219/219983.png",
        time: "1h",
        content:
          "Same here, Ricky! It's like a natural caffeine boost. What's your favorite morning exercise routine?",
        upvotes: 0,
      },
    ],
  },
  {
    id: "2",
    userName: "David Elson",
    userAvatar: "https://cdn-icons-png.flaticon.com/512/219/219983.png",
    time: "1h",
    content:
      "I've just started morning workouts this week, and I already feel the difference. Any advice for a beginner like me?",
    upvotes: 22,
    replies: [],
  },
];

<<<<<<< HEAD
export { categories, tours, images, explores, favorites };
=======
export { categories, tours, images, explores, favorites, initialComments };
>>>>>>> 9b8770eeab8d2dfec80e94bb5f534b9093cf40cd
