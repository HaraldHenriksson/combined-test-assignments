import { test, expect, describe, afterEach, beforeEach } from 'vitest'
import { addTodo, toggleTodo, deleteTodo } from '../functions'
import { Todo } from '../types/Todo'


describe('adds a todo', () => {

    let todos: Todo[]

    beforeEach(() => {
        todos = []
    })

    test('should add a todo', () => {

        const result = addTodo('New todo', todos)

        expect(result.success).toBe(true)
        expect(todos.length).toBe(1)
        expect(todos[0].title).toBe('New todo')
    })

    test('should not add a todo with empty title', () => {

        const result = addTodo('', todos)

        expect(result.success).toBe(false)
        expect(result.error).toBe('Title cannot be empty')
        expect(todos.length).toBe(0)
    })

    test('should not add a todo with title shorter than 3 characters', () => {

        const result = addTodo('ab', todos)

        expect(result.success).toBe(false)
        expect(result.error).toBe('Title must be at least 3 characters long')
        expect(todos.length).toBe(0)
    })
})


describe('toggles a todo', () => {

    const todos: Todo[] = [
        { id: 1, title: 'First todo', completed: false }
    ]

    test('should toggle a todo', () => {
        const result = toggleTodo(1, todos)

        expect(result.success).toBe(true)
        expect(todos[0].completed).toBe(true)
    })

    test('should not toggle a todo that does not exist', () => {
        const result = toggleTodo(2, todos)

        expect(result.success).toBe(false)
        expect(result.error).toBe('Todo not found')
    })
})


describe('deletes a todo', () => {

    const todos: Todo[] = [
        { id: 1, title: 'First todo', completed: false }
    ]

    test('should delete a todo', () => {
        const resutlt = deleteTodo(1, todos)

        expect(resutlt.success).toBe(true)
        expect(todos.length).toBe(0)
    })

    test('should not delete a todo that does not exist', () => {
        const result = deleteTodo(2, todos)

        expect(result.success).toBe(false)
        expect(result.error).toBe('Todo not found')
    })
})
