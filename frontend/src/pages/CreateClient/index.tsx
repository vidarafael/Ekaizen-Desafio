import './style.scss'

function CreateClient() {
  return (
    <div className="container">
      <div className="content">
        <header>    
          <h2>Criação de Orçamento</h2>
        </header>
        <hr />

        <form 
          className="formCreateClient" 
          action="http://localhost:3001/users/create" 
          method="POST"
        >
          <div>
            <div>
              <label htmlFor="nameClientContact">Nome do Cliente (Contato)</label>
              <input type="text" name="nameClientContact" id="nameClientContact"/>
            </div>
 
            <div>
              <label htmlFor="emailContact">E-Mail (Contato)</label>
              <input type="text" name="emailContact" id="emailContact"/>
            </div>

            <div>
              <label htmlFor="telephoneContact">Telefone/Ramal (Contato)</label>
              <input type="text" name="telephoneContact" id="telephoneContact"/>
            </div>
            
          </div>

          <div>
            <div>
              <label htmlFor="nameFantasyContact">Nome Fantasia</label>
              <input type="text" name="nameFantasyContact" id="nameFantasyContact"/>
            </div>

            <div>
              <label htmlFor="email">E-Mail</label>
              <input type="text" name="email" id="email"/>
            </div>

            <div>
              <label htmlFor="telephoneCommercial">Telefone (Comercial)</label>
              <input type="text" name="telephoneCommercial" id="telephoneCommercial"/>
            </div>
          </div>


          <div>
            <div>
              <label htmlFor="cnpj">CNPJ</label>
              <input type="text" name="cnpj" id="cnpj"/>
            </div>
            <div>               
              <label htmlFor="cep">CEP</label>
              <input type="number" name="cep" id="cep"/>
            </div>
            <div>
              <label htmlFor="address">Endereço</label>
              <input type="text" name="address" id="address"/>
            </div>
          </div>


          <div>
            <div>
              <label htmlFor="district">Bairro</label>
              <input type="text" name="district" id="district"/>
            </div>
            <div>
              <label htmlFor="city">Cidade</label>
              <input type="text" name="city" id="city"/>
            </div>
            <div>
              <label htmlFor="state">Estado</label>
              <input type="text" name="state" id="state"/>
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="companySize">Porte da Empresa</label>
              <select name="companySize" id="companySize">
                <option value="Grande Porte">Grande Porte</option>
                <option value="Médio Porte">Médio Porte</option>
                <option value="Pequeno Porte">Pequeno Porte</option>
              </select>
            </div>
            <div>
              <label htmlFor="quantityEmployees">Quantidade de Funcionários</label>
              <input type="number" name="quantityEmployees" id="quantityEmployees"/>
            </div>
          </div>

          <div className="divBtn">
            <button type="submit">Próximo</button>
          </div>
        </form>
      </div>


    </div>
  )
}

export { CreateClient }