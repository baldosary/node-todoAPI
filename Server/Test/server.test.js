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
    _id: new ObjectID(),
    text: 'second todo',
    completed: true,
    completedAt: false
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
});
//Testing DELETE /todos/:id 
describe('DELETE /todos/:id', ()=> 
{
    it('It should delete todo', (done) =>
    {
        const hexId = todo[0]._id.toHexString();
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect(res => 
        {
                expect(res.body.todo.text).toBe(todo[0].text);
         })
        .end((err, res) =>
        {
           if(err) return done(err);
           Todo.findById(hexId).then((todo) =>
           {
               expect(todo).toNotExist();
               done();
           }).catch((e) => done(e));
        })
    });
    it('It should return 404 if todo id isn\'t found', (done) =>
    {
        const id = new ObjectID();
        request(app)
        .delete(`/todos/${id}`)
        .expect(404)
        .end(done)      
    });
    it('It should return 400 if the object_id is invalid', (done) =>
    {
        request(app)
        .delete(`/todos/434aa`)
        .expect(404)
        .end(done)
    });
});

//Testing PATCH route :
describe('PATCH /todos/:id', ()=> 
{
    it('It should update todo', (done) =>
    {
        const id = todo[0]._id;
        const text = 'Learning something new';
        request(app)
        .patch(`/todos/${id}`)
        .send({
            text,
            completed: true
        })
        .expect(200)
        .expect(res =>
        {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.completedAt).toBeA('number');
        })
        .end(done);
    });
    it('It should clear completedAt when todo is not completed', (done)=>
    {
        request(app)
        .patch(`/todos/${todo[1]._id}`)
        .send({completed: false})
        .expect(200)
        .expect(res =>
         {
             expect(res.body.todo.completedAt).toNotExist();
         })
         .end(done);
    })
});