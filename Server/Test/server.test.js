const request = require('supertest');
const expect = require('expect');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');


const todo = [{
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