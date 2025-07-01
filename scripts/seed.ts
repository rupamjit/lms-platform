import { PrismaClient } from "@prisma/client";

const database = new PrismaClient();

async function main() {
  try {

    console.log("Clearing existing data...");
    await database.subCategory.deleteMany({});
    await database.category.deleteMany({});
    await database.level.deleteMany({});


    console.log("Creating levels...");
    await database.level.createMany({
      data: [
        { name: "Beginner" },
        { name: "Intermediate" },
        { name: "Expert" },
        { name: "All levels" },
      ],
      skipDuplicates: true,
    });


    console.log("Creating categories...");
    const categories = await Promise.all([
      database.category.create({ data: { name: "IT & Software" } }),
      database.category.create({ data: { name: "Business" } }),
      database.category.create({ data: { name: "Design" } }),
      database.category.create({ data: { name: "Health" } }),
    ]);

    // Then create subcategories
    console.log("Creating subcategories...");
    
    // IT & Software subcategories
    await database.subCategory.createMany({
      data: [
        { name: "Web Development", categoryId: categories[0].id },
        { name: "Data Science", categoryId: categories[0].id },
        { name: "Cybersecurity", categoryId: categories[0].id },
        { name: "Artificial Intelligence", categoryId: categories[0].id },
        { name: "Machine Learning", categoryId: categories[0].id },
        { name: "Generative AI", categoryId: categories[0].id },
        { name: "Devops Engineering", categoryId: categories[0].id },
        { name: "Others", categoryId: categories[0].id },
      ],
    });


    await database.subCategory.createMany({
      data: [
        { name: "E-Commerce", categoryId: categories[1].id },
        { name: "Marketing", categoryId: categories[1].id },
        { name: "Finance", categoryId: categories[1].id },
        { name: "Others", categoryId: categories[1].id },
      ],
    });

    await database.subCategory.createMany({
      data: [
        { name: "Graphic Design", categoryId: categories[2].id },
        { name: "3D & Animation", categoryId: categories[2].id },
        { name: "Interior Design", categoryId: categories[2].id },
        { name: "UI and UX Design", categoryId: categories[2].id },
        { name: "Logo Design", categoryId: categories[2].id },
        { name: "Others", categoryId: categories[2].id },
      ],
    });

    // Health subcategories
    await database.subCategory.createMany({
      data: [
        { name: "Fitness", categoryId: categories[3].id },
        { name: "Yoga", categoryId: categories[3].id },
        { name: "Nutrition", categoryId: categories[3].id },
        { name: "Others", categoryId: categories[3].id },
      ],
    });

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.log("Seeding failed:", error);
    
    if (error instanceof Error) {
      console.log("Error name:", error.name);
      console.log("Error message:", error.message);
      console.log("Error stack:", error.stack);
    }
  } finally {
    await database.$disconnect();
  }
}

main();