describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4000/login')
    })
  
    it('muestra los campos username y password', () => {
      cy.get('[cy-name="username"]').should('exist');
      cy.get('[cy-name="password"]').should('exist');     
    })
 
    it('redirecciona al formulario signup', () => {
        cy.get('[cy-name="btn-signup"]').click();
        cy.url().should('contain', '/signup'); 
    })
    
    it('muestra mensaje de error al ingresar credenciales incorrectamente', () => {
        cy.get('[cy-name="username"]').type('test');
        cy.get('[cy-name="password"]').type('abc');
        cy.get('[cy-name="btn-login"]').click(); 
        cy.get('.cy-error-message').should('exist');
    });

    it('redirecciona al home si las credenciales son correctas', () => {
        cy.get('[cy-name="username"]').type('test');
        cy.get('[cy-name="password"]').type('admin');
        cy.get('[cy-name="btn-login"]').click(); 
        cy.url().should('contain', '/home'); 
    });

})
  