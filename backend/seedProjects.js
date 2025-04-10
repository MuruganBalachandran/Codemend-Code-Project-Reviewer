require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Project = require('./models/Project');

const projects = [
  {
    name: "Social Media App",
    description: "A mobile application connecting people with similar interests.",
    lastModified: new Date("2025-03-20T10:15:00.000Z"),
    status: "inactive",
    language: "Swift",
    stars: 85,
    isGithubLinked: false,
    projectImage: "https://unsplash.com/photos/8I-ht65iRww",
    user_id: "67e7925da9744558970a4a7c"
  },
  {
    name: "Project Management Tool",
    description: "A web-based tool for managing team projects and tasks.",
    lastModified: new Date("2025-02-15T09:45:00.000Z"),
    status: "active",
    language: "Python",
    stars: 150,
    isGithubLinked: true,
    projectImage: "https://unsplash.com/photos/5aiRb5f464A",
    user_id: "67e7925da9744558970a4a7c"
  },
  {
    name: "Fitness Tracking App",
    description: "A mobile app to track workouts, monitor progress, and achieve fitness goals.",
    lastModified: new Date("2025-03-05T11:00:00.000Z"),
    status: "active",
    language: "Java",
    stars: 95,
    isGithubLinked: false,
    projectImage: "https://unsplash.com/photos/Bv68qJNwOPA",
    user_id: "67e7925da9744558970a4a7c"
  },
  {
    name: "Travel Booking Website",
    description: "A user-friendly website for booking flights, hotels, and vacation packages.",
    lastModified: new Date("2025-02-25T09:30:00.000Z"),
    status: "inactive",
    language: "PHP",
    stars: 110,
    isGithubLinked: true,
    projectImage: "https://unsplash.com/photos/JmuyB_LibRo",
    user_id: "67e7925da9744558970a4a7c"
  }
];

const seedProjects = async () => {
  try {
    await connectDB();
    
    // Clear existing projects
    await Project.deleteMany({});
    console.log('Existing projects deleted');

    // Insert new projects
    const insertedProjects = await Project.insertMany(projects);
    console.log('Projects seeded successfully:', insertedProjects);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding projects:', error);
    process.exit(1);
  }
};

seedProjects();