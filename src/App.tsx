import { useCallback } from "react"
import ReactFlow, { addEdge, Background, Connection, ConnectionMode, Controls, useEdgesState, useNodesState } from "reactflow"
import 'reactflow/dist/style.css'
import { zinc } from 'tailwindcss/colors'
import DefaultEdge from "./components/edges/DefaultEdge"
import Square from "./components/nodes/Square"

const NODE_TYPES = {
  square: Square
}

const EDGE_TYPES = {
  default: DefaultEdge
}

const INITIAL_NODES = [
  {
    id: crypto.randomUUID(),
    type: 'square',
    position: {
      x: 100,
      y: 250
    },
    data: {}
  },

  {
    id: crypto.randomUUID(),
    type: 'square',
    position: {
      x: 1000,
      y: 250
    },
    data: {}
  }
] satisfies Node[]

function App() {

  const [edges, setEdges, onEdgesChanges] = useEdgesState([])
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES)

  const onConnect = useCallback((conneection: Connection) => {
    return setEdges(edges => addEdge(conneection, edges))
  }, [])

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChanges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{
          type: 'default'
        }}
        >
        <Background
        gap={12}
        size={2}
        color={zinc[200]}
        />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default App
