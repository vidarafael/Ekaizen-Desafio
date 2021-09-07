import './style.scss'

function CreateTool() {

  return (
    <div className="container">
      <div className="content">
        <header>    
          <h2>Criação de Orçamento</h2>
        </header>
        <hr />
        
        <form 
          className="formCreateClient" 
          action="http://localhost:3001/tools/create" 
          method="POST"
        >
          <div>
            <div>
              <label htmlFor="name">Produto</label>
              <input type="text" name="name" id="name"/>
            </div>
 
            <div>
              <label htmlFor="priceSmallSize">Preço Base - Pequeno Porte</label>
              <input type="number" name="priceSmallSize" id="priceSmallSize"/>
            </div>

            <div>
              <label htmlFor="priceMidSize">Preço Base - Médio Porte</label>
              <input type="number" name="priceMidSize" id="priceMidSize"/>
            </div>

            <div>
              <label htmlFor="priceLargeSize">Preço Base - Grande Porte</label>
              <input type="number" name="priceLargeSize" id="priceLargeSize"/>
            </div>
            
          </div>

            <button className="btnCreateTool" type="submit">Salvar</button>
        </form>
      </div>


    </div>
  )
}

export { CreateTool }