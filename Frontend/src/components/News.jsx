import React from "react";
import Navbar from "./Shared/Navbar";

const newsArray = [
  {
    id: 1,
    title: "Upcoming Blockbuster Movies of 2025",
    description:
      "Discover the most anticipated films of the year, featuring thrilling stories, groundbreaking visuals, and unforgettable performances.",
    image: "https://c4.wallpaperflare.com/wallpaper/666/657/94/neymar-beautiful-pictures-wallpaper-preview.jpg",
    date: "January 25, 2025",
    category: "Movies",
  },
  {
    id: 2,
    title: "Top Acting Techniques to Master in 2025",
    description:
      "Explore the best acting methods to refine your skills and captivate audiences in the competitive entertainment industry.",
    image: "https://i2-prod.mirror.co.uk/incoming/article27448644.ece/ALTERNATES/n615/0_Manchester-United-v-Chelsea-UEFA-Champions-League-Final-Moscow-21052008.jpg",
    date: "January 20, 2025",
    category: "Acting",
  },
  {
    id: 3,
    title: "The Future of Film Editing: Trends to Watch",
    description:
      "Learn about the latest advancements in editing technology and how they are shaping the future of filmmaking.",
    image: "https://wallpapercat.com/w/full/d/6/d/52964-1920x1080-desktop-full-hd-lionel-messi-background-image.jpg",
    date: "January 18, 2025",
    category: "Editing",
  },
  {
    id: 4,
    title: "The Future of Film Editing: Trends to Watch",
    description:
      "Learn about the latest advancements in editing technology and how they are shaping the future of filmmaking.",
    image: "https://c4.wallpaperflare.com/wallpaper/1012/835/620/andres-iniesta-fc-barcelona-wallpaper-thumb.jpg",
    date: "January 18, 2025",
    category: "Editing",
  },
  {
    id: 5,
    title: "The Future of Film Editing: Trends to Watch",
    description:
      "Learn about the latest advancements in editing technology and how they are shaping the future of filmmaking.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkak15DzPzTwVIoGgzUAvVqr__QFqpVHru_g&s",
    date: "January 18, 2025",
    category: "Editing",
  },
  {
    id: 6,
    title: "The Future of Film Editing: Trends to Watch",
    description:
      "Learn about the latest advancements in editing technology and how they are shaping the future of filmmaking.",
    image: "https://c4.wallpaperflare.com/wallpaper/215/426/429/footballers-soccer-zinedine-zidane-wallpaper-thumb.jpg",
    date: "January 18, 2025",
    category: "Editing",
  },
  {
    id: 7,
    title: "The Future of Film Editing: Trends to Watch",
    description:
      "Learn about the latest advancements in editing technology and how they are shaping the future of filmmaking.",
    image: "https://wallpapers.com/images/featured/paolo-maldini-iqin5cg83r7uncx0.jpg",
    date: "January 18, 2025",
    category: "Editing",
  },
  {
    id: 8,
    title: "The Future of Film Editing: Trends to Watch",
    description:
      "Learn about the latest advancements in editing technology and how they are shaping the future of filmmaking.",
    image: "https://media.pff.com/2022/12/USATSI_19647017_168392721_lowres-scaled.jpg?w=1200&h=675",
    date: "January 18, 2025",
    category: "Editing",
  },
  {
    id: 9,
    title: "The Future of Film Editing: Trends to Watch",
    description:
      "Learn about the latest advancements in editing technology and how they are shaping the future of filmmaking.",
    image: "https://c4.wallpaperflare.com/wallpaper/612/562/336/carles-puyol-rain-wallpaper-preview.jpg",
    date: "January 18, 2025",
    category: "Editing",
  },
];

const News = () => {
  return (
    <div className="bg-main-bg min-h-screen text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto p-5">
        <h1 className="text-3xl font-bold mb-5">Top News</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsArray.map((news) => (
            <div
              key={news.id}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition-all duration-300"
            >
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{news.title}</h2>
                <p className="text-sm text-gray-400 mb-4">{news.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{news.date}</span>
                  <span className="bg-blue-600 text-white px-2 py-1 rounded">
                    {news.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
