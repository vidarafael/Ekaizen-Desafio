import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../../services/api"
import './style.scss'

interface UseParamsProps {
  id: string;
}

interface UserEditProps {
  nameClientContact: string,
  emailContact: string,
  telephoneContact: string,
  nameFantasyContact: string,
  email: string,
  telephoneCommercial: string,
  cnpj: string,
  cep: number,
  address: string,
  district: string,
  city: string,
  state: string,
  companySize: string,
  quantityEmployees: number
}

function EditClient() {
  const [userEdit, setUserEdit] = useState({} as UserEditProps)

  const { id } = useParams<UseParamsProps>()

  useEffect(() => {
    api.get(`/users/${id}`).then(response => setUserEdit(response.data))
  }, [])

  return (
    <div className="container">
      <div className="content">
        <header>    
          <h2>Edição Cliente</h2>
        </header>
        <hr />

        <form 
          className="formCreateClient" 
          action={`http://localhost:3001/users/edit/${id}`} 
          method="POST"
        >
          <div>
            <div>
              <label htmlFor="nameClientContact">Nome do Cliente (Contato)</label>
              <input type="text" name="nameClientContact" id="nameClientContact" 
                value={userEdit.nameClientContact} 
                onChange={(e) => {setUserEdit({
                  ...userEdit,
                  nameClientContact: e.target.value
                })}}
                />  
            </div>
 
            <div>
              <label htmlFor="emailContact">E-Mail (Contato)</label>
              <input type="text" name="emailContact" id="emailContact" 
                value={userEdit.emailContact}
                onChange={(e) => {setUserEdit({
                  ...userEdit,
                  emailContact: e.target.value
                })}}
              />
            </div>

            <div>
              <label htmlFor="telephoneContact">Telefone/Ramal (Contato)</label>
              <input type="text" name="telephoneContact" id="telephoneContact" 
                value={userEdit.telephoneContact}
                onChange={(e) => {setUserEdit({
                  ...userEdit,
                  telephoneContact: e.target.value
                })}}
              />
            </div>
            
          </div>

          <div>
            <div>
              <label htmlFor="nameFantasyContact">Nome Fantasia</label>
              <input type="text" name="nameFantasyContact" id="nameFantasyContact" 
                value={userEdit.nameFantasyContact}
                onChange={(e) => {setUserEdit({
                  ...userEdit,
                  nameFantasyContact: e.target.value
                })}}
              />
            </div>

            <div>
              <label htmlFor="email">E-Mail</label>
              <input type="text" name="email" id="email" 
                value={userEdit.email}
                onChange={(e) => {setUserEdit({
                  ...userEdit,
                  email: e.target.value
                })}}
              />
            </div>

            <div>
              <label htmlFor="telephoneCommercial">Telefone (Comercial)</label>
              <input type="text" name="telephoneCommercial" id="telephoneCommercial"
                value={userEdit.telephoneCommercial}
                onChange={(e) => {setUserEdit({
                  ...userEdit,
                  telephoneCommercial: e.target.value
                })}}
              />
            </div>
          </div>


          <div>
            <div>
              <label htmlFor="cnpj">CNPJ</label>
              <input type="text" name="cnpj" id="cnpj" 
                value={userEdit.cnpj}
                onChange={(e) => {setUserEdit({
                  ...userEdit,
                  cnpj: e.target.value
                })}}
              />
            </div>
            <div>               
              <label htmlFor="cep">CEP</label>
              <input type="number" name="cep" id="cep" 
                value={userEdit.cep}
                onChange={(e) => {setUserEdit({
                  ...userEdit,
                  cep: Number(e.target.value)
                })}}
              />
            </div>
            <div>
              <label htmlFor="address">Endereço</label>
              <input type="text" name="address" id="address" 
                value={userEdit.address}
                onChange={(e) => {setUserEdit({
                  ...userEdit,
                  address: e.target.value
                })}}
              />
            </div>
          </div>


          <div>
            <div>
              <label htmlFor="district">Bairro</label>
              <input type="text" name="district" id="district" 
                value={userEdit.district}
                onChange={(e) => {setUserEdit({
                  ...userEdit,
                  district: e.target.value
                })}}
              />
            </div>
            <div>
              <label htmlFor="city">Cidade</label>
              <input type="text" name="city" id="city" value={userEdit.city}/>
            </div>
            <div>
              <label htmlFor="state">Estado</label>
              <input type="text" name="state" id="state" 
                value={userEdit.state}
                onChange={(e) => {setUserEdit({
                  ...userEdit,
                  state: e.target.value
                })}}
              />
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="companySize">Porte da Empresa</label>
              <select name="companySize" id="companySize"
                onChange={(e) => {setUserEdit({
                  ...userEdit,
                  companySize: e.target.value
                })}}
              >
                {userEdit.companySize === 'Grande Porte' ? (
                  <>
                    <option value="Grande Porte" selected>Grande Porte</option>
                    <option value="Médio Porte">Médio Porte</option>
                    <option value="Pequeno Porte">Pequeno Porte</option>
                  </>
                ) : userEdit.companySize === 'Médio Porte' ? (
                  <>
                    <option value="Grande Porte">Grande Porte</option>
                    <option value="Médio Porte" selected>Médio Porte</option>
                    <option value="Pequeno Porte">Pequeno Porte</option>
                  </>
                ) : (
                  <>
                    <option value="Grande Porte">Grande Porte</option>
                    <option value="Médio Porte">Médio Porte</option>
                    <option value="Pequeno Porte" selected>Pequeno Porte</option>
                  </>
                )}
                
              </select>
            </div>
            <div>
              <label htmlFor="quantityEmployees">Quantidade de Funcionários</label>
              <input type="number" name="quantityEmployees" id="quantityEmployees" 
                value={userEdit.quantityEmployees}
                onChange={(e) => {setUserEdit({
                  ...userEdit,
                  quantityEmployees: Number(e.target.value)
                })}}
              />
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

export {EditClient}