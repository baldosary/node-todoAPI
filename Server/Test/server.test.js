const request = require('supertest');
const expect = require('expect');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {ObjectID} = require('mongodb');

const todo = [{
    _id: new ObjectID(),
    text: 'first todo'
},
{
    text: 'second todo'
}];
beforeEach((done) =>
{
    Todo.remove({}).then(() => 
    {
       return Todo.insertMany(todo);
    }
   ).then(()=> done());
});
//Testing POST route:
describe('POST /todos', () =>
{
    it('Should create a new todo', (done) => 
    {
        const text = 'New todo';
        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => 
        {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) =>
        {
            if(err)
            return done(err);
            
            Todo.find({text : 'New todo'}).then((todos) =>
            {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((err) => done(err))
        })
    
    })
    it('It shouldn\'nt create todo with empty data', (done)=>
    {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => 
        {
            if(err) return done(err);
            Todo.find().then((todos) => 
            {
                expect(todos.length).toBe(2);
                done();
            })
        })
    })
});
//Testing GET route:
describe('GET /todos', () =>
{
    it('It should get all todos', (done) =>
    {
        request(app)
        .get('/todos')
        .expect(200)
        .expect(res => 
            {
                expect(res.body.todos.length).toBe(2);
            })
        .end(done);
    })
});
//Testing GET route with specific ID:

describe('GET /todo/:id', () => 
{
    it('It should return todos for the specific IDs', (done) => 
    {
        request(app)
        .get(`/todos/${todo[0]._id.toHexString()}`)
        .expect(200)
        .expect(res =>
         {
             expect(res.body.todos.text).toBe(todo[0].text);
         })
         .end(done);
    });
    it('It should return 404 for non-object id', (done) => 
    {
        const id = '5c756a6bca2692a49dbb1685111';

        request(app)
        .get(`/todos/${id}`)
        .expect(404)
        .end(done);
    });
    it('It should returns 400 if todo not found', (done) => 
    {
        const id = new ObjectID('5c766a6bca2692a49dbb1685') 
        request(app)
        .get(`/todos/${id}`)
        .expect(404)
        .end(done);
    });
})