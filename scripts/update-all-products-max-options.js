const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Finding all products with options...\n');

  // Get all products that have options
  const products = await prisma.product.findMany({
    include: {
      ProductOption: true,
    },
  });

  const productsWithOptions = products.filter(p => p.ProductOption.length > 0);

  if (productsWithOptions.length === 0) {
    console.log('No products with options found.');
    return;
  }

  console.log(`Found ${productsWithOptions.length} products with options:\n`);

  for (const product of productsWithOptions) {
    const optionCount = product.ProductOption.length;
    console.log(`📦 ${product.name_he}`);
    console.log(`   Options: ${optionCount}`);
    console.log(`   Current max_options_select: ${product.max_options_select}`);

    // Update to allow selecting all available options
    if (product.max_options_select < optionCount) {
      await prisma.product.update({
        where: { id: product.id },
        data: { max_options_select: optionCount },
      });
      console.log(`   ✅ Updated to allow ${optionCount} options\n`);
    } else {
      console.log(`   ✓ Already allows multiple options\n`);
    }
  }

  console.log('\n✅ Done!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error:', e.message);
    await prisma.$disconnect();
    process.exit(1);
  });
