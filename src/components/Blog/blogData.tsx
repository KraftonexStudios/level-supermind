import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    title: "Extracting Actionable Insights with AI Tools",
    paragraph:
      "Explore how AI-powered tools like LangFlow and OpenAI are revolutionizing the process of turning raw data into valuable insights.",
    image: "/images/blog/blog-01.jpg",
    author: {
      name: "Samuyl Joshi",
      image: "/images/blog/author-01.png",
      designation: "Data Analyst",
    },
    tags: ["AI", "Data Analysis"],
    publishDate: "2025",
  },
  {
    id: 2,
    title: "Enhancing Business Strategy with AI Insights",
    paragraph:
      "Learn practical ways to integrate AI insights into your business strategy for better decision-making and growth.",
    image: "/images/blog/blog-02.jpg",
    author: {
      name: "Musharof Chy",
      image: "/images/blog/author-02.png",
      designation: "Business Strategist",
    },
    tags: ["Business", "AI"],
    publishDate: "2025",
  },
  {
    id: 3,
    title: "The Role of AI in Modern Data Analysis",
    paragraph:
      "Discover the transformative impact of AI in streamlining data analysis and generating actionable insights efficiently.",
    image: "/images/blog/blog-03.jpg",
    author: {
      name: "Lethium Deo",
      image: "/images/blog/author-03.png",
      designation: "AI Specialist",
    },
    tags: ["Technology", "AI"],
    publishDate: "2025",
  },
];

export default blogData;
