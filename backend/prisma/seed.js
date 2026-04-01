import prisma from '@prisma/client'

const db = new prisma.PrismaClient()

// Helper to get date offset by days
function daysFromNow(days) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date
}

// Helper to get date offset by days in past
function daysAgo(days) {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date
}

async function main() {
  console.log('🌱 Starting seed...')

  // Clear existing data
  await db.alert.deleteMany()
  await db.transaction.deleteMany()
  await db.order.deleteMany()
  await db.product.deleteMany()

  console.log('🗑️  Cleared existing data')

  // Create products (40+ total)
  const products = await db.product.createMany({
    data: [
      // Active products (10+)
      {
        name: 'Amoxicillin 500mg',
        category: 'Antibiotics',
        quantity: 150,
        unitPrice: 250.00,
        expiryDate: daysFromNow(365),
        status: 'active',
      },
      {
        name: 'Paracetamol 500mg',
        category: 'Analgesics',
        quantity: 200,
        unitPrice: 50.00,
        expiryDate: daysFromNow(400),
        status: 'active',
      },
      {
        name: 'Ibuprofen 400mg',
        category: 'Analgesics',
        quantity: 180,
        unitPrice: 80.00,
        expiryDate: daysFromNow(300),
        status: 'active',
      },
      {
        name: 'Metformin 500mg',
        category: 'Diabetic',
        quantity: 120,
        unitPrice: 120.00,
        expiryDate: daysFromNow(250),
        status: 'active',
      },
      {
        name: 'Vitamin C 1000mg',
        category: 'Vitamins',
        quantity: 250,
        unitPrice: 100.00,
        expiryDate: daysFromNow(500),
        status: 'active',
      },
      {
        name: 'Omeprazole 20mg',
        category: 'Gastrointestinal',
        quantity: 100,
        unitPrice: 180.00,
        expiryDate: daysFromNow(280),
        status: 'active',
      },
      {
        name: 'Cetirizine 10mg',
        category: 'Antihistamines',
        quantity: 160,
        unitPrice: 90.00,
        expiryDate: daysFromNow(320),
        status: 'active',
      },
      {
        name: 'Azithromycin 250mg',
        category: 'Antibiotics',
        quantity: 80,
        unitPrice: 350.00,
        expiryDate: daysFromNow(290),
        status: 'active',
      },
      {
        name: 'Multivitamin Complex',
        category: 'Vitamins',
        quantity: 140,
        unitPrice: 200.00,
        expiryDate: daysFromNow(450),
        status: 'active',
      },
      {
        name: 'Loratadine 10mg',
        category: 'Antihistamines',
        quantity: 175,
        unitPrice: 85.00,
        expiryDate: daysFromNow(310),
        status: 'active',
      },
      // Near-expiry products (5+)
      {
        name: 'Panadol Extra',
        category: 'Analgesics',
        quantity: 45,
        unitPrice: 80.00,
        expiryDate: daysFromNow(5),
        status: 'near_expiry',
      },
      {
        name: 'Aspirin 75mg',
        category: 'Cardiovascular',
        quantity: 60,
        unitPrice: 60.00,
        expiryDate: daysFromNow(3),
        status: 'near_expiry',
      },
      {
        name: 'Fluconazole 150mg',
        category: 'Antifungals',
        quantity: 35,
        unitPrice: 220.00,
        expiryDate: daysFromNow(6),
        status: 'near_expiry',
      },
      {
        name: 'Prednisolone 5mg',
        category: 'Corticosteroids',
        quantity: 50,
        unitPrice: 150.00,
        expiryDate: daysFromNow(4),
        status: 'near_expiry',
      },
      {
        name: 'Ranitidine 150mg',
        category: 'Gastrointestinal',
        quantity: 40,
        unitPrice: 110.00,
        expiryDate: daysFromNow(7),
        status: 'near_expiry',
      },
      // Expired products (5+)
      {
        name: 'Ciprofloxacin 500mg',
        category: 'Antibiotics',
        quantity: 30,
        unitPrice: 300.00,
        expiryDate: daysAgo(10),
        status: 'expired',
      },
      {
        name: 'Diclofenac 50mg',
        category: 'Analgesics',
        quantity: 25,
        unitPrice: 120.00,
        expiryDate: daysAgo(5),
        status: 'expired',
      },
      {
        name: 'Insulin Glargine',
        category: 'Diabetic',
        quantity: 15,
        unitPrice: 800.00,
        expiryDate: daysAgo(15),
        status: 'expired',
      },
      {
        name: 'Warfarin 5mg',
        category: 'Cardiovascular',
        quantity: 20,
        unitPrice: 180.00,
        expiryDate: daysAgo(8),
        status: 'expired',
      },
      {
        name: 'Clotrimazole Cream',
        category: 'Antifungals',
        quantity: 18,
        unitPrice: 250.00,
        expiryDate: daysAgo(20),
        status: 'expired',
      },
      // Out of stock products (3+)
      {
        name: 'Atorvastatin 20mg',
        category: 'Cardiovascular',
        quantity: 0,
        unitPrice: 450.00,
        expiryDate: daysFromNow(200),
        status: 'out_of_stock',
      },
      {
        name: 'Levothyroxine 50mcg',
        category: 'Hormones',
        quantity: 0,
        unitPrice: 280.00,
        expiryDate: daysFromNow(180),
        status: 'out_of_stock',
      },
      {
        name: 'Gabapentin 300mg',
        category: 'Neurology',
        quantity: 0,
        unitPrice: 320.00,
        expiryDate: daysFromNow(220),
        status: 'out_of_stock',
      },
      // More active products
      {
        name: 'Amlodipine 5mg',
        category: 'Cardiovascular',
        quantity: 90,
        unitPrice: 200.00,
        expiryDate: daysFromNow(260),
        status: 'active',
      },
      {
        name: 'Losartan 50mg',
        category: 'Cardiovascular',
        quantity: 85,
        unitPrice: 280.00,
        expiryDate: daysFromNow(240),
        status: 'active',
      },
      {
        name: 'Pantoprazole 40mg',
        category: 'Gastrointestinal',
        quantity: 110,
        unitPrice: 220.00,
        expiryDate: daysFromNow(270),
        status: 'active',
      },
      {
        name: 'Montelukast 10mg',
        category: 'Respiratory',
        quantity: 70,
        unitPrice: 380.00,
        expiryDate: daysFromNow(230),
        status: 'active',
      },
      {
        name: 'Sertraline 50mg',
        category: 'Neurology',
        quantity: 65,
        unitPrice: 420.00,
        expiryDate: daysFromNow(210),
        status: 'active',
      },
    ],
  })

  console.log(`✅ Created ${products.count} products`)

  // Get some product IDs for orders
  const allProducts = await db.product.findMany({ take: 10 })

  // Create orders (15+ total)
  const pendingOrders = await db.order.createMany({
    data: [
      {
        customerName: 'James Kamau',
        customerPhone: '0712345678',
        productId: allProducts[0].id,
        quantity: 2,
        totalAmount: 500.00,
        status: 'pending',
      },
      {
        customerName: 'Mary Wanjiku',
        customerPhone: '0723456789',
        productId: allProducts[1].id,
        quantity: 5,
        totalAmount: 250.00,
        status: 'pending',
      },
      {
        customerName: 'John Mwangi',
        customerPhone: '0734567890',
        productId: allProducts[2].id,
        quantity: 3,
        totalAmount: 240.00,
        status: 'pending',
      },
      {
        customerName: 'Grace Akinyi',
        customerPhone: '0745678901',
        productId: allProducts[3].id,
        quantity: 1,
        totalAmount: 120.00,
        status: 'pending',
      },
      {
        customerName: 'Peter Kipchoge',
        customerPhone: '0756789012',
        productId: allProducts[4].id,
        quantity: 4,
        totalAmount: 400.00,
        status: 'pending',
      },
    ],
  })

  const processingOrders = await db.order.createMany({
    data: [
      {
        customerName: 'Sarah Chebet',
        customerPhone: '0767890123',
        productId: allProducts[5].id,
        quantity: 2,
        totalAmount: 360.00,
        status: 'processing',
      },
      {
        customerName: 'David Mutua',
        customerPhone: '0778901234',
        productId: allProducts[6].id,
        quantity: 3,
        totalAmount: 270.00,
        status: 'processing',
      },
      {
        customerName: 'Lucy Njeri',
        customerPhone: '0789012345',
        productId: allProducts[7].id,
        quantity: 1,
        totalAmount: 350.00,
        status: 'processing',
      },
    ],
  })

  const completedOrders = await db.order.createMany({
    data: [
      {
        customerName: 'Michael Otieno',
        customerPhone: '0790123456',
        productId: allProducts[0].id,
        quantity: 5,
        totalAmount: 1250.00,
        status: 'completed',
      },
      {
        customerName: 'Anne Wambui',
        customerPhone: '0701234567',
        productId: allProducts[1].id,
        quantity: 10,
        totalAmount: 500.00,
        status: 'completed',
      },
      {
        customerName: 'Robert Kiplagat',
        customerPhone: '0712345679',
        productId: allProducts[2].id,
        quantity: 4,
        totalAmount: 320.00,
        status: 'completed',
      },
      {
        customerName: 'Elizabeth Adhiambo',
        customerPhone: '0723456780',
        productId: allProducts[3].id,
        quantity: 6,
        totalAmount: 720.00,
        status: 'completed',
      },
      {
        customerName: 'Francis Wekesa',
        customerPhone: '0734567891',
        productId: allProducts[4].id,
        quantity: 3,
        totalAmount: 300.00,
        status: 'completed',
      },
      {
        customerName: 'Catherine Nyambura',
        customerPhone: '0745678902',
        productId: allProducts[5].id,
        quantity: 2,
        totalAmount: 360.00,
        status: 'completed',
      },
      {
        customerName: 'Daniel Kimani',
        customerPhone: '0756789013',
        productId: allProducts[6].id,
        quantity: 8,
        totalAmount: 720.00,
        status: 'completed',
      },
    ],
  })

  const cancelledOrders = await db.order.createMany({
    data: [
      {
        customerName: 'Jane Moraa',
        customerPhone: '0767890124',
        productId: allProducts[7].id,
        quantity: 2,
        totalAmount: 700.00,
        status: 'cancelled',
      },
    ],
  })

  console.log(`✅ Created ${pendingOrders.count + processingOrders.count + completedOrders.count + cancelledOrders.count} orders`)

  // Create transactions for completed orders (spread over past 30 days)
  const completedOrdersList = await db.order.findMany({
    where: { status: 'completed' },
    include: { product: true }
  })

  for (let i = 0; i < completedOrdersList.length; i++) {
    const order = completedOrdersList[i]
    const daysAgo = i * 4 // Spread transactions over time
    
    await db.transaction.create({
      data: {
        orderId: order.id,
        productId: order.productId,
        type: 'sale',
        quantity: order.quantity,
        amount: order.totalAmount,
        createdAt: daysAgo(daysAgo),
      },
    })
  }

  console.log(`✅ Created ${completedOrdersList.length} transactions`)

  // Create alerts
  const expiredProducts = await db.product.findMany({ where: { status: 'expired' } })
  const nearExpiryProducts = await db.product.findMany({ where: { status: 'near_expiry' } })

  for (const product of expiredProducts) {
    await db.alert.create({
      data: {
        productId: product.id,
        type: 'expired',
        message: `${product.name} has expired`,
        isRead: Math.random() > 0.5,
      },
    })
  }

  for (const product of nearExpiryProducts) {
    const daysLeft = Math.ceil((new Date(product.expiryDate) - new Date()) / (1000 * 60 * 60 * 24))
    await db.alert.create({
      data: {
        productId: product.id,
        type: 'near_expiry',
        message: `${product.name} expires in ${daysLeft} days`,
        isRead: Math.random() > 0.5,
      },
    })
  }

  console.log(`✅ Created alerts for expired and near-expiry products`)

  console.log('🎉 Seed complete!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
