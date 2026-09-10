import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const sampleProducts = [
  {
    name: 'Sony WH-1000XM5 Wireless Headphones',
    description: 'Industry-leading noise canceling wireless headphones with crystal-clear hands-free calling.',
    price: new Prisma.Decimal('349.99'),
    stockQuantity: 25,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Apple MacBook Pro 14" M3',
    description: 'Blazing-fast performance with Apple M3 chip, Liquid Retina XDR display, and 18-hour battery life.',
    price: new Prisma.Decimal('1599.00'),
    stockQuantity: 12,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Keychron Q1 Pro Mechanical Keyboard',
    description: 'Wireless custom mechanical keyboard with hot-swappable switches and CNC aluminum body.',
    price: new Prisma.Decimal('199.50'),
    stockQuantity: 30,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Logitech MX Master 3S Mouse',
    description: 'Performance wireless mouse with 8K DPI tracking and ultra-quiet clicking.',
    price: new Prisma.Decimal('99.99'),
    stockQuantity: 45,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Ergonomic Mesh Office Chair',
    description: 'High-back ergonomic executive chair with adjustable lumbar support and 3D armrests.',
    price: new Prisma.Decimal('289.00'),
    stockQuantity: 18,
    image: 'https://images.unsplash.com/photo-1580481077195-c9a997230230?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Breville Barista Touch Espresso Machine',
    description: 'Automated touchscreen espresso machine with integrated precision conical burr grinder.',
    price: new Prisma.Decimal('899.95'),
    stockQuantity: 8,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Classic Full-Grain Leather Backpack',
    description: 'Handcrafted premium leather travel backpack with 15-inch laptop sleeve and water-resistant lining.',
    price: new Prisma.Decimal('185.00'),
    stockQuantity: 22,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Garmin Fenix 7 Solar Smartwatch',
    description: 'Multisport GPS watch with solar charging lens and built-in heart rate and pulse ox sensors.',
    price: new Prisma.Decimal('699.99'),
    stockQuantity: 15,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
  },
];

async function main() {
  console.log('🌱 Starting database seed...');

  for (const item of sampleProducts) {
    const existing = await prisma.product.findFirst({
      where: { name: item.name },
    });

    if (!existing) {
      await prisma.product.create({
        data: item,
      });
      console.log(`✓ Created product: ${item.name}`);
    } else {
      console.log(`ℹ Product already exists: ${item.name}`);
    }
  }

  console.log('✅ Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed execution:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
