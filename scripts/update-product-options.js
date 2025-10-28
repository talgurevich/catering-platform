const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Update the specific product to allow multiple selections
  const updated = await prisma.product.update({
    where: { slug: 'כריכונים-בייגל-אמריקאי-חצוי-6' },
    data: {
      max_options_select: 6, // Allow selecting up to 6 options
    },
    select: {
      name_he: true,
      max_options_select: true,
      ProductOption: {
        select: {
          option_name: true,
        },
      },
    },
  });

  console.log('✅ Product updated successfully:');
  console.log(`   ${updated.name_he}`);
  console.log(`   Max options: ${updated.max_options_select}`);
  console.log(`   Available options: ${updated.ProductOption.length}`);
  console.log('\nOptions:');
  updated.ProductOption.forEach((opt, i) => {
    console.log(`   ${i + 1}. ${opt.option_name}`);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('\n✅ Done!');
  })
  .catch(async (e) => {
    console.error('❌ Error:', e.message);
    await prisma.$disconnect();
    process.exit(1);
  });
