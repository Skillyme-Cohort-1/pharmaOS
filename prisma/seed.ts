import { PrismaClient, UserType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Common default password for testing purposes
  const defaultPassword = 'password123'; // Note: In production, ensure this is hashed!

  // --- TASK 2: SEED USERS TABLE ---
  console.log('Creating standard users...');
  
  await prisma.user.createMany({
    data: [
      // 2 SUPER_ADMIN users
      { email: 'super1@pharmaos.com', password: defaultPassword, userType: UserType.SUPER_ADMIN },
      { email: 'super2@pharmaos.com', password: defaultPassword, userType: UserType.SUPER_ADMIN },
      
      // 2 ADMIN users
      { email: 'admin1@pharmaos.com', password: defaultPassword, userType: UserType.ADMIN },
      { email: 'admin2@pharmaos.com', password: defaultPassword, userType: UserType.ADMIN },
      
      // 1 FINANCE user
      { email: 'finance@pharmaos.com', password: defaultPassword, userType: UserType.FINANCE },
      
      // 1 RECEIVING_BAY user
      { email: 'receiving@pharmaos.com', password: defaultPassword, userType: UserType.RECEIVING_BAY },
      
      // 1 MANAGER user
      { email: 'manager@pharmaos.com', password: defaultPassword, userType: UserType.MANAGER },
      
      // 1 DISPATCH user
      { email: 'dispatch@pharmaos.com', password: defaultPassword, userType: UserType.DISPATCH },
      
      // 1 RIDER user
      { email: 'rider@pharmaos.com', password: defaultPassword, userType: UserType.RIDER },
    ],
    skipDuplicates: true, // Prevents errors if you run the seed script twice
  });

  // --- TASK 3: SEED PHARMACISTS TABLE ---
  console.log('Creating pharmacists and linking profiles...');

  // We use create instead of createMany here so we can easily link the Pharmacist profile
  
  // Pharmacist 1 (Active)
  await prisma.user.create({
    data: {
      email: 'pharmacist.active@pharmaos.com',
      password: defaultPassword,
      userType: UserType.PHARMACIST,
      pharmacist: {
        create: {
          license_number: 'PHARM-ACTIVE-001',
          is_active: true,
        }
      }
    }
  });

  // Pharmacist 2 (Inactive)
  await prisma.user.create({
    data: {
      email: 'pharmacist.inactive1@pharmaos.com',
      password: defaultPassword,
      userType: UserType.PHARMACIST,
      pharmacist: {
        create: {
          license_number: 'PHARM-INACT-002',
          is_active: false,
        }
      }
    }
  });

  // Pharmacist 3 (Inactive)
  await prisma.user.create({
    data: {
      email: 'pharmacist.inactive2@pharmaos.com',
      password: defaultPassword,
      userType: UserType.PHARMACIST,
      pharmacist: {
        create: {
          license_number: 'PHARM-INACT-003',
          is_active: false,
        }
      }
    }
  });

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });