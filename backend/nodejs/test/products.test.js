import { readJSON, productAccordingToTheFilter } from '../utils.js';
import { inventoryStatusType } from '../models/ProductModel.js'

const commonHeaders = {
  "authorization": "Bearer " + process.env.TOKEN,
};

const products = readJSON('./localData/products.json')
const filteredProducts = products.filter((product) => {
  return product.storeId === 1;
});

const filteredByCategoryAccessories = products.filter((product) => {
  return product.category === "Accessories";
});


describe('GET /products', () => {

  test('Should return 200', async () => {
    const response = await api.get("/products")
      .expect(200);
    expect(response.body).toEqual(products);
  });

  test('Should return 200 /public', async () => {
    const response = await api.get("/products/public")
      .expect(200);
    expect(response.body).toEqual({ products: products.filter((element) => { return inventoryStatusType.OUTOFSTOCK != element.inventoryStatus }), totalPages: 1 });
  });

  test('Should return 200 /public?textfilter=Simple', async () => {
    const response = await api.get("/products/public?textfilter=Simple")
      .expect(200);
    expect(response.body).toEqual({
      totalPages: 1,
      products: products.filter((element) => { return productAccordingToTheFilter(element, "Simple", undefined) && inventoryStatusType.OUTOFSTOCK != element.inventoryStatus })
    })
  });

  test('Should return 200 /public?textfilter=Simple', async () => {
    const response = await api.get("/products/public?storeid=1")
      .expect(200);
    expect(response.body).toEqual({
      totalPages: 1,
      products: products.filter((element) => { return productAccordingToTheFilter(element, "", 1) && inventoryStatusType.OUTOFSTOCK != element.inventoryStatus })
    })
  });

  test('Should return 200 /public', async () => {
    const response = await api.get("/products/public?page=1")
      .expect(200);
    expect(response.body).toEqual({ products: products.filter((element) => { return inventoryStatusType.OUTOFSTOCK != element.inventoryStatus }), totalPages: 1 });
  });

  test('Should return 200 /public', async () => {
    const response = await api.get("/products/public?page=1&pagelength=5")
      .expect(200);
    expect(response.body).toEqual({ products: products.filter((element) => { return inventoryStatusType.OUTOFSTOCK != element.inventoryStatus }), totalPages: 1 });
  });

  test('Should return 200 /public', async () => {
    const response = await api.get("/products/public?page=1&pagelength=2")
      .expect(200);
    expect(response.body).toEqual({ products: products.filter((element) => { return inventoryStatusType.OUTOFSTOCK != element.inventoryStatus }).slice(0, 2), totalPages: 2 });
  });

  test('Should return 200 /public ?categories', async () => {
    const response = await api.get("/products/public?categories=Accessories")
      .expect(200);
    expect(response.body).toEqual({ products: filteredByCategoryAccessories.filter((element) => { return inventoryStatusType.OUTOFSTOCK != element.inventoryStatus }), totalPages: 1 });
  });

  test('Should return 200 ?categories', async () => {
    const response = await api.get("/products?categories=Accessories")
      .expect(200);
    expect(response.body).toEqual(filteredByCategoryAccessories);
  });

  test('Should return 200', async () => {
    const response = await api.get("/stores/1/products")
      .expect(200);
    expect(response.body).toEqual(filteredProducts);
  });

  test('Should return 200', async () => {
    const response = await api.get("/stores/1/products?storedata=true")
      .expect(200);
    expect(response.body).toEqual({
      "store": {
        "id": 1,
        "name": "Simple Store",
        "address": {
          "streetNumber": "0",
          "streetName": "Street Name",
          "city": "Simple City D.C",
          "state": "Simple Country",
          "zipCode": "31000"
        },
        "location": {
          "latitude": 1,
          "longitude": 2
        },
        "contactPhone": "+33 123456",
        "imageUrl": "/store1.jpeg"
      },
      "products": filteredProducts
    },);
  });

});


