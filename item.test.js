process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
let items = require("./fakeDb");

let xinjuan= { name:"xinjuan", price: "1000"};

beforeEach(function(){
    items.push(xinjuan)
});

afterEach(function(){
    items.length = 0
});



describe("GET /items",()=>{
    test("Get all items",async()=>{
        const res=await request(app).get('/items');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([{ name:"xinjuan", price: "1000"}])
    })
})


describe("POST/items", function(){
    test('creating a item', async() =>{
        const resp = await request(app).post("/items").send({name:"ria", price:"35"});
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({"Added": {name:"ria", price:"35"}});
    })
})

describe("PATCH/items/:name", function(){
    test('change a item',async() =>{
        const resp = await request(app).patch('/items/xinjuan').send(
            {name:"xinjuanjuanjuanjuan", price:"2000000"})
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({"Updated":{name:"xinjuanjuanjuanjuan", price:"2000000"}})

    })

    test('Respond with 404 for invalid name',async()=>{
        const res=await request(app).patch('/items/modo').send({name:"xinjuanjuanjuanjuan", price:"2000000"});
        expect(res.statusCode).toBe(404);
    })

});


describe("DELETE /items/:name",()=>{
    test('Delete an item by name',async()=>{
        const res=await request(app).delete('/items/xinjuan');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message:"Deleted"});
    })
    test('Respond with 404 for invalid name',async()=>{
        const res=await request(app).delete('/items/modo');
        expect(res.statusCode).toBe(404);
    })
})




