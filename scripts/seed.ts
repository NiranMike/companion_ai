const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data: [

                { name: "Influential Leaders" },
                { name: "Spirituality and Religion" },
                { name: "Arts and Creativity" },
                { name: "Technology and Innovation" },
                { name: "Nature and Environment" },
                { name: "Health and Wellness" },
                { name: "Science" },
                { name: "Literature and Storytelling" },
                { name: "Apologetics and Faith" },
                { name: "Family and Parenting" },
                { name: "Moral and Ethical Issues" },
                { name: "Bible Study" },
                { name: "Thinkers and Authors" },
                { name: "Animals" },
                { name: "History" },
                { name: "Mental Health and Well-being"}
            ]
        })
    } catch (error) {
        console.error("Error seeding default categories", error);
    } finally {
        await db.$disconnect();
    }
}

main()