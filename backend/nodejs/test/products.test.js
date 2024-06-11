import { readJSON } from '../utils.js';


const commonHeaders = {
  "authorization": "Bearer " + process.env.TOKEN,
};

const products = readJSON('./localData/products.json')


describe('GET /products', () => {
  test('Should return 200', async () => {
    const response = await api.get("/stores/1/products")
      .expect(200);
    expect(response.body).toEqual(products);
  });

  test('Should return 200', async () => {
    const response = await api.get("/stores/1/products?storedata=true")
      .expect(200);
    expect(response.body).toEqual({
      "store": {
        "id": 1,
        "name": "Toulouse store",
        "currency": "EUR",
        "address": {
          "streetNumber": "0",
          "streetName": "Street Name",
          "city": "City",
          "state": "State",
          "zipCode": "31000"
        },
        "location": {
          "latitude": 1,
          "longitude": 2
        },
        "contactPhone": "+33 123456",
        "imageUrl": "https://img.freepik.com/vector-premium/fachada-tienda-plana-toldo_23-2147542588.jpg"
      },
      "products": products
    },);
  });

});


describe('GET /products/:id', () => {

  test('Should return 200', async () => {
    await api.get("/stores/1/products/2")
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(
          {
            "id": 2,
            "name": "Black Watch",
            "description": "Product Description",
            "imageUrl": "black-watch.jpg",
            "price": 72,
            "category": "Accessories",
            "inventoryStatus": "INSTOCK",
            "storeId": 1
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
              "name": "Toulouse store",
              "currency": "EUR",
              "address": {
                "streetNumber": "0",
                "streetName": "Street Name",
                "city": "City",
                "state": "State",
                "zipCode": "31000"
              },
              "location": {
                "latitude": 1,
                "longitude": 2
              },
              "contactPhone": "+33 123456",
              "imageUrl": "https://img.freepik.com/vector-premium/fachada-tienda-plana-toldo_23-2147542588.jpg"
            },
            "product": {
              "id": 2,
              "name": "Black Watch",
              "description": "Product Description",
              "imageUrl": "black-watch.jpg",
              "price": 72,
              "category": "Accessories",
              "inventoryStatus": "INSTOCK",
              "storeId": 1
            }
          },
        );
      })
  });
});


describe('POST /products', () => {

  test('Should return 200', async () => {
    await api.post('/stores/1/products/').send({
      name: "Black Watch",
      description: "Product Description",
      imageUrl: "black-watch.jpg",
      price: 72,
      category: "Accessories",
      inventoryStatus: "INSTOCK",
    }).set(commonHeaders)
      .expect(201)
      .then(response => {
        expect(response.body.name).toEqual("Black Watch");
      })
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
            "description": "Product Description",
            "imageUrl": "black-watch.jpg",
            "price": 72,
            "category": "Accessories",
            "inventoryStatus": "INSTOCK",
            "storeId": 1,
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

