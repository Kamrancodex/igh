require("dotenv").config();
const { MongoClient } = require("mongodb");

// Connection URL from environment variable
const url = process.env.MONGODB_URI;
if (!url) {
  console.error("❌ MONGODB_URI is not defined in .env file");
  process.exit(1);
}

const client = new MongoClient(url);

async function seed() {
  try {
    await client.connect();
    const db = client.db("hospitality");

    // Seed businesses
    const businesses = [
      {
        name: "Majestic Hall",
        image: "/business-1.webp",
        description: "Where Dreams Come True",
        link: "https://majestic-rdj.media",
        socials: {
          instagram: "https://www.instagram.com/Majestichallcle",
          facebook: "https://www.facebook.com/154478397755479",
          twitter: "#",
          website: "#",
        },
      },
      {
        name: "Marigold",
        image:
          "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description: "Luxury beachfront experience",
        link: "https://test1-rdj.media/",
        socials: {
          instagram: "https://www.instagram.com/marigoldcateringevents/",
          facebook: "https://www.facebook.com/MarigoldCatering",
          twitter: "#",
          website: "#",
        },
      },
      {
        name: "Danny Boy's",
        image:
          "https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description: "Sophisticated cocktail bar & lounge",
        link: "https://www.dannyboyspizza.com/",
        socials: {
          instagram: "https://www.instagram.com/dannyboyspizza1991",
          facebook: "https://www.facebook.com/dannyboyspizza1991",
          twitter: "#",
          website: "#",
        },
      },
      {
        name: "Harvest Table",
        image:
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description: "Farm-to-table dining experience",
        link: "/businesses/harvest",
        socials: {
          instagram: "#",
          facebook: "#",
          twitter: "#",
          website: "#",
        },
      },
    ];

    // Seed gallery items
    const galleryItems = [
      {
        title: "LUXURY DINING",
        image:
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description:
          "Experience fine dining at its best with our curated selection of gourmet restaurants",
        category: "dining",
        size: "large",
        position: "top-left",
      },
      {
        title: "ELEGANT SPACES",
        image:
          "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description:
          "Discover our collection of sophisticated venues perfect for any occasion",
        category: "venues",
        size: "medium",
        position: "top-right",
      },
      {
        title: "CRAFT COCKTAILS",
        image:
          "https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description:
          "Artisanal cocktails crafted by expert mixologists using premium ingredients",
        category: "drinks",
        size: "small",
        position: "middle-right",
      },
      {
        title: "BEACHFRONT VIEWS",
        image:
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description:
          "Stunning oceanfront locations offering breathtaking views and unforgettable experiences",
        category: "venues",
        size: "medium",
        position: "bottom-left",
      },
      {
        title: "CULINARY EXCELLENCE",
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description:
          "World-class chefs creating exceptional dishes that delight the senses",
        category: "dining",
        size: "medium",
        position: "bottom-right",
      },
    ];

    // Clear existing data
    await db.collection("businesses").deleteMany({});
    await db.collection("gallery").deleteMany({});

    // Insert new data
    await db.collection("businesses").insertMany(businesses);
    await db.collection("gallery").insertMany(galleryItems);

    console.log("✅ Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seed();
