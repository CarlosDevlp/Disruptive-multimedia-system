const logInAdmin = ()=>{
    cy.visit('http://localhost:4000/login')
    cy.get('[cy-name="username"]').type('test');
    cy.get('[cy-name="password"]').type('admin');
    cy.get('[cy-name="btn-login"]').click(); 
}

const logInCreator = ()=>{
    cy.visit('http://localhost:4000/login')
    cy.get('[cy-name="username"]').type('carlosplusplus');
    cy.get('[cy-name="password"]').type('test');
    cy.get('[cy-name="btn-login"]').click(); 
}

describe('Home Page', () => {
    beforeEach(() => {
      logInAdmin();
      //cy.visit('http://localhost:4000/home')
    })
  
    

    /*it('busca el post por titulo. si no encuentra el post, muestra un mensaje', () => {
        cy.get('[cy-name="search-box"]').type('abc');
        cy.clock().tick(600);
        cy.get('[cy-name="not-found-text"]').should('exist');
    })*/

    it('busca el post por titulo. si encuentra el post, lo muestra', () => {
        cy.get('[cy-name="search-box"]').type('Pe');
        cy.clock().tick(600);
        cy.get('[cy-name="post-card-container"]').should('exist');
    })

    

    it('puede salir de sesion', () => {
        cy.get('[cy-name="btn-logout"]').click();
        cy.url().should('contain', '/login'); 
    })
    
    it('muestra nombre de usuario en el sidenav', () => {
        cy.get('[cy-name="sidenav-title"]').should('contain', 'test');
    });

    it('muestra nombre de usuario en el sidenav', () => {
        cy.get('[cy-name="sidenav-title"]').should('contain', 'test');
    });

    it('si ingresa como admin, muestra el boton crear post y categoria', () => {
        cy.get('[cy-name="menu-btn-create-post"]').should('exist');
        cy.get('[cy-name="menu-btn-create-category"]').should('exist');
    });

    it('si ingresa como creador, muestra el boton crear post y pero no el de categoria', () => {
        logInCreator();
        cy.get('[cy-name="menu-btn-create-post"]').should('exist');
        cy.get('[cy-name="menu-btn-create-category"]').should('not.exist');
    });

    

})
  