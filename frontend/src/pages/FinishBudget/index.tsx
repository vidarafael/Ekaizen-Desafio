import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ToolContext } from '../../components/ToolContext'
import { api } from '../../services/api'
import './style.scss'

interface UseParamsProps {
  id: string;
  
}

interface UserProps {
  id: string;
  nameClientContact: string;
  companySize: string;
  email: string;
}

function FinishBudget() {
  const [user, setUser] = useState({} as UserProps)
  
  const { 
    toolsChecked, 
    typeSell,
    quantityUsers,
    taxes,
    commissionValue,
  } = useContext(ToolContext)
  
  const filterToolsChecked = toolsChecked.filter(tool => tool.checked === true)

  const { id } = useParams<UseParamsProps>()

  useEffect(() => {
    api.get(`/users/${id}`).then(response => setUser(response.data))
  }, [])

  let valueWithTaxue = ((taxes / 100) + 1)
  let valueFromPartner = (commissionValue/100)

  const sumTotal = filterToolsChecked.reduce((acc, item) => {
    if(typeSell === 'parceiro') {
      let value = (item.value * valueWithTaxue) * (valueFromPartner + 1)
      acc += value
      return acc
    } else {
      let value = item.value * valueWithTaxue
      acc += value
      return acc
    }
    
  }, 0)

  console.log(toolsChecked, filterToolsChecked)

  return (
    <div className="container">
      <div className="content">
          <header>
            <h2>Cadastros de Ferramentas</h2>
          </header>
          <hr />

        <div className="infoProduct">
          <div>
            <span>Nome do Cliente (Contato)</span>
            <input type="text" value={user.nameClientContact} disabled/>
          </div>
          
          <div>
            <span>Porte da Empresa</span>
            <input type="text" value={user.companySize} disabled/>
          </div>
          
          <div>
            <span>E-Mail</span>
            <input type="text" value={user.email} disabled/>
          </div>
         
          <div>
            <span>QTD. Usuários</span>
            <input type="number" value={quantityUsers} disabled/>
          </div>
        </div>

          <table>
            <thead>
              <tr>
                <th>Ferramenta(s)</th>
                <th>Valores sem impostos</th>
                <th>Valor com imposto</th>
                {typeSell === 'parceiro' ? <th>Valor p/ Parceiro</th> : <></>}
              </tr>
            </thead>
            <tbody>                      
              {filterToolsChecked.map(toolFilter => (
                <tr>
                  <td>{toolFilter.name}</td>
                  <td>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(toolFilter.value)} 
                  </td>
                  <td>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(toolFilter.value * valueWithTaxue)} 
                  </td>
                  {typeSell === 'parceiro' ? 
                    <td>
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format((toolFilter.value * valueWithTaxue) * valueFromPartner)} 
                    </td> : <></>}
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td>Valor Total: 
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(sumTotal)}
                </td>
              </tr>

            </tbody>
          </table>
      </div>

      <div className="divBtnBudget">
        <Link to={`/budget/${id}`}>
          <button>Anterior</button>
        </Link>
        
        <button className="btnFinish" onClick={() => window.print()}>Salvar</button>
      </div>
    </div>
  )
}

export { FinishBudget }