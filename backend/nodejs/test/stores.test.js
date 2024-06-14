import { readJSON } from '../utils.js';


const commonHeaders = {
  "authorization": "Bearer " + process.env.TOKEN,
};

const stores = readJSON('./localData/stores.json')


describe('GET /stores', () => {
  test('Should return 200', async () => {
    await api.get("/stores")
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(stores);
      })
  });
});



describe('GET /stores/:id', () => {

  test('Should return 200', async () => {
    await api.get("/stores/2")
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(stores[1]
        )
      })});
    test('Should return 404', async () => {
      await api.get("/stores/95b6c351179df29507b30db7")
        .set(commonHeaders)
        .expect(404)
        .then(response => {
          expect(response.body).toEqual(
            {
              "message": "store not found"
            },
          );
        })
    });
  });

describe('POST /stores', () => {

  test('Should return 200', async () => {
    await api.post('/stores').send({
      name: "Black Watch",
      currency: "E",
      imageUrl: "black-watch.jpg",
      address: {
        streetNumber: "1",
        streetName: "Street Name",
        city: "City",
        state: "State",
        zipCode: "31000"
      },
      location: {
        longitude: 1,
        latitude: 1
      },
      contactPhone: "+33 90",
    }).set(commonHeaders)
      .expect(201)
      .then(response => {
        expect(response.body.name).toEqual("Black Watch");
      })
  }
  );
});

describe('PATCH /stores/:id', () => {
  test('Should return 200', async () => {
    await api.patch('/stores/1').set(commonHeaders).send({
      name: "2009",
    })
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(
          {
            "id": 1,
            "name": "2009",
            "currency": "EUR",
            "address": {
                "streetNumber":"0",
                "streetName":"Street Name",
                "city":"Simple City D.C",
                "state":"Simple Country",
                "zipCode":"31000"
            },
            "location": {
                "latitude":1,
                "longitude":2
            },
            "contactPhone": "+33 123456",
            "imageUrl":"/store1.jpeg"
        },
        );
      })
  }
  );
  test('Should return 404', async () => {
    await api.patch('/stores/65b6c351179df29507b30db9').set(commonHeaders).send({
      year: 2009,
    })
      .expect(404)
      .then(response => {
        expect(response.body).toEqual(
          {
            "message": "store not found",
          },
        );
      })
  }
  );
});

describe('Delete /stores:id', () => {


  test('Should return 200', async () => {
    await await api.delete('/stores/2').set(commonHeaders).expect(200)
      .then(response => {
        expect(response.body).toEqual(
          {
            "message": "store deleted"
          },
        );
      })
  }
  );
  test('Should return 404', async () => {
    await await api.delete('/stores/65b6c351179df29507b30db9').set(commonHeaders).expect(404)
      .then(response => {
        expect(response.body).toEqual(
          {
            "message": "store not found"
          },
        );
      })
  }
  );
});
