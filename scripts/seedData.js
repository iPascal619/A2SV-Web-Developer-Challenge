/**
 * Script to seed the MockAPI with proper food data
 * Run with: node scripts/seedData.js
 */

const API_BASE_URL = 'https://6852821e0594059b23cdd834.mockapi.io';

const foodData = [
  {
    name: 'Bowl Lasagna',
    rating: 4.6,
    image: '/images/Food image 1.png',
    Price: '2.99',
    restaurantName: "Finnelly's",
    logo: '/images/Logo image 1.png',
    status: 'Closed'
  },
  {
    name: 'Grilled Salmon',
    rating: 4.8,
    image: '/images/Food image 2.png',
    Price: '15.99',
    restaurantName: 'Ocean Delight',
    logo: '/images/Logo image 2.png',
    status: 'Open Now'
  },
  {
    name: 'Beef Burger',
    rating: 4.5,
    image: '/images/Food image 3.png',
    Price: '8.99',
    restaurantName: 'Burger Palace',
    logo: '/images/Logo image 3.png',
    status: 'Open Now'
  },
  {
    name: 'Caesar Salad',
    rating: 4.3,
    image: '/images/Food image 4.png',
    Price: '7.50',
    restaurantName: 'Fresh & Green',
    logo: '/images/Logo image 4.png',
    status: 'Open Now'
  },
  {
    name: 'Pepperoni Pizza',
    rating: 4.9,
    image: '/images/Food image 5.png',
    Price: '12.99',
    restaurantName: 'Pizza House',
    logo: '/images/Logo image 5.png',
    status: 'Closed'
  },
  {
    name: 'Chicken Wings',
    rating: 4.4,
    image: '/images/Food image 6.png',
    Price: '9.99',
    restaurantName: 'Wings & Things',
    logo: '/images/Logo image 6.png',
    status: 'Open Now'
  },
  {
    name: 'Sushi Platter',
    rating: 4.7,
    image: '/images/Food image 7.png',
    Price: '18.99',
    restaurantName: 'Sushi Master',
    logo: '/images/Logo image 7.png',
    status: 'Open Now'
  },
  {
    name: 'Chocolate Cake',
    rating: 4.6,
    image: '/images/Food image 8.png',
    Price: '6.50',
    restaurantName: 'Sweet Treats',
    logo: '/images/Logo image 8.png',
    status: 'Open Now'
  }
];

async function deleteAllFoods() {
  console.log('Fetching existing foods...');
  const response = await fetch(`${API_BASE_URL}/Food`);
  const foods = await response.json();
  
  console.log(`Deleting ${foods.length} existing foods...`);
  for (const food of foods) {
    await fetch(`${API_BASE_URL}/Food/${food.id}`, {
      method: 'DELETE'
    });
    console.log(`Deleted food ${food.id}`);
  }
}

async function createFoods() {
  console.log('Creating new foods...');
  for (const food of foodData) {
    const response = await fetch(`${API_BASE_URL}/Food`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(food)
    });
    const created = await response.json();
    console.log(`Created: ${created.name}`);
  }
}

async function seedData() {
  try {
    await deleteAllFoods();
    await createFoods();
    console.log('\n✅ Data seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }
}

seedData();