describe('GET /products/:id', () => {

  test('Should return 200', async () => {
    await api.get("/products/2")
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(
          {
            "id": 2,
            "name": "Simple Shirt",
            "description": "Discover effortless style with the Simple Shirt, tailored for comfort and versatility. Made from breathable cotton fabric, this shirt is perfect for daily wear and casual outings. Its classic fit and subtle patterns effortlessly complement any wardrobe.",
            "imageUrl": "/shirt.jpeg",
            "price": 72,
            "category": "Accessories",
            "inventoryStatus": "INSTOCK",
            "storeId": 1,
            "currency": "€",
          },
        );
      })
  });

  test('Should return 200', async () => {
    await api.get("/stores/1/products/2")
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(
          {
            "id": 2,
            "name": "Simple Shirt",
            "description": "Discover effortless style with the Simple Shirt, tailored for comfort and versatility. Made from breathable cotton fabric, this shirt is perfect for daily wear and casual outings. Its classic fit and subtle patterns effortlessly complement any wardrobe.",
            "imageUrl": "/shirt.jpeg",
            "price": 72,
            "category": "Accessories",
            "inventoryStatus": "INSTOCK",
            "storeId": 1,
            "currency": "€",
          },
        );
      })
  });
  test('Should return 404', async () => {
    await api.get("/stores/1/products/95b6c351179df29507b30db7")
      .set(commonHeaders)
      .expect(404)
      .then(response => {
        expect(response.body).toEqual(
          {
            "message": "Product not found"
          },
        );
      })
  });
  test('Should return 200 test with query storedata ', async () => {
    await api.get("/stores/1/products/2?storedata=true")
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(
          {
            "store": {
              "id": 1,
              "name": "Simple Store",
              "address": {
                "streetNumber": "0",
                "streetName": "Street Name",
                "city": "Simple City D.C",
                "state": "Simple Country",
                "zipCode": "31000"
              },
              "location": {
                "latitude": 1,
                "longitude": 2
              },
              "contactPhone": "+33 123456",
              "imageUrl": "/store1.jpeg"
            },
            "product": {
              "id": 2,
              "name": "Simple Shirt",
              "description": "Discover effortless style with the Simple Shirt, tailored for comfort and versatility. Made from breathable cotton fabric, this shirt is perfect for daily wear and casual outings. Its classic fit and subtle patterns effortlessly complement any wardrobe.",
              "imageUrl": "/shirt.jpeg",
              "price": 72,
              "category": "Accessories",
              "inventoryStatus": "INSTOCK",
              "storeId": 1,
              "currency": "€",
            }
          },
        );
      })
  });
});


describe('POST /products', () => {

  test('Should return 201', async () => {
    await api.post('/stores/1/products/').send({
      name: "Black Watch",
      description: "Product Description",
      imageUrl: "black-watch.jpg",
      price: 72,
      category: "Accessories",
      inventoryStatus: "INSTOCK",
      currency: "€",

    }).set(commonHeaders)
      .expect(201)
      .then(response => {
        expect(response.body.name).toEqual("Black Watch");
      })
  }
  );
  test('Test currency bad value Should return 400', async () => {
    await api.post('/stores/1/products/').send({
      name: "Black Watch",
      description: "Product Description",
      imageUrl: "black-watch.jpg",
      price: 72,
      category: "Accessories",
      inventoryStatus: "INSTOCK",
      currency: "error",

    }).set(commonHeaders)
      .expect(400)
  }
  );
  test('Test category bad value Should return 400', async () => {
    await api.post('/stores/1/products/').send({
      name: "Black Watch",
      description: "Product Description",
      imageUrl: "black-watch.jpg",
      price: 72,
      category: "error",
      inventoryStatus: "INSTOCK",
      currency: "€",

    }).set(commonHeaders)
      .expect(400)
  }
  );
  test('Test inventoryStatus bad value Should return 400', async () => {
    await api.post('/stores/1/products/').send({
      name: "Black Watch",
      description: "Product Description",
      imageUrl: "black-watch.jpg",
      price: 72,
      category: "Accessories",
      inventoryStatus: "error",
      currency: "€",

    }).set(commonHeaders)
      .expect(400)
  }
  );
});


describe('PATCH /products/:id', () => {
  test('Should return 200', async () => {
    await api.patch('/stores/1/products/2').set(commonHeaders).send({
      name: "2009",
    })
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(
          {
            "id": 2,
            "name": "2009",
            "description": "Discover effortless style with the Simple Shirt, tailored for comfort and versatility. Made from breathable cotton fabric, this shirt is perfect for daily wear and casual outings. Its classic fit and subtle patterns effortlessly complement any wardrobe.",
            "imageUrl": "/shirt.jpeg",
            "price": 72,
            "category": "Accessories",
            "inventoryStatus": "INSTOCK",
            "storeId": 1,
            "currency": "€"
          },
        );
      })
  }
  );
  test('Should return 404', async () => {
    await api.patch('/stores/1/products/65b6c351179df29507b30db9').set(commonHeaders).send({
      year: 2009,
    })
      .expect(404)
      .then(response => {
        expect(response.body).toEqual(
          {
            "message": "Product not found",
          },
        );
      })
  }
  );
});


describe('Delete /products:id', () => {


  test('Should return 200', async () => {
    await await api.delete('/stores/1/products/2').set(commonHeaders).expect(200)
      .then(response => {
        expect(response.body).toEqual(
          {
            "message": "Product deleted"
          },
        );
      })
  }
  );
  test('Should return 404', async () => {
    await await api.delete('/stores/1/products/65b6c351179df29507b30db9').set(commonHeaders).expect(404)
      .then(response => {
        expect(response.body).toEqual(
          {
            "message": "Product not found"
          },
        );
      })
  }
  );
});

