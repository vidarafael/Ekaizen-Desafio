import './style.scss'
import editSvg from '../../assets/ferraments/edit.svg'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Link } from 'react-router-dom'
import deleteSvg from '../../assets/home/delete.svg'

interface ToolsProps {
  id: string;
  name: string;
  priceLargeSize: number;
  priceMidSize: number;
  priceSmallSize: number;
}

function Tools() {
  const [tools, setTools] = useState<ToolsProps[]>([])

  useEffect(() => {
    api.get('/tools').then(response => setTools(response.data))
  })

  function handleDelete(id: string) {
    const deleteTools = tools.filter(tools => tools.id !== id)
    setTools(deleteTools)
    api.delete(`/tools/${id}`)
  }

  return (
    <div className="container">
      <div className="content">
          <header>
            <h2>Cadastros de Ferramentas</h2>

            <Link to="/">
              <button className="btnHome">Clientes</button>
            </Link>
          </header>
          <hr />
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Base - Pequeno Porte</th>
                <th>Base - Médio Porte</th>
                <th>Base - Grande Porte</th>
                <th>
                  <Link to="/tools/create">
                    <button className="btnCreate">+</button>
                  </Link>
                </th>
              </tr>
              <tr>
                <td><input className="firstInput" type="text" placeholder="Filtrar"/></td>
                <td><input type="text" placeholder="Filtrar"/></td>
                <td><input type="text" placeholder="Filtrar"/></td>
                <td><input type="text" placeholder="Filtrar"/></td>
                <td><input type="text" placeholder="Filtrar"/></td>
              </tr>
            </thead>
            <tbody>
              {tools.map(tool => (
                <tr key={tool.id}>
                  <td>{tool.name}</td>
                  <td>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(tool.priceSmallSize)}
                  </td>
                  <td>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(tool.priceMidSize)}
                  </td>
                  <td>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(tool.priceLargeSize)}
                  </td>
                  <td>
                    <div>
                      <Link to={`/tools/edit/${tool.id}`}>
                        <button>
                          <img src={editSvg} alt="imagem de editar" />
                        </button>
                      </Link>
                      <button onClick={() => {handleDelete(tool.id)}}>
                        <img src={deleteSvg} alt="imagem de deletar" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
            </tbody>
          </table>
      </div>

      <div className="divBtnTools">
        <button>Salvar</button>
      </div>
    </div>
  )
}

export { Tools }