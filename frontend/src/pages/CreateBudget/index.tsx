import { useState, useEffect, useContext } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { ToolContext } from '../../components/ToolContext'
import { api } from '../../services/api'
import './style.scss'

interface UserProps {
  id: string;
  companySize: string;
}

interface ToolsProps {
  id: string;
  name: string;
  priceLargeSize: number;
  priceMidSize: number;
  priceSmallSize: number;
}

interface UseParamsProps {
  id: string;
}

interface ToolValueFormatedProps {
  id: string;
  name: string;
  value: number;
  checked?: boolean;
}


function CreateBudget() {
  const { 
    setStateTool, 
    typeSell, setStateTypeSell,
    setStateQuantityUsers,
    taxes, setStateTaxes,
    commissionValue, setStateCommissionValue

  } = useContext(ToolContext)

  const [tools, setTools] = useState<ToolsProps[]>([])
  const [user, setUser] = useState({} as UserProps)

  const { id } = useParams<UseParamsProps>()
  let history = useHistory()

  let formatValueTaxes = ((taxes/100) + 1);
  let formatValueCommission = ((commissionValue/100) + 1);

  useEffect(() => {
    api.get('/tools').then(response => setTools(response.data))
    api.get(`/users/${id}`).then(response => setUser(response.data))
  }, [])

  let toolValueFormated: ToolValueFormatedProps[] = []

  switch (user.companySize) {
    case 'Grande Porte':
      toolValueFormated = tools.map(tool => {
        return {
          id: tool.id,
          name: tool.name,
          value: tool.priceLargeSize,
          checked: false
        }
      })
      break;
      
    case 'Médio Porte':
      toolValueFormated = tools.map(tool => {
        return {
          id: tool.id,
          name: tool.name,
          value: tool.priceMidSize,
          checked: false
        }
      })
      break;

    case 'Pequeno Porte':
      toolValueFormated = tools.map(tool => {
        return {
          id: tool.id,
          name: tool.name,
          value: tool.priceSmallSize,
          checked: false
        }
      })
      break;

    default:
      break;
  }

  useEffect(() => {
    setStateTypeSell('propria')
    setStateQuantityUsers(0)
    setStateTaxes(0)
    setStateCommissionValue(0)

  }, [])


  console.log(tools)

  return (
    <div className="container">
      <div className="content">
          <header>
            <h2>Cadastros de Ferramentas</h2>
          </header>
          <hr />

        <div className="infoProduct">
          <div>
            <span>Tipo de Venda</span>
            <div>
              {typeSell === 'propria' ? (
                <>
                  <input 
                    id="propria" 
                    type="radio" 
                    name="typeSell" 
                    value="propria"
                    checked
                  />
                  <label htmlFor="propria">Própria</label>

                  <input 
                    id="parceiro" 
                    type="radio" 
                    name="typeSell" 
                    value="parceiro"
                    onClick={(e) => { 
                      setStateTypeSell('parceiro')
                    }}
                  />
                  <label htmlFor="parceiro">Parceiro</label>
                </>
              ) : (
                <>
                  <input 
                    id="propria" 
                    type="radio" 
                    name="typeSell" 
                    value="propria"
                    onClick={(e) => { 
                      setStateTypeSell('propria')
                    }}
                  />
                  <label htmlFor="propria">Própria</label>

                  <input 
                    id="parceiro" 
                    type="radio" 
                    name="typeSell" 
                    value="parceiro"
                    checked
                  />
                  <label htmlFor="parceiro">Parceiro</label>
                </>
              )}
              
            </div>
          </div>
          
          <div>
            <span>Usuários</span>
            <input type="number" onChange={(e) => { setStateQuantityUsers(Number(e.target.value))}}/>
          </div>
          
          <div>
            <span>Imposto %</span>
            <input type="number" onChange={(e) => { 
              setStateTaxes(Number(e.target.value));
            }}/>
          </div>
         
          <div>
            <span>Comissão %</span>
            <input type="number" onChange={(e) => { setStateCommissionValue(Number(e.target.value));}}/>
          </div>
        </div>

          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Valor</th>
                <th>Preço de Revenda</th>
                <th>Valor Total</th>
                <th>Selecionar Produto</th>
              </tr>
              <tr>
                <td><input className="firstInput" type="text" placeholder="Filtrar"/></td>
                <td><input type="text" placeholder="Filtrar"/></td>
                <td><input type="text" placeholder="Filtrar"/></td>
                <td><input type="text" placeholder="Filtrar"/></td>
                <td><input type="checkbox" /></td>
              </tr>
            </thead>
            <tbody>
              {toolValueFormated.map(tool => (
                <tr key={tool.id}>
                  <td>{tool.name}</td>
                  <td>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(tool.value)}
                  </td>
                  {typeSell === 'parceiro' ? 
                    <td>
                      {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                      }).format(tool.value * formatValueCommission)} 
                    </td> : <td></td>
                  }
                  {typeSell === 'parceiro' ? 
                    <td>
                      {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                      }).format(tool.value * formatValueTaxes * formatValueCommission)} 
                    </td> : 
                    <td>
                      {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                      }).format(tool.value * formatValueTaxes)} 
                    </td>
                  }
                  <td><input type="checkbox" onChange={() => { tool.checked = true }}/></td>
                </tr>
              ))} 
            </tbody>
          </table>
      </div>

      <div className="divBtnBudget">
        <Link to="/">
          <button>Anterior</button>
        </Link>
        
        <button onClick={() => {
          setStateTool([...toolValueFormated])
          history.push(`/finish/${id}`)
        }}>Próximo</button>
      </div>
    </div>
  )
}

export { CreateBudget }