import path from 'path';

describe('ToDolist Test', () => {
  it('基本的動作テスト', () => {
    cy.visit('./../../web/todo.html')
    for (let i = 0; i < 2; i++) {
      cy.get('[data-testid="addTask"]').click()
      cy.get('[data-testid="editTitle"]').type(`test${i}`)
      cy.get('[data-testid="editDescription"]').type(`自動テスト${i}`)
      cy.get('[data-testid="save"]').click()
      cy.wait(2000)
    }

    cy.get('[data-testid="edit1"]').click()
    cy.get('[data-testid="editTitle"]').clear()
    cy.get('[data-testid="editTitle"]').type('テスト')
    cy.get('[data-testid="editDescription"]').type('　追加編集')
    cy.get('[data-testid="save"]').click()
    cy.wait(2000)

    cy.get('[data-testid="moveToDoing1"]').click()
    cy.wait(2000)

    cy.get('[data-testid="moveToDone1"]').click()
    cy.wait(2000)
  })
})