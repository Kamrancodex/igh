const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = "mongodb+srv://kampremiumyt:CfBF6Rsm3FLwwQxy@cluster0.moaux.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!uri) {
  console.error('ERROR: MONGODB_URI is not defined in .env.local');
  console.error('Please make sure your .env.local file contains MONGODB_URI');
  process.exit(1);
}

const teamMembers = [
  {
    name: "Georges Aoun",
    title: "Co-founder & CEO",
    image: "/team-1.jpeg",
    socials: {
      twitter: "https://twitter.com",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com",
      behance: "https://behance.com",
    },
    description:
      "Georges brings over 15 years of experience in luxury hospitality management. His innovative vision and strategic leadership have transformed countless hospitality venues into industry-leading destinations. He specializes in creating unique guest experiences that combine operational excellence with creative design elements.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Anthony Hamilton",
    title: "Co-founder & COO",
    image: "/team-2.png",
    socials: {
      twitter: "https://twitter.com",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com",
      behance: "https://behance.com",
    },
    description:
      "Anthony is a 2003 graduate of the Culinary Institute of American in Hyde Park, New York, as well as a 2010 graduate of Kent State University's Hospitality Management program. Hamilton has more than 20 years of restaurant and hospitality working experience, ranging from quick-service outlets to full-service catering to fine dining. He has held positions in all areas of the restaurant industry with most notably chef de cuisine, executive chef, corporate chef, chef/consultant and director of operations.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Bree Sabin",
    title: "Director of Marketing & Guest Relations",
    image: "/IMG_1073_2.jpg",
    socials: {
      twitter: "https://twitter.com",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com",
      behance: "https://behance.com",
    },
    description:
      "Bree leads marketing and public relations for Icon Group Hospitality, where she oversees brand strategy, digital presence, and community engagement across the company's portfolio of restaurants and venues. With a background in storytelling and relationship-building, Bree is passionate about creating authentic connections between guests and the Icon brand. Her thoughtful, hands-on approach helps shape the company's voice and ensures every concept resonates with its audience.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function seedTeamMembers() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('hospitality');
    const collection = db.collection('team_members');

    // Check if collection already has data
    const count = await collection.countDocuments();
    
    if (count > 0) {
      console.log(`Collection already has ${count} team members. Skipping seed.`);
      console.log('If you want to re-seed, delete the collection first.');
      return;
    }

    // Insert team members
    const result = await collection.insertMany(teamMembers);
    console.log(`Successfully seeded ${result.insertedCount} team members`);

  } catch (error) {
    console.error('Error seeding team members:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

seedTeamMembers();
